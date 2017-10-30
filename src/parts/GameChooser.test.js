import React from 'react';
import ReactDOM from 'react-dom';
import GameChooser from './GameChooser';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GameChooser />, div);
});
