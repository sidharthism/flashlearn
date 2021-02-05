import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { Container } from "@material-ui/core";
import { Home,Login,Signup } from "./pages";
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
            <Home />
          </Route>
          <Route exact path="/my/transcript-notes">
            <Container style={{ padding: "52px 16px 16px 16px" }}>
              <TopicList />
            </Container>
          </Route>
          <Redirect exact path="/" to="/my/card-decks" />
         
        </Switch>
      </Router>
    </div>
  );
}

export default App;
