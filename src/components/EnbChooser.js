import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './EnbChooser.css';

/**
 *
 */
class EnbChooser extends Component {

  constructor(props) {
    super(props)

    this.state = {
      selectedEnb: 0,
      buttonDisabled: true
    }

    this.handleChangeSelected = this.handleChangeSelected.bind(this)
    this.handleEnbInstall = this.handleEnbInstall.bind(this)
  }

  handleChangeSelected(event) {
    this.setState({
      selectedEnb: event.target.value,
      buttonDisabled: false
    })
    this.props.onEnbChange(event.target.value)
  }

  handleEnbInstall() {
    this.props.onEnbInstall(this.state.selectedEnb)
  }

  render() {
    let noEnbSelected
    if (this.props.enbs.length === 0) {
      noEnbSelected = <option key="0">Choose a game first</option>
    }
    if (this.props.enbs.length !== 0 && this.state.selectedEnb === 0) {
      noEnbSelected = <option key="0">No preset selected</option>
    }

    return (
      <Form>
        <FormGroup>
          <Label for="chooseEnb" className="dropdown-label">Choose an ENB Preset</Label>
          <Input type="select" name="select" id="chooseEnb" value={this.state.selectedEnb} onChange={this.handleChangeSelected}>
            { noEnbSelected }
            {
              this.props.enbs.map(enb => (
                <option key={enb.id} value={enb.id}>{enb.name}</option>
              ))
            }
          </Input>
        </FormGroup>
        <Button disabled={this.state.buttonDisabled} onClick={this.handleEnbInstall}>Install</Button>
      </Form>
    )
  }
}

export default EnbChooser;
