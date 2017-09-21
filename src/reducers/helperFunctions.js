import decode from "jwt-decode";

export function getTokenExpirationDate(token) {
  const decoded = decode(token);
  if (!decoded.exp) {
    return null;
  }
  const date = new Date(0);
  date.setUTCSeconds(decoded.exp);
  return date;
}

export function isTokenValid(token) {
  const date = getTokenExpirationDate(token);
  const offsetSeconds = 0;
  if (date === null) {
    return false;
  }
  return date.valueOf() > new Date().valueOf() + offsetSeconds * 1000;
}

export const getUserProfile = token => {
  const decoded = decode(token);
  return {
    id: decoded.id,
    username: decoded.username,
    firstName: decoded.firstName,
    lastName: decoded.lastName,
    email: decoded.email,
    gravatar: decoded.gravatar,
    photo: decoded.photo
  };
};

export const setToken = token => {
  window.localStorage.setItem("token", token);
};

export const getToken = () => window.localStorage.getItem("token");

export const checkToken = () => {
  const token = getToken();
  if (token) {
    return isTokenValid(token);
  }
  return false;
};
