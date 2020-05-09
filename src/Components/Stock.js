import React, { useEffect, useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { AgGridColumn } from 'ag-grid-react/lib/agGridColumn';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import "./Homepage.css";
import "./Stock.css";
import { Link } from 'react-router-dom';


export default function Stock(props) {

  const url = (window.location.pathname);
  const re = new RegExp('([A-Z.]+)');
  const [code, setCode] = re.exec(url);


  const [loading, setLoading] = useState(true);
  const [companyData, setCompanyData] = useState([]);
  let authenticated = (localStorage.getItem('token'));
  const [date, setDate] = useState("");


  useEffect(() => {
    fetch("http://131.181.190.87:3000/stocks/" + code)
      .then(res => res.json())
      .then(res => setCompanyData(res) & setDate(res.timestamp))
      .then(setLoading(false))
      .catch(e => console.log(e))
  }, [code]);

  
  // useEffect(() => {
  //   fetch("http://131.181.190.87:3000/stocks/" + code)
  //   .then(res => res.json())
  //   .then(data =>
  //       data.map(company => {
  //           return {
  //               name: company.name,
  //               symbol: company.symbol,
  //               industry: company.industry,
  //           };
  //       })
  //   )
  //   .then(allCompanies => setCompanyData(allCompanies));
  // }, []);


  function dateSearch() {
    const headers = {
      accept: "applciation/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${authenticated}`,
    };
    console.log(companyData.symbol)
    fetch("http://131.181.190.87:3000/stocks/authed/" + code, { headers })
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(e => console.log(e))
  }


  function Table() {
    return (
      <div>
      <div
        className="ag-theme-alpine-dark table"
        style={{
          height: "45vh",
          width: "30%",
          marginRight: "3%",
          marginTop: "0vh"
        }}
        >
          <p id="date-title">Select a date for price history</p>
          <div className="date-search">
          <input type="date" id="start" name="trip-start"
            value="2018-07-22"
              min="2018-01-01" max="2018-12-31"></input>
            <button>Search</button>
            </div>
        <AgGridReact
          //rowData={companyData}
          // pagination={true}
          // paginationPageSize={30}
          rowSelection={true}
        //onRowDoubleClicked={clickHander}
        >
          <AgGridColumn headerName="Date" field="timestamp" filter="agTextColumnFilter" sortable="true" width={200} flex={300}></AgGridColumn>
          <AgGridColumn headerName="Open" field="open" filter="agTextColumnFilter" sortable="true" width={200} flex={300}></AgGridColumn>
          <AgGridColumn headerName="Close" field="close" filter="agTextColumnFilter" sortable="true" width={200} flex={300}></AgGridColumn>

        </AgGridReact>
        </div >
        </div>
    )
  }

 
  function ViewHistory() {
    if (authenticated === "clear") {
      return (
        <div className="unverrified">
          {<Link to="/login" style={{
            color: "black"
          }}> Login </Link>} to view stock history
        </div>
      )
    }
    else {
      return (
        <Table />
      )
    }
  }
  const data = [{ name: 'Open', Price: companyData.open }, { name: 'High', Price: companyData.high }, { name: 'Low', Price: companyData.low }, { name: 'Close', Price: companyData.close }];
  
  function renderCurrentStock() {
    return (
      <div className="chart-background">
        <div className="chart">
          <LineChart width={550} height={300} data={data} margin={{ top: 50, right: 40, bottom: 0, left: 0 }}>
            <Line strokeWidth="4" type="monotone" activeDot="true" dataKey="Price" stroke="rgb(160, 63, 63)" />
            <CartesianGrid stroke="black" strokeDasharray="1 1" />
            <XAxis dataKey="name" stroke="black" />
            <YAxis stroke="black" />
            <Tooltip height="1px" />
          </LineChart>
        </div>
        {/* <div className="table-heading">
          <h3>{companyData.symbol} - Latest Value</h3>
        </div> */}
        <ViewHistory />
        <div className="chart-details">
          Open: {companyData.open}<br />
          High: {companyData.high}<br />
          Low: {companyData.low}<br />
          Close: {companyData.close}<br />
          Volumes: {companyData.volumes}<br />
        </div>
      </div>
    )
  };


  if (!loading) {

    return (
      <div className="jumbo">
        <div class="transbox">
          <div className="transMessage">
            <div className="title">
              {companyData.name}
            </div>
            <div className="sub-title">
              {companyData.symbol} - {companyData.industry}
            </div>
            <div className="transMessage">
              {date.substring(0, 10)}
            </div>
          </div>
        </div>
        <div className="stock-div">
          {renderCurrentStock()}
        </div>
      </div>
    );

  }
  else {
    return (
      <h1>Loading...</h1>
    )
  }
}
