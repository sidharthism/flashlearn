import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card as MaterialCard } from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ReactCardFlip from "react-card-flip";

const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: 275,
    backgroundColor: "#ffffffe2",
    backdropFilter: "blur(4px)",
  },
  title: {
    fontSize: 14,
  },
}));

function Card({ buttonText, content, handleFlip }) {
  const classes = useStyles();

  return (
    <MaterialCard className={classes.card}>
      <CardContent>
        {/* <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Word of the Day
        </Typography> */}
        <Typography variant="h5" component="h2">
          {content}
        </Typography>
        {/* <Typography variant="body2" component="p">
         
        </Typography> */}
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleFlip}>
          {buttonText}
        </Button>
      </CardActions>
    </MaterialCard>
  );
}

export default function FlashCard() {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped((prevVal) => !prevVal);
  };

  const sampleData = {
    face: "Benevolent",
    rear: "Well meaning and kindly.",
  };

  return (
    <ReactCardFlip isFlipped={flipped} flipDirection="vertical">
      <Card
        buttonText="Show"
        content={sampleData.face}
        handleFlip={handleFlip}
      />
      <Card
        buttonText="Hide"
        content={sampleData.rear}
        handleFlip={handleFlip}
      />
    </ReactCardFlip>
  );
}
