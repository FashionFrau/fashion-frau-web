import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

export default (props) => {
    return (
      <Navbar inverse fixedTop fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">ff</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={2} href="/">List</NavItem>
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={3} href="#">Add</NavItem>
              <NavItem eventKey={4} href="#">Sing Out</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
    )
}
