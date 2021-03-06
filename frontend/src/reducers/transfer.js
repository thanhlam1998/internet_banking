import { TransferConstants } from '../actions/constants/customer/transfer';

const initialState = {
  findReceiverPending: false,
  findReceiverSuccess: false,
  findReceiverError: null,

  getRemindListPending: false,
  getRemindListSuccess: false,
  getRemindListError: null,

  transferLocalPending: false,
  transferLocalSuccess: false,
  transferLocalError: null,
  onChangedState: false,

  transferInterPending: false,
  transferInterSuccess: false,
  transferInterError: null,

  verifyOtpPending: false,
  verifyOtpSuccess: false,
  verifyOtpError: null,

  saveRemindListPending: false,
  saveRemindListSuccess: false,
  saveRemindListError: null,
};

const transfer = (state = initialState, action) => {
  switch (action.type) {

/* --------------------- find receiver by credit_number --------------------- */
    case TransferConstants.FIND_RECEIVER_PENDING:
      return {
        findReceiverPending: true,
        findReceiverSuccess: false,
        findReceiverError: null,
      };
    case TransferConstants.FIND_RECEIVER_SUCCESS:
      return {
        findReceiverPending: false,
        findReceiverSuccess: true,
        findReceiverError: null,
        full_name: action.payload.fullname,
      };
    case TransferConstants.FIND_RECEIVER_ERROR:
      return {
        findReceiverPending: false,
        findReceiverSuccess: false,
        findReceiverError: action.payload,
      };

/* --------------------------- get the remind list -------------------------- */
    case TransferConstants.GET_REMIND_LIST_PENDING:
      return {
        getRemindListPending: true,
        getRemindListSuccess: false,
        getRemindListError: null,
      };
    case TransferConstants.GET_REMIND_LIST_SUCCESS:
      return {
        getRemindListPending: false,
        getRemindListSuccess: true,
        getRemindListError: null,
        remindList: action.payload['remind-list'],
      };
    case TransferConstants.GET_REMIND_LIST_ERROR:
      return {
        getRemindListPending: false,
        getRemindListSuccess: false,
        getRemindListError: action.payload,
      };

/* ----------------------------- transfer local ----------------------------- */
    case TransferConstants.TRANSFER_LOCAL_PENDING:
      return {
        transferLocalPending: true,
        transferLocalSuccess: false,
        transferLocalError: null,
      };
    case TransferConstants.TRANSFER_LOCAL_SUCCESS:
      return {
        transferLocalPending: false,
        transferLocalSuccess: true,
        transferLocalError: null,
        onChangedState: true,
        transactionId: action.payload.transaction_id,
      };
    case TransferConstants.TRANSFER_LOCAL_ERROR:
      return {
        transferLocalPending: false,
        transferLocalSuccess: false,
        transferLocalError: action.payload,
      };

/* ----------------------------- transfer inter ----------------------------- */
    case TransferConstants.TRANSFER_INTER_PENDING:
      return {
        transferInterPending: true,
        transferInterSuccess: false,
        transferInterError: null,
        onChangedState: false,
      };
    case TransferConstants.TRANSFER_INTER_SUCCESS:
      return {
        transferInterPending: false,
        transferInterSuccess: true,
        transferInterError: null,
        onChangedState: true,
        transactionId: action.payload.transaction_id,
      };
    case TransferConstants.TRANSFER_INTER_ERROR:
      return {
        transferInterPending: false,
        transferInterSuccess: false,
        transferInterError: action.payload,
      };

/* -------------------------------- send OTP -------------------------------- */
    case TransferConstants.OTP_PENDING:
      return {
        verifyOtpPending: true,
        verifyOtpSuccess: false,
        verifyOtpError: null,
      };
    case TransferConstants.OTP_SUCCESS:
      return {
        verifyOtpPending: false,
        verifyOtpSuccess: true,
        verifyOtpError: null,
      };
    case TransferConstants.OTP_ERROR:
      return {
        verifyOtpPending: false,
        verifyOtpSuccess: false,
        verifyOtpError: action.payload,
      };

/* -------------------- save the customer to remind list -------------------- */
    case TransferConstants.SAVE_REMIND_LIST_PENDING:
      return {
        saveRemindListPending: true,
        saveRemindListSuccess: false,
        saveRemindListError: null,
      };
    case TransferConstants.SAVE_REMIND_LIST_SUCCESS:
      return {
        saveRemindListPending: false,
        saveRemindListSuccess: true,
        saveRemindListError: null,
        transactionHistory: action.payload
      };
    case TransferConstants.SAVE_REMIND_LIST_ERROR:
      return {
        saveRemindListPending: false,
        saveRemindListSuccess: false,
        saveRemindListError: action.payload,
      };
    default:
      return state;
  }
};

export default transfer;
