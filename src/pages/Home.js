import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";

import { FlashCard, NavBar } from "../components";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "16px",
    maxWidth: 476,
  },
  fab: {
    position: "absolute",
    bottom: 16,
    right: 16,
    color: "#ffffff",
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function Home() {
  const styles = useStyles();
  return (
    <>
      <NavBar />
      <Container className={styles.container}>
        <FlashCard />
      </Container>
      <Fab size="medium" variant="extended" className={styles.fab}>
        <AddIcon className={styles.extendedIcon} />
        {"New"}
      </Fab>
    </>
  );
}
