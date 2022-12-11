import { baseUrl, headers, setHeaders } from "../constants/constants";
import { checkResponse } from "../callbacks/callbacks";

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