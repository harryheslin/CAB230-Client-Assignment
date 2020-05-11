import React from 'react';
import Homepage from './Components/Homepage';
import ViewAll from './Components/ViewAll';
import Search from './Components/Search';
import Compare from './Components/Compare';
import Login from './Components/Login';
import Logout from './Components/Logout';
import TopNavbar from './Components/TopNavbar';
import Signup from './Components/Signup';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Stock from './Components/Stock';

function App() {
  return (
    <Router>
    <div className="App">
        <TopNavbar />
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/logout">
            <Logout />
          </Route>
          <Route path="/signup">
            <Signup />
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
          </Route>
        </Switch>
        </div>
      </Router>
    
  );
}

export default App;
