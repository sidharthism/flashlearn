import React, { useState, useEffect } from "react";
import { Button, Container, Fab, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Theme from "../theme";
import MicIcon from '@material-ui/icons/Mic';
import DoneIcon from '@material-ui/icons/Done';


const useStyles = makeStyles((theme) => ({
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
        color: "#000"
    },
    paper:{
        minHeight: 200,
        boxshadow: "0px 0px 16px 0px rgba(46, 24, 24, 0.16)",
    }
}))
export default function NewNote() {
    const styles = useStyles();
    const [open, setOpen] = useState(null);

    const { transcript, interimTranscript, finalTranscript, resetTranscript, listening } = useSpeechRecognition();

    useEffect(() => {
        if (finalTranscript !== '') {
            console.log('Got final result:', finalTranscript);
        }
    }, [interimTranscript, finalTranscript]);

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return null;
    }

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        console.log('Your browser does not support speech recognition software! Try Chrome desktop, maybe?');
    }
    const listenContinuously = () => {
        setOpen(true);
        SpeechRecognition.startListening({
            continuous: true,
            language: 'en-GB',
        });
    };

    console.log(transcript);

    return (
        <div className={styles.main}>
            <Container style={{ padding: "100px 16px 16px 16px" }}>
                <Paper className={styles.paper}>
                    {!open ? <h1>Please Start Recording</h1> :
                        <h3>{transcript}</h3>}
                </Paper>
                <Fab size="large" variant="extended" className={styles.fab1} onClick={listenContinuously}>
                    <MicIcon />
                </Fab>
                <Fab size="large" variant="extended" className={styles.fab2} onClick={SpeechRecognition.stopListening}>
                    <DoneIcon />
                </Fab>
            </Container>
        </div>
    )
}