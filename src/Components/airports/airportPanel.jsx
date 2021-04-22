import React, { useState, useEffect } from 'react';
import { Button, Drawer, Collapse } from 'antd';
import axios from 'axios';

const { Panel } = Collapse;
const popupBoxStyle = {
  padding: '10px',
};
const popupStyle = {
  margin: '0',
  textAlign: 'left',
};

function AirportPanel(props) {
  const {
    info,
    setAirportFlights,
    setActiveLayer,
    setPopupInfo,
    setViewport,
  } = props;
  const [visible, setVisible] = useState(false);
  const [airportWeather, setAirportWeather] = useState({});
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
      // pitch: 55,
      zoom: 4,
      transitionDuration: 500,
    });
    setActiveLayer('arcLayer');
    setVisible(false);
    setPopupInfo(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `http://localhost:5555/api/airport/flights/${info.object.airport_iata}`
      );
      setAirportFlights({ flights: res.data, airportGeo: info.coordinate });
      setFlightAvailable(res.data.length);
      console.log(`${info.object.airport_iata} arrivals:`, res.data);
    };
    fetchData();
  }, [info.coordinate, info.object.airport_iata, setAirportFlights]);

  useEffect(() => {
    const fetchData = async () => {
      console.log(info.object.airport_iata);
      const res = await axios.get(
        `http://localhost:5555/api/airport/weather/${info.object.airport_iata}`
      );
      setAirportWeather(res.data);
      console.log(`${info.object.airport_iata} Weather: `, res.data);
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
        <Collapse defaultActiveKey={['1']} style={{ marginTop: '15px' }}>
          <Panel header="Weather Information" key="1">
            <p>{airportWeather?.metar || 'No weather info'}</p>
            <p>{airportWeather?.elevation?.ft}</p>
          </Panel>
          <Panel header="Flight Schedule" key="2">
            <p>{'机场航班时刻表，table'}</p>
            <Button
              type="primary"
              block
              style={{ margin: '10px 0' }}
              onClick={handleFlights}
              disabled={flightAvailable ? false : true}
            >
              Show Arrival & Departure Flights / Count:{' '}
              {flightAvailable || 'No flight'}
            </Button>
          </Panel>
        </Collapse>
      </Drawer>
    </div>
  );
}

export default AirportPanel;
