import React from "react";
import "./App.css";
import MovieList from "./components/MovieList";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStroopwafel } from "@fortawesome/free-solid-svg-icons";

library.add(faStroopwafel);

function App() {
  return (
    <main className="container">
      <MovieList />
      Favorite Food: <FontAwesomeIcon icon="stroopwafel" />
    </main>
  );
}

export default App;
