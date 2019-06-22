import http from "./httpService";
import config from "../config.json";
import jwtDecode from "jwt-decode";

const apiEndpoint = config.apiUrl + "/auth";
http.setJwt(getJwt());

export async function login(user) {
  const { userName: email, password } = user;

  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  localStorage.setItem("token", jwt);
}
export function loginWithJwt(jwt) {
  localStorage.setItem("token", jwt);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem("token");
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem("token");
}

export function logout() {
  localStorage.removeItem("token");
}

export default {
  login,
  getJwt,
  loginWithJwt,
  logout,
  getCurrentUser
};
