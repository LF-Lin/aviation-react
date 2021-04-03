import { StaticMap, MapContext } from 'react-map-gl';
import DeckGL from 'deck.gl';
import FlowMapLayer from '@flowmap.gl/core';
import { useState } from 'react';

const MAPBOX_TOKEN =
  'pk.eyJ1IjoibG9uZ2ZlaTEiLCJhIjoiY2ttNXRmY2lhMGdrcjJwcXQ4OHcxc29yeiJ9.q1GlW7GMCWIII9bkzerOfw';

const FlightFlow = ({ networkData }) => {
  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude: 40.0838,
    longitude: 116.6095,
    zoom: 2,
  });

  const layers = [
    new FlowMapLayer({
      id: 'my-flowmap-layer',
      locations: networkData.nodes,
      flows: networkData.flows,
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
      style={{
        height: '500px',
        width: '1200px',
        position: 'relative',
        marginBottom: '50px',
      }}
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
