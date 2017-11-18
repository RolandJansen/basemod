import React, { Component } from 'react'
import './App.css'
import HeaderContainer from '../containers/HeaderContainer'
import MainContainer from '../containers/MainContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <HeaderContainer />
        </header>

        {/* This app is so simple that it doesn't even
        needs a grid or anything. As this should be
        expanded I put the form in a seperate component. */}
        <div className="main-container">
          <div className="main-area align-middle">
            <MainContainer />
          </div>
        </div>
      </div>
    );
  }
}

export default App
