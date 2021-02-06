import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { Home, Login, Signup, NewNote,Deck } from "./pages";
import { NavBar, TopicList } from "./components";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/my/card-decks">
            <NavBar />
            <Home />
          </Route>
          <Route path="/my/card-decks/deck/:id">
            <NavBar />
            <Deck />
          </Route>
          <Route exact path="/my/transcript-notes">
            <NavBar />
            <TopicList />
          </Route>
          <Route exact path="/my/transcript-notes/new">
            <NavBar />
            <NewNote />
          </Route>
          <Redirect exact path="/" to="/my/card-decks" />

        </Switch>
      </Router>
    </div>
  );
}

export default App;
