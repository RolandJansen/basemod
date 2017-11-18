import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';
import GameSelector from './GameSelector';

/**
 *
 */
const TopNav = ({ games, onGameSelect }) => (
  <Navbar color="dark" dark expand="md">
    <NavbarBrand href="/"><span className="oi oi-vertical-align-bottom"></span> basemod</NavbarBrand>
    <Nav navbar>
      <NavItem>
        <GameSelector games={ games } onGameSelect={ onGameSelect }/>
      </NavItem>
    </Nav>
  </Navbar>
)

export default TopNav;
