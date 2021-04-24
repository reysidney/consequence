import React, { Component } from 'react';
import UploaderDiv from './UploaderDiv';

export default class Uploader extends Component {
  items = ['CSV | EXCEL', 'KML | KMZ', 'SHP'];
  exts = ['.csv,.xls,.xlsx', '.kml,.kmz', '.zip'];

  render() {
    return <UploaderDiv items={this.items} exts={this.exts}></UploaderDiv>;
  }
}
