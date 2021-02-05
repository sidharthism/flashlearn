import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  categoryItem: {
    height: "24px",
    borderRadius: "12px",
    marginRight: "16px",
    minWidth: "100px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& span": {
      verticalAlign: "middle",
      textTransform: "initial",
    },
  },
}));

export default function CategoryItem({ text }) {
  const styles = useStyles();
  return (
    <Button className={styles.categoryItem} variant="outlined">
      <span>{text}</span>
    </Button>
  );
}
