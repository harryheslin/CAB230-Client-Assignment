import React, { useState, useEffect } from 'react';
import { AlertList, Alert, AlertContainer } from "react-bs-notifier";
import "./Login.css";
import jwt from "jsonwebtoken";
import {
    Link, Redirect
} from "react-router-dom";
import NavigationBar from './TopNavbar';

function Error() {
    return (<div className="error-div">
        <Alert type="danger" headline="Uh oh">
            Login failed, please ensure correct details
        </Alert>
    </div>
    )
}

export default function Login() {
    const [email, setEmail] = useState('');
    const [innerEmail, setInnerEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [authenticated, setAuthenticated] = useState('clear');


    function proccessLogin() {
        const url = "http://131.181.190.87:3000/user/login"
        localStorage.setItem('token', 'clear');
        return fetch(url, {
            method: "POST",
            headers: { accept: "application/json", "Content-Type": "application/json" },
            body: JSON.stringify({ email: innerEmail, password: password })
        })
            .then((res) => res.json())
            .then((res) => {
                if (!res.error) {
                    setError(false);
                    console.log(res);
                    localStorage.setItem('token', res.token);
                    setAuthenticated(localStorage.getItem('token'))
                    window.location.reload();
                }
                else {
                    setError(true);
                }
                
            })
    }

    if (authenticated === 'clear' & !error) {
        return(
        <div className="jumbo">
            <div class="transbox">
                <div className="transMessage">
                    {/* <p> */}
                    <div className="title">
                        Bulls Trading Exchange Portal
            </div>
                    {/* </p> */}
                </div>
            </div>
            <div className="login-div">
                <div>
                    <p className="login-label">Email</p>
                    <input
                        aria-labelledby="submit-button"
                        name="email"
                        id="email"
                        type="email"
                        value={innerEmail}
                        onChange={(e) => setInnerEmail(e.target.value)}
                    />
                    <br />
                    <p className="login-label" >Password</p>
                    <input
                        aria-labelledby="submit-button"
                        name="password"
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <br />
                    <button
                        id="submit-button"
                        type="button"
                        onClick={() => { proccessLogin() }}
                    >
                        Login
            </button>
                </div>
            </div>
            </div>
        )

    } else if (authenticated === 'clear' & error) {
        return (
            <div><Error />
            
            <div className="jumbo">
            <div class="transbox">
                <div className="transMessage">
                    {/* <p> */}
                    <div className="title">
                        Bulls Trading Exchange Portal
            </div>
                    {/* </p> */}
                </div>
            </div>
            <div className="login-div">
                <div>
                    <p className="login-label">Email</p>
                    <input
                        aria-labelledby="submit-button"
                        name="email"
                        id="email"
                        type="email"
                        value={innerEmail}
                        onChange={(e) => setInnerEmail(e.target.value)}
                    />
                    <br />
                    <p className="login-label" >Password</p>
                    <input
                        aria-labelledby="submit-button"
                        name="password"
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <br />
                    <button
                        id="submit-button"
                        type="button"
                        onClick={() => { proccessLogin() }}
                    >
                        Login
            </button>
                </div>
            </div>
                </div>
                </div>
        )
    }
    else if (!error & authenticated !== 'clear'){
        return(
        <div>
            <NavigationBar status={200} />
            <Redirect to="/" />
            </div>
        )
    }

}
