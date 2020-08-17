const config = require('../config');
const http = require('follow-redirects').http;
const crypto = require('crypto');
const fs = require('fs');
const nodeRSA = require('node-rsa')

const interbank_transfer = (credit_number, username, amount, message, partner_code) => {
  const options = {
    method: "POST",
    maxRedirects: 5,
    timeout: 5000,
  };

  switch (partner_code) {
    case "NaniBank":

    case "bankdbb":
      const postData = {
        number: credit_number,
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
            if (res.statusCode > 400) {
              console.log(body);
              resolve(undefined);
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


    default:
      break;
  }
}

module.exports = interbank_transfer