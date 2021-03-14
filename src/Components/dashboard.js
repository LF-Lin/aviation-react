import 'antd/dist/antd.css';

import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import MapGL, { NavigationControl, FullscreenControl } from 'react-map-gl';

const { Sider, Content } = Layout;
const MAPBOX_TOKEN =
  'pk.eyJ1IjoibG9uZ2ZlaTEiLCJhIjoiY2ttNXRmY2lhMGdrcjJwcXQ4OHcxc29yeiJ9.q1GlW7GMCWIII9bkzerOfw';
const fullscreenControlStyle = {
  top: 36,
  left: 0,
  padding: '10px',
};

const navStyle = {
  top: 72,
  left: 0,
  padding: '10px',
};

export function Dashboard() {
  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude: 40.0838,
    longitude: 116.6095,
    zoom: 5,
  });

  return (
    <Layout>
      <Sider theme="light">
        <Menu mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            nav 1
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            nav 2
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            nav 3
          </Menu.Item>
        </Menu>
      </Sider>
      <Content>
        <MapGL
          {...viewport}
          width="100%"
          height="91vh"
          mapStyle="mapbox://styles/mapbox/dark-v9"
          onViewportChange={setViewport}
          mapboxApiAccessToken={MAPBOX_TOKEN}
        >
          <FullscreenControl style={fullscreenControlStyle} />
          <NavigationControl style={navStyle} />
        </MapGL>
      </Content>
    </Layout>
  );
}
