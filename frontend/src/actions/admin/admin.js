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
        dispatch(failure(error.response.data))
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

export const AdminActions = {
  login, 
  logout,
  getAllEmployee,
  createEmployee
}