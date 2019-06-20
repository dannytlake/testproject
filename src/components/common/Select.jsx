import React from "react";

const Select = ({ fieldname, label, value, onChange, options, error }) => {
  return (
    <div className="form-group">
      <label htmlFor={fieldname}>{label}</label>
      <select
        name={fieldname}
        id={fieldname}
        value={value}
        onChange={onChange}
        className="form-control"
      >
        <option value="" />
        {options.map(option => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
