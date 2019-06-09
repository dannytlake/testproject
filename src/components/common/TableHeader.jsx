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

  renderSortIcon = column => {
    //console.log("this.props.sortColumn.path = " + this.props.sortColumn);
    // console.log("column.path = " + column.path);

    if (column.path === this.props.sortColumn) {
      if (this.props.sortOrder === "asc")
        return <i className="fa fa-sort-asc" />;
      else return <i className="fa fa-sort-desc" />;
    }
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map(column => (
            <th
              className="clickable"
              key={column._id}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
