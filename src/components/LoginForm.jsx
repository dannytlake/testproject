import React from "react";
import Joi from "joi-browser";
import Form from "./common/Form";
import * as authService from "../services/authService";

class LoginForm extends Form {
  state = {
    data: {
      userName: "",
      password: ""
    },
    errors: {}
  };

  schema = {
    userName: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = async () => {
    try {
      await authService.login(this.state.data);
      // this.props.history.push("/");
      window.location = "/"; //this triggers full refresh as opposed to using the history prop
    } catch (ex) {
      console.log(ex.response);
      console.log(ex.response.status);
      console.log(ex.response.data);

      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.userName = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("userName", "Username")}
          {this.renderInput("password", "Password", "password")}

          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
