const config = require('../config');
const https = require('follow-redirects').https;
const crypto = require('crypto');

const interbank_credit_info = async (credit_number, partner_code) => {
  const options = {
    method: "GET",
    maxRedirects: 5
  };

  switch (partner_code) {
    case "NaniBank":

    case "bankdbb":
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
      console.log(options)

      var req = await https.request(options, function (res) {
        var chunks = [];

        res.on("data", function (chunk) {
          chunks.push(chunk);
        });

        res.on("end", function (chunk) {
          var body = Buffer.concat(chunks);
          console.log(body.toString());
        });

        res.on("error", function (error) {
          console.error(error);
        });

        retrn 
      });

      req.end();


    default:
      break;
  }
}

module.exports = interbank_credit_info