import axios from "axios";
import { toast } from "react-toastify";
import logger from "./logService";

//localStorage.getItem("token");

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  console.log(error);

  if (!expectedError) {
    logger.log(error);
    toast.error("An unexpected error has occurred");
  }

  return Promise.reject(error);
});

function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

//localStorage.getItem("token");
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt
};
