import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import './EnbChooser.css';

/**
 *
 */
class EnbChooser extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Form>
        <FormGroup>
          <Label for="chooseEnb" className="dropdown-label">Choose an ENB Preset</Label>
          <Input type="select" name="select" id="chooseEnb">
            <option>Midhrastic ENB</option>
            <option>Realistic ENB</option>
            <option>ENB of the Apocalypse</option>
            <option>Howard ENB</option>
          </Input>
        </FormGroup>
        <Button>Build FOMod</Button>
      </Form>
    );
  }
}

export default EnbChooser;
