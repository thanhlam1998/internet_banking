const config = require('../config');
const https = require('follow-redirects').https;
const crypto = require('crypto');
const fs = require('fs');
const nodeRSA = require('node-rsa')

const interbank_transfer = (credit_number, username, amount, message, partner_code) => {
  const options = {
    method: "POST",
    maxRedirects: 5
  };

  switch (partner_code) {
    case "NaniBank":

    case "bankdbb":
      const postData = {
        number: credit_number,
        money: amount,
        username: username,
        content: message
      }
      const data = JSON.stringify(postData);
      const ts = Math.floor(Date.now() / 1000)
      const dataToHash = ts + ":" + data + ":" + config.list_partner.bankbb.secret_text;
      const hashString = crypto.createHash('sha1').update(dataToHash).digest('hex');

      const key = fs.readFileSync('./rsa-key-test/partner/rsa-test/linh.private.key');
      const secretKey = 'Tj0xYDEDiQF9f2GYCxSv';
      const privateKey = new nodeRSA(key);
      const signature = privateKey.sign(secretKey, 'base64', 'base64');

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

      console.log(options.headers)
      console.log(postData)

      return new Promise((resolve, reject) => {
        var req = https.request(options, function (res) {
          console.log(res.statusCode)
          var chunks = '';

          res.on("data", function (chunk) {
            chunks += chunk;
          });

          res.on("end", function (chunk) {
            console.log(chunks)
            resolve(chunks);
          });

          res.on("error", function (error) {
            reject(error);
          });

        }).write(data).end();
      })


    default:
      break;
  }
}

module.exports = interbank_transfer