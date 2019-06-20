import React, { Component } from "react";
import PropTypes from "prop-types";

class Paginator extends Component {
  state = {};

  render() {
    const pageArray = [];

    let numPages = Math.ceil(this.props.itemCount / this.props.pageSize);

    if (numPages <= 1) return null;
    let i = 1;
    while (i < numPages + 1) {
      pageArray.push(i);
      i++;
    }

    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a
              className="page-link"
              style={{ cursor: "pointer" }}
              onClick={() => this.props.onPageChange(this.props.pageNum - 1)}
              href="# "
            >
              Previous
            </a>
          </li>
          {pageArray.map(page => (
            <li
              key={page}
              className={
                this.props.pageNum === page ? "page-item active" : "page-item"
              }
            >
              <a
                className="page-link"
                onClick={() => this.props.onPageChange(page)}
                style={{ cursor: "pointer" }}
                href="# "
              >
                {page}
              </a>
            </li>
          ))}
          <li className="page-item">
            <a
              className="page-link"
              style={{ cursor: "pointer" }}
              onClick={() => this.props.onPageChange(this.props.pageNum + 1)}
              href="# "
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

Paginator.propTypes = {
  itemCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  pageNum: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Paginator;
