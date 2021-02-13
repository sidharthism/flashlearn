import React from "react";
import { Route, Redirect } from "react-router-dom";

import { NavBar } from "./components";
import {
  Home,
  NewNote,
  EditNote,
  Notes,
  Deck,
  NewDeck,
  Review,
  NewFlash,
  Profile,
  Settings,
} from "./pages";

import { useAuth } from "./firebase/auth";

function AppTabs() {
  const { loggedIn } = useAuth();

  if (!loggedIn) return <Redirect to="/login" />;

  return (
    <>
      <NavBar />
      <Route exact path="/my/card-decks">
        <Home />
      </Route>
      <Route exact path="/my/card-decks/new">
        <NewDeck />
      </Route>
      <Route path="/my/card-decks/deck/:id">
        <Deck />
      </Route>
      <Route path="/my/card-decks/:id/newflash">
        <NewFlash />
      </Route>
      <Route path="/my/card-decks/review/:id">
        <Review />
      </Route>
      <Route exact path="/my/transcript-notes">
        <Notes />
      </Route>
      <Route exact path="/my/transcript-notes/new">
        <NewNote />
      </Route>
      <Route path="/my/transcript-notes/edit/:transcript">
        <EditNote />
      </Route>
      <Route exact path="/my/settings">
        <Settings />
      </Route>
      <Route exact path="/my/profile">
        <Profile />
      </Route>
      <Redirect exact path="/my" to="/my/card-decks" />
      <Redirect
        exact
        path="/my/transcript-notes/edit"
        to="/my/transcript-notes/edit/new-note"
      />
    </>
  );
}

export default AppTabs;
