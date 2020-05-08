import React from 'react';
import { useParams } from 'react-router-dom'

export default function Stock(props) {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  const url = (window.location.pathname);
  const re = new RegExp('([A-Z.]+)');
  const code = re.exec(url);

  let authenticated = (localStorage.getItem('token'));

  if (authenticated === 'clear') {
    return (
      // code[0]
      <div>
        <h1>Not Logged in</h1>
        <h3>Code: {props.code} </h3>
      </div>
    );
  } else {
    return(
    <div>
        <h1>You are Logged in</h1>
        <h3>Code: {props.code} </h3>
      </div>
    )
  }


}
