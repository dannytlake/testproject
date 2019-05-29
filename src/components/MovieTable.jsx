import React, { Component } from "react";
import Movie from "./Movie";

class MovieTable extends Component {
  raiseSort = newSortColumn => {
    let newSortOrder = "asc";

    if (
      this.props.sortColumn === newSortColumn &&
      this.props.sortOrder === "asc"
    ) {
      newSortOrder = "desc";
    }

    this.props.onSort(newSortColumn, newSortOrder);
  };

  render() {
    const { filteredByGenre, pageNum, onDelete, onLike } = this.props;

    return (
      <table className="table">
        <thead>
          <tr>
            <th onClick={() => this.raiseSort("title")} scope="col">
              Title
            </th>
            <th onClick={() => this.raiseSort("genre.name")} scope="col">
              Genre
            </th>
            <th onClick={() => this.raiseSort("numberInStock")} scope="col">
              Stock
            </th>
            <th onClick={() => this.raiseSort("dailyRentalRate")} scope="col">
              Rate
            </th>
            <th scope="col" />
            <th scope="col" />
          </tr>
        </thead>
        <tbody>
          {filteredByGenre.map((movie, index) => (
            <Movie
              key={movie._id}
              movie={movie}
              pageNum={pageNum}
              index={index}
              onDelete={onDelete}
              onLike={onLike}
            />
          ))}
        </tbody>
      </table>
    );
  }
}

export default MovieTable;
