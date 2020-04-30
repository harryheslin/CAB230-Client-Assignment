import React, { useState, useEffect } from 'react';
import "./Login.css";

export default function Signup() {
    const [email, setEmail] = useState('');
    const [innerEmail, setInnerEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    useEffect(() => {
        console.log(email);
        console.log(password)
        setPassword("");
        setInnerEmail("")
    },
        [email]);

    return (
        <div className="jumbo">
            <div class="transbox">
                <div className="transMessage">
                    <p>
                        <div className="title">
                        Bulls Trading Exchange Portal
                </div>
                    </p>
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
                        onClick={() => { setEmail(innerEmail) }}
                    >
                        Signup
                </button>
                </div>
            </div>
        </div>
    );
}
