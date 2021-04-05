import { Row, Col, Radio, Card, Statistic } from 'antd';
import { useState, useEffect } from 'react';
import FlightFlow from './flightFlow';
import FlightNetwork from './flightNetwork';
import { Degree, Cluster, Neighbor } from './networksStat';
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
      <Row gutter={16} style={{ marginTop: '40px' }}>
        <Col span={3}>
          <Statistic title="Nodes" value={229} />
        </Col>
        <Col span={3}>
          <Statistic title="Edges" value={0} />
        </Col>
        <Col span={3}>
          <Statistic title="Average Degree" value={27.7662} />
        </Col>
        <Col span={6}>
          <Statistic title="Average shortest path length" value={2.0121} />
        </Col>
        <Col span={3}>
          <Statistic title="Diameter" value={4} />
        </Col>
      </Row>
      <Row style={{ marginTop: '40px', textAlign: 'left' }}>
        <Col offset={1} span={11}>
          <Card title="Cumulative degree distribution P(k)" bordered={false}>
            {/* Many nodes only have a handful of connections, while a few of them
            (called hubs) may be connected with the majority of their peers. Te
            result is a scale-free distribution of the degree of nodes, which
            can be approximated by a power law. */}
            <Degree />
          </Card>
        </Col>
        <Col offset={1} span={11}>
          <Card title="Clustering-degree correlation" bordered={false}>
            <Cluster />
          </Card>
        </Col>
      </Row>
      <Row style={{ marginTop: '40px', textAlign: 'left' }}>
        <Col offset={1} span={11}>
          <Card title="Degree correlation k_nn" bordered={false}>
            <Neighbor />
          </Card>
        </Col>
        <Col offset={1} span={11}>
          <Card title="Node strength" bordered={false}>
            {/* <Cluster /> */}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Networks;
