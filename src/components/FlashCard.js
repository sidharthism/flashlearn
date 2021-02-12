import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card as MaterialCard } from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import ReactCardFlip from "react-card-flip";

import { getColorFromTag } from "../lib";
import { CategoryItem } from "../components";
import Theme from "../theme";

const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: "276px",
    // backgroundColor: "#ffffffe2",
    // backdropFilter: "blur(4px)",
    backgroundColor: "#ffffff",
    width: "100%",
    maxWidth: "576px",
    margin: "0 auto 24px",
    minHeight: "150px",
    borderRadius: "20px",
  },
  cardText: {
    fontSize: Theme.fonts.variants.text.medium,
    textAlign: "left",
    fontWeight: "500",
    marginTop: "16px",
  },
  btnText: {
    color: Theme.colors.greyMedium,
  },
  cardCategories: {
    display: "flex",
    paddingTop: "16px",
    alignItems: "flex-end",
    height: "48px",
  },
  "@global": {
    ".react-card-flip": {
      width: "100%",
    },
  },
}));

function Card({ buttonText, content, handleFlip, tag, categories, onReview }) {
  const styles = useStyles();
  return (
    <MaterialCard
      className={styles.card}
      style={{ border: `1.6px solid ${getColorFromTag(tag)}` }}
    >
      <CardContent>
        <h3 className={styles.cardText}>{content}</h3>
        <div className={styles.cardCategories}>
          {categories !== undefined &&
            categories.length > 0 &&
            categories[0] !== "" &&
            categories.map((item, index) => {
              return <CategoryItem text={item} key={index} />;
            })}
        </div>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleFlip} disabled={onReview}>
          <span
            className={styles.btnText}
            style={{ textDecoration: onReview ? "line-through" : "none" }}
          >
            {buttonText}
          </span>
        </Button>
      </CardActions>
    </MaterialCard>
  );
}

export default function FlashCard({
  face,
  rear,
  tag,
  categories,
  onReview = false,
}) {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped((prevVal) => !prevVal);
  };

  return (
    <ReactCardFlip isFlipped={flipped} flipDirection="vertical">
      <Card
        buttonText="Show"
        content={face}
        handleFlip={handleFlip}
        tag={tag}
        categories={categories}
        onReview={onReview}
      />
      <Card
        buttonText="Hide"
        content={rear}
        handleFlip={handleFlip}
        tag={tag}
        onReview={onReview}
      />
    </ReactCardFlip>
  );
}
