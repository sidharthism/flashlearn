import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Container, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Heading } from "../components";
import Theme from "../theme";

import { db } from "../firebase";

const useStyles = makeStyles((theme) => ({
  content: {
    padding: "16px",
    marginTop: "128px",
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
  textField: {
    width: "100%",
    outline: 0,
    marginTop: "8px",
    marginBottom: "16px",
    background: "transparent",
    border: "0.2px solid gray",
    padding: "16px",
    borderRadius: "4px",
    fontSize: "15px",
  },
  addButton: {
    width: "100%",
    backgroundImage: Theme.colors.gradientInclined,
    // marginTop: "16px",
    color: Theme.colors.white,
  },
}));
export default function NewFlash() {
  const history = useHistory();
  const { id } = useParams();
  const [face, setFace] = useState("");
  const [rear, setRear] = useState("");
  const styles = useStyles();

  function createNewFlashCard(face, rear, deckId) {
    if (face === "" || rear === "") {
      console.log("Field should not be empty!");
      return;
    }

    const flashCard = {
      face: face,
      rear: rear,
      categories: [],
      tag: -1,
    };

    const deckRef = db.collection("card_decks").doc(deckId);

    const flashCardsRef = db
      .collection("card_decks")
      .doc(deckId)
      .collection("flash_cards");

    flashCardsRef
      .add(flashCard)
      .then((docRef) => {
        console.log("New flash card created!", docRef.id);
      })
      .then(() => {
        deckRef
          .get()
          .then((doc) => {
            let docData = doc.data();
            deckRef
              .update({
                numberOfCards: docData.numberOfCards + 1,
              })
              .then(() => {
                history.goBack();
              })
              .catch((err) => {
                console.log(err.message);
              });
          })
          .catch((err) => {
            console.log(err.message);
          });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  return (
    <Container className={styles.content}>
      <Heading.Medium text="Face" />
      <input
        className={styles.input}
        type="text"
        value={face}
        placeholder="Enter face content"
        onChange={(e) => setFace(e.target.value)}
      />
      <Heading.Medium text="Rear" />
      <textarea
        rows="3"
        className={styles.textField + " focusable"}
        type="text"
        value={rear}
        placeholder="Enter rear content"
        onChange={(e) => setRear(e.target.value)}
      />
      <Button
        className={styles.addButton}
        variant="contained"
        onClick={() => {
          createNewFlashCard(face, rear, id);
        }}
      >
        {"Create"}
      </Button>
    </Container>
  );
}
