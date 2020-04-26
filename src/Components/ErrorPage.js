import React from 'react';
import {
  Link
} from "react-router-dom";
import "./ErrorPage.css";

export default function ErrorPage(props) {
  return (
    <div className="main-error-div">
      <div className="background-div">
        <h1>Uh oh</h1>
        <h1>{props.error}</h1>
        {/* <Link to={"/"} style={{ textDecoration: "none" }}>
          <div>
            <h1>
              <img className="logo" src="bulllogo.png" />
            </h1>
          </div>
          <h1 className="home">Home</h1>
        </Link> */}
      </div>
    </div>
  );
}