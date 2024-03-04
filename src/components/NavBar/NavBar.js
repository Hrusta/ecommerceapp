import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
const NavBar = () => {
  return (
    <div style={{ paddingLeft: "10px" }}>
      <Navbar expand="lg">
        <Link to="/">
          <button>Store</button>
        </Link>

        <Navbar.Collapse id="navbarNav">
          <Nav className="mr-auto">
            <Link to="/">
              <button>Home</button>
            </Link>
            <Link to="/login">
              <button>Log in</button>
            </Link>
            <Link to="/register">
              <button>Register</button>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
