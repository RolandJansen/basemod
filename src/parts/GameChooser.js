import React, { Component } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

/**
 *
 */
class GameChooser extends Component {
  constructor() {
    super();

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return (
      <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          Choose Game
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem>Fallout 3</DropdownItem>
          <DropdownItem>Fallout NV</DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
}

export default GameChooser;
