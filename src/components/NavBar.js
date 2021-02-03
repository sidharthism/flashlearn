import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { MenuBook as BookIcon } from "@material-ui/icons";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";

import MenIcon from "../assets/icons/menu.svg";

import Logo from "../assets/logo.png";

const useStyles = makeStyles((theme) => ({
  navBar: {
    backgroundColor: "#ffffff",
    boxShadow: "none",
  },
  drawer: {
    "& .MuiDrawer-paper": {
      borderBottomRightRadius: "16px",
      borderTopRightRadius: "16px",
    },
  },
  drawerContent: {
    width: 250,
    backgroundColor: "#ffffff",
  },
  navList: {
    paddingTop: "0px !important",
    paddingBottom: "16px !important",
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
  tabTitle: {
    color: "#ffffff00",
    background:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    WebkitBackgroundClip: "text",
    MozBackgroundClip: "text",
    OBaseBackgroundClip: "text",
  },
  logo: {
    position: "relative",
    bottom: "1px",
    left: "-6px",
  },
  logoNav: {
    position: "relative",
    left: "8.7px",
    bottom: "2px",
  },
}));

function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

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
      <HideOnScroll>
        <AppBar className={styles.navBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setOpen(true)}
            >
              <img src={MenIcon} alt="Menu" />
            </IconButton>
            <img className={styles.logo} src={Logo} alt="Logo" />
            <Typography className={styles.tabTitle} variant="h6">
              {"Flash Learn"}
            </Typography>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Drawer
        anchor="left"
        className={styles.drawer}
        open={isOpen}
        onClose={() => setOpen(false)}
      >
        <div className={styles.drawerContent}>
          <div className={styles.toolbar}>
            <img className={styles.logoNav} src={Logo} alt="Logo" />
            <Typography variant="h6" className={styles.title}>
              {"Flash Learn"}
            </Typography>
          </div>
          <Divider />
          <List
            className={styles.navList}
            component="nav"
            aria-label="main menu"
          >
            <ListItem
              button
              selected={selectedIndex === 1}
              onClick={(event) =>
                handleListItemClick(event, 1, "/my/card-decks")
              }
            >
              <ListItemIcon>
                <BookIcon />
              </ListItemIcon>
              <ListItemText primary="My Card Decks" />
            </ListItem>
            <ListItem
              button
              selected={selectedIndex === 2}
              onClick={(event) =>
                handleListItemClick(event, 2, "/my/transcript-notes")
              }
            >
              <ListItemIcon>
                <BookIcon />
              </ListItemIcon>
              <ListItemText primary="Transcript Notes" />
            </ListItem>
          </List>
          <Divider />
          <List component="nav" aria-label="secondary mailbox folder">
            <ListItem
              button
              selected={selectedIndex === 3}
              onClick={(event) => handleListItemClick(event, 3, "/my/settings")}
            >
              <ListItemText primary="Settings" />
            </ListItem>
            <ListItem
              button
              selected={selectedIndex === 4}
              onClick={(event) => handleListItemClick(event, 4, "/my/settings")}
            >
              <ListItemText primary="My Profile" />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </>
  );
}
