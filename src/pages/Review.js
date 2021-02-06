import React, { useState, useEffect } from "react";
import { Button, Container, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";

import { Heading, FlashCard } from "../components";
import Theme from "../theme";

import { FlashMap, getColorFromPercent } from "../lib";

import unknown from "../assets/icons/unknown.svg";
import known from "../assets/icons/known.svg";
import partial from "../assets/icons/partial.svg";
import pause from "../assets/icons/pause.svg";

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
    padding: "4px 8px",
    marginTop: "8px",
    marginBottom: "12px",
    position: "relative",
  },
  // FLASH CARDS
  flashCardsContainer: {
    padding: "16px 8px 0px",
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
  percentProgress: {
    height: "50px",
    width: "50px",
    borderRadius: "25px",
    position: "absolute",
    top: "0px",
    right: "8px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: `2.8px solid ${Theme.colors.greyLight}`,
  },
  progressContainer: {
    width: "100%",
    padding: "0px 0px 16px",
  },
  progressBox: {
    borderRadius: "20px",
    border: `2px solid ${Theme.colors.greyLight}`,
    width: "100%",
    height: "10px",
  },
  progressWidth: {
    borderRadius: "20px",
    height: "6px",
    backgroundColor: Theme.colors.green,
  },
  metaInfo: {
    fontSize: Theme.fonts.variants.text.medium,
    marginBottom: "8px",
  },
  reviewButtonsContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: "16px 0px",
  },
  reviewButton: {
    padding: "4px",
    minWidth: "100px",
    // minHeight: "32px",
    borderRadius: "32px",
  },
  reviewBtnImg: {
    height: "32px",
  },
  reviewPause: {
    padding: "8px 16px 0px",
  },
  pauseButton: {
    boxshadow: "0px 0px 16px 0px rgba(46, 24, 24, 0.16) !important",
    borderRadius: "100%",
  },
}));

export default function Review() {
  const [flashCards, setFlashCards] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);
  const [percent, setPercent] = useState(0);
  const [count, setCount] = useState(0);

  function shuffleCardDecks() {
    let shuffledDeck = FlashMap(FlashCards);
    setFlashCards(shuffledDeck);
    setCurrentCard(shuffledDeck[0]);
    // console.log(shuffledDeck);
    setPercent(((count + 1) / shuffledDeck.length) * 100);
  }

  useEffect(() => {
    shuffleCardDecks();
  }, []);

  function handleClick() {
    let c = count;
    if (c === flashCards.length - 1) {
      setCount(0);
      c = 0;
    } else {
      setCount((prev) => prev + 1);
      c = c + 1;
    }
    setPercent(((c + 1) / flashCards.length) * 100);
    setCurrentCard(flashCards[c]);
  }

  const styles = useStyles();
  return (
    <>
      <Container className={styles.content}>
        <Heading.Medium text="Deck A" />
        <Container className={styles.deckDetails}>
          <h3 className={styles.numberOfCards}>{"3 Cards"}</h3>
          <h3 className={styles.revised}>{"Review in progress..."}</h3>
          <div className={styles.percentProgress}>
            <h4>{"?"}</h4>
          </div>
        </Container>
        <Container className={styles.flashCardsContainer}>
          {currentCard !== null && <FlashCard {...currentCard} />}
        </Container>
        <Container className={styles.progressContainer}>
          <div className={styles.metaInfo}>
            {count + 1 + " / " + flashCards.length}
          </div>
          <div className={styles.progressBox}>
            <div
              className={styles.progressWidth}
              style={{
                width: `${percent}%`,
                backgroundColor: getColorFromPercent(percent),
              }}
            />
          </div>
        </Container>
        <Container className={styles.reviewButtonsContainer}>
          <Button
            variant="contained"
            onClick={handleClick}
            className={styles.reviewButton}
            style={{
              backgroundColor: Theme.colors.red,
            }}
          >
            <img className={styles.reviewBtnImg} src={unknown} alt="unknown" />
          </Button>
          <Button
            variant="contained"
            onClick={handleClick}
            className={styles.reviewButton}
            style={{
              backgroundColor: Theme.colors.green,
            }}
          >
            <img className={styles.reviewBtnImg} src={known} alt="known" />
          </Button>
          <Button
            variant="contained"
            onClick={handleClick}
            className={styles.reviewButton}
            style={{
              backgroundColor: Theme.colors.yellow,
            }}
          >
            <img className={styles.reviewBtnImg} src={partial} alt="partial" />
          </Button>
        </Container>
        <Container className={styles.reviewPause}>
          <Button className={styles.pauseButton}>
            <img src={pause} alt="pause" />
          </Button>
        </Container>

        {/* <Fab size="large" className={styles.fab}>
          <AddIcon />
        </Fab> */}
      </Container>
    </>
  );
}
