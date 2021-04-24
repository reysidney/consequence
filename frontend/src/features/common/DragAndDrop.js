import React, { Component } from 'react';

export default class DragAndDrop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drag: false,
    };

    this.dropRef = React.createRef();
    this.dragCounter = 0;
  }

  handleDrag = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  handleDragIn = e => {
    e.preventDefault();
    e.stopPropagation();
    this.dragCounter++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      this.setState({ drag: true });
    }
  };

  handleDragOut = e => {
    e.preventDefault();
    e.stopPropagation();
    this.dragCounter--;
    if (this.dragCounter === 0) {
      this.setState({ drag: false });
    }
  };

  handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ drag: false });
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      this.props.handleDrop(e.dataTransfer.files);
      e.dataTransfer.clearData();
      this.dragCounter = 0;
    }
  };

  componentDidMount() {
    let div = this.dropRef.current;
    div.addEventListener('dragenter', this.handleDragIn);
    div.addEventListener('dragleave', this.handleDragOut);
    div.addEventListener('dragover', this.handleDrag);
    div.addEventListener('drop', this.handleDrop);
  }

  overlay = () => {
    return (
      <div className="overlay-div">
        <div className="overlay-text">
          <div id="overlay">
            <div id="drag">Drag &amp; Drop</div>
            <div id="view">View your data in Google Map.</div>
            <div id="support">Supports CSV, EXCEL, KML, KMZ, SHP(zipped).</div>
          </div>
        </div>
      </div>
    );
  };

  componentWillUnmount() {
    let div = this.dropRef.current;
    div.removeEventListener('dragenter', this.handleDragIn);
    div.removeEventListener('dragleave', this.handleDragOut);
    div.removeEventListener('dragover', this.handleDrag);
    div.removeEventListener('drop', this.handleDrop);
  }

  render() {
    return (
      <div style={{ display: 'inline-block', position: 'relative' }} ref={this.dropRef}>
        {this.state.drag && this.overlay()}
        {this.props.children}
      </div>
    );
  }
}
