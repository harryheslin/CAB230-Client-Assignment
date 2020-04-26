import React, { useEffect, useState } from 'react';
import ErrorPage from './ErrorPage';
import Search from './Search'
import Stock from './Stock'
import { Alert } from 'reactstrap';
import {
    Redirect
} from "react-router-dom";


const AlertExample = (props) => {

    const [visible, setVisible] = useState(true);
    const onDismiss = () => setVisible(false);
    return (
        <Alert color="danger" isOpen={visible} toggle={onDismiss}>
            {props.error}
        </Alert>

    );
}

export default function StockInfo(prop) {
    let { code } = prop
    const [companyData, setCompanyData] = useState([]);
    const [error, setError] = useState("");
    const [loading, setloading] = useState(false);

    useEffect(() => {
        setloading(true)
        fetch("http://131.181.190.87:3000/stocks/" + code)
            .then((response) => {
                if (response.status >= 200 && response.status <= 299) {
                    return response.json();
                } else if (response.status === 400) {
                    setError("Invalid Query Parameters Used");
                    throw Error();
                }
                else if (response.status === 404) {
                    setError("No Entries For " + code + " Could Be Found");
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
            .then(setloading(false))
            .catch(e => {
                Error(e);
                setloading(false);
    });
    }, []);
// JUST REMOVED A DEPENDANCY

    if (loading) return (
        <h1>Loading...</h1>
    )
    else{
        if (error !== "") {
            return (
                <div>
                    <h1></h1>
                    <div>
                        <AlertExample error={error} />
                    </div>
                    <Search />
                </div>
            )
        }
        else if(!loading) {
            return (
                <Stock {...companyData} />
            )
        }
    }
}