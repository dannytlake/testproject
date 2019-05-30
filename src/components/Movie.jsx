import React, { Component } from "react";
import "font-awesome/css/font-awesome.css";

class Movie extends Component {
  //state = { movie: this.props.movie };

  render() {
    let minx = (this.props.pageNum - 1) * 4;
    let maxx = this.props.pageNum * 4;

    // console.log("range =" + minx + " to " + maxx);
    //if (parseInt(minx) <= parseInt(this.props.index) <= parseInt(maxx)) {
    if (minx <= this.props.index && this.props.index < maxx) {
      // console.log("this index of " + this.props.index + " fits in the page");
      return (
        <tr>
          <td>{this.props.movie.title}</td>
          <td>{this.props.movie.genre.name}</td>
          <td>{this.props.movie.numberInStock}</td>
          <td>{this.props.movie.dailyRentalRate}</td>
          <td>
            <Like
              liked={this.props.movie.liked}
              movie={this.props.movie}
              onClick={() => this.props.onLike(this.props.movie)}
            />
          </td>
          <td>
            <button
              className="btn btn-danger btn-sm m-2"
              onClick={() => this.props.onDelete(this.props.movie._id)}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    } else {
      return null;
    }
  }
}

export default Movie;
