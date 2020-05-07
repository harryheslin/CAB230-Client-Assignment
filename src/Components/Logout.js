import React from 'react';
import {
    Redirect
} from "react-router-dom";
import NavigationBar from './TopNavbar';

export default function Logout() {
    if (localStorage.getItem("token") !== 'clear'){
        window.location.reload();
    }
    localStorage.setItem("token", 'clear');
    return (
        <div>
            <NavigationBar />
            <Redirect to="/" />
        </div>
    )

}
