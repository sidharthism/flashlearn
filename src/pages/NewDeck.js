import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Container, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Heading } from "../components";
import Theme from "../theme";

import { db } from "../firebase";
import { useAuth } from "../firebase/auth";

const useStyles = makeStyles((theme) => ({
  content: {
    padding: "16px",
    marginTop: "176px",
    maxWidth: "576px",
  },
  input: {
    border: 0,
    width: "100%",
    outline: 0,
    marginTop: "8px",
    marginBottom: "16px",
    background: "transparent",
    borderBottom: "0.2px solid gray",
  },
  addButton: {
    width: "100%",
    backgroundImage: Theme.colors.gradientInclined,
    // marginTop: "16px",
    color: Theme.colors.white,
  },
}));

export default function NewDeck() {
  const styles = useStyles();
  const [name, setName] = useState("");
  const {
    user: { uid },
  } = useAuth();
  const history = useHistory();

  function createNewDeck(name, uid) {
    if (name === "") {
      console.log("Name should not be empty!");
      return;
    }
    const deck = {
      name: name,
      isScheduled: false,
      numberOfCards: 0,
      percentCompleted: 0,
      revisedTimes: 0,
      userId: uid,
    };
    const cardDecksRef = db.collection("card_decks");
    cardDecksRef
      .add(deck)
      .then((docRef) => {
        console.log("New deck created!", docRef.id);
        history.push(`/my/card-decks/deck/${docRef.id}`);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  return (
    <Container className={styles.content}>
      <Heading.Medium text="Create new deck" />
      <input
        className={styles.input}
        type="text"
        value={name}
        placeholder="Enter deck title"
        onChange={(e) => setName(e.target.value)}
      />
      <Button
        className={styles.addButton}
        variant="contained"
        onClick={() => createNewDeck(name, uid)}
      >
        {"Create"}
      </Button>
    </Container>
  );
}
