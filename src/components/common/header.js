import React, { Component } from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

export default (props) => {
    return (
      <Navbar inverse fixedTop fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <LinkContainer to="/">
                <a href="#">ff</a>
              </LinkContainer>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <LinkContainer strict to="/looks">
                <NavItem eventKey={1}>Looks</NavItem>
              </LinkContainer>
            </Nav>
            <Nav pullRight>
              <LinkContainer exact strict to="/add">
                <NavItem eventKey={2}>Add</NavItem>
              </LinkContainer>
              <LinkContainer exact to="/signout">
                <NavItem eventKey={3}>Sign Out</NavItem>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
    )
}
