import { EmpConstants } from "../actions/constants/employee/emp_constants";
import NameItem from "../config/sessionStorage";

const initialState = {
  loggingIn: false,
  loginSuccess: false,
  loginError: null,

  addCustomerPending: false,
  addCustomerSuccess: false,
  addCustomerError: null,

  findCustomerPending: false,
  findCustomerSuccess: false,
  findCustomerError: null,

  addMoneyToCustomerPending: false,
  addMoneyToCustomerSuccess: false,
  addMoneyToCustomerError: null,

  findTransactionHistoryPending: false,
  findTransactionHistorySuccess: false,
  findTransactionHistoryError: null,

  refreshTokenPending: false,
  refreshTokenSuccess: false,
  refreshTokenError: null,
};

const employee = (state = initialState, action) => {
  switch (action.type) {
    /* ----------------------------- login employee ----------------------------- */
    case EmpConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        loginSuccess: false,
        loginError: null,
      };
    case EmpConstants.LOGIN_SUCCESS:
      if (action.payload !== null) {
        sessionStorage.setItem(
          NameItem.ACCESS_TOKEN,
          action.payload.access_token
        );
        localStorage.setItem(
          NameItem.REFRESH_TOKEN,
          action.payload.refresh_token
        );
      }
      return {
        loggingIn: false,
        loginSuccess: true,
        loginError: null,
      };
    case EmpConstants.LOGIN_ERROR:
      return {
        loggingIn: false,
        loginSuccess: false,
        loginError: action.payload,
      };

    /* ----------------------------- logout employee ---------------------------- */
    case EmpConstants.LOGOUT:
      sessionStorage.removeItem(NameItem.ACCESS_TOKEN);
      sessionStorage.removeItem(NameItem.REFRESH_TOKEN);
      return {
        logout: true,
      };

    /* ---------------------------- add new customer ---------------------------- */
    case EmpConstants.ADD_CUSTOMER_PENDING:
      return {
        addCustomerPending: true,
        addCustomerSuccess: false,
        addCustomerError: null,
      };
    case EmpConstants.ADD_CUSTOMER_SUCCESS:
      return {
        addCustomerPending: false,
        addCustomerSuccess: true,
        addCustomerError: null,
      };
    case EmpConstants.ADD_CUSTOMER_ERROR:
      return {
        addCustomerPending: false,
        addCustomerSuccess: false,
        addCustomerError: action.payload,
      };

    /* ------------------- find customer name by credit_number ------------------ */
    case EmpConstants.FIND_CUSTOMER_PENDING:
      return {
        findCustomerPending: true,
        findCustomerSuccess: false,
        findCustomerError: null,
      };
    case EmpConstants.FIND_CUSTOMER_SUCCESS:
      return {
        findCustomerPending: false,
        findCustomerSuccess: true,
        findCustomerError: null,
        full_name: action.payload.fullname,
      };
    case EmpConstants.FIND_CUSTOMER_ERROR:
      return {
        findCustomerPending: false,
        findCustomerSuccess: false,
        findCustomerError: action.payload,
      };

    /* --------------------- add money to customer acccount --------------------- */
    case EmpConstants.ADD_MONEY_TO_CUSTOMER_PENDING:
      return {
        addMoneyToCustomerPending: true,
        addMoneyToCustomerSuccess: false,
        addMoneyToCustomerError: null,
      };
    case EmpConstants.ADD_MONEY_TO_CUSTOMER_SUCCESS:
      return {
        addMoneyToCustomerPending: false,
        addMoneyToCustomerSuccess: true,
        addMoneyToCustomerError: null,
      };
    case EmpConstants.ADD_MONEY_TO_CUSTOMER_ERROR:
      return {
        addMoneyToCustomerPending: false,
        addMoneyToCustomerSuccess: false,
        addMoneyToCustomerError: action.payload,
      };

    /* ------------------ find transaction history of customer ------------------ */
    case EmpConstants.FIND_TRANSACTION_HISTORY_PENDING:
      return {
        findTransactionHistoryPending: true,
        findTransactionHistorySuccess: false,
        findTransactionHistoryError: null,
      };
    case EmpConstants.FIND_TRANSACTION_HISTORY_SUCCESS:
      return {
        findTransactionHistoryPending: false,
        findTransactionHistorySuccess: true,
        findTransactionHistoryError: null,
        transactionHistory: action.payload,
      };
    case EmpConstants.FIND_TRANSACTION_HISTORY_ERROR:
      return {
        findTransactionHistoryPending: false,
        findTransactionHistorySuccess: false,
        findTransactionHistoryError: action.payload,
      };

    /* ------------------------------ refresh token ----------------------------- */
    case EmpConstants.REFRESH_EMPLOYEE_ACCESS_TOKEN_PENDING:
      return {
        refreshTokenPending: true,
        refreshTokenSuccess: false,
        refreshTokenError: null,
      };
    case EmpConstants.REFRESH_EMPLOYEE_ACCESS_TOKEN_SUCCESS:
      if (action.payload !== null) {
        sessionStorage.setItem(
          NameItem.ACCESS_TOKEN,
          action.payload.access_token
        );
      }
      return {
        refreshTokenPending: false,
        refreshTokenSuccess: true,
        refreshTokenError: null,
      };
    case EmpConstants.REFRESH_EMPLOYEE_ACCESS_TOKEN_ERROR:
      return {
        refreshTokenPending: false,
        refreshTokenSuccess: false,
        refreshTokenError: action.payload,
      };
    default:
      return state;
  }
};

export default employee;
