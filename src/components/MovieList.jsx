import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";

import Movie from "./Movie";
import Paginator from "./Paginator";
import ListGroup from "./ListGroup";
import "font-awesome/css/font-awesome.css";

class MovieList extends Component {
  state = {
    movies: [],
    movieCount: 0,
    pageNum: 1,
    pageSize: 4,
    activeGenre: "",
    genres: []
  };
  //
  componentDidMount() {
    const genres = [{ name: "All Genres" }, ...getGenres()];

    this.setState({
      movies: getMovies(),
      movieCount: getMovies().length,
      genres: genres
    });
  }

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

  handlePageChange = index => {
    let newIndex = index;
    let maxPageNum = Math.ceil(this.state.movieCount / this.state.pageSize);

    if (index < 1) newIndex = 1;
    if (index > maxPageNum) newIndex = maxPageNum;
    this.setState({ pageNum: newIndex });
  };

  handleGenreSelect = genre => {
    console.log("Genre Clicked is" + genre);
    this.setState({ pageNum: 1, activeGenre: genre });
  };

  render() {
    if (this.state.movieCount === 0) return "There are no movies";

    const filteredByGenre =
      this.state.activeGenre && this.state.activeGenre._id
        ? this.state.movies.filter(
            g => g.genre._id === this.state.activeGenre._id
          )
        : this.state.movies;

    const movieLabel = filteredByGenre.length > 1 ? "movies" : "movie";

    console.log(
      "Filterd Movies = " + filteredByGenre.map(movie => movie.title)
    );

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            onItemSelect={this.handleGenreSelect}
            activeItem={this.state.activeGenre}
            items={this.state.genres}
          />
        </div>
        <div className="col">
          {" "}
          <p>
            Showing {filteredByGenre.length} {movieLabel} in the database.
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
              {filteredByGenre.map((movie, index) => (
                <Movie
                  key={movie._id}
                  movie={movie}
                  pageNum={this.state.pageNum}
                  index={index}
                  onDelete={this.handleDelete}
                  onLike={this.handleLike}
                />
              ))}
            </tbody>
          </table>
          <Paginator
            movieCount={filteredByGenre.length}
            pageSize={this.state.pageSize}
            onPageChange={this.handlePageChange}
            pageNum={this.state.pageNum}
          />
        </div>
      </div>
    );
  }
}

export default MovieList;
