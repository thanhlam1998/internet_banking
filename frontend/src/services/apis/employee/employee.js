import { environment } from "../../../environment";
import { NameItem } from "../../../config/sessionStorage";
import axios from "axios";

const baseURL = environment.host;

const login = (username, password) => {
  return axios
    .post(`${baseURL}/api/employee/login`, {
      username,
      password,
    })
    .then((res) => {
      return res.data;
    });
};

const addCustomer = (
  username,
  password,
  idNumber,
  phone,
  firstname,
  lastname,
  date_of_birth,
  email
) => {
  const token = sessionStorage.getItem(NameItem.ACCESS_TOKEN);
  return axios
    .post(
      `${baseURL}/api/employee/add-customer`,
      {
        username: username,
        password: password,
        identity_number: idNumber,
        phone_number: phone,
        firstname: firstname,
        lastname: lastname,
        date_of_birth: date_of_birth,
        email_address: email,
      },
      {
        headers: {
          access_token: token,
        },
      }
    )
    .then((res) => {
      return res.data;
    });
};

const findCustomer = (credit_number) => {
  const token = sessionStorage.getItem(NameItem.ACCESS_TOKEN);
  let config = {
    headers: { access_token: token },
    params: {
      credit_number: credit_number,
    },
  };
  return axios
    .get(`${baseURL}/api/customer/get-credit-info`, config)
    .then((res) => {
      return res.data;
    });
};

const addMoneyToCustomer = (credit_number, amount) => {
  const token = sessionStorage.getItem(NameItem.ACCESS_TOKEN);
  return axios
    .post(
      `${baseURL}/api/employee/deposit-customer-credit`,
      {
        credit_number,
        amount,
      },
      {
        headers: {
          access_token: token,
        },
      }
    )
    .then((res) => {
      return res.data;
    });
};

const findTransactionHistory = (credit_number) => {
  const token = sessionStorage.getItem(NameItem.ACCESS_TOKEN);
  return axios
    .get(`${baseURL}/api/employee/get-customer-transactions`, {
      headers: {
        access_token: token,
      },
      params: {
        credit_number,
      },
    })
    .then((res) => {
      return res.data;
    });
};

const refreshAccessToken = () => {
  const refreshToken = localStorage.getItem(NameItem.REFRESH_TOKEN);
  return axios
    .get(`${baseURL}/api/employee/refresh-jwt`, {
      headers: {
        refresh_token: refreshToken,
      },
    })
    .then((res) => {
      return res.data;
    });
};

export const EmpServices = {
  login,
  addCustomer,
  findCustomer,
  addMoneyToCustomer,
  findTransactionHistory,
  refreshAccessToken,
};
