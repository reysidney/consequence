import React from 'react';
import { shallow } from 'enzyme';
import { UploaderDialog } from '../../../src/features/uploader';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<UploaderDialog />);
  expect(renderedComponent.find('.uploader-uploader-dialog').length).toBe(1);
});
