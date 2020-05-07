import React, { useState, useEffect } from 'react';
import { Alert } from "react-bs-notifier";
import { Redirect } from "react-router-dom";
import "./Login.css";

function Error(props) {
    if (props.error) {
        return (<div className="error-div">
            <Alert type="danger" headline="Uh oh">
                {props.type} failed, please ensure correct details
            </Alert>
        </div>
        )
    }
    else {
        return (<div></div>)
    }
}

export default function Signup() {
    const [email, setEmail] = useState('');
    const [innerEmail, setInnerEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [error, setError] = useState(false);
    const [accepted, setAccepted] = useState(false);


    function submitSignup() {
        const url = "http://131.181.190.87:3000/user/register"
        console.log(innerEmail);
        console.log(password)
        console.log(repeatPassword);
        if (password === repeatPassword) {
            return fetch(url, {
                method: "POST",
                headers: { accept: "application/json", "Content-Type": "application/json" },
                body: JSON.stringify({ email: innerEmail, password: password })
            })
                .then((res) => res.json())
                .then((res) => {
                    if (!res.error) {
                        console.log(error);
                        setError(false);
                        setAccepted(true);
                    }
                })
        }
        else {
            setError(true);
        }

    }

    if (accepted === false) {
        return (
            <div><Error error={error} type="Signup" />
            <div className="jumbo">
                <div class="transbox">
                    <div className="transMessage">
                        <div className="title">
                            Bulls Trading Exchange Portal
                </div>
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
                        <p className="login-label" >Create Password</p>
                        <input
                            aria-labelledby="submit-button"
                            name="password"
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <br />
                        <p className="login-label" >Repeat Password</p>
                        <input
                            aria-labelledby="submit-button"
                            name="repeat-password"
                            id="repeat-password"
                            type="password"
                            value={repeatPassword}
                            onChange={(e) => setRepeatPassword(e.target.value)}
                        />
                        <br />
                        <button
                            id="submit-button"
                            type="button"
                            // onClick={() => { setEmail(innerEmail) }}
                            onClick={() => { submitSignup() }}
                        >
                            Signup
                </button>
                    </div>
                </div>
                </div>
                </div>
        );
    } else {
        return (
            <div>
                <Redirect to="/login" />
            </div>
        )
    }
}
