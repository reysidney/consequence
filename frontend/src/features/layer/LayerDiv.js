import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Divider from '@material-ui/core/Divider';
import { List, ListItem, Checkbox, FormControlLabel } from '@material-ui/core';

export class LayerDiv extends Component {
  static propTypes = {
    layer: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  handleLayerShowChanged = (event, index, layer) => {
    layer.checked = event.target.checked;
    this.props.actions.updateLayer(index, layer);
    if (layer.checked) {
      layer.show();
    } else {
      layer.hide();
    }
  };

  createListItem(key, layer) {
    return (
      <Fragment>
        <ListItem key={key} className="list-item">
          <FormControlLabel
            control={
              <Checkbox
                checked={layer.checked}
                onChange={ev => this.handleLayerShowChanged(ev, key, layer)}
                color="primary"
              />
            }
            label={layer.name}
          />
        </ListItem>
        <Divider />
      </Fragment>
    );
  }

  listItems() {
    if (this.props.layer.layers.length) {
      return this.props.layer.layers.map((item, key) => {
        return this.createListItem(key, item);
      });
    }
  }

  render() {
    return (
      <div className="layer-div">
        <div className="header">
          Layers
          <IconButton className="close-icon" onClick={this.props.actions.minimizeLayerDiv}>
            <CloseIcon />
          </IconButton>
        </div>
        <Divider />
        {this.props.layer.layers.length ? (
          <List className="body">{this.listItems()}</List>
        ) : (
          <div className="body">There are no layers uploaded</div>
        )}
      </div>
    );
  }
}
