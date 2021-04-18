import 'antd/dist/antd.css';

import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';

import Networks from './networks/networks';
import Graph from './graph';
import Airspace from './airspace/airspace';

const { Sider, Content } = Layout;

export function Charts() {
  const [current, setCurrent] = useState('chart1');

  const handleClick = (e) => {
    setCurrent(e.key);
  };
  return (
    <Router>
      <Layout>
        <Sider theme="light">
          <Menu mode="inline" selectedKeys={[current]} onClick={handleClick}>
            <Menu.Item key="chart1" icon={<UserOutlined />}>
              空中交通网络分析
              <Link to="/charts" />
            </Menu.Item>
            <Menu.Item key="chart2" icon={<VideoCameraOutlined />}>
              空域复杂度分析
              <Link to="/charts/chart2" />
            </Menu.Item>
            <Menu.Item key="graph" icon={<UploadOutlined />}>
              chart 3
              <Link to="/charts/graph" />
            </Menu.Item>
          </Menu>
        </Sider>

        <Content style={{ position: 'relative', height: '3000px' }}>
          <Route exact path="/charts" component={Networks} />
          <Route path="/charts/chart2" component={Airspace} />
          <Route path="/charts/graph" component={Graph} />
        </Content>
      </Layout>
    </Router>
  );
}
