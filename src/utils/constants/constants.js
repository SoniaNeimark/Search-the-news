//export const baseUrl = "https://api.sonia-around.students.nomoredomainssbs.ru";
export const baseUrl = "http://localhost:3000";
export const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const setHeaders = (token) => {
  const auth = `Bearer ${token}`;
  headers.authorization = auth;
  return headers;
};
