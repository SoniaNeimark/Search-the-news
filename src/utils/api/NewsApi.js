import { checkResponse } from "../callbacks/callbacks";
import {
  toValue,
  fromValue,
} from "../constants/constants";

const {
  REACT_APP_NEWS_URL_DEV,
  REACT_APP_NEWS_URL_PRO,
  REACT_APP_API_KEY,
  REACT_APP_PAGE_SIZE,
} = process.env;

const devMode = process.env.NODE_ENV;

export const getFoundArticles = (reqKey) => {
  const params = new URLSearchParams({
    q: reqKey,
    from: fromValue,
    to: toValue,
    pageSize: REACT_APP_PAGE_SIZE,
    apiKey: REACT_APP_API_KEY,
  });
  const url = `${
    devMode === "development" ? REACT_APP_NEWS_URL_DEV : REACT_APP_NEWS_URL_PRO
  }${params}`;
  const req = new Request(url);
  return fetch(req).then((res) => checkResponse(res));
};
