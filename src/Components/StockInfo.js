import React, { useEffect, useState } from 'react';
import ErrorPage from './ErrorPage';
import Search from './Search'

export default function StockInfo(prop) {

    
    let { code } = prop
    const [companyData, setCompanyData] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch("http://131.181.190.87:3000/stocks/" + code)
            .then((response) => {
                if (response.status >= 200 && response.status <= 299) {
                    return response.json();
                } else if (response.status === 400) {
                    setError("Invalid Query Parameters Used");
                    throw Error();
                }
                else if (response.status === 404) {
                    setError("No Entries For " + code +" Could Be Found");
                    throw Error();
                }
            })
            .then(company => {
                return {
                    timestamp: company.timestamp,
                    symbol: company.symbol,
                    name: company.name,
                    industry: company.industry,
                    open: company.open,
                    high: company.high,
                    low: company.low,
                    close: company.close,
                    volumes: company.volumes
                };
            })
            .then(data => setCompanyData(data))
            .catch(e => Error(e));
    }, [code]);

    if (error === "") {
        return (
            <h1>{companyData.name}</h1>
        )
    }
    else {
        return (
            <ErrorPage error={error} />
            
        )
    }
}