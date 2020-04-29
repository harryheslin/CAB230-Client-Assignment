import React from 'react';
import { useParams } from 'react-router-dom'

export default function Stock(props) {
     // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
    const url = (window.location.pathname);
    const re = new RegExp('([A-Z.]+)');
    const code = re.exec(url);
    
  return (
    <div>
      <h3>Code: {code[0]} </h3>
    </div>
  );
}
