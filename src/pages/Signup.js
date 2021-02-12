import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import { SnackBar } from "../components";

import { useAuth } from "../firebase/auth";
import { auth, db } from "../firebase";

import logo from "../assets/icons/logo.png";
import user from "../assets/icons/user.svg";
import lock from "../assets/icons/lock.svg";
import "./Signup.css";

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText("#fff"),
    backgroundImage:
      "linear-gradient(136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    marginTop: "12px",
    borderRadius: 25,
    width: 260,
    color: "#fff",
  },
}));

const addNewUserInfo = async (uId, userInfo) => {
  const userRef = db.collection("fl_users").doc(uId);
  try {
    await userRef.set(userInfo);
    console.log("Registered Successfully!");
  } catch (err) {
    console.log(err.message);
  }
};

export default function Signup() {
  const styles = useStyles();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState(false);
  const { loggedIn } = useAuth();

  async function handleSignup() {
    if (password !== passwordConfirm) {
      console.log("Passwords Not Same!");
      setError(true);
      setPassword("");
      setPasswordConfirm("");
      return;
    }
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      addNewUserInfo(user.uid, {
        fullName: fullName,
      });
    } catch (err) {
      setError(true);
      setPassword("");
      setPasswordConfirm("");
    }
  }

  if (loggedIn) {
    return <Redirect to="/my/card-decks" />;
  }

  return (
    <div className="login">
      <div className="signup-welcome">
        <h1>Welcome,</h1>
        <h3>lets get started.</h3>
      </div>
      <div className="bottom-container">
        <img src={logo} alt=""></img>
        <div className="login-form">
          <div className="emailfield">
            <img src={user} alt=""></img>
            <input
              type="text"
              value={fullName}
              placeholder="Enter Full Name"
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="emailfield">
            <img src={user} alt=""></img>
            <input
              type="email"
              value={email}
              placeholder="Enter Email-ID"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="passfield">
            <img src={lock} alt=""></img>
            <input
              type="password"
              value={password}
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="passfield">
            <img src={lock} alt=""></img>
            <input
              type="password"
              value={passwordConfirm}
              placeholder="Confirm Password"
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>
        </div>
        <ColorButton
          variant="contained"
          type="submit"
          color="primary"
          className={styles.button}
          onClick={() => {
            handleSignup();
          }}
        >
          Sign Up
        </ColorButton>
        <br></br>
        <div style={{ color: "gray", padding: "12px 8px 4px" }}>Or</div>
        <h3 className="gradient">
          <Link to="/login">Already have an account?</Link>
        </h3>
      </div>
      <SnackBar
        message="Invalid entries or passwords are not same"
        severity="error"
        showBar={error}
        callback={() => {
          setError(false);
        }}
      />
    </div>
  );
}
