import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import LayersIcon from '@material-ui/icons/Layers';
import IconButton from '@material-ui/core/IconButton';
import { LayerDiv } from './LayerDiv';

export class Layer extends Component {
  static propTypes = {
    layer: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <Fragment>
        {this.props.layer.closeLayerDiv ? (
          <IconButton className="layers-icon" onClick={this.props.actions.maximizeLayerDiv}>
            <LayersIcon />
          </IconButton>
        ) : (
          <LayerDiv actions={this.props.actions} layer={this.props.layer}></LayerDiv>
        )}
      </Fragment>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    layer: state.layer,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Layer);
