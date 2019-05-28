import React from "react";
import Movie from "./Movie";

const MovieTable = props => {
  const { filteredByGenre, pageNum, onDelete, onLike, onSort } = props;

  return (
    <table className="table">
      <thead>
        <tr>
          <th onClick={() => onSort("title")} scope="col">
            Title
          </th>
          <th onClick={() => onSort("genre.name")} scope="col">
            Genre
          </th>
          <th onClick={() => onSort("numberInStock")} scope="col">
            Stock
          </th>
          <th onClick={() => onSort("dailyRentalRate")} scope="col">
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
};

export default MovieTable;
