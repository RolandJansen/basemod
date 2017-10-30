import React, { Component } from 'react';
import './App.css';
import TopNav from './parts/TopNav';
import MainArea from './parts/MainArea';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <TopNav />
        </header>
        <MainArea />
      </div>
    );
  }
}

export default App;
