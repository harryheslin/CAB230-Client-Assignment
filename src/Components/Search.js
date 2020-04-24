import React, { useState } from 'react';
import StockInfo from './StockInfo';
import "./Search.css";


export default function Search() {

    const [search, setSearch] = useState('');
    if (search !== "") {
        return (
            <div>
                <StockInfo code={search} />
            </div>
        )
    }
    return (
        <div className="main-div">
            <div className="search-div">
                <h1 id="search-title">Search By Stock Code</h1>
                <p>Please Enter 1-5 Uppercase Letters</p>
                <SearchBar onSubmit={setSearch} />
            </div>
        </div>
    )
}

function SearchBar(props) {
    const [innerSearch, setInnerSearch] = useState('');
    return (
        <div>
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
                onClick={() => props.onSubmit(innerSearch)}
            >
                Search
    </button>

        </div>
    )
}