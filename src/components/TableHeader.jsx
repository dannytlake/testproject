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
            <th key={column._id} onClick={() => this.raiseSort(column.path)}>
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
