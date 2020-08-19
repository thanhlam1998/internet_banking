const config = {};

config["secret_text"] = "cantexitvim";
config["openpgp_passphrase"] = "cantexitnvim";

config["accesstoken_exp"] = 6000;
config["refreshtoken_exp"] = "30d";
config["otp_exp"] = 600;

config["bankmail_address"] = "linh55909167@gmail.com";
config["bankmail_password"] = "LinhHa98@";

config["local_transfer_fee"] = 2000;
config["interbank_transfer_fee"] = 5000;

config["list_partner"] = {
  "bankbb": {
    "host": "bankdbb.herokuapp.com",
    "secret_text": "bankdbb"
  },
  "NaniBank": {
    "host": "35.247.178.19",
    "secret_text": "himom"
  },
  "N42": {
    "host": "nhom42bank.herokuapp.com",
    "secret_text": "_(5KmP*YcTM(@?:"
  }
}

module.exports = config;
