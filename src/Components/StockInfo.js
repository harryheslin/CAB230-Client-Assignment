import React, { useEffect, useState } from 'react';


export default function StockInfo(prop) {

    
    let { code } = prop
    const [companyData, setCompanyData] = useState([]);

    useEffect(() => {
        fetch("http://131.181.190.87:3000/stocks/" + code)
            .then(res => res.json())
            .then(company =>
                {
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
            .then(data => setCompanyData(data));
    }, [code]);
        return (
            <h1>{companyData.name}</h1>
        )
}