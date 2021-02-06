import React, { useState, useEffect } from "react";
import { Button, Container, Fab, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";

import { CardDeck, CategoryItem, Heading, NavBar } from "../components";
import Theme from "../theme";

import { useHistory } from "react-router-dom";

// SAMPLE DATA
import { CategoriesList, DeckList } from "../data";

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
  // CARD DECKS
  cardDecks: {
    padding: "4px 8px",
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
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
}));

export default function Home() {
  const [cardDecks, setCardDecks] = useState([]);
  function loadCardDecks() {
    setCardDecks(DeckList);
  }
  useEffect(() => {
    loadCardDecks();
  }, []);

  const styles = useStyles();
  const history = useHistory();
  return (
    <>
      <Container className={styles.content}>
        <Heading.Medium text="Categories" />
        <Container className={styles.categoryList}>
          {CategoriesList.map((item) => {
            return <CategoryItem text={item} />;
          })}
        </Container>
        <Heading.Medium text="Card Decks" />
        <Container className={styles.cardDecks}>
          {cardDecks.map((item) => {
            return <CardDeck {...item} />;
          })}
          {cardDecks.length === 0 && (
            <div className={styles.empty}>
              {"To create a new deck, click +"}
            </div>
          )}
        </Container>
        <Fab size="medium" variant="extended" className={styles.fab}>
          <AddIcon className={styles.extendedIcon} />
          {"New"}
        </Fab>
      </Container>
    </>
  );
}
