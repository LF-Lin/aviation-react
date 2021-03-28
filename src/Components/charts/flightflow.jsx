import { StaticMap, MapContext } from 'react-map-gl';
import DeckGL from 'deck.gl';
import FlowMapLayer from '@flowmap.gl/core';
import { useState } from 'react';

import flowData from '../../asset/flowmap/flows.json';
import locationsData from '../../asset/flowmap/locations.json';

const MAPBOX_TOKEN =
  'pk.eyJ1IjoibG9uZ2ZlaTEiLCJhIjoiY2ttNXRmY2lhMGdrcjJwcXQ4OHcxc29yeiJ9.q1GlW7GMCWIII9bkzerOfw';

const FlightFlow = () => {
  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude: 40.0838,
    longitude: 116.6095,
    zoom: 6,
  });

  const layers = [
    new FlowMapLayer({
      id: 'my-flowmap-layer',
      locations: locationsData,
      flows: flowData,
      pickable: true,
      showTotals: true,
      //   onHover: handleFlowHover,
      getFlowMagnitude: (flow) => flow.count || 0,
      getFlowOriginId: (flow) => flow.origin,
      getFlowDestId: (flow) => flow.dest,
      getLocationId: (loc) => loc.id,
      getLocationCentroid: (location) => [location.lon, location.lat],
    }),
  ];

  return (
    <DeckGL
      key="basicGL"
      initialViewState={viewport}
      controller={true}
      layers={layers}
      ContextProvider={MapContext.Provider}
      style={{ height: '500px', marginTop: '80px' }}
    >
      <StaticMap
        key="staticMap"
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxApiAccessToken={MAPBOX_TOKEN}
        ContextProvider={MapContext.Provider}
      />
    </DeckGL>
  );
};

export default FlightFlow;
