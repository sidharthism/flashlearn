import React, { useState, useEffect } from "react";
import { Button, Container, Fab, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Add as AddIcon, PlayArrow as ReviewIcon } from "@material-ui/icons";
import {Link} from 'react-router-dom'

import { getColorFromPercent } from "../lib";
import { Heading, FlashCard } from "../components";
import Theme from "../theme";

// SAMPLE DATA
import { FlashCards, SampleDeck } from "../data";

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
    position: "relative",
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
  revised: {
    fontSize: Theme.fonts.variants.text.medium,
    fontWeight: "500",
    width: "100%",
    textAlign: "left",
    marginTop: "16px",
  },
  percentCompleted: {
    height: "50px",
    width: "50px",
    borderRadius: "25px",
    position: "absolute",
    top: "0px",
    right: "8px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  review: {
    width: "100%",
    padding: "16px 0 0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  reviewButton: {
    backgroundImage: Theme.colors.gradientInclined,
    color: Theme.colors.white,
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
          <h3 className={styles.revised}>{"Not yet revised."}</h3>
          <div
            className={styles.percentCompleted}
            style={{
              border: `2.8px solid ${getColorFromPercent(
                SampleDeck.percentCompleted
              )}`,
            }}
          >
            <h4>{SampleDeck.percentCompleted + "%"}</h4>
          </div>
          <div className={styles.review}>
            <Fab size="small" className={styles.reviewButton}>
              <ReviewIcon />
            </Fab>
          </div>
        </Container>
        <Heading.Medium text="Flash Cards" />
        <Container className={styles.flashCardsContainer}>
          {flashCards.map((item) => {
            return <FlashCard {...item} />;
          })}
        </Container>
        <Link to="/my/card-decks/newdeck">
        <Fab size="large" className={styles.fab}>
          <AddIcon />
        </Fab>
        </Link>
      </Container>
    </>
  );
}
