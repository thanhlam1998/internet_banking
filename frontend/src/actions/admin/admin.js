import { AdminConstants } from '../constants/admin/admin_constants';
import {AdminServices} from '../../services/apis/admin/admin'


function login(username, password){
    return (dispatch) => {
      dispatch(request());
      AdminServices.login(username, password)
      .then(
        res =>{
          dispatch(success(res))
        }
      ).catch(error => {
        dispatch(failure(error))
      }) 
    };
    function request(){return{type: AdminConstants.LOGIN_REQUEST}};
    function success(res){return{type: AdminConstants.LOGIN_SUCCESS, payload: res}};
    function failure(error){return{type: AdminConstants.LOGIN_ERROR, payload: error}};
};

function logout(){
  return dispatch => dispatch({type: AdminConstants.LOGOUT})
}

function getAllEmployee(){
  return (dispatch) => {
    dispatch(request());
    AdminServices.getAllEmployee()
    .then(
      res =>{
        dispatch(success(res))
      }
      ).catch(error => {
        dispatch(failure(error.response.data))
      }) 
    };
    function request(){ return{type: AdminConstants.GET_ALL_EMPLOYEE_PENDING}};
    function success(res){return{type: AdminConstants.GET_ALL_EMPLOYEE_SUCCESS, payload: res}};
    function failure(error){return{type: AdminConstants.GET_ALL_EMPLOYEE_ERROR, payload: error}};
};

function createEmployee(username, password){
  return (dispatch) => {
    dispatch(request());
    AdminServices.createEmployee(username,password)
    .then(
      res =>{
        dispatch(success(res))
      }
      ).catch(error => {
        dispatch(failure(error.response.data))
      }) 
    };
    function request(){ return{type: AdminConstants.CREATE_EMPLOYEE_PENDING}};
    function success(res){return{type: AdminConstants.CREATE_EMPLOYEE_SUCCESS, payload: res}};
    function failure(error){return{type: AdminConstants.CREATE_EMPLOYEE_ERROR, payload: error}};
};

function updatePasswordEmployee(employee_id, password){
  return (dispatch) => {
    dispatch(request());
    AdminServices.updatePasswordEmployee(employee_id, password)
    .then(
      res =>{
        dispatch(success(res))
      }
      ).catch(error => {
        dispatch(failure(error.response.data))
      }) 
    };
    function request(){ return{type: AdminConstants.UPDATE_PASSWORD_EMPLOYEE_PENDING}};
    function success(res){return{type: AdminConstants.UPDATE_PASSWORD_EMPLOYEE_SUCCESS, payload: res}};
    function failure(error){return{type: AdminConstants.UPDATE_PASSWORD_EMPLOYEE_ERROR, payload: error}};
};

function deleteEmployee(employee_id){
  return (dispatch) => {
    dispatch(request());
    AdminServices.deleteEmployee(employee_id)
    .then(
      res =>{
        dispatch(success(res))
      }
      ).catch(error => {
        dispatch(failure(error.response.data))
      }) 
    };
    function request(){ return{type: AdminConstants.DELETE_EMPLOYEE_PENDING}};
    function success(res){return{type: AdminConstants.DELETE_EMPLOYEE_SUCCESS, payload: res}};
    function failure(error){return{type: AdminConstants.DELETE_EMPLOYEE_ERROR, payload: error}};
};

function getTransactionList(){
  return (dispatch) => {
    dispatch(request());
    AdminServices.getTransactionList()
    .then(
      res =>{
        dispatch(success(res))
      }
      ).catch(error => {
        dispatch(failure(error))
      }) 
    };
    function request(){ return{type: AdminConstants.GET_TRANSACTION_LIST_PENDING}};
    function success(res){return{type: AdminConstants.GET_TRANSACTION_LIST_SUCCESS, payload: res}};
    function failure(error){return{type: AdminConstants.GET_TRANSACTION_LIST_ERROR, payload: error}};
};




export const AdminActions = {
  login, 
  logout,
  getAllEmployee,
  createEmployee,
  updatePasswordEmployee,
  deleteEmployee,
  getTransactionList
}