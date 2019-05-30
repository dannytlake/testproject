import React, { Component } from "react";
import Movie from "./Movie";

class TableBody extends Component {
  render() {
    const { filteredByGenre, pageNum, onDelete, onLike } = this.props;

    return (
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
    );
  }
}

export default TableBody;
