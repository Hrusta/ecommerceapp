import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const NavBar = () => {
  return (
    <div style={{ paddingLeft: "10px" }}>
      <Navbar expand="lg">
        <Navbar.Brand href="/ecommerceapp">Store</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="mr-auto">
            <Nav.Link href="/ecommerceapp/" active>
              Home
            </Nav.Link>
            <Nav.Link href="/ecommerceapp/login">Log in</Nav.Link>
            <Nav.Link href="/ecommerceapp/register">Register</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;