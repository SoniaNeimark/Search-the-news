import { headers, setHeaders } from "../constants/constants";
import { checkResponse } from "../callbacks/callbacks";
import { baseUrl } from "./auth";

export const { REACT_APP_BASE_URL_DEV, REACT_APP_BASE_URL_PRO } = process.env;
const appMode = process.env.NODE_ENV


export const addArticle = (articleObj, token) => {
  setHeaders(token);
  return fetch(`${baseUrl}/articles`, {
    method: "POST",
    headers: { ...headers },
    body: JSON.stringify(articleObj),
  }).then((res) => checkResponse(res));
};

export const getArticles = (token) => {
  setHeaders(token);
  return fetch(`${baseUrl}/articles`, {
    method: "GET",
    headers: { ...headers },
  }).then((res) => checkResponse(res));
};

export const deleteArticle = (token, articleId) => {
  setHeaders(token);
  return fetch(`${baseUrl}/articles/${articleId}`, {
    method: "DELETE",
    headers: { ...headers },
  }).then((res) => checkResponse(res));
};
