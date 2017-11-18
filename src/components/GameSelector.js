import React, { Component } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

/**
 *
 */
class GameChooser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
      selected: 'Choose Game'
    };

    this.toggle = this.toggle.bind(this)
    this.select = this.select.bind(this)
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }

  select(e) {
    this.setState({ selected: e.target.innerText })
    this.props.onGameSelect(e.target.innerText)
  }

  render() {
    return (
      <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          { this.state.selected }
        </DropdownToggle>
        <DropdownMenu>
          { this.props.games.map(game => (
            <DropdownItem key={game.id} onClick={this.select}>{game.name}</DropdownItem>
          ))}
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
}

export default GameChooser;
