import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import spinner from "../assets/svg/spinner.svg";

const useStyles = makeStyles(() => ({
  "@keyframes spin": {
    from: {
      transform: "rotate(0deg)",
    },
    to: {
      transform: "rotate(360deg)",
    },
  },
  spinner: {
    animation: `$spin 1s linear infinite`,
  },
  spinnerContainer: {
    position: "absolute",
    // bottom: "0",
    // right: "0",
    zIndex: "1000",
    display: "flex",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
}));

export default function Spinner() {
  const styles = useStyles();
  return (
    <div className={styles.spinnerContainer}>
      <img src={spinner} className={styles.spinner} alt="Loading" />
    </div>
  );
}
