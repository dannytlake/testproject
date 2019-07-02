import React, { Component } from "react";
import { Link } from "react-router-dom";
import auth from "../services/authService";
//import { getMovies } from "../services/fakeMovieService";
//import { getGenres } from "../services/fakeGenreService";
import { toast } from "react-toastify";
import * as GenreService from "../services/genreService";
import * as MovieService from "../services/movieService";

import Table from "./common/Table";
import Paginator from "./common/Paginator";
import ListGroup from "./common/ListGroup";
import Like from "./common/Like";
import Search from "./Search";
import "font-awesome/css/font-awesome.css";
import _ from "lodash";
import { paginate } from "../utils/paginate";

class MovieList extends Component {
  state = {
    movies: [],
    movieCount: 0,
    pageNum: 1,
    pageSize: 4,
    activeGenre: { _id: "all", name: "All Genres" },
    genres: [],
    sortColumn: "title",
    sortOrder: "asc",
    searchString: ""
  };
  //hh
  columns = [
    {
      path: "title",
      label: "Title",
      _id: "1",
      content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
    },
    { path: "genre.name", label: "Genre", _id: "2" },
    { path: "numberInStock", label: "Stock", _id: "3" },
    { path: "dailyRentalRate", label: "Rate", _id: "4" },
    {
      _id: "5",
      content: movie => (
        <Like liked={movie.liked} onClick={() => this.handleLike(movie)} />
      )
    } //like column
  ];

  deleteColumn = {
    _id: "6",
    content: movie => (
      <button
        className="btn btn-danger btn-sm m-2"
        onClick={() => this.handleDelete(movie)}
      >
        Delete
      </button>
    )
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) this.columns.push(this.deleteColumn);
  }

  async componentDidMount() {
    const { data: dataGenres } = await GenreService.getGenres();
    const { data: dataMovies } = await MovieService.getMovies();

    const genres = [{ _id: "all", name: "All Genres" }, ...dataGenres];
    const movies = [...dataMovies];

    // console.log(movies[0]);
    // delete movies[0]["_id"];
    // console.log(movies[0]);

    console.log(genres);
    //NewGenreService.getGenres();

    this.setState({
      movies: movies,
      movieCount: movies.length,
      genres: genres
    });
  }

  handleDelete = async movie => {
    const originalMovies = this.state.movies;

    var newMovies = originalMovies.filter(m => m._id !== movie._id);
    this.setState({ movies: newMovies, movieCount: this.state.movieCount - 1 });
    try {
      await MovieService.deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("This movie has already been deleted");
      }
      this.setState({ movies: originalMovies });
    }
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
    this.setState({ pageNum: 1, activeGenre: genre, searchString: "" });
  };

  handleSort = (sortColumn, sortOrder) => {
    this.setState({ sortColumn, sortOrder });
  };

  handleSearch = searchString => {
    this.setState({ searchString });

    if (searchString === "") {
      this.setState({
        activeGenre: { _id: "all", name: "All Genres" },
        pageNum: 1
      });
    } else {
      this.setState({ activeGenre: {} });
    }
  };

  getPaginatedData = () => {
    const {
      activeGenre,
      movies,
      pageNum,
      pageSize,
      sortColumn,
      sortOrder,
      searchString
    } = this.state;

    let filtered = movies;

    if (searchString) {
      filtered = movies.filter(m =>
        m.title.toLowerCase().startsWith(searchString.toLowerCase())
      );
    } else if (activeGenre && activeGenre._id !== "all") {
      filtered = movies.filter(g => g.genre._id === activeGenre._id);
    }

    const sortedmovies = _.orderBy(filtered, [sortColumn], [sortOrder]);
    const paginatedMovies = paginate(sortedmovies, pageNum, pageSize);

    return { totalCount: filtered.length, movies: paginatedMovies };
  };

  render() {
    const {
      movieCount,
      activeGenre,
      genres,
      pageNum,
      pageSize,
      sortColumn,
      sortOrder
    } = this.state;

    const { user } = this.props;

    //if (movieCount === 0) return "There are no movies";

    const { totalCount, movies } = this.getPaginatedData();

    return (
      <main role="main" className="flex-shrink-0">
        <div className="row">
          <div className="col-2">
            <ListGroup
              onItemSelect={this.handleGenreSelect}
              activeItem={activeGenre}
              items={genres}
            />
          </div>
          <div className="col">
            {user && (
              <Link
                className="btn btn-primary"
                to="/movies/new"
                style={{ marginBottom: 20 }}
              >
                New Movie
              </Link>
            )}
            <p>Showing {totalCount} movies in the database.</p>
            <Search
              onChange={this.handleSearch}
              searchString={this.state.searchString}
            />

            <Table
              data={movies}
              columns={this.columns}
              sortColumn={sortColumn}
              sortOrder={sortOrder}
              onSort={this.handleSort}
              onDelete={this.handleDelete}
              onLike={this.handleLike}
            />
            <Paginator
              itemCount={totalCount}
              pageSize={pageSize}
              onPageChange={this.handlePageChange}
              pageNum={pageNum}
            />
          </div>
        </div>
      </main>
    );
  }
}

export default MovieList;
