import { useState } from 'react';
import FlowMap, { LegendBox, LocationTotalsLegend } from '@flowmap.gl/react';

const MAPBOX_TOKEN =
  'pk.eyJ1IjoibG9uZ2ZlaTEiLCJhIjoiY2ttNXRmY2lhMGdrcjJwcXQ4OHcxc29yeiJ9.q1GlW7GMCWIII9bkzerOfw';

const DARK_COLORS = {
  darkMode: true,
  flows: {
    scheme: [
      'rgb(0, 22, 61)',
      'rgb(0, 27, 62)',
      'rgb(0, 36, 68)',
      'rgb(0, 48, 77)',
      'rgb(3, 65, 91)',
      'rgb(48, 87, 109)',
      'rgb(85, 115, 133)',
      'rgb(129, 149, 162)',
      'rgb(179, 191, 197)',
      'rgb(240, 240, 240)',
    ],
  },
  locationAreas: {
    normal: '#334',
  },
  outlineColor: '#000',
};

const tooltipStyle = {
  position: 'absolute',
  pointerEvents: 'none',
  zIndex: 1,
  background: '#125',
  color: '#fff',
  fontSize: 9,
  borderRadius: 4,
  padding: 5,
  maxWidth: 300,
  maxHeight: 300,
  overflow: 'hidden',
  boxShadow: '2px 2px 4px #ccc',
};

const FlightFlow = ({ networkData }) => {
  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude: 40.0838,
    longitude: 116.6095,
    zoom: 2,
  });
  const [tooltip, setTooltip] = useState(undefined);

  const renderTooltip = () => {
    if (!tooltip) {
      return null;
    }
    const { object, x, y } = tooltip;
    if (!object) {
      return null;
    }
    return (
      <pre
        style={{
          ...tooltipStyle,
          left: x,
          top: y,
        }}
      >
        {JSON.stringify(object, null, 2)}
      </pre>
    );
  };

  return (
    <>
      <FlowMap
        initialViewState={{ ...viewport }}
        flows={networkData.flows}
        locations={networkData.nodes}
        getLocationId={(loc) => loc.id}
        getLocationCentroid={(loc) => [loc.lon, loc.lat]}
        getFlowOriginId={(flow) => flow.source}
        getFlowDestId={(flow) => flow.target}
        getFlowMagnitude={(flow) => flow.count / 100 || 0}
        mixBlendMode="screen"
        colors={DARK_COLORS}
        pickable={true}
        showTotals={true}
        mapboxAccessToken={MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/dark-v10"
      />
      <LegendBox bottom={35} left={10}>
        <LocationTotalsLegend colors={DARK_COLORS} />
      </LegendBox>
    </>
  );
};

export default FlightFlow;
