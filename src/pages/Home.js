import React, { useState, useEffect } from "react";
import { Container, Fab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";

import { CardDeck, CategoryItem, Heading, Spinner } from "../components";
import Theme from "../theme";

import { useHistory } from "react-router-dom";

import { useAuth } from "../firebase/auth";
import { db } from "../firebase";

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
  const {
    user: { uid },
  } = useAuth();

  const styles = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  function loadCardDecks(uid) {
    // setCardDecks(DeckList);
    const decksRef = db.collection("card_decks");
    decksRef
      .where("userId", "==", uid)
      .get()
      .then(({ docs }) => {
        let decks = docs.map((deck) => ({ id: deck.id, data: deck.data() }));
        setCardDecks(decks);
        setLoading(false);
      });
  }

  useEffect(() => {
    loadCardDecks(uid);
  }, [uid]);

  if (loading) return <Spinner />;

  return (
    <>
      <Container className={styles.content}>
        <Heading.Medium text="Categories" />
        <Container className={styles.categoryList}>
          {CategoriesList.map((item, index) => {
            return <CategoryItem text={item} key={index} />;
          })}
        </Container>
        <Heading.Medium text="Card Decks" />
        <Container className={styles.cardDecks}>
          {cardDecks.map((item) => {
            return (
              <CardDeck
                key={item.id}
                {...item.data}
                onClick={() => history.push(`/my/card-decks/deck/${item.id}`)}
              />
            );
          })}
          {cardDecks.length === 0 && (
            <div className={styles.empty}>
              {"To create a new deck, click +"}
            </div>
          )}
        </Container>
        <Link to="/my/card-decks/new">
          <Fab size="medium" variant="extended" className={styles.fab}>
            <AddIcon className={styles.extendedIcon} />
            {"New"}
          </Fab>
        </Link>
      </Container>
    </>
  );
}
