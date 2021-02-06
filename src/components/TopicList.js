import React from "react";
import { useHistory, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {
  ChevronRight as ArrowIcon,
  MenuBook as BookIcon,
} from "@material-ui/icons";
import {
  ListItemAvatar,
  Avatar,
  Divider,
  Container,
  Fab,
} from "@material-ui/core";
import MicIcon from "@material-ui/icons/Mic";
import Theme from "../theme";

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
  fab: {
    position: "fixed",
    bottom: 16,
    right: 16,
    color: "#ffffff",
    backgroundImage: Theme.colors.gradientInclined,
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function TopicList() {
  const styles = useStyles();
  return (
    <>
      <Container style={{ padding: "52px 16px 16px 16px" }}>
        <List
          //   subheader={<div className={styles.listHeader}>{"My Topics"}</div>}
          className={styles.topicList}
        >
          <TopicItem />
          <TopicItem />
        </List>
      </Container>
      <Link to="/my/transcript-notes/new">
        <Fab size="medium" variant="extended" className={styles.fab}>
          <MicIcon className={styles.extendedIcon} />
          {"NEW"}
        </Fab>
      </Link>
    </>
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
