import React, { Component } from "react";
import Select from "./Select";
import Input from "./Input";
import Joi from "joi-browser";

class Form extends Component {
  state = { data: {}, errors: {} };

  validate = () => {
    const options = { abortEarly: false };
    const result = Joi.validate(this.state.data, this.schema, options);

    if (!result.error) return null;

    const errors = {};
    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  validateProperty = input => {
    const obj = { [input.name]: input.value };
    const schema = { [input.name]: this.schema[input.name] };
    const result = Joi.validate(obj, schema);

    return result.error ? result.error.details[0].message : null;
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();

    this.setState({ errors: errors || {} });

    if (!errors) {
      this.doSubmit();
    }
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };

    const errorMessage = this.validateProperty(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  renderButton(label) {
    return (
      <button className="btn btn-primary" disabled={this.validate()}>
        {label}
      </button>
    );
  }

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        value={data[name]}
        name={name}
        onChange={this.handleChange}
        label={label}
        error={errors[name]}
      />
    );
  }

  renderSelect(fieldname, label, options) {
    const { data, errors } = this.state;
    return (
      <Select
        fieldname={fieldname}
        value={data[fieldname]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[fieldname]}
      />
    );
  }
}

export default Form;
