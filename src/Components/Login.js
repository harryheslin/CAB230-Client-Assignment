import React, { useState } from 'react';
import { Alert } from "react-bs-notifier";
import { Redirect } from "react-router-dom";
import NavigationBar from './TopNavbar';
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

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [authenticated, setAuthenticated] = useState('clear');


    function proccessLogin() {
        const url = "http://131.181.190.87:3000/user/login"
        localStorage.setItem('token', 'clear');
        return fetch(url, {
            method: "POST",
            headers: { accept: "application/json", "Content-Type": "application/json" },
            body: JSON.stringify({ email: email, password: password })
        })
            .then((res) => res.json())
            .then((res) => {
                if (!res.error) {
                    setError(false);
                    localStorage.setItem('token', res.token);
                    setAuthenticated(localStorage.getItem('token'))
                    window.location.reload();
                }
                else {
                    setError(true);
                }
            })
    }

    if (authenticated === 'clear') {
        return (
            <div>
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
                        <Error error={error} type="Login" />
                            <p className="login-label">Email</p>
                            <input
                                aria-labelledby="submit-button"
                                name="email"
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
    else if (!error & authenticated !== 'clear') {
        return (
            <div>
                <NavigationBar />
                <Redirect to="/" />
            </div>
        )
    }

}
