import { headers, setHeaders } from "../constants/constants";
import { checkResponse } from "../callbacks/callbacks";

const devMode = process.env.NODE_ENV;
export const baseUrl =
  devMode === "development"
    ? process.env.REACT_APP_BASE_URL_DEV
    : process.env.REACT_APP_BASE_URL_PRO;

export const register = ({ email, password, name }) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: { ...headers },
    body: JSON.stringify({ email: email, password: password, name: name }),
  })
    .then((res) => checkResponse(res))
    .then((data) => {
      if (data.email) {
        return data;
      }
      throw new Error("Something went wrong");
    });
};

export const authorize = ({ email, password }) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: { ...headers },
    body: JSON.stringify({ email: email, password: password }),
  })
    .then((res) => checkResponse(res))
    .then((data) => {
      if (data.token) {
        return data;
      }
      throw new Error("Something went wrong");
    });
};

export const getUser = (token) => {
  setHeaders(token);
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: { ...headers },
  })
    .then((res) => checkResponse(res))
    .then((data) => {
      if (data.email) {
        return data;
      }
      throw new Error("Something went wrong");
    });
};
