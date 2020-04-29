import React, { useState, useEffect } from 'react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [innerEmail, setInnerEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        console.log(email);
        console.log(password)
        setPassword("");
        setInnerEmail("")
    },
        [email]);
    
    return (
            <div>
                <h1>Login </h1>
                <div>
                    <p>Email</p>
                    <input
                        aria-labelledby="submit-button"
                        name="email"
                        id="email"
                        type="email"
                        value={innerEmail}
                        onChange={(e) => setInnerEmail(e.target.value)}
                    />
                    <br />
                    <p>Password</p>
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
                    onClick={() => { setEmail(innerEmail)}}
                    >
                        Submit
                </button>
                </div>
            </div>
        );
}
