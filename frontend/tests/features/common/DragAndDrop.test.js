import React from 'react';
import { shallow } from 'enzyme';
import { DragAndDrop } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<DragAndDrop />);
  expect(renderedComponent.find('.common-drag-and-drop').length).toBe(1);
});
