import http from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/auth";

export async function login(user) {
  const { userName: email, password } = user;

  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  localStorage.setItem("token", jwt);
}

export function addAuthToken(token) {
  localStorage.setItem("token", token);
}
