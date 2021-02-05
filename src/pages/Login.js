import React, { useState } from "react";
import { useHistory, Link } from 'react-router-dom';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import logo from '../assets/icons/logo.png'
import loginImg from "../assets/icons/login3D.png"
import user from "../assets/icons/user.svg"
import lock from "../assets/icons/lock.svg"
import './Login.css'


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
        color: '#fff',
    },

}));

export default function Login() {

    const classes = useStyles();
    let history = useHistory()

    const [show, setShow] = useState(null);

    function Togglelogin() {
        if (!show) {
            setShow(true);
            return;
        }
        else {
            history.push('/');
        }
    }

    const LoginForm = () => {
        return (
            <div className="login-form">
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
                <div className="w-100 text-center mt-3" style={{ color: "gray" }}>
                    Forgot Password?
          </div>
            </div>
        )
    }

    return (
        <div className="login">
            <div className="welcome">
                <h1>Welcome,</h1>
                <h2>Lets Get Started</h2>
                <img src={loginImg} alt=""></img>

            </div>
            <div className="bottom-container">
                <img src={logo} alt=""></img>
                {show && <LoginForm />}
                <br></br>
                <ColorButton variant="contained" type="submit" color="primary" className={classes.button} onClick={() => Togglelogin()}>
                    Log In
                </ColorButton>
                <br></br>
                <div style={{ color: "gray", padding: 20 }}>
                    OR
                </div>
                <h3 className="gradient">
                    <Link to="/signup"> Create An Account </Link>
                </h3>
            </div>
        </div>
    )
}