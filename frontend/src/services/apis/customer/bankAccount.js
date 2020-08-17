import {environment} from '../../../environment'
import { NameItem } from '../../../config/sessionStorage'
import axios from 'axios';

const baseURL = environment.host;

const getListAccount = () => {
    const token = sessionStorage.getItem(NameItem.ACCESS_TOKEN)
    return axios.get(`${baseURL}/api/customer/get-list-account`, {
        headers: {
            access_token: token
        }
    }).then(res => {
        return res.data
    })
}

const getRemindList = () => {
    const token = sessionStorage.getItem(NameItem.ACCESS_TOKEN)
    return axios.get(`${baseURL}/api/customer/remind-list`, {
        headers: {
            access_token: token
        }
    }).then(res => {
        return res.data
    })
}

const createRemindList = (credit_number, remind_name, partner_code) => {
    const token = sessionStorage.getItem(NameItem.ACCESS_TOKEN);
    return axios
      .post(
        `${baseURL}/api/customer/remind-list`,
        {
          credit_number: credit_number,
          remind_name: remind_name,
          partner_code: partner_code
        },
        {
          headers: {
            access_token: token,
          },
        }
      )
      .then((res) => {
        return res.data;
      });
  }

const deleteRemindList = (remind_id) => {
    const token = sessionStorage.getItem(NameItem.ACCESS_TOKEN);
    return axios
      .delete(
        `${baseURL}/api/customer/remind-list`,
        {
          headers: {
            access_token: token
          },
          data: {
            remind_id: remind_id
          }
        }
      )
      .then((res) => {
        return res.data;
      });
  }

  const updateRemindList = (remind_id, credit_number, remind_name, partner_code) => {
    const token = sessionStorage.getItem(NameItem.ACCESS_TOKEN);
    return axios
      .put(
        `${baseURL}/api/customer/remind-list`,
        {
          remind_id: remind_id,
          credit_number: credit_number,
          remind_name: remind_name,
          partner_code: partner_code
        },
        {
          headers: {
            access_token: token,
          },
        }
      )
      .then((res) => {
        return res.data;
      });
  }

  const getTransactionHistory = () => {
    const token = sessionStorage.getItem(NameItem.ACCESS_TOKEN);
    return axios
      .get(
        `${baseURL}/api/customer/transaction-history`,
        {
          headers: {
            access_token: token,
          },
        }
      )
      .then((res) => {
        return res.data;
      });
  }
  const addDebt = (credit_number, amount, content) => {
    const token = sessionStorage.getItem(NameItem.ACCESS_TOKEN);
    return axios
      .post(
        `${baseURL}/api/customer/add-debt`,
        { 
          debtor_credit: credit_number,
          amount: amount,
          content: content
        },
        {
          headers: {
            access_token: token,
          },
        }
      )
      .then((res) => {
        return res.data;
      });
  }
  const deleteDebt = (id) => {
    const token = sessionStorage.getItem(NameItem.ACCESS_TOKEN);
    return axios
      .put(
        `${baseURL}/api/customer/remove-debt`,
        {
          debt_id: id
        },
        {
          headers: {
            access_token: token,
          },
        }
      )
      .then((res) => {
        return res.data;
      });
  }
  const getDebt = () => {
    const token = sessionStorage.getItem(NameItem.ACCESS_TOKEN);
    return axios
      .get(
        `${baseURL}/api/customer/debts`,
        {
          headers: {
            access_token: token,
          },
        }
      )
      .then((res) => {
        return res.data;
      });
  }
  const getBeDebt = () => {
    const token = sessionStorage.getItem(NameItem.ACCESS_TOKEN);
    return axios
      .get(
        `${baseURL}/api/customer/bedebts`,
        {
          headers: {
            access_token: token,
          },
        }
      )
      .then((res) => {
        return res.data;
      });
  }




export const BankAccountServices = {
    getListAccount,
    getRemindList,
    createRemindList,
    deleteRemindList,
    updateRemindList,
    getTransactionHistory,
    addDebt,
    deleteDebt,
    getDebt,
    getBeDebt
}