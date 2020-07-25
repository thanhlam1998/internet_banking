const bcrypt = require('bcryptjs');
const db = require('../utils/db');
const randomstring = require('randomstring');

module.exports = {
  add: entity => {
    // entity = {
    //   "username": "admin",
    //   "password": "admin",
    // }

    const hash = bcrypt.hashSync(entity.password, 8);
    entity["hashed_password"] = hash;

    entity["refresh_secret"] = randomstring.generate(20);
    delete entity["password"];
    return db.add(entity, 'admin');
  },

  searchByUserName: userName => db.load(`select * from admin where username = '${userName}'`),
  getInterbankTransaction: async _ => {
    const table_transaction_history = ['deposit_transaction_history', 'withdraw_transaction_history', 'sent_to_transaction_history', 'receive_from_transaction_history'];
    let retobj = {}
    for (i = 0; i < table_transaction_history.length; i++) {
      const tx = await db.load(`select * from ${table_transaction_history[i]} where partner_code <> 'local'`);
      retobj[table_transaction_history[i]] = tx
    }

    return retobj;
  }
};
