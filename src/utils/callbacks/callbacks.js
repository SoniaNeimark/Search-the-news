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

export const checkIfNotNull = (value, result) => {
  return value !== null ? value : result;
};

export const checkIfSaved = (el, article) => {
  return el.link === article.link;
};

export const countElements = (arr) => {
  const count = {};

  arr.forEach((element) => {
    count[element] = (count[element] || 0) + 1;
  });

  const swappedArr = Object.entries(count).map(([key, value]) => [value, key]);

  const swappedObj = Object.fromEntries(swappedArr);

  const sortedKeys = Object.keys(swappedObj).sort().reverse();

  const sortedValues = sortedKeys.map((key) => {
    return swappedObj[key];
  });

  return sortedValues;
};
