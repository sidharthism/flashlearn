import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Menu as MenuIcon, MenuBook as BookIcon } from "@material-ui/icons";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";

const useStyles = makeStyles((theme) => ({
  navBar: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    // boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  },
  drawerContent: {
    width: 250,
    backgroundColor: "#ffffff",
    // backdropFilter: "blur(4px)",
  },
  title: {
    height: "100%",
    width: "100%",
    margin: "0px 16px",
    color: "#ffffff00",
    background:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    WebkitBackgroundClip: "text",
    MozBackgroundClip: "text",
    OBaseBackgroundClip: "text",
  },
  toolbar: { ...theme.mixins.toolbar, display: "flex", alignItems: "center" },
}));

export default function NavBar() {
  const history = useHistory();
  const [isOpen, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const styles = useStyles();

  const handleListItemClick = (event, index, path) => {
    history.push(path);
    setSelectedIndex(index);
    setOpen(false);
  };

  return (
    <>
      <AppBar className={styles.navBar} position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={styles.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">{"Flash Learn"}</Typography>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={isOpen} onClose={() => setOpen(false)}>
        <div className={styles.drawerContent}>
          <div className={styles.toolbar}>
            <Typography variant="h6" className={styles.title}>
              {"Flash Learn"}
            </Typography>
          </div>
          <Divider />
          <List component="nav" aria-label="main menu">
            <ListItem
              button
              selected={selectedIndex === 1}
              onClick={(event) => handleListItemClick(event, 1, "/my/topics")}
            >
              <ListItemIcon>
                <BookIcon />
              </ListItemIcon>
              <ListItemText primary="My Topics" />
            </ListItem>
          </List>
          <Divider />
          <List component="nav" aria-label="secondary mailbox folder">
            <ListItem
              button
              selected={selectedIndex === 2}
              onClick={(event) => handleListItemClick(event, 2)}
            >
              <ListItemText primary="Trash" />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </>
  );
}
