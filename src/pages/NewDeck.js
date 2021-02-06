import React, { useState, useEffect } from "react";
import { Container, Fab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
    input:{
        fontsize: 15,
        border: 0,
        padding: "12px 15px",
        margin: 10,
        width: "75%",
        outline: 0,
        background: "transparent",
        borderBottom: "0.2px solid gray",
    }
}))
export default function NewDeck() {
    const styles = useStyles();
    return (
        
            <Container style={{ padding: "80px 16px 16px 16px" }}>
                <div className="Topicfield">
                    <h2>Topic:</h2>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Enter Topic"
                    //onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <Fab size="medium" variant="extended">
                <AddIcon  />
                </Fab>
            </Container>
        
    )
}