import React from 'react';
import { shallow } from 'enzyme';
import { UploaderDiv } from '../../../src/features/uploader';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<UploaderDiv />);
  expect(renderedComponent.find('.uploader-uploader-div').length).toBe(1);
});
