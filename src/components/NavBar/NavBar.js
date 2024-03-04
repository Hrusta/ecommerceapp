import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
const NavBar = () => {
  return (
    <div style={{ paddingLeft: "10px" }}>
      <Navbar>
        <Link to="/">
          <button className="borderless-button">Store</button>
        </Link>

        <Nav className="mr-auto">
          <Link to="/login">
            <button className="borderless-button">Log in</button>
          </Link>
          <Link to="/register">
            <button className="borderless-button">Register</button>
          </Link>
        </Nav>
      </Navbar>
    </div>
  );
};

export default NavBar;
