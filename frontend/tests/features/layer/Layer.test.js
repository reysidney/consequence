import React from 'react';
import { shallow } from 'enzyme';
import { Layer } from '../../../src/features/layer/Layer';

describe('layer/Layer', () => {
  it('renders node with correct class name', () => {
    const props = {
      layer: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Layer {...props} />
    );

    expect(
      renderedComponent.find('.layer-layer').length
    ).toBe(1);
  });
});
