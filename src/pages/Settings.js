import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Container } from "@material-ui/core";

// import Theme from "../theme";

import { auth } from "../firebase";

const useStyles = makeStyles((theme) => ({
  content: {
    padding: "16px",
    marginTop: "52px",
  },
}));

function Settings() {
  const styles = useStyles();
  return (
    <Container className={styles.content}>
      <Button onClick={() => auth.signOut()}>{"Log Out"}</Button>
    </Container>
  );
}

export default Settings;
