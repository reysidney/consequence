import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Divider from '@material-ui/core/Divider';
import Zoom from '@material-ui/core/Zoom';
import Swal from 'sweetalert2';
import GmapService from '../common/_services/gmap.service';

export default class UploaderDialog extends Component {
  static propTypes = {
    submit: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
  };

  Transition = React.forwardRef(function Transition(props, ref) {
    return <Zoom ref={ref} {...props} />;
  });

  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    if (event.target.files.length > 0) {
      let file = event.target.files[0];
      let ext = this.props.ext;
      let file_type = ['csv', 'xls', 'xlsx'].indexOf(ext) > -1 ? 'file-non-geo' : 'file';
      this.props.change(file, file_type);
    }
  }

  async handleSubmit() {
    await this.props.submit(this.props.file, this.props.file_type);
    if (this.props.file_error) {
      Swal.fire({
        icon: 'error',
        title: this.props.file_error,
      });
    } else {
      const layer = GmapService.get('main').gmap.createLayer(
        this.props.file.name,
        this.props.result,
      );
      this.props.addLayer(layer);
      this.props.close();
    }
  }

  close() {
    this.props.close();
  }

  render() {
    return (
      <Dialog
        open={this.props.show}
        onClose={this.close}
        TransitionComponent={this.Transition}
        fullWidth={true}
        maxWidth="sm"
        aria-labelledby="upload-dialog"
      >
        <DialogTitle id="upload-dialog">
          Uploader
          <IconButton className="close-icon" onClick={this.close}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider className="divider" />
        <DialogContent style={{ padding: '20px' }}>
          <Button variant="contained" component="label">
            Choose File
            <input
              type="file"
              onChange={this.handleChange}
              accept={this.props.ext}
              className="hide"
            />
          </Button>
          <label className="float-right">{this.props.file ? this.props.file.name : ''}</label>
        </DialogContent>
        <Divider variant="middle" />
        <DialogActions>
          <Button onClick={this.handleSubmit} color="primary" variant="contained">
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
