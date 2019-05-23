import React, { Component } from "react";
import * as moviesAPI from "../services/fakeMovieService";
import Movie from "./Movie";
import "font-awesome/css/font-awesome.css";

class MovieList extends Component {
  state = {
    movies: moviesAPI.getMovies(),
    movieCount: moviesAPI.getMovies().length,
    movieLabel: moviesAPI.getMovies().length > 1 ? "movies" : "movie",
    page: 1
  };

  handleDelete = movieID => {
    var newMovies = [...this.state.movies].filter(m => m._id !== movieID);
    this.setState({ movies: newMovies, movieCount: this.state.movieCount - 1 });
  };

  handleLike = movie => {
    const newMovies = [...this.state.movies];
    let index = newMovies.indexOf(movie);
    newMovies[index] = { ...newMovies[index] };
    newMovies[index].liked = !newMovies[index].liked;
    this.setState({ movies: newMovies });
  };

  handlePage = index => {
    const page = this.state.page;
    let newPage = index;
    this.setState({ page: newPage });
  };

  render() {
    if (this.state.movieCount === 0) return "There are no movies";

    return (
      <div>
        <p>
          Showing {this.state.movieCount} {this.state.movieLabel} in the
          database.
        </p>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Stock</th>
              <th scope="col">Rate</th>
              <th scope="col" />
              <th scope="col" />
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map((movie, index) => (
              <Movie
                key={movie._id}
                movie={movie}
                pagenum={this.state.page}
                index={index}
                onDelete={this.handleDelete}
                onLike={this.handleLike}
              />
            ))}
          </tbody>
        </table>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link">Previous</a>
            </li>
            <li className="page-item">
              <a className="page-link" onClick={() => this.handlePage(1)}>
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" onClick={() => this.handlePage(2)}>
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" onClick={() => this.handlePage(3)}>
                3
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default MovieList;
