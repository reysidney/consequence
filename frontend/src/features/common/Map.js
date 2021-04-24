import React, { Component } from 'react';
import Gmap from './_utils/gmap';
import GmapService from './_services/gmap.service';
import { GoogleMap } from '@react-google-maps/api';

export default class Map extends Component {
  static propTypes = {};

  constructor() {
    super();
    this.gmap = new Gmap();
  }

  render() {
    return (
      <div className="common-map">
        <GoogleMap
          id="gmap"
          onLoad={map => {
            map.setOptions(this.gmap.getMapOptions());
            this.gmap.setMap(map);
            GmapService.add('main', this.gmap);
          }}
        />
      </div>
    );
  }
}
