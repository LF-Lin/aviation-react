import { Row, Col, Divider, Card } from 'antd';
import { useState, useEffect } from 'react';
import axios from 'axios';

import AirspaceMap from './airspaceMap';
import AirspaceStat from './airspaceStat';

const airspaceMapStyle = {
  height: '85vh',
  position: 'relative',
};

const Airspace = () => {
  const [airspaceData, setAirspaceData] = useState(null);
  const [airspaceStatData, setAirspaceStatData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `http://localhost:5555/api/chart/airspace_geo`
      );
      console.log('response data', res.data);
      setAirspaceData(res.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `http://localhost:5555/api/chart/airspace_stat`
      );
      console.log('response data', res.data);
      setAirspaceStatData(res.data);
    };
    fetchData();
  }, []);

  return (
    <div style={{ height: '100vh', marginTop: '20px' }}>
      <Row>
        <Col offset={1} span={22} style={airspaceMapStyle}>
          {airspaceData && <AirspaceMap airspaceData={airspaceData} />}
        </Col>
      </Row>
      <Divider orientation="left">Airspace</Divider>

      <Row style={{ marginTop: '40px', textAlign: 'left' }}>
        <Col offset={1} span={22}>
          <Card title="Airspace Statistic" bordered={false}>
            {airspaceStatData && (
              <AirspaceStat airspaceStatData={airspaceStatData} />
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default Airspace;
