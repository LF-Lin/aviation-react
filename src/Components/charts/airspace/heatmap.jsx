import { StaticMap } from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import { useState } from 'react';
import { HeatmapLayer } from '@deck.gl/aggregation-layers';

const MAP_STYLE = 'mapbox://styles/mapbox/dark-v9';
const MAPBOX_TOKEN =
  'pk.eyJ1IjoibG9uZ2ZlaTEiLCJhIjoiY2ttNXRmY2lhMGdrcjJwcXQ4OHcxc29yeiJ9.q1GlW7GMCWIII9bkzerOfw';

const heatMapStyle = {
  height: '80vh',
  position: 'relative',
};

const mockData =
  'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/screen-grid/uber-pickup-locations.json';

const AirspaceHeatMap = ({ data }) => {
  //   console.log('heat', data);
  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude: 40.0838,
    longitude: 116.6095,
    zoom: 3,
  });

  const layers = [
    new HeatmapLayer({
      id: 'heatmp-layer',
      data: data,
      pickable: false,
      getPosition: (d) => [d['longitude'], d['latitude']],
      getWeight: (d) => d['count'],
      aggregation: 'SUM',
      radiusPixels: 25,
      intensity: 3,
      threshold: 0.01,
    }),
  ];

  return (
    <DeckGL
      initialViewState={viewport}
      controller={true}
      layers={layers}
      style={heatMapStyle}
    >
      <StaticMap
        reuseMaps
        mapStyle={MAP_STYLE}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        preventStyleDiffing={true}
      />
    </DeckGL>
  );
};

export default AirspaceHeatMap;
