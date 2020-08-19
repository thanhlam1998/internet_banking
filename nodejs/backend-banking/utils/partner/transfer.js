const config = require('../config');
const http = require('follow-redirects').http;
const crypto = require('crypto');
const fs = require('fs');
const openpgp = require('openpgp');
const nodeRSA = require('node-rsa');
const { json } = require('express');
const { openpgp_passphrase } = require('../config');
const { encodeBase64 } = require('bcryptjs');
const axios = require('axios');

const interbank_transfer = async (from_credit_number, to_credit_number, username, amount, message, partner_code) => {
  const options = {
    method: "POST",
    maxRedirects: 5,
    timeout: 10000,
  };

  switch (partner_code) {
    case "N42": {
      const ts = Date.now();
      const sig = await signPGP()

      const postData = {
        'numberAccount': to_credit_number,
        'amount': amount,
        'pgp_sig': sig.toString()
      };

      const dataToHash = postData + ts + config.list_partner.N42.secret_text;
      let hashString = crypto.createHash('sha256').update(dataToHash).digest('hex');

      options.hostname = config.list_partner.N42.host
      options.path = `/api/interbank/deposit`;
      options.headers = {
        'code': 'KAT',
        'auth-hash': hashString,
        'request-time': ts,
        'Content-Type': 'application/json',
        'Content-Length': JSON.stringify(postData).length
      };

      console.log(new Buffer.from(postData.pgp_sig).toString('base64'))

      return new Promise((resolve, reject) => {
        var req = http.request(options, function (res) {
          var chunks = '';

          res.on("data", function (chunk) {
            chunks += chunk;
          });

          res.on("end", function (chunk) {
            console.log(chunks, res.statusCode)
            if (res.statusCode > 400) {
              resolve(undefined);
              return;
            }

            var body = JSON.parse(chunks);
            resolve(res.statusCode);
          });

          res.on("error", function (error) {
            console.log("error happen");
            reject(undefined);
          });

        })
        req.write(JSON.stringify(postData));
        // use its "timeout" event to abort the request
        req.on('timeout', () => {
          resolve(undefined);
          return;
        });
        req.end();
      })
    }
    case "NaniBank": {
      const ts = Math.floor(Date.now() / 1000)
      const postData = {
        "from_id": from_credit_number,
        "to_id": to_credit_number,
        "amount": 10000,
        "message": "wtf is going on"
      }
      const data = JSON.stringify(postData);
      const dataToHash = ts + config.list_partner.NaniBank.secret_text + data;
      let hashString = crypto.createHash('sha256').update(dataToHash).digest('hex');
      const sig = await detachedSign(config.list_partner.NaniBank.secret_text);
      const sigbase64 = new Buffer.from(sig).toString('base64');

      options.port = 3000
      options.hostname = config.list_partner.NaniBank.host
      options.path = `/partner/transfer`;
      options.headers = {
        'timestamp': ts,
        'authen-hash': hashString,
        'sig': sigbase64,
        'name': 'KiantoBank',
        'origin': 'www.nanibank.com',
        "Content-Type": "application/json;charset=utf-8",
        'Content-Length': data.length
      };

      return new Promise((resolve, reject) => {
        var req = http.request(options, function (res) {
          var chunks = '';

          res.on("data", function (chunk) {
            chunks += chunk;
          });

          res.on("end", function (chunk) {
            console.log(chunks, res.statusCode);
            if (res.statusCode > 400) {
              resolve(res.statusCode);
              return;
            }

            var body = JSON.parse(chunks);
            if (body["status"] === false || body["Status"] === false) {
              resolve(undefined);
            }

            resolve(res.statusCode);
          });

          res.on("error", function (error) {
            reject(error);
          });

        })
        req.write(data);
        // use its "timeout" event to abort the request
        req.on('timeout', () => {
          resolve(undefined);
          return;
        });
        req.end();
      })
    }

    case "bankdbb": {
      const postData = {
        number: to_credit_number,
        money: amount.toString(),
        username: username,
        content: message
      }

      const secretText = 'Tj0xYDEDiQF9f2GYCxSv';
      const data = JSON.stringify(postData);
      const ts = Math.floor(Date.now() / 1000);
      const dataToHash = ts + ":" + data + ":" + secretText;
      const hashString = crypto.createHash('sha1').update(dataToHash).digest('hex');

      const secretKey = fs.readFileSync('./rsa-key-test/partner/rsa-test/linh.private.key');
      const privateKey = new nodeRSA(secretKey);
      const signature = privateKey.sign(secretText, 'base64', 'base64');

      options.hostname = config.list_partner.bankbb.host
      options.path = '/api/partner-bank/add-money';
      options.headers = {
        'id': "kianto",
        'ts': ts,
        'sig': hashString,
        'verify': signature,
        'Content-Type': 'application/json',
        'Content-Length': data.length
      };

      return new Promise((resolve, reject) => {
        var req = http.request(options, function (res) {
          var chunks = '';

          res.on("data", function (chunk) {
            chunks += chunk;
          });

          res.on("end", function (chunk) {
            console.log(chunks, res.statusCode);
            if (res.statusCode > 400) {
              resolve(res.statusCode);
              return;
            }

            var body = JSON.parse(chunks);
            resolve(res.statusCode);
          });

          res.on("error", function (error) {
            reject(error);
          });

        })
        req.write(data);
        // use its "timeout" event to abort the request
        req.on('timeout', () => {
          resolve(undefined);
          return;
        });
        req.end();
      })
    }


    default:
      break;
  }
}

async function detachedSign(data) {
  const prkey = fs.readFileSync('./rsa-key-test/bank/pgp/private.asc');
  const pubkey = fs.readFileSync('./rsa-key-test/bank/pgp/public.asc');
  const { keys: [privateKey] } = await openpgp.key.readArmored(prkey);
  await privateKey.decrypt(config["openpgp_passphrase"]);

  const { signature: detachedSignature } = await openpgp.sign({
    message: openpgp.cleartext.fromText(data), // CleartextMessage or Message object
    privateKeys: [privateKey],                            // for signing
    detached: true
  });

  const verified = await openpgp.verify({
    message: openpgp.cleartext.fromText(data),              // CleartextMessage or Message object
    signature: await openpgp.signature.readArmored(detachedSignature), // parse detached signature
    publicKeys: (await openpgp.key.readArmored(pubkey)).keys // for verification
  });
  const { valid } = verified.signatures[0];
  if (valid) {
    console.log('signed by key id ' + verified.signatures[0].keyid.toHex());
  } else {
    throw new Error('signature could not be verified');
  }

  return detachedSignature;
}

const signPGP = async () => {
  const privateKeyArmored = fs.readFileSync(
    "./rsa-key-test/bank/N42/private.asc"
  ); //file privatekey path
  const pubkey = fs.readFileSync("./rsa-key-test/bank/N42/public.asc"); //file privatekey path
  const passphrase = fs.readFileSync("./rsa-key-test/bank/N42/passphrase.txt");

  const {
    keys: [privateKey],
  } = await openpgp.key.readArmored(privateKeyArmored);
  await privateKey.decrypt(passphrase);

  const { signature: detachedSignature } = await openpgp.sign({
    message: openpgp.cleartext.fromText("Hello, World!"), // CleartextMessage or Message object
    privateKeys: [privateKey], // for signing
    detached: true,
  });

  const verified = await openpgp.verify({
    message: openpgp.cleartext.fromText("Hello, World!"),              // CleartextMessage or Message object
    signature: await openpgp.signature.readArmored(detachedSignature), // parse detached signature
    publicKeys: (await openpgp.key.readArmored(pubkey)).keys // for verification
  });
  const { valid } = verified.signatures[0];
  if (valid) {
    console.log('signed by key id ' + verified.signatures[0].keyid.toHex());
  } else {
    throw new Error('signature could not be verified');
  }


  return detachedSignature; // '-----BEGIN PGP SIGNED MESSAGE ... END PGP SIGNATURE-----'
};

module.exports = interbank_transfer