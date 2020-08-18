const config = require('../config');
const http = require('follow-redirects').http;
const crypto = require('crypto');
const fs = require('fs');
const openpgp = require('openpgp');
const nodeRSA = require('node-rsa');
const { json } = require('express');

const interbank_transfer = async (from_credit_number, to_credit_number, username, amount, message, partner_code) => {
  const options = {
    method: "POST",
    maxRedirects: 5,
    timeout: 5000,
  };

  switch (partner_code) {
    case "NaniBank": {
      const ts = Math.floor(Date.now() / 1000)
      const postData = {
        "from_id": from_credit_number,
        "to_id": to_credit_number,
        "amount": 10000,
        "message": "damn this api"
      }
      const data = JSON.stringify(postData);
      const dataToHash = ts + config.list_partner.NaniBank.secret_text + data;
      let hashString = crypto.createHash('sha256').update(dataToHash).digest('hex');
      const sig = await detachedSign(config.list_partner.NaniBank.secret_text)

      options.port = 3000
      options.hostname = config.list_partner.NaniBank.host
      options.path = `/partner/transfer`;
      options.headers = {
        'timestamp': ts,
        'authen-hash': hashString,
        'sig': sig,
        'name': 'KiantoBank',
        'origin': 'www.nanibank.com',
        "Content-Type": "application/json",
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
            if (body["status"] === false) {
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
  const prkey = fs.readFileSync('./rsa-key-test/bank/pgp/private.asc')
  const { keys: [privateKey] } = await openpgp.key.readArmored(prkey);;
  await privateKey.decrypt(config["openpgp_passphrase"]);

  const detachedSignature = await openpgp.sign({
    message: openpgp.cleartext.fromText(data), // CleartextMessage or Message object
    privateKeys: [privateKey],                            // for signing
    detached: true
  });

  return detachedSignature;
}

module.exports = interbank_transfer