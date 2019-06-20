import http from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/users";

// export function getMovies() {
//   return http.get(apiEndpoint);
// }

// export function getSingleMovie(movieID) {
//   return http.get(apiEndpoint + "/" + movieID);
// }

// export function deleteMovie(movieID) {
//   return http.delete(apiEndpoint + "/" + movieID);
// }

export function registerUser(user) {
  //  if (user._id) {
  //error out?
  //const requestBody = { ...movie };
  // delete requestBody._id;
  //return http.put(apiEndpoint + "/" + movie._id, requestBody);
  // }
  console.log("creating new user");
  return http.post(apiEndpoint, user);
}
