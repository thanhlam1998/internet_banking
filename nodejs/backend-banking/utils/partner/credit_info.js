const config = require('../config');
const https = require('follow-redirects').https;
const crypto = require('crypto');
const { rejects } = require('assert');

const interbank_credit_info = (credit_number, partner_code) => {
  const options = {
    method: "GET",
    maxRedirects: 5
  };

  switch (partner_code) {
    case "NaniBank": { }

    case "bankdbb": {
      const ts = Math.floor(Date.now() / 1000)
      const dataToHash = ts + ":" + "{}" + ":" + config.list_partner.bankbb.secret_text;
      let hashString = crypto.createHash('sha1').update(dataToHash).digest('hex');

      options.hostname = config.list_partner.bankbb.host
      options.path = `/api/partner-bank/info/${credit_number}`;
      options.headers = {
        'id': "bankdbb",
        'ts': ts,
        'sig': hashString
      };

      return new Promise((resolve, reject) => {
        var req = https.request(options, function (res) {
          if (res.statusCode != 200) {
            return undefined;
          }

          var chunks = '';

          res.on("data", function (chunk) {
            chunks += chunk;
          });

          res.on("end", function (chunk) {
            var body = JSON.parse(chunks);
            resolve(body["data"][0]["username"]);
          });

          res.on("error", function (error) {
            reject(error);
          });

        })
        req.end();
      })
    }

    case "N42": {
      const bankname = "N42";
      const ts = Math.floor(Date.now() / 1000);
      const dataToHash = ts + config.list_partner[bankname].secret_text;
      let hashString = crypto.createHash('sha256').update(dataToHash).digest('hex');

      options.hostname = config.list_partner[bankname].host
      options.path = `/api/interbank/get-account-info?number=${credit_number}`;
      options.headers = {
        'code': config.list_partner[bankname].code,
        'request-time': ts,
        'auth-hash': hashString
      };

      return new Promise((resolve, reject) => {
        var req = https.request(options, function (res) {

          var chunks = '';

          res.on("data", function (chunk) {
            chunks += chunk;
          });

          res.on("end", function (chunk) {
            var body = JSON.parse(chunks);

            if (res.statusCode != 200) {
              console.log(body);
              resolve(undefined);
              return;
            }

            resolve(body["data"]["fullName"]);
          });

          res.on("error", function (error) {
            reject(error);
          });

        })
        req.end();
      })
    }

    default:
      break;
  }
}

module.exports = interbank_credit_info