import axios from 'axios';
import DeckGL from '@deck.gl/react';
import { useState, useEffect } from 'react';
import { GeoJsonLayer } from '@deck.gl/layers';
import { HeatmapLayer } from '@deck.gl/aggregation-layers';
import { StaticMap } from 'react-map-gl';
import { Button, Switch } from 'antd';
import IconLayer from '../../layers/flightIconLayer';

const MAP_STYLE = 'mapbox://styles/mapbox/dark-v9';
const MAPBOX_TOKEN =
  'pk.eyJ1IjoibG9uZ2ZlaTEiLCJhIjoiY2ttNXRmY2lhMGdrcjJwcXQ4OHcxc29yeiJ9.q1GlW7GMCWIII9bkzerOfw';

const heatMapStyle = {
  height: '80vh',
  position: 'relative',
};

const refreshBtnStyle = {
  position: 'absolute',
  top: '10px',
  left: '10px',
  width: '120px',
  zIndex: 999,
};

const singleAirspaceBtnStyle = {
  position: 'absolute',
  top: '10px',
  left: '10px',
  width: '120px',
  zIndex: 999,
};

const switchStyle = {
  position: 'absolute',
  top: '50px',
  left: '10px',
  width: '120px',
  zIndex: 999,
};

const AirspaceHeatMap = () => {
  const [viewport, setViewport] = useState({
    latitude: 37.0838,
    longitude: 116.6095,
    zoom: 3,
    minZoom: 3,
  });
  const [airspaceData, setAirspaceData] = useState(null);
  const [airspaceHeatData, setAirspaceHeatData] = useState(null);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [showHeatMap, setShowHeatMap] = useState(false);
  const [singleAirspaceData, setSingleAirspaceData] = useState(null);
  const [showSingleAirspace, setShowSingleAirspace] = useState(false);
  const [flights, setFlights] = useState(null);
  const [selectedAirspaceIndex, setSelectedAirspaceIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `http://localhost:5555/api/chart/airspace/heat`
      );
      console.log('airspace_heat fetch', res.data);
      setAirspaceHeatData(res.data);
    };
    fetchData();
  }, [refreshFlag]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `http://localhost:5555/api/chart/airspace/geo`
      );
      console.log('airspace_geo', res.data);
      setAirspaceData(res.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedAirspaceIndex) {
      const fetchData = async () => {
        const res = await axios.get(
          `http://localhost:5555/api/chart/airspace/${selectedAirspaceIndex}/flights`
        );
        console.log('flights_in_airspace', res.data);
        setFlights(res.data);
      };
      fetchData();
    }
  }, [selectedAirspaceIndex]);

  const handleRefreshBtn = () => {
    setAirspaceHeatData(null);
    setRefreshFlag(!refreshFlag);
  };

  const handleAirspaceClick = (e, info) => {
    setSingleAirspaceData(e.object);
    setShowSingleAirspace(true);
    setShowHeatMap(false);
    setSelectedAirspaceIndex(e.index);
    setViewport({
      latitude: e.coordinate[1],
      longitude: e.coordinate[0],
      zoom: 5,
      transitionDuration: 500,
    });
  };

  const handleSwitchChange = (e) => {
    setShowHeatMap(e);
  };

  const handleShowAllBtn = () => {
    setShowSingleAirspace(false);
    setFlights(null);
    setViewport({
      latitude: 37.0838,
      longitude: 116.6095,
      zoom: 3,
      minZoom: 3,
      transitionDuration: 500,
    });
  };

  const layers = [
    new GeoJsonLayer({
      id: 'geojson',
      data: showSingleAirspace ? singleAirspaceData : airspaceData,
      pickable: showSingleAirspace ? false : true,
      opacity: 0.04,
      stroked: true,
      filled: true,
      lineWidthMinPixels: 2,
      getFillColor: [179, 177, 177],
      getLineColor: [255, 255, 255],
      onClick: handleAirspaceClick,
      autoHighlight: true,
      highlightColor: [255, 255, 255, 128],
    }),

    showHeatMap &&
      new HeatmapLayer({
        id: 'heatmap-layer',
        data: airspaceHeatData,
        pickable: false,
        getPosition: (d) => [d['longitude'], d['latitude']],
        getWeight: (d) => d['count'],
        aggregation: 'SUM',
        radiusPixels: 20,
        intensity: 3,
        threshold: 0.01,
      }),

    flights && IconLayer({ flights, handleFlightClick: null }),
  ];

  return (
    <>
      {showSingleAirspace ? (
        <Button
          type="primary"
          shape="round"
          style={singleAirspaceBtnStyle}
          onClick={handleShowAllBtn}
        >
          Show all
        </Button>
      ) : (
        <Button
          type="primary"
          shape="round"
          loading={airspaceHeatData ? false : true}
          style={refreshBtnStyle}
          onClick={handleRefreshBtn}
        >
          Refresh
        </Button>
      )}

      <Switch
        checkedChildren="Open heatmap"
        unCheckedChildren="Close heatmap"
        style={switchStyle}
        checked={showHeatMap}
        onChange={handleSwitchChange}
      />

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
