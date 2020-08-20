import { environment } from '../../../environment';
import { NameItem } from '../../../config/sessionStorage';
import axios from 'axios';
const baseURL = environment.host;

const login = (username, password) => {
  return axios
    .post(`${baseURL}/api/admin/login`, {
      username,
      password,
    })
    .then((res) => {
      return res.data;
    });
};

const getAllEmployee = () => {
  const token = sessionStorage.getItem(NameItem.ACCESS_TOKEN);
  return axios
    .get(`${baseURL}/api/admin/employee-list`,
    {
      headers: {
        access_token: token,
      },
    })
    .then((res) => {
      return res.data;
    });
}

const createEmployee = (username, password) => {
  const token = sessionStorage.getItem(NameItem.ACCESS_TOKEN);
  return axios
    .post(`${baseURL}/api/admin/add-employee`,
    {
      username,
      password
    },
    {
      headers: {
        access_token: token,
      },
    })
    .then((res) => {
      return res.data;
    });
}

const deleteEmployee = (employee_id) => {
  const token = sessionStorage.getItem(NameItem.ACCESS_TOKEN);
  return axios
    .post(`${baseURL}/api/admin/delete-employee`,
    {
      employee_id
    },
    {
      headers: {
        access_token: token,
      },
    })
    .then((res) => {
      return res.data;
    });
}

const updateUsernameEmployee = (employee_id, username) => {
  const token = sessionStorage.getItem(NameItem.ACCESS_TOKEN);
  return axios
    .post(`${baseURL}/api/admin/update-employee-username`,
    {
      employee_id,
      username
    },
    {
      headers: {
        access_token: token,
      },
    })
    .then((res) => {
      return res.data;
    });
}

const updatePasswordEmployee = (employee_id, password) => {
  const token = sessionStorage.getItem(NameItem.ACCESS_TOKEN);
  return axios
    .post(`${baseURL}/api/admin/update-employee-password`,
    {
      employee_id,
      password
    },
    {
      headers: {
        access_token: token,
      },
    })
    .then((res) => {
      return res.data;
    });
}

const getTransactionList = () => {
  const token = sessionStorage.getItem(NameItem.ACCESS_TOKEN);
  return axios
    .get(`${baseURL}/api/admin/get-interbank-transaction`,
    {
      headers: {
        access_token: token,
      },
    })
    .then((res) => {
      return res.data;
    });
}


export const AdminServices = {
  login,
  getAllEmployee,
  createEmployee,
  deleteEmployee,
  updateUsernameEmployee,
  updatePasswordEmployee,
  getTransactionList
};
