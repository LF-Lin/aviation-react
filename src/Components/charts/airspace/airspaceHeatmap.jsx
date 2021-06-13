import axios from 'axios';
import DeckGL from '@deck.gl/react';
import { useState, useEffect } from 'react';
import { GeoJsonLayer } from '@deck.gl/layers';
import { HeatmapLayer } from '@deck.gl/aggregation-layers';
import { StaticMap } from 'react-map-gl';
import { Button } from 'antd';

const MAP_STYLE = 'mapbox://styles/mapbox/dark-v9';
const MAPBOX_TOKEN =
  'pk.eyJ1IjoibG9uZ2ZlaTEiLCJhIjoiY2ttNXRmY2lhMGdrcjJwcXQ4OHcxc29yeiJ9.q1GlW7GMCWIII9bkzerOfw';

const heatMapStyle = {
  height: '80vh',
  position: 'relative',
};

const refreshBtnStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100px',
  zIndex: 999,
};

const AirspaceHeatMap = () => {
  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude: 40.0838,
    longitude: 116.6095,
    zoom: 3,
    minZoom: 3,
  });
  const [airspaceData, setAirspaceData] = useState(null);
  const [airspaceHeatData, setAirspaceHeatData] = useState(null);
  const [refreshFlag, setRefreshFlag] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `http://localhost:5555/api/chart/airspace_heat`
      );
      console.log('airspace_heat fetch', res.data);
      setAirspaceHeatData(res.data);
    };
    fetchData();
  }, [refreshFlag]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `http://localhost:5555/api/chart/airspace_geo`
      );
      console.log('airspace_geo', res.data);
      setAirspaceData(res.data);
    };
    fetchData();
  }, []);

  const handleRefreshBtn = () => {
    setAirspaceHeatData(null);
    setRefreshFlag(!refreshFlag);
  };

  const layers = [
    new GeoJsonLayer({
      id: 'geojson',
      data: airspaceData,
      pickable: true,
      opacity: 0.04,
      stroked: true,
      filled: true,
      lineWidthMinPixels: 2,
      getFillColor: [179, 177, 177],
      getLineColor: [255, 255, 255],
    }),
    new HeatmapLayer({
      id: 'heatmp-layer',
      data: airspaceHeatData,
      pickable: false,
      getPosition: (d) => [d['longitude'], d['latitude']],
      getWeight: (d) => d['count'],
      aggregation: 'SUM',
      radiusPixels: 20,
      intensity: 3,
      threshold: 0.01,
    }),
  ];

  return (
    <>
      <Button
        type="primary"
        loading={airspaceHeatData ? false : true}
        style={refreshBtnStyle}
        onClick={handleRefreshBtn}
      >
        Refresh
      </Button>
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
    </>
  );
};

export default AirspaceHeatMap;