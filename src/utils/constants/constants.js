export const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const setHeaders = (token) => {
  const auth = `Bearer ${token}`;
  headers.authorization = auth;
  return headers;
};

const today = new Date();

export const convertDate = (dateValue) => {
  const date = new Date(dateValue);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const from = () => {
  const datetMS = today.getTime() - 7 * 24 * 60 * 60 * 1000;
  const converted = new Date(datetMS);

  return converted.toLocaleDateString("sv");
};

const to = () => {
  const datetMS = today.getTime();
  const converted = new Date(datetMS);
  return converted.toLocaleDateString("sv");
};

export const fromValue = from();
export const toValue = to();

