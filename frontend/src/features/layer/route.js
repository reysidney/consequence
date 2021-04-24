// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  Layer,
} from './';

export default {
  path: 'layer',
  name: 'Layer',
  childRoutes: [
    { path: 'layer', name: 'Layer', component: Layer, isIndex: true },
  ],
};
