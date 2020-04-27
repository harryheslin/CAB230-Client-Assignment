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

    useEffect(() => {
        fetch("http://131.181.190.87:3000/stocks/" + code)
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
    }, [code]);
    console.log(companyData.name)
    return (
        
        <h1>{companyData.symbol}</h1>
        //<Redirect to={"/stock/" + companyData.symbol} />
    )
}