import './style/App.css';
import 'antd/dist/antd.css';

import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { HomeOutlined, DashboardOutlined } from '@ant-design/icons';

import { BaseMap } from './Components/basemap';
import { Dashboard } from './Components/dashboard';

const { Header, Footer } = Layout;

function App() {
  const [current, setCurrent] = useState('map');

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <div className="App">
      <Router>
        <Layout className="layout">
          <Header style={{ padding: '0' }}>
            <Menu
              theme="dark"
              mode="horizontal"
              selectedKeys={[current]}
              onClick={handleClick}
            >
              <Menu.Item key="map">
                <HomeOutlined />
                <span>Map</span>
                <Link to="/" />
              </Menu.Item>
              <Menu.Item key="dashboard">
                <DashboardOutlined />
                <span>Dashboard</span>
                <Link to="/about" />
              </Menu.Item>
            </Menu>
          </Header>

          <Route exact path="/" component={BaseMap} />
          <Route path="/about" component={Dashboard} />

          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
