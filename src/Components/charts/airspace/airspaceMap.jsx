import DeckGL from 'deck.gl';
import { GeoJsonLayer } from '@deck.gl/layers';
import React, { useState } from 'react';
import { StaticMap, MapContext } from 'react-map-gl';

const MAPBOX_TOKEN =
  'pk.eyJ1IjoibG9uZ2ZlaTEiLCJhIjoiY2ttNXRmY2lhMGdrcjJwcXQ4OHcxc29yeiJ9.q1GlW7GMCWIII9bkzerOfw';
const MAP_STYLE = 'mapbox://styles/mapbox/dark-v10';

const AirspaceMap = ({ airspaceData }) => {
  // console.log('airspaceData', airspaceData);
  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude: 38,
    longitude: 103,
    zoom: 3,
  });

  const handleAirspaceClick = (e, info) => {
    console.log(e.object);
  };

  const getTooltip = ({ object }) => {
    return (
      object && {
        html: `\
              <div>${object.properties.name}</div>
              `,
      }
    );
  };

  const layers = [
    new GeoJsonLayer({
      id: 'geojson',
      data: airspaceData,
      pickable: true,
      opacity: 0.5,
      stroked: true,
      filled: true,
      lineWidthMinPixels: 2,
      getFillColor: [179, 177, 177],
      getLineColor: [255, 255, 255],
      onClick: handleAirspaceClick,
    }),
  ];

  return (
    <DeckGL
      layers={layers}
      initialViewState={viewport}
      controller={true}
      getTooltip={getTooltip}
    >
      <StaticMap
        reuseMaps
        mapStyle={MAP_STYLE}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        ContextProvider={MapContext.Provider}
        preventStyleDiffing={true}
      />
    </DeckGL>
  );
};

export default AirspaceMap;
