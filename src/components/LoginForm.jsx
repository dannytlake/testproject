import React from "react";
import Joi from "joi-browser";
import Form from "./common/Form";
import auth from "../services/authService";
import { Redirect } from "react-router-dom";

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
      await auth.login(this.state.data);
      // this.props.history.push("/");
      const { state } = this.props.location; //this is sent in from the ProtectedRoute, if the user treid to go somewhere and was redirected here

      window.location = state ? state.from.pathname : "/"; //using window.location triggers full site refresh
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
    if (auth.getCurrentUser()) return <Redirect to="/" />;
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
