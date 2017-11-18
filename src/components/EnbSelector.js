import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './EnbSelector.css';

/**
 *
 */
class EnbChooser extends Component {

  constructor(props) {
    super(props)

    this.state = {
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
    this.props.onEnbSelect(event.target.value)
  }

  handleEnbInstall() {
    this.props.onEnbInstall(this.state.selectedEnb)
  }

  getSelectedEnb(enbs) {
    let selected = 0
    enbs.forEach(enb => {
      if (enb.isSelected) {
        selected = enb.id
      }
    })
    return selected
  }

  render() {
    const selected = this.getSelectedEnb(this.props.enbs)
    let noEnbSelected
    if (this.props.enbs.length === 0) {
      noEnbSelected = <option key="0" value="0">Choose a game first</option>
    }
    if (this.props.enbs.length !== 0 && selected === 0) {
      noEnbSelected = <option key="0" value="0" >No preset selected</option>
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
