import { baseUrl, headers, setHeaders } from "../constants/constants";
import { checkResponse } from "../callbacks/callbacks";

export const authorize = (email, password) => {
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
