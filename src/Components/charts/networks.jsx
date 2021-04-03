import { Row, Col } from 'antd';
import { useState, useEffect } from 'react';
import FlightFlow from './flightFlow';
import FlightNetwork from './flightNetwork';

import axios from 'axios';

const Networks = () => {
  const [networkData, setNetworkData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:5555/api/chart/networks`);
      console.log('response data', res.data);
      setNetworkData(res.data);
    };
    fetchData();
  }, []);

  return (
    <div style={{ height: '100vh', marginTop: '20px' }}>
      <Row>
        <Col offset={1} span={24}>
          {networkData && <FlightFlow networkData={networkData} />}
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          {networkData && <FlightNetwork networkData={networkData} />}
        </Col>
        <Row></Row>
        <Col offset={1} span={16}>
          TODO：节点度分布折线图
        </Col>
      </Row>
    </div>
  );
};

export default Networks;
