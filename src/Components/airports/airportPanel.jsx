import React, { useState, useEffect } from 'react';
import { Button, Drawer, Collapse, Table, Row, Col, Statistic } from 'antd';
import axios from 'axios';

const { Panel } = Collapse;
const popupBoxStyle = {
  padding: '10px',
};
const popupStyle = {
  margin: '0',
  textAlign: 'left',
};

const columnConfig = [
  {
    title: '航班号',
    dataIndex: 'callsign',
    key: 'name',
    fixed: 'left',
  },
  {
    title: '出发机场',
    dataIndex: 'oapname',
    key: 'oapname',
  },
  {
    title: '到达机场',
    dataIndex: 'aapname',
    key: 'aapname',
  },
  {
    title: '计划出发时间',
    dataIndex: 'oTime',
    key: 'oTime',
  },
  {
    title: '计划到达时间',
    dataIndex: 'aTime',
    key: 'aTime',
  },
];

function AirportPanel(props) {
  const {
    info,
    setAirportFlights,
    setActiveLayer,
    setPopupInfo,
    setViewport,
  } = props;

  const [flightsData, setFlightsData] = useState(null);
  const [visible, setVisible] = useState(false);
  const [airportWeather, setAirportWeather] = useState(null);
  const [flightAvailable, setFlightAvailable] = useState(0);

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const handleFlights = () => {
    setViewport({
      latitude: info.object.latitude,
      longitude: info.object.longitude,
      zoom: 4,
      transitionDuration: 500,
    });
    setActiveLayer('arcLayer');
    setVisible(false);
    setPopupInfo(null);
  };

  const handleFlightsTable = (data) => {
    const flights = data.map((d, index) => {
      const rows = {
        callsign: d.flight.identification.number.default,
        oapname: d.flight.airport.origin.code
          ? d.flight.airport.origin.code.iata
          : info.object.airport_iata,
        aapname: d.flight.airport.destination.code
          ? d.flight.airport.destination.code.iata
          : info.object.airport_iata,
        oTime: d.flight.time.scheduled.departure_time,
        aTime: d.flight.time.scheduled.arrival_time,
        key: index,
      };
      return rows;
    });
    setFlightsData(flights);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `http://localhost:5555/api/airport/flights/${info.object.airport_iata}`
      );
      setAirportFlights({ flights: res.data, airportGeo: info.coordinate });
      setFlightAvailable(res.data.length);
      handleFlightsTable(res.data);
    };
    fetchData();
  }, [info.coordinate, info.object.airport_iata, setAirportFlights]);

  useEffect(() => {
    const fetchData = async () => {
      console.log(info.object.airport_iata);
      const res = await axios.get(
        `http://localhost:5555/api/airport/weather/${info.object.airport_iata}`
      );
      setAirportWeather(res.data.time ? res.data : null);
      // console.log(`${info.object.airport_iata} Weather: `, res.data);
    };
    fetchData();
  }, [info.object.airport_iata]);

  return (
    <div>
      <div style={popupBoxStyle}>
        <p style={popupStyle}>{`机场名称：${info.object.airport_name}`}</p>
        <p style={popupStyle}>{`机场 IATA：${info.object.airport_iata}`}</p>
      </div>
      <Button type="primary" onClick={showDrawer} block>
        More detail
      </Button>
      <Drawer
        width={600}
        title={`Airport Information: ${info.object.airport_name}`}
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <Collapse defaultActiveKey={['1']}>
          <Panel header="Weather Information" key="1">
            {
              <>
                <Row gutter={16} style={{ marginTop: '15px' }}>
                  <Col span={6}>
                    <Statistic
                      title="机场地面温度"
                      loading={airportWeather ? false : true}
                      value={airportWeather ? airportWeather.temp.celsius : '-'}
                      suffix=" °C"
                      valueStyle={{ fontSize: '20px' }}
                    />
                  </Col>
                  <Col span={6}>
                    <Statistic
                      title="机场地面气压"
                      loading={airportWeather ? false : true}
                      value={airportWeather ? airportWeather.pressure.hpa : '-'}
                      suffix=" hpa"
                      valueStyle={{ fontSize: '20px' }}
                    />
                  </Col>
                  <Col span={6}>
                    <Statistic
                      title="机场可视距离"
                      loading={airportWeather ? false : true}
                      value={
                        airportWeather ? airportWeather.sky.visibility.km : '-'
                      }
                      suffix=" km"
                      precision={4}
                      valueStyle={{ fontSize: '20px' }}
                    />
                  </Col>
                  <Col span={6}>
                    <Statistic
                      title="机场风速"
                      loading={airportWeather ? false : true}
                      value={
                        airportWeather ? airportWeather.wind.speed.kmh : '-'
                      }
                      suffix=" kmh"
                      valueStyle={{ fontSize: '20px' }}
                    />
                  </Col>
                </Row>
              </>
            }
          </Panel>
          <Panel header="Flight Schedule" key="2">
            <h3>{'机场航班时刻表'}</h3>

            <Table
              columns={columnConfig}
              dataSource={flightsData}
              scroll={{ x: 300, y: 200 }}
              loading={flightAvailable}
              size="small"
            />

            <Button
              type="primary"
              block
              style={{ margin: '10px 0' }}
              onClick={handleFlights}
              disabled={flightAvailable ? false : true}
            >
              Show airport latest schedule on map / Count:{' '}
              {flightAvailable || 'No flight'}
            </Button>
          </Panel>
        </Collapse>
      </Drawer>
    </div>
  );
}

export default AirportPanel;
