import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import "./Login.css";
import { Error } from './Login'

export default function Signup() {
    const [innerEmail, setInnerEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [error, setError] = useState(false);
    const [errorCode, setErrorCode] = useState();
    const [accepted, setAccepted] = useState(false);


    function submitSignup() {
        const url = "http://131.181.190.87:3000/user/register"
        console.log(innerEmail);
        console.log(password)
        console.log(repeatPassword);
        console.log(errorCode)
        if (password === repeatPassword) {
            return fetch(url, {
                method: "POST",
                headers: { accept: "application/json", "Content-Type": "application/json" },
                body: JSON.stringify({ email: innerEmail, password: password })
            })
                .then((res) => {
                    if (!res.ok) {
                        setErrorCode(res.status)
                        setError(true);
                        setInnerEmail('');
                        setPassword('');
                        setRepeatPassword('');
                        throw Error(res.statusText)
                    }
                    else {
                        setError(false);
                        setAccepted(true);
                       
                    }
                })
                .catch((error) => {
            })
        }
        else {
            setError(true);
            setErrorCode(400)
            setInnerEmail('');
            setPassword('');
            setRepeatPassword('');
        }

    }

    if (accepted === false) {
        return (
            <div>
                <div className="jumbo">
                    <div className="transbox">
                        <div className="transMessage">
                            <div className="title">
                                Bulls Trading Exchange Portal
                </div>
                        </div>
                    </div>
                    <div className="login-div">
                        <Error error={error} type="Signup" code={errorCode} />
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
                                onClick={() => { submitSignup() }}
                            >
                                Signup
                </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else if (accepted === true){
        return (
            <div>
                <Redirect to="/login" />
            </div>
        )
    }
}
