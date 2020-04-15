import React, { useEffect, useState } from 'react';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import "./ViewAll.css";
import { AgGridColumn } from 'ag-grid-react/lib/agGridColumn';
import { Redirect, Link } from "react-router-dom";

export default function ViewAll() {

    const [rowData, setRowData] = useState([]);
    const [selected, setSelected] = useState("");

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

    function clickHander(props) {
        setSelected(props.data.name);
        console.log(selected);
    }

    function Table() {
        return (
            <AgGridReact
                rowData={rowData}
                pagination={true}
                paginationPageSize={30}
                rowSelection={true}
                onRowDoubleClicked={clickHander}
            >
                <AgGridColumn headerName="Company" field="name" filter="agTextColumnFilter" sortable="true" width={200} flex={300}></AgGridColumn>
                <AgGridColumn headerName="Stock Code" field="symbol" filter="agTextColumnFilter" sortable="true" width={200} flex={300}></AgGridColumn>
                <AgGridColumn headerName="Industry" field="industry" filter="agTextColumnFilter" sortable="true" width={200} flex={300}></AgGridColumn>

            </AgGridReact>
        )
    }

    if (selected === "") {

        return (
            <div className="table-container">

                <div className="table-background"
                    style={{
                        height: "85vh",
                    }}>
                    <div
                        className="ag-theme-alpine-dark table"
                        style={{
                            height: "70vh",
                            width: "100%",
                        }}
                    >
                        <h1>Available Stocks</h1>
                        <h6>Double click company for latest information</h6>
                        <br />
                        <Table />

                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <h1>{selected}</h1>
        )
    }
}