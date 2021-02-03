import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Theme from "../theme";

const useStyles = makeStyles((theme) => ({
  headingLarge: {
    color: Theme.colors.grey,
    fontSize: Theme.fonts.variants.heading.large,
    fontFamily: Theme.fonts.face.regular,
    textAlign: "left",
  },
  headingMedium: {
    color: Theme.colors.grey,
    fontSize: Theme.fonts.variants.heading.medium,
    fontFamily: Theme.fonts.face.regular,
    textAlign: "left",
  },
  headingSmall: {
    color: Theme.colors.grey,
    fontSize: Theme.fonts.variants.heading.small,
    fontFamily: Theme.fonts.face.regular,
    textAlign: "left",
  },
}));

function HeadingLarge({ text }) {
  const styles = useStyles();
  return <Typography className={styles.headingLarge}>{text}</Typography>;
}

function HeadingMedium({ text }) {
  const styles = useStyles();
  return <Typography className={styles.headingMedium}>{text}</Typography>;
}

function HeadingSmall({ text }) {
  const styles = useStyles();
  return <Typography className={styles.headingSmall}>{text}</Typography>;
}

const Heading = {
  Large: HeadingLarge,
  Medium: HeadingMedium,
  small: HeadingSmall,
};

export default Heading;
