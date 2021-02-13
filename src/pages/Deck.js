import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Container, Fab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Add as AddIcon, PlayArrow as ReviewIcon } from "@material-ui/icons";

import { getColorFromPercent } from "../lib";
import { Heading, FlashCard, Spinner } from "../components";
import Theme from "../theme";

import { db } from "../firebase";

// SAMPLE DATA
// import { FlashCards, SampleDeck } from "../data";

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
  const history = useHistory();
  const { id } = useParams();
  const [flashCards, setFlashCards] = useState([]);
  const [deck, setDeck] = useState(null);
  const [loading, setLoading] = useState(true);

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
        setFlashCards(flcs);
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

  const styles = useStyles();

  if (loading) return <Spinner />;

  return (
    <>
      <Container className={styles.content}>
        <Heading.Medium text={deck ? deck.name : "-"} />
        <Container className={styles.deckDetails}>
          <h3 className={styles.numberOfCards}>
            {deck ? deck.numberOfCards + " Cards" : "0 Cards"}
          </h3>
          <h3 className={styles.revised}>
            {deck
              ? "Revised " + deck.revisedTimes + " times"
              : "Revised 0 times"}
          </h3>
          <div
            className={styles.percentCompleted}
            style={{
              border: `2.8px solid ${getColorFromPercent(
                deck ? deck.percentCompleted : 0
              )}`,
            }}
          >
            <h4>{deck ? deck.percentCompleted + "%" : "0 %"}</h4>
          </div>
          <div className={styles.review}>
            <Fab
              size="small"
              className={styles.reviewButton}
              onClick={() => {
                history.push(`/my/card-decks/review/${id}`);
              }}
            >
              <ReviewIcon />
            </Fab>
          </div>
        </Container>
        <Heading.Medium text="Flash Cards" />
        <Container className={styles.flashCardsContainer}>
          {flashCards.map((item) => {
            return <FlashCard key={item.id} {...item.data} />;
          })}
          {flashCards.length === 0 && (
            <div className={styles.empty}>
              <span>{"To create a new flash card, click +"}</span>
            </div>
          )}
        </Container>

        <Fab
          size="large"
          className={styles.fab}
          onClick={() => {
            history.push(`/my/card-decks/${id}/newflash`);
          }}
        >
          <AddIcon />
        </Fab>
      </Container>
    </>
  );
}
