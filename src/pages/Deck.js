import React, { useState, useEffect } from "react";
import { Button, Container, Fab, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";

import { Heading, FlashCard } from "../components";
import Theme from "../theme";

// SAMPLE DATA
import { FlashCards } from "../data";

const useStyles = makeStyles((theme) => ({
  content: {
    padding: "16px",
    marginTop: "52px",
  },
  fab: {
    position: "fixed",
    bottom: 16,
    right: 16,
    color: "#ffffff",
    backgroundImage: Theme.colors.gradientInclined,
  },
  // DECK DETAILS
  deckDetails: {
    padding: "4px 2px",
    marginTop: "8px",
    marginBottom: "12px",
  },
  // FLASH CARDS
  flashCardsContainer: {
    padding: "16px 8px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  // EMPTY LIST
  empty: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    color: Theme.colors.grey,
    paddingTop: "16px",
    fontSize: Theme.fonts.variants.text.medium,
  },
  numberOfCards: {
    fontSize: Theme.fonts.variants.text.medium,
    fontWeight: "500",
    width: "100%",
    textAlign: "left",
  },
  lastRevised: {
    fontSize: Theme.fonts.variants.text.medium,
    fontWeight: "500",
    width: "100%",
    textAlign: "left",
    marginTop: "16px",
  },
}));

export default function Deck() {
  const [flashCards, setFlashCards] = useState([]);
  function loadCardDecks() {
    setFlashCards(FlashCards);
  }
  useEffect(() => {
    loadCardDecks();
  }, []);

  const styles = useStyles();
  return (
    <>
      <Container className={styles.content}>
        <Heading.Medium text="Deck Title" />
        <Container className={styles.deckDetails}>
          <h3 className={styles.numberOfCards}>{"0 Cards"}</h3>
          <h3 className={styles.lastRevised}>{"Not yet revised."}</h3>
        </Container>
        <Heading.Medium text="Flash Cards" />
        <Container className={styles.flashCardsContainer}>
          {flashCards.map((item) => {
            return <FlashCard {...item} />;
          })}
        </Container>
        <Fab size="large" className={styles.fab}>
          <AddIcon />
        </Fab>
      </Container>
    </>
  );
}
