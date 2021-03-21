import 'antd/dist/antd.css';

import React, { useState, useEffect } from 'react';
import { Layout, Drawer } from 'antd';
import {
  NavigationControl,
  FullscreenControl,
  StaticMap,
  MapContext,
} from 'react-map-gl';
import DeckGL, { IconLayer } from 'deck.gl';
import { WebMercatorViewport } from '@deck.gl/core';
import axios from 'axios';
import { useDebounce } from 'react-use';

import Airplane from '../asset/airplane-icon.jpg';

const { Content } = Layout;
const MAPBOX_TOKEN =
  'pk.eyJ1IjoibG9uZ2ZlaTEiLCJhIjoiY2ttNXRmY2lhMGdrcjJwcXQ4OHcxc29yeiJ9.q1GlW7GMCWIII9bkzerOfw';

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

const Flights = () => {
  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude: 40.0838,
    longitude: 116.6095,
    zoom: 6,
  });

  const [hoverInfo, setHoverInfo] = useState({});
  const [visible, setVisible] = useState(false);
  const [flights, setFlights] = useState([]);
  const [bounding, setBounding] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `http://localhost:5555/api/flights/${bounding}`
      );
      setFlights(res.data);
      // console.log(res.data);
    };
    fetchData();
  }, [bounding]);

  const [, cancel] = useDebounce(
    () => {
      console.log('view state has been stable for 500 ms');
      console.log(viewport);
      const vp = new WebMercatorViewport(viewport);
      const nw = vp.unproject([0, 0]);
      const se = vp.unproject([vp.width, vp.height]);
      // console.log(nw, se);
      setBounding(`${nw[1]}%2C${se[1]}%2C${nw[0]}%2C${se[0]}`);
    },
    500,
    [viewport]
  );

  const handleViewStateChange = (e) => {
    setViewport(e.viewState);
  };

  const handleClick = (info) => {
    if (info.picked) {
      // setViewport({
      //   ...info.viewport,
      //   zoom: 6,
      //   longitude: info.object.longitude,
      //   latitude: info.object.latitude,
      // });
      setHoverInfo(info);
      setVisible(true);
      console.log('fetched flights info: ', info);
    } else {
      setHoverInfo();
      setVisible(false);
    }
  };

  const onClose = () => {
    setVisible(false);
  };

  const layers = [
    new IconLayer({
      id: 'airplanes',
      data: flights,
      pickable: true,
      iconAtlas: Airplane,
      iconMapping: {
        airplane: {
          x: 0,
          y: 0,
          width: 512,
          height: 512,
        },
      },
      sizeScale: 50,
      getPosition: (d) => [d.longitude, d.latitude],
      getAngle: (d) => d.angle,
      getIcon: (d) => 'airplane',
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
          onClick={handleClick}
        >
          <StaticMap
            mapStyle="mapbox://styles/mapbox/dark-v9"
            mapboxApiAccessToken={MAPBOX_TOKEN}
            ContextProvider={MapContext.Provider}
          />
          <FullscreenControl style={fullscreenStyle} />
          <NavigationControl style={navStyle} />
        </DeckGL>
      </Content>
      <Drawer
        width={500}
        title={`Airport Information: ${hoverInfo?.object?.latitude}`}
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <p>{hoverInfo?.object?.latitude}</p>
        <p>{hoverInfo?.object?.longitude}</p>
        <p>{hoverInfo?.object?.airport_arr}</p>
        <p>{hoverInfo?.object?.airport_dep}</p>
        <p>{hoverInfo?.object?.airline}</p>
      </Drawer>
    </Layout>
  );
};

export { Flights };
