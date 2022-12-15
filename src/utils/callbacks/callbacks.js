export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((obj) => {
    const error = new Error("authorizationError");
    error.name = "AuthorizationError";
    error.message = obj.message;
    return Promise.reject({ message: error.message });
  });
};

export const checkArray = (arr, callback) => {
  if (!Array.isArray(arr) || (Array.isArray(arr) && arr.length === 0)) {
    return false;
  } else if (Array.isArray(arr) && arr.length && arr.length === 1) {
    return callback(arr[0]);
  } else if (Array.isArray(arr) && arr.length && arr.length > 1) {
    return arr.some(callback);
  } else {
    return false;
  }
};

export const checkIfNotNull = (value, result) => {
  return value !== null ? value : result;
};

export const checkIfSaved = (el, article) => {
  return el.link === article.link;
};
