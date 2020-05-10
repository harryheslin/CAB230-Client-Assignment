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

  //const [companyData, setCompanyData] = useState([{
  //   timestamp: "",
  //   symbol: "",
  //   name: "",
  //   industry: "",
  //   open: "",
  //   high: "",
  //   low: "",
  //   close: "",
  //   volumes: ""
  // }]);
  const [loading, setLoading] = useState(true);
  const [companyData, setCompanyData] = useState([{}]);
  const [latestCompanyData, setlatestCompanyData] = useState([{}]);
  let authenticated = (localStorage.getItem('token'));
  const [searchDate, setSearchDate] = useState("");


  useEffect(() => {
    const headers = {
      accept: "applciation/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${authenticated}`,
    };
    console.log(authenticated);

    fetch("http://131.181.190.87:3000/stocks/" + code)
      .then(res => res.json())
      .then(res => setlatestCompanyData([{
        timestamp: res.timestamp.substring(0, 10),
        symbol: res.symbol,
        name: res.name,
        industry: res.industry,
        open: res.open,
        high: res.high,
        low: res.low,
        close: res.close,
        volumes: res.volumes
      }]))

    if (searchDate !== "" && searchDate !== latestCompanyData[0].timestamp) {
      fetch("http://131.181.190.87:3000/stocks/authed/" + code + "?from=" + searchDate + "T00%3A00%3A00.000Z&to=" + latestCompanyData[0].timestamp + "T00%3A00%3A00.000Z", { headers })
        .then(res => res.json())
        .then(data =>
          data.map(company => {
            return {
              timestamp: company.timestamp.substring(0, 10),
              symbol: company.symbol,
              name: company.name,
              industry: company.industry,
              open: company.open,
              high: company.high,
              low: company.low,
              close: company.close,
              volumes: company.volumes
            };
          }
          )
        )
        .then(allCompanies => setCompanyData(allCompanies.concat(latestCompanyData)))
        .then(setLoading(false));
    }
    else {
      setLoading(false);
    }
    console.log(searchDate)
  }, [searchDate]);


  function HistorySearch(props) {
    const [innerDateSearch, setInnerDateSearch] = useState('');
    if (authenticated !== "clear") {
      return (
        <div>
          <p id="date-title">Select a date for history</p>
          <div className="date-search">
            <input type="date" id="start" name="trip-start"
              value={innerDateSearch}
              onChange={(e) => setInnerDateSearch(e.target.value)}
              min="2018-01-01" max={latestCompanyData[0].timestamp}></input>
            <button onClick={() => { props.onSubmit(innerDateSearch) }}>Search</button>
          </div>
        </div>
      )
    }
    else {
      return(<div></div>)
    }

  }

  function Table() {
    
    return (
      <div>
        <div
          className="ag-theme-alpine-dark table"
          style={{
            height: "45vh",
            width: "55%",
            marginRight: "1%",
            marginTop: "0vh"
          }}
        >
          <HistorySearch onSubmit={setSearchDate}/>
          <AgGridReact
             rowData={searchDate === "" || searchDate === latestCompanyData[0].timestamp ? latestCompanyData : companyData}
          //  pagination={true}
          //  paginationPageSize={30}
          >
            <AgGridColumn headerName="Date" field="timestamp" filter="agTextColumnFilter" sort="asc" sortable="true" width={250} flex={300}></AgGridColumn>
            <AgGridColumn headerName="Open" field="open" filter="agTextColumnFilter" sortable="true" width={100} flex={150}></AgGridColumn>
            <AgGridColumn headerName="High" field="high" filter="agTextColumnFilter" sortable="true" width={100} flex={150}></AgGridColumn>
            <AgGridColumn headerName="Low" field="low" filter="agTextColumnFilter" sortable="true" width={100} flex={150}></AgGridColumn>
            <AgGridColumn headerName="Close" field="close" filter="agTextColumnFilter" sortable="true" width={100} flex={150}></AgGridColumn>
            <AgGridColumn headerName="Volume" field="volumes" filter="agTextColumnFilter" sortable="true" width={200} flex={200}></AgGridColumn>
          </AgGridReact>
        </div>
      </div>
    )
  }

  function LatestGraph() {
    const data = [{ name: 'Open', Price: latestCompanyData[0].open }, { name: 'High', Price: latestCompanyData[0].high },
    { name: 'Low', Price: latestCompanyData[0].low }, { name: 'Close', Price: latestCompanyData[0].close }];
    return (
      <div className="chart-background">
        <div className="chart">
          <LineChart width={550} height={390} data={data} margin={{ top: 50, right: 40, bottom: 0, left: 0 }}>
            <Line strokeWidth="2" type="monotone" activeDot="true" dot={false} dataKey="Price" stroke="rgb(160, 63, 63)" />
            <CartesianGrid stroke="black" strokeDasharray="1 1" />
            <XAxis dataKey="name" stroke="black" />
            <YAxis stroke="black" dataKey="Price" tickFormatter={formatter} />
            <Tooltip height="1px" />
          </LineChart>
        </div>
        <ViewHistory />
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
          <Table />
        </div>
      )
    }
    else {
      return (
        <Table onSubmit={setSearchDate} />
      )
    }
  }


  function CustomTooltip({ payload, label, active }) {
    if (active) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label} : ${"$" + payload[0].value}`}</p>
        </div>
      );
    }

    return null;
  }
  const formatter = (value) => `$${value}`;
  function renderCurrentStock() {

      if (searchDate === "" || searchDate === latestCompanyData[0].timestamp || companyData.length === 1 || authenticated === "clear") {
        return (<LatestGraph />)

      } else {
        const data = companyData.slice(0).reverse().map((companyData) => ({ name: 'Close', Price: companyData.close, Date: companyData.timestamp }))
        return (
          <div className="chart-background">
            <div className="chart">
              <LineChart width={550} height={390} data={data} margin={{ top: 50, right: 40, bottom: 0, left: 0 }}>

                <Line strokeWidth="2" type="monotone" activeDot="true" dot={false} dataKey="Price" stroke="rgb(160, 63, 63)" />
                <CartesianGrid stroke="black" strokeDasharray="1 1" />
                <XAxis stroke="black" dataKey="Date" tick={false} />
                <YAxis stroke="black" dataKey="Price" tickFormatter={formatter} />
                <Tooltip height="1px" content={<CustomTooltip />} />
              </LineChart>
              <p id="close-price-title">Closing Prices</p>
            </div>
            <ViewHistory />
          </div>
        )
    }
  };

  if (!loading) {
    return (
      <div className="jumbo">
        <div class="transbox">
          <div className="transMessage">
            <div className="title">
              {latestCompanyData[0].name}
            </div>
            <div className="sub-title">
              {latestCompanyData[0].symbol} - {latestCompanyData[0].industry}
            </div>
            <div className="transMessage">
              {latestCompanyData[0].timestamp}
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
