import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { Login, Signup } from "./pages";

import AppTabs from "./AppTabs";
import "./App.css";

// App Authentication
import { AuthContext, useAuthInit } from "./firebase/auth";

function App() {
  // Authentication State
  const { loading, auth } = useAuthInit();

  if (loading) return <h1>{"Please wait..."}</h1>;

  return (
    <div className="App">
      <AuthContext.Provider value={auth}>
        <Router>
          <Switch>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route path="/my">
              <AppTabs />
            </Route>
            <Redirect exact path="/" to="/my/card-decks" />
          </Switch>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
