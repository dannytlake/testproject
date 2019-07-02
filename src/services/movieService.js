import http from "./httpService";

const apiEndpoint = "/movies";

export function getMovies() {
  return http.get(apiEndpoint);
}

export function getSingleMovie(movieID) {
  return http.get(apiEndpoint + "/" + movieID);
}

export function deleteMovie(movieID) {
  return http.delete(apiEndpoint + "/" + movieID);
}

export function saveMovie(movie) {
  if (movie._id) {
    //if updating a movie
    const requestBody = { ...movie };
    delete requestBody._id;
    return http.put(apiEndpoint + "/" + movie._id, requestBody);
  }
  console.log("creating new movie");
  return http.post(apiEndpoint, movie);
}
