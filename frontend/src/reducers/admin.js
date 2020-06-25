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
    default:
      return state;
  }
};

export default admin;
