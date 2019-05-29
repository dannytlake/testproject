import React, { Component } from "react";
import Movie from "./Movie";
import TableHeader from "./TableHeader";

class MovieTable extends Component {
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {}, //like column
    {} //delete column
  ];
  raiseSort = newSortColumn => {
    const { sortColumn, sortOrder } = this.props;

    let newSort;

    if (sortColumn === newSortColumn && sortOrder === "asc") {
      newSort = "desc";
    } else {
      newSort = "asc";
    }

    this.props.onSort(newSortColumn, newSort, onSort);
  };

  render() {
    const {
      filteredByGenre,
      pageNum,
      onDelete,
      onLike,
      sortColumn,
      sortOrder
    } = this.props;

    return (
      <table className="table">
        <TableHeader
          columns={this.columns}
          onSort={onSort}
          sortColumn={sortColumn}
          sortOrder={sortOrder}
        />
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
