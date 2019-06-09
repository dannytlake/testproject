import React from "react";
import "./App.css";
import Vidly from "./components/Vidly";
import Customers from "./components/Customers";
import Rentals from "./components/Rentals";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStroopwafel } from "@fortawesome/free-solid-svg-icons";

import { Route, Switch, Redirect } from "react-router-dom";
import NotFound from "./components/common/NotFound";
import NavBar from "./components/NavBar";

library.add(faStroopwafel);

function App() {
  return (
    <main className="container">
      <div className="d-flex flex-column h-100">
        <NavBar />
        <p />
        <p />
        <p />
        <div className="content">
          <Switch>
            <Route path="/movies" component={Vidly} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />

            <Route path="/not-found" component={NotFound} />

            <Redirect from="/" to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </div>
        Favorite Food: <FontAwesomeIcon icon="stroopwafel" />
      </div>
    </main>
  );
}

export default App;
