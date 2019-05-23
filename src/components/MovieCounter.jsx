import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";

class MovieCounter extends Component {
  state = {};
  movieCount = getMovies().length;
  strMovieLabel = this.movieCount > 1 ? "movies" : "movie";

  //= fakeMovieService.getMovies();

  renderMovieCount() {
    //var movieCount = getMovies().length;
    if (this.movieCount === 0) return "There are no movies";

    return (
      <h1>
        {" "}
        Showing {this.movieCount} {this.strMovieLabel} in the database.
      </h1>
    );
  }

  render() {
    return <div>{this.renderMovieCount()}</div>;
  }
}

export default MovieCounter;
