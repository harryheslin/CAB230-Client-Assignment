import React, { useEffect, useState } from 'react';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import "./ViewAll.css";
import { AgGridColumn } from 'ag-grid-react/lib/agGridColumn';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default function ViewAll() {

    const [rowData, setRowData] = useState([]);
    const [selected, setSelected] = useState("");

    const industries = ["View All","Consumer Discretionary", "Consumer Staples", "Energy",
        "Financials", "Health Care", "Industrials",
        "Information Technology", "Materials", "Real Estate",
        "Telecommunication Services", "Utilities"
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

    function IndustryDrop() {
        
        const [dropdownOpen, setDropdownOpen] = useState(false);
      
        const toggle = () => setDropdownOpen(prevState => !prevState);
      
        return (
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret>
              Industry
              </DropdownToggle>
            <DropdownMenu className="industry-drop">
                    {industries.map(company => (
                        <DropdownItem>{company}</DropdownItem>
                    ))}
            </DropdownMenu>
            </Dropdown>
        )
      }
    
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
                            height: "60vh",
                            width: "100%",
                        }}
                    >
                        <h1>Available Stocks</h1>
                        <h6>Double click company for latest information</h6>
                        <br />
                        <div className="industry-drop">
                            <IndustryDrop />
                            </div>
                        <Table />

                    </div>
                </div>
            </div>
        )
    }
    //Add in a call to the component here that is used in search
    else {
        return (
            <h1>{selected}</h1>
        )
    }
}