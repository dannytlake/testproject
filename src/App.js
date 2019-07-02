import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import auth from "./services/authService";

import ProtectedRoute from "./components/common/ProtectedRoute";
import NavBar from "./components/NavBar";
import Vidly from "./components/Vidly";
import MovieForm from "./components/MovieForm";
import Rentals from "./components/Rentals";
import Customers from "./components/Customers";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";
import NotFound from "./components/common/NotFound";

import { library } from "@fortawesome/fontawesome-svg-core";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStroopwafel } from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

library.add(faStroopwafel);

class App extends Component {
  state = {};

  componentDidMount() {
    try {
      const user = auth.getCurrentUser();
      this.setState({ user });
    } catch (error) {
      //ignore, anon user
    }
  }

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container">
          <div className="content">
            <Switch>
              <Route path="/login" component={LoginForm} />
              <Route path="/logout" component={Logout} />
              <Route path="/register" component={RegisterForm} />
              <ProtectedRoute path="/movies/:id" component={MovieForm} />

              <Route
                path="/movies"
                render={props => <Vidly {...props} user={user} />}
              />

              <Route path="/customers" component={Customers} />
              <Route path="/rentals" component={Rentals} />
              <Route path="/not-found" component={NotFound} />
              <Redirect exact from="/" to="/movies" />
              <Redirect to="/not-found" />
            </Switch>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
