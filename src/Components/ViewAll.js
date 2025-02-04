import React, { useEffect, useState } from 'react';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import "./ViewAll.css";
import "./Homepage.css";
import { AgGridColumn } from 'ag-grid-react/lib/agGridColumn';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Redirect } from 'react-router-dom';

const industries = [
    { title: "View All", link: "" },
    { title: "Consumer Discretionary", link: "?industry=Consumer%20Discretionary" },
    { title: "Consumer Staples", link: "?industry=Consumer%20Staples" },
    { title: "Energy", link: "?industry=Energy" },
    { title: "Financials", link: "?industry=Financials" },
    { title: "Health Care", link: "?industry=Health%20Care" },
    { title: "Industrials", link: "?industry=Industrials" },
    { title: "Information Technology", link: "?industry=Information%20Technology" },
    { title: "Materials", link: "?industry=Materials" },
    { title: "Real Estate", link: "?industry=Real%20Estate" },
    { title: "Telecommunication Services", link: "?industry=Telecommunication%20Services" },
    { title: "Utilities", link: "?industry=Utilities" }
]

export default function ViewAll() {

    const [rowData, setRowData] = useState([]);
    const [selected, setSelected] = useState("");
    const [industry, setIndustry] = useState("");


    useEffect(() => {
        fetch("http://131.181.190.87:3000/stocks/symbols" + industry)
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
        console.log(industry);
    }, [industry]);

    function setIndustryFunc() {
        setIndustry(this.link);
    }

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
                        <React.Fragment key={company.title}>
                            <DropdownItem onClick={setIndustryFunc.bind(company)}>{company.title}</DropdownItem>
                        </React.Fragment>
                    ))}
                </DropdownMenu>
            </Dropdown>
        )
    }

    function clickHander(props) {
        setSelected(props.data.symbol);
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
            <div>
                <div className="jumbo">
                    <div className="transbox">
                        <div className="transMessage">
                                <div className="title">
                                    Available Stocks
                                </div>
                        </div>
                    </div>
                    <div
                        className="ag-theme-alpine-dark table"
                        style={{
                        height: "60vh",
                        width: "90vw",
                        marginRight: "5%",
                        marginLeft : "5%"
                        }}
                        >
                        <div className="industry-drop">
                            <IndustryDrop />
                        </div>
                        <Table />
                    </div>
                </div>
            </div>
        )
    }
    else {
        return(
            <Redirect to={"./stock/" + selected} />
        )
    }
}