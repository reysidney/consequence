import map_styles from '../../../json/map_styles.json';

/*global google*/

export default class Gmap {
  map;
  defaultZoom;
  defaultLatlng;
  defaultMinZoom;
  defaultMaxZoom;

  constructor() {
    this.defaultZoom = 2;
    this.defaultMinZoom = 2;
    this.defaultMaxZoom = 23;
    this.defaultLatlng = new google.maps.LatLng(0, 0);
  }

  createMap(mapElement) {
    this.map = new google.maps.Map(mapElement, this.getMapOptions());
    return this.map;
  }

  setMap(map) {
    this.map = map;
  }

  getMapOptions() {
    const mapOptions = {
      zoom: this.defaultZoom,
      minZoom: this.defaultMinZoom,
      maxZoom: this.defaultMaxZoom,
      center: this.defaultLatlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      fullscreenControl: false,
      gestureHandling: 'greedy',
      mapTypeControl: false,
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_BOTTOM,
      },
      streetViewControl: true,
      streetViewControlOptions: {
        position: google.maps.ControlPosition.RIGHT_BOTTOM,
      },
      scaleControl: true,
      clickableIcons: false,
      rotateControl: true,
      styles: map_styles,
    };
    return mapOptions;
  }

  centerMap() {
    this.map.setCenter(this.defaultLatlng);
    this.map.setZoom(this.defaultZoom);
  }

  createLatLng(lat, lng) {
    return new google.maps.LatLng({
      lat: parseFloat(lat),
      lng: parseFloat(lng),
    });
  }

  createMarker(map, latlng, markerImg = null, title = null, draggable = null) {
    const marker = new google.maps.Marker({
      position: latlng,
      map: map,
      icon: markerImg,
      title: title,
      draggable: draggable,
    });
    return marker;
  }

  createMarkerImage(url, size, origin, anchor) {
    if (url) {
      const image = {
        url: url,
        scaledSize: size,
        origin: origin,
        anchor: anchor,
      };
      return image;
    } else {
      return url;
    }
  }

  createMarkerImageDefault(icon) {
    let size = 16;

    return this.createMarkerImage(
      icon,
      new google.maps.Size(size, size),
      new google.maps.Point(0, 0),
      new google.maps.Point(size / 2, size),
    );
  }

  createInfoWindow(map, marker, contentString, isOpen) {
    let infoWindow = new google.maps.InfoWindow({
      content: contentString,
      pixelOffset: new google.maps.Size(0, -15),
    });

    if (isOpen && marker) {
      infoWindow.open(map, marker);
    }

    if (marker) {
      google.maps.event.addListener(marker, 'click', () => {
        infoWindow.open(map, marker);
      });
    }
    return infoWindow;
  }

  createLayer(name, geojson) {
    let layer = {};
    layer.name = name;
    if (geojson) {
      layer.geom = new google.maps.Data();
      layer.geom.addGeoJson(geojson);
    }
    layer.map = this.map;
    layer.show = () => {
      if (layer.geom && layer.checked) {
        layer.geom.setMap(layer.map);
      }
    };
    layer.hide = () => {
      if (layer.geom) {
        layer.geom.setMap(null);
      }
    };
    layer.checked = true;
    layer.show();
    this.changeBoundBox(geojson.bbox, layer.map);
    return layer;
  }

  changeBoundBox(bbox, map) {
    if (!bbox) return;
    let sw;
    let ne;
    if (bbox.length > 4) {
      sw = new google.maps.LatLng(bbox[1], bbox[0]);
      ne = new google.maps.LatLng(bbox[4], bbox[3]);
    } else {
      sw = new google.maps.LatLng(bbox[1], bbox[0]);
      ne = new google.maps.LatLng(bbox[3], bbox[2]);
    }
    let bounds = new google.maps.LatLngBounds(sw, ne);
    map.fitBounds(bounds);
  }

  latLng2Point(latLng) {
    let map = this.map;
    let topRight = map.getProjection().fromLatLngToPoint(map.getBounds().getNorthEast());
    let bottomLeft = map.getProjection().fromLatLngToPoint(map.getBounds().getSouthWest());
    let scale = Math.pow(2, map.getZoom());
    let worldPoint = map.getProjection().fromLatLngToPoint(latLng);
    return new google.maps.Point(
      (worldPoint.x - bottomLeft.x) * scale,
      (worldPoint.y - topRight.y) * scale,
    );
  }

  point2LatLng(point) {
    let map = this.map;
    let topRight = map.getProjection().fromLatLngToPoint(map.getBounds().getNorthEast());
    let bottomLeft = map.getProjection().fromLatLngToPoint(map.getBounds().getSouthWest());
    let scale = Math.pow(2, map.getZoom());
    let worldPoint = new google.maps.Point(
      point.x / scale + bottomLeft.x,
      point.y / scale + topRight.y,
    );
    return map.getProjection().fromPointToLatLng(worldPoint);
  }

  rad(x) {
    return (x * Math.PI) / 180;
  }

  getDistance(p1, p2) {
    let R = 6378137; // Earth’s mean radius in meter
    let dLat = this.rad(p2.lat() - p1.lat());
    let dLong = this.rad(p2.lng() - p1.lng());
    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.rad(p1.lat())) *
        Math.cos(this.rad(p2.lat())) *
        Math.sin(dLong / 2) *
        Math.sin(dLong / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;
    return d; // returns the distance in meter
  }

  getDistanceInKM(p1, p2) {
    return this.getDistance(p1, p2) / 1000;
  }
}
