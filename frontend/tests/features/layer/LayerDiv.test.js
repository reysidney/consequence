import React from 'react';
import { shallow } from 'enzyme';
import { LayerDiv } from '../../../src/features/layer/LayerDiv';

describe('layer/LayerDiv', () => {
  it('renders node with correct class name', () => {
    const props = {
      layer: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <LayerDiv {...props} />
    );

    expect(
      renderedComponent.find('.layer-layer-div').length
    ).toBe(1);
  });
});
