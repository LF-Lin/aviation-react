import { Row, Col, Radio } from 'antd';
import { useState, useEffect } from 'react';
import FlightFlow from './flightFlow';
import FlightNetwork from './flightNetwork';
import axios from 'axios';

const flightFlowStyle = {
  height: '500px',
  position: 'relative',
};

const Networks = () => {
  const [networkData, setNetworkData] = useState(null);
  const [layout, setLayout] = useState('none');

  const handleRadioChange = (e) => {
    setLayout(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:5555/api/chart/networks`);
      // console.log('response data', res.data);
      setNetworkData(res.data);
    };
    fetchData();
  }, []);

  return (
    <div style={{ height: '100vh', marginTop: '20px' }}>
      <Row>
        <Col offset={1} span={22} style={flightFlowStyle}>
          {networkData && <FlightFlow networkData={networkData} />}
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          {networkData && (
            <FlightNetwork networkData={networkData} layout={layout} />
          )}
          <Radio.Group onChange={handleRadioChange} defaultValue="none">
            <Radio.Button value="none">Location</Radio.Button>
            <Radio.Button value="circular">Circular</Radio.Button>
          </Radio.Group>
        </Col>
      </Row>
      <Row>
        <Col offset={1} span={16}>
          TODO：节点度分布折线图
        </Col>
      </Row>
    </div>
  );
};

export default Networks;
