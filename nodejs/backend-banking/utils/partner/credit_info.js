const config = require('../config');
const http = require('follow-redirects').http;
const crypto = require('crypto');
const { rejects } = require('assert');
const { stringify } = require('querystring');

const interbank_credit_info = (credit_number, partner_code) => {
  const options = {
    method: "GET",
    maxRedirects: 5,
    timeout: 10000
  };

  switch (partner_code) {
    case "N42": {
      const ts = Date.now();
      const postData = {};
      const dataToHash = postData + ts + config.list_partner.N42.secret_text;
      console.log(dataToHash)
      let hashString = crypto.createHash('sha256').update(dataToHash).digest('hex');

      options.hostname = config.list_partner.N42.host
      options.path = `/api/interbank/get-account-info?number=${credit_number}`;
      options.headers = {
        'code': 'KAT',
        'auth-hash': hashString,
        'request-time': ts
      };

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
            resolve(body["data"]["fullName"]);
          });

          res.on("error", function (error) {
            console.log("error happen");
            reject(undefined);
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

    case "NaniBank": {
      const ts = Math.floor(Date.now() / 1000)
      const postData = {}
      const data = JSON.stringify(postData);
      const dataToHash = ts + config.list_partner.NaniBank.secret_text + data;
      let hashString = crypto.createHash('sha256').update(dataToHash).digest('hex');

      options.port = 3000
      options.hostname = config.list_partner.NaniBank.host
      options.path = `/partner?id=${credit_number}`;
      options.headers = {
        'timestamp': ts,
        'authen-hash': hashString,
        'name': "KiantoBank",
        'origin': 'www.nanibank.com'
      };

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
            if (body["Status"] === false) {
              resolve(undefined);
            }
            resolve(body["Info"]);
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
            console.log(chunks, res.statusCode)
            if (res.statusCode > 400) {
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