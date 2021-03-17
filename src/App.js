import './style/App.css';
import 'antd/dist/antd.css';

import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { HomeOutlined, BarChartOutlined } from '@ant-design/icons';

import { Airports } from './Components/airports';
import { Flights } from './Components/flights';
import { Charts } from './Components/charts';

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
              <Menu.Item key="airports">
                <HomeOutlined />
                <span>Airports</span>
                <Link to="/" />
              </Menu.Item>
              <Menu.Item key="flights">
                <HomeOutlined />
                <span>Flights</span>
                <Link to="/flights" />
              </Menu.Item>
              <Menu.Item key="charts">
                <BarChartOutlined />
                <span>Charts</span>
                <Link to="/charts" />
              </Menu.Item>
            </Menu>
          </Header>

          <Route exact path="/" component={Airports} />
          <Route path="/flights" component={Flights} />
          <Route path="/charts" component={Charts} />

          {/* <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer> */}
        </Layout>
      </Router>
    </div>
  );
}

export default App;
