import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Button, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Heading, FlashCard, Spinner } from "../components";
import Theme from "../theme";

import { FlashMap, getColorFromPercent } from "../lib";

import unknown from "../assets/icons/unknown.svg";
import known from "../assets/icons/known.svg";
import partial from "../assets/icons/partial.svg";
import pause from "../assets/icons/pause.svg";

// SAMPLE DATA
// import { FlashCards, SampleDeck } from "../data";

import { db } from "../firebase";

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
    position: "relative",
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
  // "@global": {
  //   img: {
  //     userSelect: "none !important",
  //   },
  // },
}));

export default function Review() {
  const { id } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState(null);
  const [flashCards, setFlashCards] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);
  const [ccId, setCcId] = useState("");
  const [percent, setPercent] = useState(0);
  const [count, setCount] = useState(0);
  // const [sum, setSum] = useState(0);
  const [loading, setLoading] = useState(true);
  const [cardUpdating, setCardUpdating] = useState(false);

  const styles = useStyles();

  function shuffleCardDecks(cardArray) {
    let shuffledDeck = FlashMap(cardArray);
    setFlashCards(shuffledDeck);
    setCurrentCard(shuffledDeck[0]);
    setCcId(shuffledDeck[0].id);
    // console.log(shuffledDeck[0]);
    // console.log(shuffledDeck);
    setPercent(((count + 1) / shuffledDeck.length) * 100);
  }

  function loadFlashCards(id) {
    const flcsRef = db
      .collection("card_decks")
      .doc(id)
      .collection("flash_cards");
    flcsRef
      .get()
      .then(({ docs }) => {
        let flcs = docs.map((flc) => ({ id: flc.id, data: flc.data() }));
        // console.log(flcs);
        // setFlashCards(flcs);
        shuffleCardDecks(flcs);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  function loadCardDeck(id) {
    const decksRef = db.collection("card_decks");
    decksRef
      .doc(id)
      .get()
      .then((doc) => {
        // console.log(doc.data());
        setDeck(doc.data());
        loadFlashCards(id);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  useEffect(() => {
    loadCardDeck(id);
  }, [id]);

  // UPDATE PERCENTAGE AND REVIEW

  function updatePercentageAndReview(deckId, percent) {
    const deckRef = db.collection("card_decks").doc(deckId);
    deckRef
      .get()
      .then((doc) => {
        let docData = doc.data();
        deckRef
          .update({
            percentCompleted: Number(percent),
            revisedTimes: Number(docData.revisedTimes) + 1,
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
  }

  function handleClick(tag) {
    // setSum((prev) => prev + Number(tag) + 1);
    setCardUpdating(true);
    const flcRef = db
      .collection("card_decks")
      .doc(id)
      .collection("flash_cards")
      .doc(ccId);
    flcRef
      .update({
        tag: Number(tag),
      })
      .then(() => {
        // UPDATE THE CURRENT CARD TAG
        setFlashCards((prev) =>
          prev.map((card) => {
            let newCard =
              card.id === ccId
                ? { id: card.id, data: { ...card.data, tag: Number(tag) } }
                : card;
            return newCard;
          })
        );
        // console.log(flashCards);
        let c = count;
        if (c === flashCards.length - 1) {
          // REVIEW COMPLETED, UPDATE PERCENTAGE
          let sum = 0;
          for (let i = 0; i < flashCards.length; i++) {
            sum += flashCards[i].data.tag + 1;
          }
          let percent = (sum / (2 * flashCards.length)) * 100;
          // console.log(percent);
          // Check whether updation is correct
          updatePercentageAndReview(id, percent);
          // setCount(0);
          // c = 0;
        } else {
          setCount((prev) => prev + 1);
          c = c + 1;
          setPercent(((c + 1) / flashCards.length) * 100);
          setCurrentCard(flashCards[c]);
          setCcId(flashCards[c].id);
          // console.log(ccId);
          setCardUpdating(false);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  if (loading) return <Spinner />;

  return (
    <>
      <Container className={styles.content}>
        <Heading.Medium text={deck ? deck.name : "-"} />
        <Container className={styles.deckDetails}>
          <h3 className={styles.numberOfCards}>
            {deck ? deck.numberOfCards + " Cards" : "0 Cards"}
          </h3>
          <h3 className={styles.revised}>{"Review in progress..."}</h3>
          <div className={styles.percentProgress}>
            <h4>{"?"}</h4>
          </div>
        </Container>
        <Container className={styles.flashCardsContainer}>
          {currentCard !== null && (
            <FlashCard {...currentCard.data} onReview={true} />
          )}
          {cardUpdating && <Spinner variant={1} />}
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
            onClick={() => handleClick(-1)}
            className={styles.reviewButton}
            style={{
              backgroundColor: Theme.colors.red,
            }}
          >
            <img className={styles.reviewBtnImg} src={unknown} alt="unknown" />
          </Button>
          <Button
            variant="contained"
            onClick={() => handleClick(1)}
            className={styles.reviewButton}
            style={{
              backgroundColor: Theme.colors.green,
            }}
          >
            <img className={styles.reviewBtnImg} src={known} alt="known" />
          </Button>
          <Button
            variant="contained"
            onClick={() => handleClick(0)}
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
