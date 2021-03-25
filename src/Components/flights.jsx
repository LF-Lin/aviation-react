import 'antd/dist/antd.css';

import React, { useState, useEffect } from 'react';
import { useDebounce } from 'react-use';
import { Layout } from 'antd';
import {
  NavigationControl,
  FullscreenControl,
  StaticMap,
  MapContext,
} from 'react-map-gl';
import DeckGL from 'deck.gl';
import { WebMercatorViewport } from '@deck.gl/core';
import axios from 'axios';

import iconLayer from './layers/flightIconLayer';
import iconPathLayer from './layers/flightIconPathLayer';
import FlightPopup from './flightPopup';
import FlightPathPopup from './flightPathPopup';

const { Content } = Layout;

const fullscreenStyle = {
  position: 'absolute',
  top: 36,
  left: 0,
  padding: '10px',
};
const navStyle = {
  position: 'absolute',
  top: 72,
  left: 0,
  padding: '10px',
};

const MAPBOX_TOKEN =
  'pk.eyJ1IjoibG9uZ2ZlaTEiLCJhIjoiY2ttNXRmY2lhMGdrcjJwcXQ4OHcxc29yeiJ9.q1GlW7GMCWIII9bkzerOfw';

const Flights = () => {
  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude: 40.0838,
    longitude: 116.6095,
    zoom: 6,
  });

  const [flights, setFlights] = useState([]);
  const [bounding, setBounding] = useState(null);
  const [popupInfo, setPopupInfo] = useState(null);
  const [popupPathInfo, setPopupPathInfo] = useState(null);
  const [selectedFlight, setSelectedFlight] = useState();
  const [flightPanelInfo, setFlightPanelInfo] = useState([]);
  const [activeLayer, setActiveLayer] = useState('iconLayer');

  // fetch all flights in current bounding box
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `http://localhost:5555/api/flights/${bounding}`
      );
      setFlights(res.data);
      console.log('fetch bounding box finished: ', res.data);
    };
    fetchData();
  }, [bounding]);

  // fetch detail info of selected flight
  useEffect(() => {
    if (selectedFlight) {
      const fetchData = async () => {
        const res = await axios.get(
          `http://localhost:5555/api/flight/${selectedFlight}`
        );
        setFlightPanelInfo(res.data);
        console.log(`fetch detail of ${selectedFlight}: `, res.data);
      };
      fetchData();
    }
  }, [selectedFlight]);

  const [, cancel] = useDebounce(
    () => {
      console.log('view state has been stable for 1000 ms');
      const vp = new WebMercatorViewport(viewport);
      const nw = vp.unproject([0, 0]);
      const se = vp.unproject([vp.width, vp.height]);
      setBounding(`${nw[1]}%2C${se[1]}%2C${nw[0]}%2C${se[0]}`);
    },
    1000,
    [viewport]
  );

  const handleViewStateChange = (e) => {
    setViewport(e.viewState);
  };

  const handleFlightClick = (info) => {
    if (info.picked) {
      setPopupInfo(info);
      setSelectedFlight(info.object.flight_id);
    }
  };
  const handleFlightPathClick = (info) => {
    if (info.picked) {
      setPopupPathInfo(info);
    }
  };

  const layers = [
    activeLayer === 'iconLayer'
      ? iconLayer({ flights, handleFlightClick })
      : iconPathLayer({ flightPanelInfo, handleFlightPathClick }),
  ];

  return (
    <Layout>
      <Content style={{ position: 'relative' }}>
        {true && (
          <DeckGL
            key="basicGL"
            initialViewState={viewport}
            controller={true}
            layers={layers}
            ContextProvider={MapContext.Provider}
            style={{ height: '92vh' }}
            onViewStateChange={handleViewStateChange}
          >
            {popupInfo && (
              <FlightPopup
                popupInfo={popupInfo}
                flightPanelInfo={flightPanelInfo}
                setPopupInfo={setPopupInfo}
                setActiveLayer={setActiveLayer}
              />
            )}
            {popupPathInfo && (
              <FlightPathPopup
                popupPathInfo={popupPathInfo}
                setPopupPathInfo={setPopupPathInfo}
                setActiveLayer={setActiveLayer}
              />
            )}
            <StaticMap
              key="staticMap"
              mapStyle="mapbox://styles/mapbox/dark-v9"
              mapboxApiAccessToken={MAPBOX_TOKEN}
              ContextProvider={MapContext.Provider}
            />
            <FullscreenControl style={fullscreenStyle} />
            <NavigationControl style={navStyle} />
          </DeckGL>
        )}
      </Content>
    </Layout>
  );
};

export { Flights };
