import 'antd/dist/antd.css';

import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';

import Graph from './charts/graph';
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
              chart 1
              <Link to="/charts" />
            </Menu.Item>
            <Menu.Item key="chart2" icon={<VideoCameraOutlined />}>
              chart 2
              <Link to="/charts/chart2" />
            </Menu.Item>
            <Menu.Item key="graph" icon={<UploadOutlined />}>
              chart 3
              <Link to="/charts/graph" />
            </Menu.Item>
          </Menu>
        </Sider>
        <Content>
          <Route exact path="/charts">
            <h2>{'Chart 1'}</h2>
          </Route>
          <Route path="/charts/chart2">
            <h2>{'Chart 2'}</h2>
          </Route>
          <Route path="/charts/graph" component={Graph} />
        </Content>
      </Layout>
    </Router>
  );
}
