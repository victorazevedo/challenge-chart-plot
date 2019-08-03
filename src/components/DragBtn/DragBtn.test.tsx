import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import DragBtn from '../DragBtn/DragBtn'

it('should render DragBtn without error', () => {
  renderer.create(<DragBtn></DragBtn>);
});


