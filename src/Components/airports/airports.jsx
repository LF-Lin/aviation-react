import 'antd/dist/antd.css';

import React, { useState } from 'react';
import { Layout, Button } from 'antd';
import {
  NavigationControl,
  FullscreenControl,
  StaticMap,
  MapContext,
  Popup,
} from 'react-map-gl';
import DeckGL from 'deck.gl';
import AirportPanel from './airportPanel';
import AirportFlightPopup from './airportSchedulePopup';
import AirportMenu from './airportMenu';
import iconLayer from '../layers/airportIconLayer';
import arcLayer from '../layers/airportArcLayer';

import AirportLoc from '../../asset/airports.json';
import Airport from '../../asset/airport.png';
const { Content } = Layout;

const fullscreenStyle = {
  position: 'absolute',
  top: 36,
  left: 20,
  padding: '10px',
};
const navStyle = {
  position: 'absolute',
  top: 72,
  left: 20,
  padding: '10px',
};

const airportMenuStyle = {
  position: 'absolute',
  top: 6,
  left: 30,
  width: '250px',
  zIndex: 999,
};

const MAPBOX_TOKEN =
  'pk.eyJ1IjoibG9uZ2ZlaTEiLCJhIjoiY2ttNXRmY2lhMGdrcjJwcXQ4OHcxc29yeiJ9.q1GlW7GMCWIII9bkzerOfw';

export function Airports() {
  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude: 40.0838,
    longitude: 116.6095,
    zoom: 5,
  });
  const [popupInfo, setPopupInfo] = useState(null);
  const [popupFlightInfo, setPopupFlightInfo] = useState(false);
  const [airportArrival, setAirportArrival] = useState();
  const [activeLayer, setActiveLayer] = useState('iconLayer');
  const [airportLocation, setAirportLocation] = useState(AirportLoc);
  const [searchFilter, setSearchFilter] = useState(false);

  const handleAirportClick = (info) => {
    if (info.picked) {
      setViewport({
        latitude: info.object.latitude,
        longitude: info.object.longitude,
        zoom: 6.5,
        transitionDuration: 500,
      });
      setPopupInfo(info);
    }
  };

  const handleArcClick = (info) => {
    if (info.picked) {
      console.log('handleArcClick', info);
      setPopupFlightInfo(info);
    }
  };
  const handleAirportSearch = (e) => {
    var keyword = e.toUpperCase();
    const filteredAirportLoc = AirportLoc.map((ap) => {
      const reg = RegExp(keyword);
      if (
        reg.exec(ap.city) ||
        reg.exec(ap.airport_name) ||
        reg.exec(ap.airport_iata)
      ) {
        return ap;
      }
    });
    setAirportLocation(filteredAirportLoc.filter(Boolean));
    setSearchFilter(true);
  };
  const handleClearBtn = () => {
    setAirportLocation(AirportLoc);
    setSearchFilter(false);
  };
  const layers = [
    activeLayer === 'iconLayer'
      ? iconLayer({ airportLocation, Airport, handleAirportClick })
      : arcLayer({ airportArrival, handleArcClick }),
  ];

  return (
    <Layout>
      <Content style={{ position: 'relative' }}>
        {!searchFilter && !popupInfo && activeLayer === 'iconLayer' && (
          <AirportMenu handleAirportSearch={handleAirportSearch} />
        )}
        {searchFilter && activeLayer === 'iconLayer' && (
          <Button
            type="primary"
            block
            style={airportMenuStyle}
            onClick={handleClearBtn}
          >
            Clear search results
          </Button>
        )}
        <DeckGL
          key="basicGL"
          initialViewState={viewport}
          controller={true}
          layers={layers}
          ContextProvider={MapContext.Provider}
          style={{ height: '92vh' }}
        >
          {popupInfo && (
            <Popup
              tipSize={5}
              anchor="top"
              longitude={popupInfo.object.longitude}
              latitude={popupInfo.object.latitude}
              closeOnClick={false}
              onClose={setPopupInfo}
            >
              <AirportPanel
                info={popupInfo}
                setViewport={setViewport}
                setPopupInfo={setPopupInfo}
                setAirportArrival={setAirportArrival}
                setActiveLayer={setActiveLayer}
              />
            </Popup>
          )}

          {popupFlightInfo && (
            <AirportFlightPopup
              info={popupFlightInfo}
              airportGeo={airportArrival.airportGeo}
              setPopupFlightInfo={setPopupFlightInfo}
              setActiveLayer={setActiveLayer}
              setPopupInfo={setPopupInfo}
              setViewport={setViewport}
            />
          )}
          <StaticMap
            key="staticMap"
            mapStyle="mapbox://styles/mapbox/dark-v9"
            // mapStyle="https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json"
            mapboxApiAccessToken={MAPBOX_TOKEN}
            ContextProvider={MapContext.Provider}
          />
          <FullscreenControl style={fullscreenStyle} />
          <NavigationControl style={navStyle} />
        </DeckGL>
      </Content>
    </Layout>
  );
}
