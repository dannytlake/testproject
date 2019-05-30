import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";

import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import Paginator from "./Paginator";
import ListGroup from "./ListGroup";
import Like from "./Like";
import "font-awesome/css/font-awesome.css";
import _ from "lodash";

class MovieList extends Component {
  columns = [
    { path: "title", label: "Title", _id: "1" },
    { path: "genre.name", label: "Genre", _id: "2" },
    { path: "numberInStock", label: "Stock", _id: "3" },
    { path: "dailyRentalRate", label: "Rate", _id: "4" },
    {
      _id: "5",
      content: movie => <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
    }, //like column
    {
      _id: "6",
      content: movie => (
        <button className="btn btn-danger btn-sm m-2" onClick={() => this.props.onDelete(movie)}>
          Delete
        </button>
      )
    } //delete column
  ];

  state = {
    movies: [],
    movieCount: 0,
    pageNum: 1,
    pageSize: 4,
    activeGenre: { _id: "all", name: "All Genres" },
    genres: [],
    sortColumn: "title",
    sortOrder: "asc"
  };
  //
  componentDidMount() {
    const genres = [{ _id: "all", name: "All Genres" }, ...getGenres()];

    this.setState({
      movies: getMovies(),
      movieCount: getMovies().length,
      genres: genres
    });
  }

  handleDelete = movie => {
    var newMovies = [...this.state.movies].filter(m => m._id !== movie._id);
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
    this.setState({ pageNum: 1, activeGenre: genre });
  };

  handleSort = (sortColumn, sortOrder) => {
    this.setState({ sortColumn, sortOrder });
  };

  render() {
    const {
      movieCount,
      activeGenre,
      movies,
      genres,
      pageNum,
      pageSize,
      sortColumn,
      sortOrder
    } = this.state;

    if (movieCount === 0) return "There are no movies";

    let filteredByGenre =
      activeGenre && activeGenre._id !== "all"
        ? movies.filter(g => g.genre._id === activeGenre._id)
        : movies;

    const sortedmovies = _.orderBy(filteredByGenre, [sortColumn], [sortOrder]);

    const movieLabel = sortedmovies.length > 1 ? "movies" : "movie";

    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            onItemSelect={this.handleGenreSelect}
            activeItem={activeGenre}
            items={genres}
          />
        </div>
        <div className="col">
          <p>
            Showing {sortedmovies.length} {movieLabel} in the database.
          </p>
          <table className="table">
            <TableHeader
              columns={this.columns}
              onSort={this.handleSort}
              sortColumn={sortColumn}
              sortOrder={sortOrder}
            />
            <TableBody
              filteredByGenre={sortedmovies}
              pageNum={pageNum}
              onDelete={this.handleDelete}
              onLike={this.handleLike}
              columns={this.columns}
            />
          </table>
          <Paginator
            movieCount={sortedmovies.length}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            pageNum={pageNum}
          />
        </div>
      </div>
    );
  }
}

export default MovieList;
