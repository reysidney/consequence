import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CloudUpload from '@material-ui/icons/CloudUpload';
import UploaderDialog from './UploaderDialog';
import { addLayer } from '../layer/redux/actions';
import Loader from 'react-loader-spinner';

export class UploaderDiv extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    exts: PropTypes.array.isRequired,
    uploader: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  createListItem(key, label) {
    return (
      <ListItem key={key} className="list-item">
        <ListItemText className="list-item-text" primary={label} />
        <ListItemIcon className="list-item-icon">
          <CloudUpload
            onClick={e => {
              this.props.actions.openDialog(this.props.exts[key]);
            }}
          ></CloudUpload>
        </ListItemIcon>
      </ListItem>
    );
  }

  listItems() {
    if (this.props.items) {
      return this.props.items.map((item, key) => {
        return this.createListItem(key, item);
      });
    }
  }

  render() {
    return (
      <Fragment>
        <Loader
          className="loader"
          type="ThreeDots"
          visible={this.props.uploader.submitFilePending}
          color="#2BAD60"
          height="100"
          width="100"
        />
        <div className="uploader-div">
          <List component="nav" className="list">
            {this.listItems()}
          </List>
          <UploaderDialog
            file={this.props.uploader.file}
            file_type={this.props.uploader.file_type}
            ext={this.props.uploader.ext}
            result={this.props.uploader.result}
            show={this.props.uploader.showDialog}
            close={this.props.actions.closeDialog}
            submit={this.props.actions.submitFile}
            change={this.props.actions.changeFile}
            file_error={this.props.uploader.submitFileError}
            addLayer={this.props.actions.addLayer}
          />
        </div>
      </Fragment>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    uploader: state.uploader,
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
)(UploaderDiv);
