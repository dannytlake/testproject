import React from "react";
import Joi from "joi-browser";
import Form from "./common/Form";
import * as GenreService from "../services/genreService";
import * as MovieService from "../services/movieService";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    genres: [],
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    title: Joi.string()
      .required()
      .label("Title"),
    numberInStock: Joi.number()
      .integer()
      .required()
      .min(0)
      .max(100)
      .label("Number in stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Daily rental rate")
  };

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovies();
  }

  async populateGenres() {
    const { data: dataGenres } = await GenreService.getGenres();
    const genres = [...dataGenres];
    this.setState({ genres });
  }

  async populateMovies() {
    try {
      const movieID = this.props.match.params.id;
      if (movieID === "new") return;

      const { data: movie } = await MovieService.getSingleMovie(movieID);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        return this.props.history.replace("/not-found");
    }
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  }

  doSubmit = async () => {
    await MovieService.saveMovie(this.state.data);
    this.props.history.push("/movies");
  };

  render() {
    const { match } = this.props;

    return (
      <div>
        <h1>MovieForm {match.params.id}</h1>

        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in stock")}
          {this.renderInput("dailyRentalRate", "Daily rental rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

/*
  <button
            className="btn btn-primary"
            onClick={() => history.push("/movies")}
          >
            Save
          </button>
*/

export default MovieForm;
