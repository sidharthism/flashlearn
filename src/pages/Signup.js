import React from "react";
import { useHistory, Link } from "react-router-dom";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import logo from "../assets/icons/logo.png";
import user from "../assets/icons/user.svg";
import lock from "../assets/icons/lock.svg";
import "./Signup.css";

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

export default function Signup() {
  const classes = useStyles();
  let history = useHistory();

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
              placeholder="Full Name"
              //onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="emailfield">
            <img src={user} alt=""></img>
            <input
              type="email"
              placeholder="Enter Email-ID"
              //onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="passfield">
            <img src={lock} alt=""></img>
            <input
              type="password"
              placeholder="Enter Password"
              // onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="passfield">
            <img src={lock} alt=""></img>
            <input
              type="password"
              placeholder="Confirm Password"
              // onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <ColorButton
          variant="contained"
          type="submit"
          color="primary"
          className={classes.button}
          onClick={() => {
            history.push("/login");
          }}
        >
          Sign Up
        </ColorButton>
        <br></br>
        <div style={{ color: "gray", padding: 20 }}>Or</div>
        <h3 className="gradient">
          <Link to="/login"> Log In </Link>
        </h3>
      </div>
    </div>
  );
}
