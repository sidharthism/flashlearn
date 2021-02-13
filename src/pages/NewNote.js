import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Container, Fab, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Theme from "../theme";
import MicIcon from "@material-ui/icons/Mic";
import DoneIcon from "@material-ui/icons/Done";
import PauseIcon from "@material-ui/icons/Pause";

import { Heading } from "../components";

const useStyles = makeStyles((theme) => ({
  content: {
    padding: "16px 0px",
  },
  fab1: {
    position: "fixed",
    bottom: 16,
    right: 160,
    color: "#ffffff",
    backgroundImage: Theme.colors.gradientInclined,
  },
  fab2: {
    position: "fixed",
    bottom: 16,
    right: 16,
    color: "#ffffff",
    backgroundImage: Theme.colors.gradientInclined,
  },
  main: {
    color: "#000",
    marginTop: "52px",
    padding: "16px",
  },
  paper: {
    height: "400px",
    padding: "16px",
    boxShadow: "0px 0px 16px 0px rgba(46, 24, 24, 0.16)",
    overflow: "auto",
  },
  notify: {
    textAlign: "center",
    fontWeight: "500",
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
  },
}));
export default function NewNote() {
  const styles = useStyles();
  const [open, setOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  // const [doneRecording, setDoneRecording] = useState(false);
  // const [noteData, setNoteData] = useState("");
  const history = useHistory();

  const {
    transcript,
    interimTranscript,
    finalTranscript,
    resetTranscript,
    listening,
  } = useSpeechRecognition();

  useEffect(() => {
    if (finalTranscript !== "") {
      console.log("Got final result:", finalTranscript);
    }
  }, [interimTranscript, finalTranscript]);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    console.log(
      "Your browser does not support speech recognition software! Try Chrome desktop, maybe?"
    );
  }

  let StopRecording = SpeechRecognition.abortListening;

  const listenContinuously = () => {
    setOpen(true);
    setIsRecording(true);
    SpeechRecognition.startListening({
      continuous: true,
      language: "en-GB",
    });
  };

  const pauseListening = () => {
    setIsRecording(false);
    SpeechRecognition.stopListening();
  };

  const stopListening = () => {
    setOpen(false);
    // setNoteData(transcript);
    // setDoneRecording(true);
    // SpeechRecognition.stopListening();
    StopRecording();
    history.push(`/my/transcript-notes/edit/${finalTranscript}`);
  };

  // console.log(transcript);

  return (
    <div className={styles.main}>
      <Heading.Medium text="New Note" />
      <Container className={styles.content}>
        <Paper className={styles.paper}>
          {!open ? (
            <>
              <h2 className={styles.notify}>{"Please Start Recording"}</h2>
              <h4 className={styles.notify}>
                {"( Currently under development )"}
              </h4>
            </>
          ) : (
            <textarea
              placeholder="Listening audio..."
              className={styles.note}
              value={transcript}
            />
          )}
        </Paper>
        {!isRecording ? (
          <Fab
            size="large"
            className={styles.fab1}
            onClick={listenContinuously}
          >
            <MicIcon />
          </Fab>
        ) : (
          <Fab size="large" className={styles.fab1} onClick={pauseListening}>
            <PauseIcon />
          </Fab>
        )}
        <Fab size="large" className={styles.fab2} onClick={stopListening}>
          <DoneIcon />
        </Fab>
      </Container>
    </div>
  );
}
