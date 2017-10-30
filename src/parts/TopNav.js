import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';
import GameChooser from './GameChooser';

/**
 *
 */
class TopNav extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">basemod</NavbarBrand>
        <Nav navbar>
          <NavItem>
            <GameChooser />
          </NavItem>
        </Nav>
      </Navbar>
    );
  }

}

export default TopNav;
