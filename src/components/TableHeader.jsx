import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort = newSortColumn => {
    const { sortColumn, sortOrder } = this.props;

    let newSort;

    if (sortColumn === newSortColumn && sortOrder === "asc") {
      newSort = "desc";
    } else {
      newSort = "asc";
    }

    this.props.onSort(newSortColumn, newSort);
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map(column => (
            <th onClick={() => this.raiseSort(column.path)}>{column.label}</th>
          ))}
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
    );
  }
}

export default TableHeader;
