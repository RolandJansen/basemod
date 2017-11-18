import React from 'react';
import ReactDOM from 'react-dom';
import EnbChooser from './EnbChooser';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EnbChooser />, div);
});
