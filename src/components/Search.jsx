import React, { Component } from "react";

class Search extends Component {
  state = {};

  handleChange = event => {
    this.props.onChange(event.currentTarget.value);
  };

  render() {
    return (
      <div className="form-group">
        <input
          type="text"
          value={this.props.searchString}
          placeholder="Search..."
          onChange={this.handleChange}
          name="search"
          id="search"
          className="form-control my-3"
        />
      </div>
    );
  }
}

export default Search;
