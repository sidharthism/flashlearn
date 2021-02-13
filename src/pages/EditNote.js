import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Container, Fab, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";

import Theme from "../theme";

// import { Heading } from "../components";

import { useAuth } from "../firebase/auth";
import { db } from "../firebase";

const useStyles = makeStyles((theme) => ({
  content: {
    padding: "16px 0px",
  },
  main: {
    color: "#000",
    marginTop: "52px",
    padding: "16px",
    textAlign: "left",
  },
  noteTitle: {
    textAlign: "left !important",
    border: "none !important",
    outline: "none !important",
    padding: "8px 0px !important",
    fontFamily: "Montsterrat-Regular !important",
    fontSize: Theme.fonts.variants.heading.medium,
    width: "100% !important",
  },
  dateTime: {
    fontSize: Theme.fonts.variants.text.medium,
    fontWeight: "500",
    width: "100%",
    textAlign: "left",
    color: Theme.colors.grey,
  },
  paper: {
    height: "400px",
    padding: "16px",
    boxShadow: "0px 0px 16px 0px rgba(46, 24, 24, 0.16)",
    overflow: "auto",
  },
  note: {
    fontWeight: "500 !important",
    textAlign: "left",
    lineHeight: "1.5",
    wordSpacing: "2.8px",
    fontSize: Theme.fonts.variants.text.small,
    height: "99%",
    width: "100%",
    border: "none",
    userSelect: "text !important",
  },
  fab: {
    position: "fixed",
    bottom: 16,
    right: 16,
    color: "#ffffff",
    backgroundImage: Theme.colors.gradientInclined,
  },
}));

export default function EditNote() {
  const styles = useStyles();
  const {
    user: { uid },
  } = useAuth();
  const [noteContent, setNoteContent] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [date, setDate] = useState(new Date());
  const { transcript } = useParams();
  const history = useHistory();

  function saveNote() {
    const notesRef = db.collection("fl_users").doc(uid).collection("notes");
    let newNote = {
      title: noteTitle,
      dateTime: date.toISOString(),
      content: noteContent,
    };
    notesRef
      .add(newNote)
      .then((docRef) => {
        console.log("New note created", docRef.id);
        history.push("/my/transcript-notes");
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  useEffect(() => {
    if (transcript !== "new-note") setNoteContent(transcript);
  }, [transcript]);

  // console.log(transcript);

  return (
    <div className={styles.main}>
      {/* <Heading.Medium text="New Note" /> */}
      <input
        className={styles.noteTitle}
        type="text"
        placeholder="Enter note title"
        value={noteTitle}
        onChange={(e) => setNoteTitle(e.target.value)}
      />
      <h3 className={styles.dateTime}>{date.toDateString()}</h3>
      <Container className={styles.content}>
        <Paper className={styles.paper}>
          <textarea
            placeholder="Enter your notes here..."
            className={styles.note}
            value={noteContent}
            focused
            onChange={(e) => setNoteContent(e.target.value)}
          />
        </Paper>
        <Fab size="large" className={styles.fab} onClick={saveNote}>
          <SaveIcon />
        </Fab>
      </Container>
    </div>
  );
}
