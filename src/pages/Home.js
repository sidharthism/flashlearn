import React from "react";
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { Button, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Theme from "../theme";
import { FlashCard, Heading, NavBar, TopicList } from "../components";

import "../components/CardDeck.css";

// SAMPLE DATA
import { CategoriesList } from "../data";

const useStyles = makeStyles((theme) => ({
  content: {
    padding: "16px",
    marginTop: "52px",
  },
  container: {
    padding: "16px",
    maxWidth: 476,
  },
  fab: {
    position: "fixed",
    bottom: 16,
    right: 16,
    color: "#ffffff",
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  // LIST
  categoryList: {
    overflowX: "scroll",
    "&::-webkit-scrollbar": {
      display: "none",
      msOverflowStyle: "none",
      scrollbarWidth: "none",
    },
    padding: " 16px 2px",
    display: "flex",
    flexDirection: "row",
    marginTop: "8px",
    marginBottom: "12px",
  },
  categoryItem: {
    height: "24px",
    borderRadius: "12px",
    marginRight: "16px",
    minWidth: "100px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& span": {
      verticalAlign: "middle",
      textTransform: "initial",
    },
  },
  // CARD DECKS
  cardDecks: {
    padding: "4px 8px",
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  // CARD DECK
  deckTitle: {
    marginLeft: "16px",
    textAlign: "left",
    fontFamily: Theme.fonts.face.regular,
    marginTop: "12%",
    fontWeight: "600",
  },
  deckNoOfCards: {
    marginLeft: "16px",
    marginTop: "8px",
    textAlign: "left",
    color: Theme.colors.greyMedium,
    fontSize: Theme.fonts.variants.text.small,
  },
}));

function CategoryItem({ text }) {
  const styles = useStyles();
  return (
    <Button className={styles.categoryItem} variant="outlined">
      <span>{text}</span>
    </Button>
  );
}

function CardDeck() {
  const styles = useStyles();
  return (
    <Paper className="wave-container" elevation={2}>
      <h3 className={styles.deckTitle}>{"Deck A"}</h3>
      <p className={styles.deckNoOfCards}>{"7 Cards"}</p>
      <div className="wave-box">
        <svg
          className="wave-surface"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#0099ff"
            fill-opacity="1"
            d="M0,224L48,202.7C96,181,192,139,288,138.7C384,139,480,181,576,192C672,203,768,181,864,149.3C960,117,1056,75,1152,85.3C1248,96,1344,160,1392,192L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
        <div className="wave-height"></div>
      </div>
    </Paper>
  );
}

export default function Home() {
  const styles = useStyles();
  return (
    <>
      <NavBar />
      <Container className={styles.content}>
        <Heading.Medium text="Categories" />
        <Container className={styles.categoryList}>
          {CategoriesList.map((item) => {
            return <CategoryItem text={item} />;
          })}
        </Container>
        <Heading.Medium text="Card Decks" />
        <Container className={styles.cardDecks}>
          <CardDeck />
          <CardDeck />
          <CardDeck />
          <CardDeck />
          <CardDeck />
          <CardDeck />
          <CardDeck />
        </Container>
        <Fab size="medium" variant="extended" className={styles.fab}>
          <AddIcon className={styles.extendedIcon} />
          {"New"}
        </Fab>
      </Container>
      {/* <Container className={styles.container}></Container> */}
    </>
  );
}
