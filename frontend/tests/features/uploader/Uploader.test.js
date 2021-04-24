import React from 'react';
import { shallow } from 'enzyme';
import { Uploader } from '../../../src/features/uploader/Uploader';

describe('uploader/Uploader', () => {
  it('renders node with correct class name', () => {
    const props = {
      uploader: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Uploader {...props} />
    );

    expect(
      renderedComponent.find('.uploader-uploader').length
    ).toBe(1);
  });
});
