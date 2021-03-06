import { BankAccountConstants } from "../constants/customer/bank_account";
import { BankAccountServices } from "../../services/apis/customer/bankAccount";

function getBankAccount() {
  return (dispatch) => {
    dispatch(request());
    BankAccountServices.getListAccount()
      .then((res) => {
        dispatch(success(res));
      })
      .catch((error) => {
        dispatch(failure(error.response));
      });
  };
  function request() {
    return { type: BankAccountConstants.BANK_ACCOUNT_PENDING };
  }
  function success(res) {
    return {
      type: BankAccountConstants.BANK_ACCOUNT_REQUEST_SUCCESS,
      payload: res,
    };
  }
  function failure(error) {
    return {
      type: BankAccountConstants.BANK_ACCOUNT_REQUEST_FAIL,
      payload: error,
    };
  }
}

function getRemindList() {
  return (dispatch) => {
    dispatch(request());
    BankAccountServices.getRemindList()
      .then((res) => {
        dispatch(success(res));
      })
      .catch((error) => {
        dispatch(failure(error.response));
      });
  };
  function request() {
    return { type: BankAccountConstants.GET_REMIND_LIST_PENDING };
  }
  function success(res) {
    return { type: BankAccountConstants.GET_REMIND_LIST_SUCCESS, payload: res };
  }
  function failure(error) {
    return { type: BankAccountConstants.GET_REMIND_LIST_ERROR, payload: error };
  }
}

function createRemindList(credit_number, remind_name, partner_code) {
  return (dispatch) => {
    dispatch(request());
    BankAccountServices.createRemindList(
      credit_number,
      remind_name,
      partner_code
    )
      .then((res) => {
        dispatch(success(res));
      })
      .catch((error) => {
        dispatch(failure(error.response));
      });
  };
  function request() {
    return { type: BankAccountConstants.CREATE_REMIND_LIST_PENDING };
  }
  function success(res) {
    return {
      type: BankAccountConstants.CREATE_REMIND_LIST_SUCCESS,
      payload: res,
    };
  }
  function failure(error) {
    return {
      type: BankAccountConstants.CREATE_REMIND_LIST_ERROR,
      payload: error,
    };
  }
}

function deleteRemindList(remind_id) {
  return (dispatch) => {
    dispatch(request());
    BankAccountServices.deleteRemindList(remind_id)
      .then((res) => {
        dispatch(success(res));
      })
      .catch((error) => {
        dispatch(failure(error.response));
      });
  };
  function request() {
    return { type: BankAccountConstants.DELETE_REMIND_LIST_PENDING };
  }
  function success(res) {
    return {
      type: BankAccountConstants.DELETE_REMIND_LIST_SUCCESS,
      payload: res,
    };
  }
  function failure(error) {
    return {
      type: BankAccountConstants.DELETE_REMIND_LIST_ERROR,
      payload: error,
    };
  }
}

function updateRemindList(remind_id, credit_number, remind_name, partner_code) {
  return (dispatch) => {
    dispatch(request());
    BankAccountServices.updateRemindList(
      remind_id,
      credit_number,
      remind_name,
      partner_code
    )
      .then((res) => {
        dispatch(success(res));
      })
      .catch((error) => {
        dispatch(failure(error.response));
      });
  };
  function request() {
    return { type: BankAccountConstants.UPDATE_REMIND_LIST_PENDING };
  }
  function success(res) {
    return {
      type: BankAccountConstants.UPDATE_REMIND_LIST_SUCCESS,
      payload: res,
    };
  }
  function failure(error) {
    return {
      type: BankAccountConstants.UPDATE_REMIND_LIST_ERROR,
      payload: error,
    };
  }
}

function getTransactionHistory() {
  return (dispatch) => {
    dispatch(request());
    BankAccountServices.getTransactionHistory()
      .then((res) => {
        dispatch(success(res));
      })
      .catch((error) => {
        dispatch(failure(error.response));
      });
  };
  function request() {
    return { type: BankAccountConstants.GET_TRANSACTION_HISTORY_PENDING };
  }
  function success(res) {
    return {
      type: BankAccountConstants.GET_TRANSACTION_HISTORY_SUCCESS,
      payload: res,
    };
  }
  function failure(error) {
    return {
      type: BankAccountConstants.GET_TRANSACTION_HISTORY_ERROR,
      payload: error,
    };
  }
}

/* -------------------------------- add debt -------------------------------- */
function addDebt(credit_number, amount, content = "") {
  return (dispatch) => {
    dispatch(request());
    BankAccountServices.addDebt(credit_number, amount, content)
      .then((res) => {
        dispatch(success(res));
      })
      .catch((error) => {
        dispatch(failure(error.response));
      });
  };
  function request() {
    return { type: BankAccountConstants.ADD_DEBT_PENDING };
  }
  function success(res) {
    return { type: BankAccountConstants.ADD_DEBT_SUCCESS, payload: res };
  }
  function failure(error) {
    return { type: BankAccountConstants.ADD_DEBT_ERROR, payload: error };
  }
}
function deleteDebt(id) {
  return (dispatch) => {
    dispatch(request());
    BankAccountServices.deleteDebt(id)
      .then((res) => {
        dispatch(success(res));
      })
      .catch((error) => {
        dispatch(failure(error.response));
      });
  };
  function request() {
    return { type: BankAccountConstants.DELETE_DEBT_PENDING };
  }
  function success(res) {
    return { type: BankAccountConstants.DELETE_DEBT_SUCCESS, payload: res };
  }
  function failure(error) {
    return { type: BankAccountConstants.DELETE_DEBT_ERROR, payload: error };
  }
}

function getDebt() {
  return (dispatch) => {
    dispatch(request());
    BankAccountServices.getDebt()
      .then((res) => {
        dispatch(success(res));
      })
      .catch((error) => {
        dispatch(failure(error.response));
      });
  };
  function request() {
    return { type: BankAccountConstants.GET_DEBT_PENDING };
  }
  function success(res) {
    return { type: BankAccountConstants.GET_DEBT_SUCCESS, payload: res };
  }
  function failure(error) {
    return { type: BankAccountConstants.GET_DEBT_ERROR, payload: error };
  }
}

function getBeDebt() {
  return (dispatch) => {
    dispatch(request());
    BankAccountServices.getBeDebt()
      .then((res) => {
        dispatch(success(res));
      })
      .catch((error) => {
        dispatch(failure(error.response));
      });
  };
  function request() {
    return { type: BankAccountConstants.GET_BE_DEBT_PENDING };
  }
  function success(res) {
    return { type: BankAccountConstants.GET_BE_DEBT_SUCCESS, payload: res };
  }
  function failure(error) {
    return { type: BankAccountConstants.GET_BE_DEBT_ERROR, payload: error };
  }
}

export const bankAccountActions = {
  getBankAccount,
  getRemindList,
  createRemindList,
  deleteRemindList,
  updateRemindList,
  getTransactionHistory,
  addDebt,
  deleteDebt,
  getDebt,
  getBeDebt,
};
