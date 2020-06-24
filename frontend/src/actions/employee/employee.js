import { EmpConstants } from '../constants/employee/emp_constants';
import {EmpServices} from '../../services/apis/employee/employee'


function login(username, password){
    return (dispatch) => {
      dispatch(request());
      EmpServices.login(username, password)
      .then(
        res =>{
          dispatch(success(res))
        }
      ).catch(error => {
        dispatch(failure(error.response.data))
      }) 
    };
    function request(){return{type: EmpConstants.LOGIN_REQUEST}};
    function success(res){return{type: EmpConstants.LOGIN_SUCCESS, payload: res}};
    function failure(error){return{type: EmpConstants.LOGIN_ERROR, payload: error}};
};

function logout(){
  return dispatch => dispatch({type: EmpConstants.LOGOUT})
}

function addCustomer(username, password, idNumber, phone, firstname, lastname, date_of_birth, email){
  return (dispatch) => {
    dispatch(request());
    EmpServices.addCustomer(username, password, idNumber, phone, firstname, lastname, date_of_birth, email)
    .then(
      res =>{
        dispatch(success(res))
      }
    ).catch(error => {
      dispatch(failure(error.response.data))
    }) 
  };
  function request(){return{type: EmpConstants.ADD_CUSTOMER_PENDING}};
  function success(res){return{type: EmpConstants.ADD_CUSTOMER_SUCCESS, payload: res}};
  function failure(error){return{type: EmpConstants.ADD_CUSTOMER_ERROR, payload: error}};
};

function findCustomer(credit_number){
  return (dispatch) => {
    dispatch(request());
    EmpServices.findCustomer(credit_number)
    .then(
      res =>{
        dispatch(success(res))
      }
      ).catch(error => {
        dispatch(failure(error.response.data))
      }) 
    };
    function request(){ return{type: EmpConstants.FIND_CUSTOMER_PENDING}};
    function success(res){return{type: EmpConstants.FIND_CUSTOMER_SUCCESS, payload: res}};
    function failure(error){return{type: EmpConstants.FIND_CUSTOMER_ERROR, payload: error}};
};

function addMoneyToCustomer(credit_number, amount){
  return (dispatch) => {
    dispatch(request());
    EmpServices.addMoneyToCustomer(credit_number, amount)
    .then(
      res =>{
        dispatch(success(res))
      }
      ).catch(error => {
        dispatch(failure(error.response.data))
      }) 
    };
    function request(){ return{type: EmpConstants.ADD_MONEY_TO_CUSTOMER_PENDING}};
    function success(res){return{type: EmpConstants.ADD_MONEY_TO_CUSTOMER_SUCCESS, payload: res}};
    function failure(error){return{type: EmpConstants.ADD_MONEY_TO_CUSTOMER_ERROR, payload: error}};
};

function findTransactionHistory(credit_number){
  return (dispatch) => {
    dispatch(request());
    EmpServices.findTransactionHistory(credit_number)
    .then(
      res =>{
        dispatch(success(res))
      }
      ).catch(error => {
        dispatch(failure(error.response.data))
      }) 
    };
    function request(){ return{type: EmpConstants.FIND_TRANSACTION_HISTORY_PENDING}};
    function success(res){return{type: EmpConstants.FIND_TRANSACTION_HISTORY_SUCCESS, payload: res}};
    function failure(error){return{type: EmpConstants.FIND_TRANSACTION_HISTORY_ERROR, payload: error}};
};

export const employeeActions = {
  login, 
  logout,
  addCustomer,
  findCustomer,
  addMoneyToCustomer,
  findTransactionHistory
}