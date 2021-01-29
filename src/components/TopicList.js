import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {
  ChevronRight as ArrowIcon,
  MenuBook as BookIcon,
} from "@material-ui/icons";
import { ListItemAvatar, Avatar, Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  topicList: {
    width: "100%",
  },
  //   listHeader: {
  //     color: "#0000008a",
  //   },
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

export default function TopicList() {
  const styles = useStyles();
  return (
    <List
      //   subheader={<div className={styles.listHeader}>{"My Topics"}</div>}
      className={styles.topicList}
    >
      <TopicItem />
      <TopicItem />
    </List>
  );
}

function TopicItem() {
  const styles = useStyles();
  const history = useHistory();
  const handleClick = (event) => {
    history.push("/my/flashcards");
  };
  return (
    <>
      <ListItem button className={styles.topicItem} onClick={handleClick}>
        <ListItemAvatar>
          <Avatar className={styles.bookContainer}>
            <BookIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Topic 1" secondary="27 Flash Cards" />
        <ArrowIcon className={styles.arrowIcon} />
      </ListItem>
      <Divider />
    </>
  );
}
