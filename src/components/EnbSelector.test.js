import React from 'react';
import ReactDOM from 'react-dom';
import EnbSelector from './EnbSelector';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EnbSelector />, div);
});
