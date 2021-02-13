import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {
  ChevronRight as ArrowIcon,
  //   MenuBook as BookIcon,
  FiberSmartRecord as RecordIcon,
} from "@material-ui/icons";
import { ListItemAvatar, Avatar, Divider } from "@material-ui/core";

// import Theme from "../theme";

const useStyles = makeStyles((theme) => ({
  topicItem: {
    padding: "8px 16px",
  },
  bookContainer: {
    background:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  },
  arrowIcon: {
    color: "#0000008a",
  },
}));

export default function NoteItem({ title, dateTime }) {
  const styles = useStyles();
  const history = useHistory();

  const handleClick = () => {
    // history.push("/my/flashcards");
  };

  return (
    <>
      <ListItem button className={styles.topicItem} onClick={handleClick}>
        <ListItemAvatar>
          <Avatar className={styles.bookContainer}>
            <RecordIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={title}
          secondary={new Date(dateTime).toDateString()}
        />
        <ArrowIcon className={styles.arrowIcon} />
      </ListItem>
      <Divider />
    </>
  );
}
