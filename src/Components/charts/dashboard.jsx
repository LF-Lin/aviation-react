import { Row, Col } from 'antd';
import FlightFlow from './flightFlow';
import FlightNetwork from './flightNetwork';

const Dashboard = () => {
  return (
    <div style={{ height: '100vh', marginTop: '20px' }}>
      <Row>
        <Col offset={1} span={11}>
          <FlightNetwork />
        </Col>
        <Col offset={1} span={10}>
          <FlightFlow />
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

export default Dashboard;
