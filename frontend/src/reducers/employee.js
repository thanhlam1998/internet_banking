import { EmpConstants } from '../actions/constants/employee/emp_constants';
import NameItem from '../config/sessionStorage';

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
};

const employee = (state = initialState, action) => {
  switch (action.type) {
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
        sessionStorage.setItem(
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
    case EmpConstants.LOGOUT:
      sessionStorage.removeItem(NameItem.ACCESS_TOKEN);
      sessionStorage.removeItem(NameItem.REFRESH_TOKEN);
      return {
        logout: true,
      };

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
        full_name: action.payload.lastname + ' ' + action.payload.firstname,
      };
    case EmpConstants.FIND_CUSTOMER_ERROR:
      return {
        findCustomerPending: false,
        findCustomerSuccess: false,
        findCustomerError: action.payload,
      };

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
    default:
      return state;
  }
};

export default employee;
