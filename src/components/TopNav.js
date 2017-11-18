import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';
import GameChooser from './GameChooser';

/**
 *
 */
const TopNav = ({ games, onGameChange }) => (
  <Navbar color="dark" dark expand="md">
    <NavbarBrand href="/"><span className="oi oi-vertical-align-bottom"></span> basemod</NavbarBrand>
    <Nav navbar>
      <NavItem>
        <GameChooser games={ games } onGameChange={ onGameChange }/>
      </NavItem>
    </Nav>
  </Navbar>
)

export default TopNav;
