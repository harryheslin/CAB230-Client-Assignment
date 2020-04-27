import React from 'react';

export default function Stock(props) {
    console.log(props)
    return (
        <h1>This is the stock information for {props.name}</h1>
    )
}