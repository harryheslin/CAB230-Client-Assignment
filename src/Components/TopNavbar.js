import './TopNavBar.css';
import React, { useState } from 'react';
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

const NavigationBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar  className="navbar-light topNav" expand="md">
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
            <NavbarText className="userButtons"> <Link to= "/login">Login</Link> | <Link to ="/signup">Signup</Link></NavbarText>
          </Collapse>
      </Navbar>
      </div>

  );
}
export default NavigationBar;   