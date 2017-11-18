import React from 'react';
import ReactDOM from 'react-dom';
import GameSelector from './GameSelector';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GameSelector />, div);
});
