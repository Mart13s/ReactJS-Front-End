import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom'

export const NavigationMenu = () => {


       return (

      <Navbar collapseOnSelect expand="lg" variant='dark'>
  <Container className=''>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className='navbar-item'>
      <Link to="/" className='navbar-item nav-link' activeclassname="nav-link-active">Store</Link>
    </Nav>
    <Nav className='navbar-item'>
      <Link to="/purchases" className='navbar-item nav-link' activeclassname="nav-link-active">Purchases</Link>
    </Nav>
    <Nav className='navbar-item'>
      <Link to="/inventory" className='navbar-item nav-link' activeclassname="nav-link-active">Inventory</Link>
    </Nav>
    <Nav className='navbar-item'>
      <Link to="/trades" className='navbar-item nav-link' activeclassname="nav-link-active">Trades</Link>
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>

      )


}

export default Navbar;
