import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import Map from '../common/Map';
import Uploader from '../uploader/Uploader';
import DragAndDrop from '../common/DragAndDrop';
import Swal from 'sweetalert2';
import GmapService from '../common/_services/gmap.service';
import Layer from '../layer/Layer';
import { addLayer } from '../layer/redux/actions';
import Loader from 'react-loader-spinner';

export class Home extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  async handleDrop(files) {
    let file = files[0];
    let ext = file.name.split('.').pop();
    let file_type = ['csv', 'xls', 'xlsx'].indexOf(ext) > -1 ? 'file-non-geo' : 'file';
    await this.props.actions.handleDrop(file, file_type);
    if (this.props.home.handleDropError) {
      Swal.fire({
        icon: 'error',
        title: this.props.home.handleDropError,
      });
    } else {
      const layer = GmapService.get('main').gmap.createLayer(
        this.props.home.file.name,
        this.props.home.result,
      );
      this.props.actions.addLayer(layer);
    }
  }

  render() {
    return (
      <Fragment>
        <DragAndDrop handleDrop={this.handleDrop.bind(this)}>
          <Map></Map>
        </DragAndDrop>
        <Layer></Layer>
        <Uploader></Uploader>
        <Loader
          className="loader"
          type="ThreeDots"
          visible={this.props.home.handleDropPending}
          color="#2BAD60"
          height="100"
          width="100"
        />
      </Fragment>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    home: state.home,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, addLayer }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
