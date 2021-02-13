import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Fab, List } from "@material-ui/core";
import MicIcon from "@material-ui/icons/Mic";

import { NoteItem, Spinner } from "../components";
import Theme from "../theme";

import { useAuth } from "../firebase/auth";
import { db } from "../firebase";

const useStyles = makeStyles((theme) => ({
  topicList: {
    width: "100%",
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

export default function Notes() {
  const styles = useStyles();
  const {
    user: { uid },
  } = useAuth();
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);

  function loadNotes(userId) {
    const notesRef = db.collection("fl_users").doc(userId).collection("notes");
    // notesRef.get()
    notesRef
      .orderBy("dateTime", "desc")
      .get()
      .then(({ docs }) => {
        setNotes(
          docs.map((doc) => {
            return { id: doc.id, data: doc.data() };
          })
        );
        setLoading(false);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }

  useEffect(() => {
    loadNotes(uid);
  }, [uid]);

  if (loading) return <Spinner />;

  return (
    <>
      <Container style={{ padding: "52px 16px 16px 16px" }}>
        <List className={styles.topicList}>
          {notes !== undefined &&
            notes.length > 0 &&
            notes.map((note) => {
              return <NoteItem key={note.id} {...note.data} />;
            })}
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
