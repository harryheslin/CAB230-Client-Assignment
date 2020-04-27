import React from 'react';
import Homepage from './Components/Homepage';
import ViewAll from './Components/ViewAll';
import Search from './Components/Search';
import Compare from './Components/Compare';
import TopNavbar from './Components/TopNavbar';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import StockInfo from './Components/StockInfo';
import Stock from './Components/Stock';

function App() {
  return (
    <div className="App">
      <Router>
        <TopNavbar />
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route path="/viewAll">
            <ViewAll />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/compare">
            <Compare />
          </Route>
          <Route path="/stock/:code" children={<Stock />}>
            {/* <Stock /> */}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
