const config = require('../config');
const http = require('follow-redirects').http;
const crypto = require('crypto');
const { rejects } = require('assert');
const { stringify } = require('querystring');

const interbank_credit_info = (credit_number, partner_code) => {
  const options = {
    method: "GET",
    maxRedirects: 5,
    timeout: 5000,
  };

  switch (partner_code) {
    case "NaniBank": {
      const ts = Math.floor(Date.now() / 1000)
      const postData = {
        "name": "KiantoBank",
        "id": credit_number
      }
      const data = JSON.stringify(postData);
      const dataToHash = ts + data + config.list_partner.NaniBank.secret_text;
      let hashString = crypto.createHash('sha256').update(dataToHash).digest('base64');

      options.hostname = config.list_partner.NaniBank.host
      options.path = `/partner`;
      options.headers = {
        'timestamp': ts,
        'authen-hash': hashString
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
            resolve(body["name"]);
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
            resolve(body["data"][0]["username"]);
          });

          res.on("error", function (error) {
            reject(error);
          });

        })
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

module.exports = interbank_credit_info