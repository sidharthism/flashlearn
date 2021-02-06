import React from "react";
import { Route, Redirect } from "react-router-dom";

import { NavBar, TopicList } from "./components";
import { Home, NewNote, Deck, NewDeck, Review, NewFlash } from "./pages";

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
      <Route exact path="/my/card-decks/newdeck">
        <NewFlash />
      </Route>
      <Route path="/my/card-decks/review/:id">
        <Review />
      </Route>
      <Route exact path="/my/transcript-notes">
        <TopicList />
      </Route>
      <Route exact path="/my/transcript-notes/new">
        <NewNote />
      </Route>
      <Redirect exact path="/my" to="/my/card-decks" />
    </>
  );
}

export default AppTabs;
