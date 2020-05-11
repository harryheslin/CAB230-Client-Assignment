import React, { useState, useEffect } from 'react';
import { Alert } from "react-bs-notifier";
import { Redirect}  from "react-router-dom";
import "./Search.css";
import "./Homepage.css";

export default function Search() {

    const [search, setSearch] = useState('');
    const [error, setError] = useState(false);
    const [statusCode, setStatusCode] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!loading) {
            fetch("http://131.181.190.87:3000/stocks/" + search)
                .then(res => (res.status > 399 ? setError(true) & setStatusCode(res.status) : setError(false) & setStatusCode(res.status)))
        }
        setLoading(false);
    },
        [search]);
    
    if (error) {
        if (statusCode === 400)
            return (
                <div className="jumbo">
            <div className="transbox">
                <div className="transMessage">
                        <div className="title">
                        Search By Stock Code
                </div>
                </div>
            </div>
                    <div className="search-div">
                        <div className="error-div">
                <Alert type="danger" headline="Uh oh">
                    You have entered invalid query parameters!
                </Alert>
                <SearchBar onSubmit={setSearch} />
                        </div>
                    </div>
                    </div>
            )
        else {
            return (
                <div className="jumbo">
            <div className="transbox">
                <div className="transMessage">
                        <div className="title">
                        Search By Stock Code
                </div>
                </div>
            </div>
                    <div className="search-div">
                        <div className="error-div">
                <Alert type="danger" headline="Uh oh">
                    No entry for {search} found in the stocks database.
                    </Alert>
                <SearchBar onSubmit={setSearch} />
                        </div>
                    </div>
                    </div>
            )
        }
    }

    if (!error && statusCode === 200) {
        return (
            <Redirect to={"./stock/" + search} />
        )
    }

    if (!error) {
        return (
            <div className="jumbo">
            <div className="transbox">
                <div className="transMessage">
                        <div className="title">
                        Search By Stock Code
                </div>
                </div>
            </div>
            <div className="search-div">
                    <SearchBar onSubmit={setSearch} />
                </div>
                </div>
                
        )
    }

}

function SearchBar(props) {
    const [innerSearch, setInnerSearch] = useState('');
    return (

        <div>
                <p>Please Enter 1-5 Uppercase Letters</p>
                    <input
                        aria-labelledby="search-button"
                        name="search"
                        id="search"
                        type="search"
                        value={innerSearch}
                        onChange={(e) => setInnerSearch(e.target.value)}
                        maxLength="5"
                    />
                    <br /> <br /> <br />
                    <button
                        id="search-button"
                        type="button"
                        onClick={() => { props.onSubmit(innerSearch); setInnerSearch(""); }}
                    >
                        Search
            </button>
                </div>
       
    )
}