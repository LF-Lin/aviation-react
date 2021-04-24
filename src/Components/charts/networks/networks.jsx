import SwiperCore, { Navigation, Keyboard } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';

import { Row, Col, Radio, Statistic, Divider, Collapse } from 'antd';
import { useState, useEffect } from 'react';
import FlightFlow from './flightFlow';
import FlightNetwork from './flightNetwork';
import {
  Degree,
  DegreeCluster,
  DegreeNeighbor,
  NodeStrength,
  Betweenness,
  DegreeBet,
} from './networksStat';
import axios from 'axios';

SwiperCore.use([Navigation, Keyboard]);

const { Panel } = Collapse;

const flightFlowStyle = {
  height: '80vh',
  position: 'relative',
};

const Networks = () => {
  const [networkData, setNetworkData] = useState(null);
  const [networkStatData, setNetworkStatData] = useState(null);
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

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `http://localhost:5555/api/chart/networks/stat`
      );
      setNetworkStatData(res.data);
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
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        style={{ height: '91vh' }}
      >
        <SwiperSlide>
          <Divider orientation="left">Airport Networks @20210404</Divider>
          <Row>
            <Col offset={1} span={22} style={flightFlowStyle}>
              {networkData && <FlightFlow networkData={networkData} />}
            </Col>
          </Row>
        </SwiperSlide>

        <SwiperSlide>
          <Divider orientation="left">Networks by provinces</Divider>
          <Row>
            <Col offset={1} span={22}>
              {networkData && (
                <FlightNetwork networkData={networkData} layout={layout} />
              )}
              <Radio.Group onChange={handleRadioChange} defaultValue="none">
                <Radio.Button value="none">Location</Radio.Button>
                <Radio.Button value="circular">Circular</Radio.Button>
              </Radio.Group>
            </Col>
          </Row>
          <Divider orientation="left">机场网络特征参数</Divider>
          <Row gutter={16}>
            <Col span={3}>
              <Statistic title="Nodes" value={231} />
            </Col>
            <Col span={3}>
              <Statistic title="Edges" value={5691} />
            </Col>
            <Col span={3}>
              <Statistic title="Average Degree" value={49.2727} />
            </Col>
            <Col span={6}>
              <Statistic title="Average shortest path length" value={2.042} />
            </Col>
            <Col span={3}>
              <Statistic title="Average Clustering" value={0.6757} />
            </Col>
            <Col span={3}>
              <Statistic title="Diameter" value={4} />
            </Col>
          </Row>
        </SwiperSlide>

        <SwiperSlide>
          <Divider orientation="left">机场网络特性分析-累积分布</Divider>
          <Row>
            <Col
              offset={1}
              span={22}
              style={{
                textAlign: 'left',
                fontWeight: '700',
              }}
            >
              <Collapse defaultActiveKey={['1']} accordion ghost>
                <Panel header="Cumulative degree distribution P(k)" key="1">
                  {networkStatData && (
                    <Degree networkStatData={networkStatData} />
                  )}
                </Panel>
                <Panel
                  header="Cumulative node strength distribution P(S)"
                  key="2"
                >
                  {networkStatData && (
                    <NodeStrength networkStatData={networkStatData} />
                  )}
                </Panel>
                <Panel
                  header="Cumulative betweenness centricity distribution P(B)"
                  key="3"
                >
                  {networkStatData && (
                    <Betweenness networkStatData={networkStatData} />
                  )}
                </Panel>
              </Collapse>
            </Col>
          </Row>
        </SwiperSlide>

        <SwiperSlide>
          <Divider orientation="left">机场网络特性分析-相关性</Divider>
          <Row>
            <Col
              offset={1}
              span={22}
              style={{
                textAlign: 'left',
                fontWeight: '700',
              }}
            >
              <Collapse defaultActiveKey={['4']} accordion ghost>
                <Panel header="Degree-Betweenness correlation" key="4">
                  {networkStatData && (
                    <DegreeBet networkStatData={networkStatData} />
                  )}
                </Panel>
                <Panel header="Degree-K_nn correlation" key="5">
                  {networkStatData && (
                    <DegreeNeighbor networkStatData={networkStatData} />
                  )}
                </Panel>
                <Panel header="Degree-Clustering correlation" key="6">
                  {networkStatData && (
                    <DegreeCluster networkStatData={networkStatData} />
                  )}
                </Panel>
              </Collapse>
            </Col>
          </Row>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Networks;
