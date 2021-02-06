import React, { useState, useEffect } from "react";
import { Container, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Heading } from "../components";
import Theme from "../theme";

const useStyles = makeStyles((theme) => ({
  content: {
    padding: "16px",
    marginTop: "176px",
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
  addButton: {
    width: "100%",
    backgroundImage: Theme.colors.gradientInclined,
    // marginTop: "16px",
    color: Theme.colors.white,
  },
}));
export default function NewDeck() {
  const styles = useStyles();
  return (
    <Container className={styles.content}>
      <Heading.Medium text="Create new deck" />
      <input
        className={styles.input}
        type="text"
        placeholder="Enter deck title"
        //onChange={(e) => setEmail(e.target.value)}
      />
      <Button className={styles.addButton} variant="contained">
        {"Create"}
      </Button>
    </Container>
  );
}
