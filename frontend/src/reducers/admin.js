import { AdminConstants } from '../actions/constants/admin/admin_constants';
import NameItem from '../config/sessionStorage';

const initialState = {
  loggingIn: false,
  loginSuccess: false,
  loginError: null,

  getAllEmployeePending: false,
  getAllEmployeeSuccess: false,
  getAllEmployeeError: null,
  
  createEmployeePending: false,
  createEmployeeSuccess: false,
  createEmployeeError: null,
  
  updatePasswordEmployeePending: false,
  updatePasswordEmployeeSuccess: false,
  updatePasswordEmployeeError: null,

  deleteEmployeePending: false,
  deleteEmployeeSuccess: false,
  deleteEmployeeError: null,
};

const admin = (state = initialState, action) => {
  switch (action.type) {
    case AdminConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        loginSuccess: false,
        loginError: null,
      };
    case AdminConstants.LOGIN_SUCCESS:
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
    case AdminConstants.LOGIN_ERROR:
      return {
        loggingIn: false,
        loginSuccess: false,
        loginError: action.payload,
      };
    case AdminConstants.LOGOUT:
      sessionStorage.removeItem(NameItem.ACCESS_TOKEN);
      sessionStorage.removeItem(NameItem.REFRESH_TOKEN)
      return {
        logout: true,
      };

    case AdminConstants.GET_ALL_EMPLOYEE_PENDING:
      return {
        getAllEmployeePending: true,
        getAllEmployeeSuccess: false,
        getAllEmployeeError: null,
      }
    case AdminConstants.GET_ALL_EMPLOYEE_SUCCESS:
      return {
        getAllEmployeePending: false,
        getAllEmployeeSuccess: true,
        getAllEmployeeError: null,
        allEmployee: action.payload
      }
    case AdminConstants.GET_ALL_EMPLOYEE_ERROR:
      return {
        getAllEmployeePending: false,
        getAllEmployeeSuccess: false,
        getAllEmployeeError: action.payload,
      }

    case AdminConstants.CREATE_EMPLOYEE_PENDING:
      return {
        createEmployeePending: true,
        createEmployeeSuccess: false,
        createEmployeeError: null,
      }
    case AdminConstants.CREATE_EMPLOYEE_SUCCESS:
      return {
        createEmployeePending: false,
        createEmployeeSuccess: true,
        createEmployeeError: null,
      }
    case AdminConstants.CREATE_EMPLOYEE_ERROR:
      return {
        createEmployeePending: false,
        createEmployeeSuccess: false,
        createEmployeeError: action.payload,
      }

    case AdminConstants.UPDATE_PASSWORD_EMPLOYEE_PENDING:
      return {
        updatePasswordEmployeePending: true,
        updatePasswordEmployeeSuccess: false,
        updatePasswordEmployeeError: null,
      }
    case AdminConstants.UPDATE_PASSWORD_EMPLOYEE_SUCCESS:
      return {
        updatePasswordEmployeePending: false,
        updatePasswordEmployeeSuccess: true,
        updatePasswordEmployeeError: null,
      }
    case AdminConstants.UPDATE_PASSWORD_EMPLOYEE_ERROR:
      return {
        updatePasswordEmployeePending: false,
        updatePasswordEmployeeSuccess: false,
        updatePasswordEmployeeError: action.payload,
      }

      case AdminConstants.DELETE_EMPLOYEE_PENDING:
        return {
          deleteEmployeePending: true,
          deleteEmployeeSuccess: false,
          deleteEmployeeError: null,
        }
      case AdminConstants.DELETE_EMPLOYEE_SUCCESS:
        return {
          deleteEmployeePending: false,
          deleteEmployeeSuccess: true,
          deleteEmployeeError: null,
        }
      case AdminConstants.DELETE_EMPLOYEE_ERROR:
        return {
          deleteEmployeePending: false,
          deleteEmployeeSuccess: false,
          deleteEmployeeError: action.payload,
        }

      case AdminConstants.GET_TRANSACTION_LIST_PENDING:
        return {
          getTransactionListPending: true,
          getTransactionListSuccess: false,
          getTransactionListError: null,
        }
      case AdminConstants.GET_TRANSACTION_LIST_SUCCESS:
        return {
          getTransactionListPending: false,
          getTransactionListSuccess: true,
          transactionList: action.payload,
          getTransactionListError: null,
        }
      case AdminConstants.GET_TRANSACTION_LIST_ERROR:
        return {
          getTransactionListPending: false,
          getTransactionListSuccess: false,
          getTransactionListError: action.payload,
        }
    default:
      return state;
  }
};

export default admin;
