import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import { SnackBar } from "../components";

import logo from "../assets/icons/logo.png";
import loginImg from "../assets/icons/login3D.png";
import user from "../assets/icons/user.svg";
import lock from "../assets/icons/lock.svg";

import Theme from "../theme";
import "./Login.css";

import { appAuth as auth, useAuth } from "../firebase/auth";

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText("#fff"),
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    borderRadius: 25,
    width: 260,
    color: "#fff",
  },
}));

export default function Login() {
  const classes = useStyles();

  // LOGGED IN CONTEXT
  const { loggedIn } = useAuth();

  const [show, setShow] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  async function handleLogin() {
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      setError(true);
      setPassword("");
    }
  }

  function Togglelogin() {
    if (!show) {
      setShow(true);
      return;
    } else {
      handleLogin();
    }
  }

  if (loggedIn) {
    return <Redirect to="/my/card-decks" />;
  }

  return (
    <div className="login">
      <div className="welcome">
        <h1>Welcome,</h1>
        <h3>lets get started.</h3>
        <img
          className="welcome-img"
          src={loginImg}
          alt=""
          style={{ opacity: show ? 0 : 1 }}
        />
      </div>
      <div className="bottom-container">
        <img src={logo} alt="" />
        {show && (
          <div className="login-form">
            <div className="emailfield">
              <img src={user} alt="" />
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
            <div
              style={{
                color: Theme.colors.greyMedium,
                textAlign: "right",
                margin: "16px 56px 0 0",
              }}
            >
              <span>Forgot Password?</span>
            </div>
          </div>
        )}
        <br></br>
        <ColorButton
          variant="contained"
          type="submit"
          color="primary"
          className={classes.button}
          onClick={() => Togglelogin()}
        >
          {"Log In"}
        </ColorButton>
        <br></br>
        <div style={{ color: "gray", padding: "12px 8px 4px" }}>Or</div>
        <h3 className="gradient">
          <Link to="/signup">Create an account?</Link>
        </h3>
      </div>
      <SnackBar
        message="Invalid e-mail and/or password"
        severity="error"
        showBar={error}
        callback={() => {
          setError(false);
        }}
      />
    </div>
  );
}
