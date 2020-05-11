import './TopNavBar.css';
import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavbarText
} from 'reactstrap';
import {
  Link
} from "react-router-dom";


export default function NavigationBar(props) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  let token = localStorage.getItem("token");

  if (token !== "clear") {
    return (
      <div>
        <Navbar className="navbar-light topNav" expand="md">
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar >
            <Nav className="mr-auto" navbar>
              
              {/* <NavbarBrand> */}
              <Link to="/">
                  <img src="bulllogo.png" width="90" height="50" className="d-inline-block align-top" alt="Logo">
                  </img>
                  </Link>
                  {/* </NavbarBrand> */}
                
              <NavbarText>
                <Link to="/viewAll" className="navigate-buttons">View&nbsp;All</Link>
              </NavbarText>
              <NavbarText>
                <Link to="/search" className="navigate-buttons">Search</Link>
              </NavbarText>
            </Nav>
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
            <Nav className="mr-auto" navbar>
              <Link to="/">
                {/* <NavbarBrand> */}
                  <img src="bulllogo.png" width="90" height="50" className="d-inline-block align-top" alt="Logo">
                  </img>
                {/* </NavbarBrand> */}
              </Link>
              <NavbarText>
                <Link to="/viewAll" className="navigate-buttons">View&nbsp;All</Link>
              </NavbarText>
              <NavbarText>
                <Link to="/search" className="navigate-buttons">Search</Link>
                </NavbarText>
            </Nav>
            <NavbarText className="userButtons"><Link to="/login">Login</Link> | <Link to="/signup">Signup</Link></NavbarText>
          </Collapse>
        </Navbar>
      </div>

    );
  }
}
