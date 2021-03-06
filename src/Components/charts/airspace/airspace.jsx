import SwiperCore, { Navigation, Keyboard } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';

import { Row, Col, Divider, Card } from 'antd';
import { useState, useEffect } from 'react';
import axios from 'axios';

import AirspaceStat from './airspaceStat';
import AirspaceDenseMap from './airspaceDenseMap';
import AirspaceHeatMap from './airspaceHeatmap';

SwiperCore.use([Navigation, Keyboard]);

const Airspace = () => {
  const [airspaceData, setAirspaceData] = useState(null);
  const [airspaceStatData, setAirspaceStatData] = useState(null);
  const [refreshFlag, setRefreshFlag] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `http://localhost:5555/api/chart/airspace/geo`
      );
      console.log('airspace_geo', res.data);
      setAirspaceData(res.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `http://localhost:5555/api/chart/airspace/stat`
      );
      console.log('airspace_stat', res.data);
      setAirspaceStatData(res.data);
    };
    fetchData();
  }, [refreshFlag]);

  const handleRefreshBtn = () => {
    setAirspaceStatData(null);
    setRefreshFlag(!refreshFlag);
  };

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
          <Divider orientation="left">Airspace Heat Map</Divider>
          <Row style={{ textAlign: 'left' }}>
            <Col offset={1} span={22}>
              <AirspaceHeatMap />
            </Col>
          </Row>
        </SwiperSlide>

        <SwiperSlide>
          <Divider orientation="left">Airspace Dense Map</Divider>
          <Row style={{ textAlign: 'left' }}>
            <Col offset={1} span={22}>
              <Card title="Airspace Dense Map" bordered={false}>
                {airspaceStatData && airspaceData && (
                  <AirspaceDenseMap
                    airspaceData={airspaceData}
                    airspaceStatData={airspaceStatData}
                    handleRefreshBtn={handleRefreshBtn}
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
