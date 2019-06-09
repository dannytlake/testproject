import React, { Component } from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

class Table extends Component {
  state = {};
  render() {
    const { data, columns, sortColumn, sortOrder, onSort } = this.props;
    return (
      <table className="table">
        <TableHeader
          columns={columns}
          onSort={onSort}
          sortColumn={sortColumn}
          sortOrder={sortOrder}
        />
        <TableBody data={data} columns={columns} />
      </table>
    );
  }
}

export default Table;
