import 'antd/dist/antd.css';

import React, { useState } from 'react';
import { Layout } from 'antd';
import ReactMapGL, {
  NavigationControl,
  FullscreenControl,
  StaticMap,
  MapContext,
  Popup,
} from 'react-map-gl';
import DeckGL, { IconLayer } from 'deck.gl';
import { WebMercatorViewport } from '@deck.gl/core';
import Pins from './pins';
import AirportInfo from './airportInfo';

import AirportGeo from '../asset/airports.json';
import Airport from '../asset/airport.png';

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

export function Airports() {
  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude: 40.0838,
    longitude: 116.6095,
    zoom: 5,
  });
  const [popupInfo, setPopupInfo] = useState(null);

  const handleViewStateChange = (e) => {
    setViewport(e.viewState);
  };

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

  const layers = [
    new IconLayer({
      id: 'airplanes',
      data: AirportGeo,
      pickable: true,
      iconAtlas: Airport,
      iconMapping: {
        airport_name: {
          x: 0,
          y: 0,
          width: 200,
          height: 200,
          mask: true,
          anchorY: 200,
        },
      },
      sizeScale: 40,
      getPosition: (d) => [d.longitude, d.latitude],
      getIcon: (d) => 'airport_name',
      getColor: (d) => [85, 255, 0],
    }),
  ];

  return (
    <Layout>
      <Content style={{ position: 'relative' }}>
        <DeckGL
          initialViewState={viewport}
          controller={true}
          layers={layers}
          ContextProvider={MapContext.Provider}
          style={{ height: '92vh' }}
          onViewStateChange={handleViewStateChange}
          onClick={handleAirportClick}
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
              <AirportInfo info={popupInfo} />
            </Popup>
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
      </Content>
    </Layout>
  );
}
