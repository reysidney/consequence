import React from 'react';
import { shallow } from 'enzyme';
import { Map } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Map />);
  expect(renderedComponent.find('.common-map').length).toBe(1);
});
