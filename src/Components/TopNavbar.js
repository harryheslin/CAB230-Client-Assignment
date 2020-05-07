import './TopNavBar.css';
import React, { useState, useEffect } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavbarText
} from 'reactstrap';
import {
  Link
} from "react-router-dom";


export default function NavigationBar(props) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  let token = localStorage.getItem("token");
  let authorised = localStorage.getItem("authorised");
  const [isLogged, setIsLogged] = useState("");
  console.log("Nav bar logged in status is " + props.status)
  
  
  if (token !== "clear") {
    console.log(token);
    return (
      <div>
        <Navbar className="navbar-light topNav" expand="md">
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar >
            <Nav className="mr-auto" navbar>

              <Link to="/">
                <NavbarBrand>
                  <img src="bulllogo.png" width="90" height="50" class="d-inline-block align-top" alt="Logo">
                  </img>
                </NavbarBrand>
              </Link>
              {/* <Link to="/" className="topNav-title ">Home</Link> */}
              {/* <div class="navbar-center "> */}
              <NavItem>
                <Link to="/viewAll" className="navigate-buttons">View&nbsp;All</Link>
              </NavItem>
              <NavItem>
                <Link to="/search" className="navigate-buttons">Search</Link>
              </NavItem>
              {/* </div> */}
            </Nav>
            {/* {accountStatus()} */}
            <NavbarText className="userButtons"> <Link to="/logout">Logout</Link></NavbarText>
          </Collapse>
        </Navbar>
      </div>

    )
  }

  else {
    return (

      <div>
        <Navbar className="navbar-light topNav" expand="md">
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar >
            <Nav className="mr-auto" navbar>y

              <Link to="/">
                <NavbarBrand>
                  <img src="bulllogo.png" width="90" height="50" class="d-inline-block align-top" alt="Logo">
                  </img>
                </NavbarBrand>
              </Link>
              {/* <Link to="/" className="topNav-title ">Home</Link> */}
              {/* <div class="navbar-center "> */}
              <NavItem>
                <Link to="/viewAll" className="navigate-buttons">View&nbsp;All</Link>
              </NavItem>
              <NavItem>
                <Link to="/search" className="navigate-buttons">Search</Link>
              </NavItem>
              {/* </div> */}
            </Nav>
            {/* {accountStatus()} */}
            <NavbarText className="userButtons"><Link to="/login">Login</Link> | <Link to="/signup">Signup</Link></NavbarText>
          </Collapse>
        </Navbar>
      </div>

    );
  }
}
// export default NavigationBar;   
