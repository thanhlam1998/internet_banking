const db = require('../utils/db');

module.exports = {
  add: entity => {
    //entity = {
    //  "lender": 1,
    //  "debtor":2,
    //  "amount": 300000,
    //  "content": "pay me please",
    //}

    entity["status"] = 1;
    entity["createdAt"] = new Date();
    entity["updatedAt"] = entity["createdAt"]
    return db.add(entity, 'debt');
  },
  deactive_debt: debt_id => db.load(`update debt set status=false where debt_id=${debt_id}`),
  get_list_debt: customer_id => db.load(`select * from debt where lender_id=${customer_id} and status=1`),
  get_list_bedebt: customer_id => db.load(`select * from debt where debtor_id=${customer_id} and status=1`)
};