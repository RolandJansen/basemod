import React, { Component } from 'react';
import EnbChooser from './EnbChooser';
import './MainArea.css';

/**
 * This app is so simple that it doesn't even
 * needs a grid or anything. As this should be
 * expanded I put the form in a seperate component.
 */
class MainArea extends Component {
  // constructor() {
  //   super();
  // }

  render() {
    return (
      <div className="main-container">
        <div className="main-area align-middle">
          <EnbChooser />
        </div>
      </div>
    );
  }
}

export default MainArea;
