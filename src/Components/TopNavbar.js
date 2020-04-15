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
              <NavbarBrand>
              <img src="bulllogo.png" width="90" height="50" class="d-inline-block align-top" alt="Logo">
                </img>
                </NavbarBrand>
              <NavItem>
              <Link to="/" className="topNav-title">Bulls Trading</Link>
              </NavItem>
            </Nav>
            <NavbarText className="userButtons">Login | Signup</NavbarText>
          </Collapse>
      </Navbar>
      </div>

  );
}
export default NavigationBar;   