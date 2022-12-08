export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((obj) => {
    const error = new Error("authorizationError");
    error.name = "AuthorizationError";
    error.message = obj.message;
    return Promise.reject(error.message);
  });
};
