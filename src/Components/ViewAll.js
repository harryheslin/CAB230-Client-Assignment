import React, { useEffect, useState } from 'react';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import "./ViewAll.css";
import { AgGridColumn } from 'ag-grid-react/lib/agGridColumn';

export default function ViewAll() {

    const [rowData, setRowData] = useState([]);

    const columns = [
        { headerName: "Organisation", field: "name"},
        { headerName: "Stock Code", field: "symbol" },
        { headerName: "Industry", field: "industry" }
    ]
    
    useEffect(() => {
        fetch("http://131.181.190.87:3000/stocks/symbols")
            .then(res => res.json())
            .then(data =>
                data.map(company => {
                     return {
                         name: company.name,
                         symbol: company.symbol,
                         industry: company.industry,
                     };
                 })
            )
            .then(allCompanies => setRowData(allCompanies));
    }, []);

    
    return (
        <div>
            <h1>View All Page</h1>
            <div
                className="ag-theme-alpine-dark table"
                style={{
                    height: "70vh",
                    width: "100%",
                }}
            >
                
                <AgGridReact
                    //columnDefs={columns}
                    rowData={rowData}
                    pagination={true}
                    paginationPageSize={30}
                >
                    <AgGridColumn headerName="Organisation" field="name" width={200} flex={300}></AgGridColumn>
                    <AgGridColumn headerName="Stock Code" field="symbol" width={200} flex={300}></AgGridColumn>
                    <AgGridColumn headerName="Industry" field="industry" width={200} flex={300}></AgGridColumn>
                </AgGridReact>
            </div>
        </div>
    )
}