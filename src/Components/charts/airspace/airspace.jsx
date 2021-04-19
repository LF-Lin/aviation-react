import SwiperCore, { Navigation, Keyboard } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';

import { Row, Col, Divider, Card } from 'antd';
import { useState, useEffect } from 'react';
import axios from 'axios';

import AirspaceMap from './airspaceMap';
import AirspaceStat from './airspaceStat';
import AirspaceDenseMap from './airspaceDenseMap';

SwiperCore.use([Navigation, Keyboard]);

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
    <div style={{ height: '91vh' }}>
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        navigation
        keyboard={{ enabled: true }}
        allowTouchMove={false}
      >
        <SwiperSlide>
          <Divider orientation="left">Airspace Dense Map</Divider>
          <Row style={{ textAlign: 'left' }}>
            <Col offset={1} span={22}>
              <Card title="Airspace Dense Map" bordered={false}>
                {airspaceStatData && airspaceData && (
                  <AirspaceDenseMap
                    airspaceData={airspaceData}
                    airspaceStatData={airspaceStatData}
                  />
                )}
              </Card>
            </Col>
          </Row>
        </SwiperSlide>

        <SwiperSlide>
          <Divider orientation="left">Airspace Statistic</Divider>
          <Row style={{ textAlign: 'left' }}>
            <Col offset={1} span={22}>
              <Card title="Airspace Statistic" bordered={false}>
                {airspaceStatData && (
                  <AirspaceStat airspaceStatData={airspaceStatData} />
                )}
              </Card>
            </Col>
          </Row>
        </SwiperSlide>
      </Swiper>
      {/* <Divider orientation="left">Airspace</Divider>
      <Row>
        <Col offset={1} span={22} style={airspaceMapStyle}>
          {airspaceData && <AirspaceMap airspaceData={airspaceData} />}
        </Col>
      </Row> */}
    </div>
  );
};
export default Airspace;
