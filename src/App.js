import './style/App.css';
import 'antd/dist/antd.css';

import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  PushpinOutlined,
  ThunderboltOutlined,
  RiseOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';

import Airports from './Components/airports/airports';
import Flights from './Components/flights/flights';
import Networks from './Components/charts/networks/networks';
import Graph from './Components/charts/graph';
import Airspace from './Components/charts/airspace/airspace';

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
          <Header style={{ padding: '0', height: '9vh' }}>
            <Menu
              theme="dark"
              mode="horizontal"
              selectedKeys={[current]}
              onClick={handleClick}
            >
              <SubMenu
                key="SubMenu_1"
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

              <SubMenu
                key="SubMenu_2"
                icon={<ThunderboltOutlined />}
                title="Data Analysis"
                style={{ width: '182px' }}
              >
                <Menu.Item key="chart1" icon={<UserOutlined />}>
                  空中交通网络分析
                  <Link to="/charts" />
                </Menu.Item>
                <Menu.Item key="chart2" icon={<VideoCameraOutlined />}>
                  空域复杂度分析
                  <Link to="/charts/chart2" />
                </Menu.Item>
                <Menu.Item key="graph" icon={<UploadOutlined />}>
                  TODO
                  <Link to="/charts/graph" />
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Header>

          <Route exact path="/" component={Flights} />
          <Route path="/airports" component={Airports} />
          <Route exact path="/charts" component={Networks} />
          <Route path="/charts/chart2" component={Airspace} />
          <Route path="/charts/graph" component={Graph} />
        </Layout>
      </Router>
    </div>
  );
}

export default App;
