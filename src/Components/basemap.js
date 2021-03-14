import React from 'react';
import { StaticMap } from 'react-map-gl';
import airportData from '../asset/airports.json';

const MAPBOX_ACCESS_TOKEN =
  'pk.eyJ1IjoibG9uZ2ZlaTEiLCJhIjoiY2ttNXRmY2lhMGdrcjJwcXQ4OHcxc29yeiJ9.q1GlW7GMCWIII9bkzerOfw';

const airportGeoInfo = airportData;

export function BaseMap({ data = airportGeoInfo, radius = 200 }) {
  return <h1>Hello World!</h1>;
}
