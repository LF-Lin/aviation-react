import './style/App.css';
import 'antd/dist/antd.css';

import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  PushpinOutlined,
  BarChartOutlined,
  ThunderboltOutlined,
  RiseOutlined,
} from '@ant-design/icons';

import { Airports } from './Components/airports/airports';
import { Flights } from './Components/flights/flights';
import { Charts } from './Components/charts/charts';
const { Header } = Layout;
const { SubMenu } = Menu;

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
              <SubMenu
                key="SubMenu"
                icon={<ThunderboltOutlined />}
                title="Real-Time Data"
                style={{ width: '182px' }}
              >
                <Menu.Item key="flights" icon={<RiseOutlined />}>
                  <span>Flights</span>
                  <Link to="/" />
                </Menu.Item>
                <Menu.Item key="airports" icon={<PushpinOutlined />}>
                  <span>Airports</span>
                  <Link to="/airports" />
                </Menu.Item>
              </SubMenu>
              <Menu.Item key="charts" icon={<BarChartOutlined />}>
                <span>Data Analysis</span>
                <Link to="/charts" />
              </Menu.Item>
            </Menu>
          </Header>

          <Route exact path="/" component={Flights} />
          <Route path="/airports" component={Airports} />
          <Route exact path="/charts" component={Charts} />
        </Layout>
      </Router>
    </div>
  );
}

export default App;
