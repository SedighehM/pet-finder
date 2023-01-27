import request from "./request";
const TokenKey = "token";

//Get token from sessionStorage
export function getToken() {
  return sessionStorage.getItem(TokenKey);
}
//Set token in sessionStorage
export function setToken(token) {
  return sessionStorage.setItem(TokenKey, token);
}
//Remove token from sessionStorage(For exmaple in logout)
export function removeToken() {
  return sessionStorage.removeItem(TokenKey);
}
//fetch token from backend
export function fetchToken() {
  return request({
    url: "/token",
    method: "get",
  });
}
