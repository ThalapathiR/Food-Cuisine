import React, { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/NavBar.css';
import { Container, Nav, Navbar } from 'react-bootstrap';

export const NavBar = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand href="/">
            THALAPATHI CUISINES <i className="bi bi-egg-fried"></i>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />  {/* This will toggle the navbar on smaller screens */}
          <Navbar.Collapse id="navbar-nav">
            <Nav className="me-auto">
              <Nav.Link className="navHome" href="/">FINLAND</Nav.Link>
              <Nav.Link className="navHome" href="/japan">JAPAN</Nav.Link>
              <Nav.Link className="navHome" href="/russia">RUSSIA</Nav.Link>
              <Nav.Link className="navHome" href="/colombia">COLOMBIA</Nav.Link>
              <Nav.Link className="navHome" href="/india">INDIA</Nav.Link>
              <Nav.Link className="navHome" href="/venezula">VENEZULA</Nav.Link>
              <Nav.Link className="navHome" href="/newzeland">NEWZEALAND</Nav.Link>
             
            </Nav>
            {/* Add a food icon or design to the right */}
            <Nav>
            <Nav.Link className="food-icon">
    <i className="bi bi-cup-straw" style={{ fontSize: '2rem' }}></i> {/* Inline styling */}
  </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};
