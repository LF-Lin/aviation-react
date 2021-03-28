import { Row, Col } from 'antd';
import FlightFlow from './flightflow';

const Dashboard = () => {
  return (
    <div style={{ height: '100vh', marginTop: '20px' }}>
      <Row>
        <Col offset={1} span={11}>
          <h1>histogram</h1>
        </Col>
        <Col offset={1} span={10}>
          <FlightFlow />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
