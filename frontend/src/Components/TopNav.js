import React from 'react';

//This is the navigation bar which uses react bootstrap//
import {Navbar, Nav, NavDropdown,} from 'react-bootstrap';

function TopNav(){
    return(
<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Navbar.Brand href="/">Itunes Search App</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <NavDropdown title="Favourites" id="collasible-nav-dropdown">
      <NavDropdown.Item href="/favourites">View Favourites</NavDropdown.Item>  
      </NavDropdown>
    </Nav>
  </Navbar.Collapse>
</Navbar>
    )
}


   


export default TopNav;
