import React, { useState, useEffect } from "react";
import { Button, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AccessTimeIcon from "@material-ui/icons/AccessTime";

import Theme from "../theme";
import "./CardDeck.css";

const useStyles = makeStyles((theme) => ({
  // CARD DECKS
  //   cardDecks: {
  //     padding: "4px 8px",
  //     display: "flex",
  //     justifyContent: "space-between",
  //     flexWrap: "wrap",
  //   },
  // CARD DECK
  deckTitle: {
    marginLeft: "16px",
    textAlign: "left",
    fontFamily: Theme.fonts.face.regular,
    marginTop: "12%",
    fontWeight: "600",
    color: "#000000 !important",
    position: "absolute",
  },
  deckNoOfCards: {
    marginLeft: "16px",
    marginTop: "48px",
    textAlign: "left",
    color: Theme.colors.greyMedium,
    fontSize: Theme.fonts.variants.text.small,
    position: "absolute",
  },
  deckAccessTimeIcon: {
    position: "absolute",
    left: "16px",
    bottom: "16px",
    color: Theme.colors.greyMedium,
  },
  deckRevisedTimes: {
    position: "absolute",
    right: "16px",
    bottom: "16px",
    textAlign: "right",
    verticalAlign: "middle",
    color: Theme.colors.greyMedium,
    fontSize: Theme.fonts.variants.text.small,
  },
  "@keyframes wave": {
    "0%": {
      transform: "translate(-40px, -6px)",
    },
    "25%": {
      transform: "translate(0px, 0px)",
    },
    "50%": {
      transform: "translate(40px, 6px)",
    },
    "75%": {
      transform: "translate(0px, 0px)",
    },
    "100%": {
      transform: "translate(-40px, -6px)",
    },
  },
  deckWaveContainer: {
    position: "relative",
    height: "150px",
    // backgroundColor: "#0099ff30",
    backgroundColor: "#ffffff00 !important",
    width: "144px",
    overflow: "hidden",
    borderRadius: "20px !important",
    marginTop: "19px",
    "& .wave-surface": {
      width: "250px",
      position: "relative",
      left: "-50px",
      bottom: "-16px",
      animation: `$wave 15s infinite cubic-bezier(0.36, 0.45, 0.63, 0.53)`,
    },
    "& .wave-box": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      position: "absolute",
      bottom: "0px",
      width: "100%",
      zIndex: "-1",
    },
  },
  //WAVE HEIGHT
  waveHeight: {
    width: "100%",
    position: "relative",
    // backgroundColor: "#0099ff",
    bottom: "0px",
    // height: "0px",
  },
  deckButton: {
    width: "100% !important",
    height: "100% !important",
    margin: "0 !important",
    padding: "0 !important",
    borderRadius: "20px !important",
    backgroundColor: "#ffffff00 !important",
  },
}));

function getPixelsFromPercent(percent, surfaceHeight) {
  let height = Math.ceil((percent / 100) * 150);
  let rh =
    height > surfaceHeight
      ? percent === 100
        ? height
        : height - surfaceHeight
      : 0;
  return rh;
}

function getColorFromPercent(percent) {
  if (Number(percent) < 20) return Theme.colors.red;
  else if (Number(percent) >= 20 && Number(percent) < 40)
    return Theme.colors.lightRed;
  else if (Number(percent) >= 40 && Number(percent) < 60)
    return Theme.colors.yellow;
  else if (Number(percent) >= 60 && Number(percent) <= 80)
    return Theme.colors.lightGreen;
  else return Theme.colors.green;
}

export default function CardDeck({
  name,
  numberOfCards,
  isScheduled,
  revisedTimes,
  percentCompleted,
}) {
  const styles = useStyles();
  const [title, setTitle] = useState("Deck Title");
  const [noOfCards, setNoOfCards] = useState("0 Cards");
  const [revTimes, setRevTimes] = useState(0);
  const [h, setH] = useState(0);
  const [waveColor, setWaveColor] = useState("#ffffff");
  const [scheduled, setScheduled] = useState(false);
  useEffect(() => {
    setWaveColor(
      percentCompleted ? getColorFromPercent(percentCompleted) : "#ffffff00"
    );
    setH(percentCompleted ? getPixelsFromPercent(percentCompleted, 16) : 0);
  });
  useEffect(() => {
    setScheduled(isScheduled);
  });
  useEffect(() => {
    setTitle(name ? name : "Deck Title");
  });
  useEffect(() => {
    setNoOfCards(numberOfCards ? numberOfCards + " Cards" : "0 Cards");
  });
  useEffect(() => {
    setRevTimes(revisedTimes ? revisedTimes : "0");
  });
  return (
    <Paper className={styles.deckWaveContainer} elevation={2}>
      <h3 className={styles.deckTitle}>{title}</h3>
      <p className={styles.deckNoOfCards}>{noOfCards}</p>
      <div className="wave-box">
        <svg
          className="wave-surface"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            // fill="#0099ff"
            fill={waveColor}
            fill-opacity="1"
            d="M0,224L48,202.7C96,181,192,139,288,138.7C384,139,480,181,576,192C672,203,768,181,864,149.3C960,117,1056,75,1152,85.3C1248,96,1344,160,1392,192L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
        <div
          className={styles.waveHeight}
          style={{
            height: `${h}px`,
            backgroundColor: `${waveColor}`,
          }}
        ></div>
        {scheduled && <AccessTimeIcon className={styles.deckAccessTimeIcon} />}
        <p className={styles.deckRevisedTimes}>{revTimes}</p>
      </div>
      <Button className={styles.deckButton} />
    </Paper>
  );
}
