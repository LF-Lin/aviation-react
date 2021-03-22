import React, { useState, useEffect } from 'react';
import { Button, Drawer } from 'antd';
import axios from 'axios';

const popupBoxStyle = {
  padding: '10px',
};
const popupStyle = {
  margin: '0',
  textAlign: 'left',
};

function AirportInfo(props) {
  const {
    info,
    setPopupInfo,
    setAirportArrival,
    setActiveLayer,
    setViewport,
  } = props;
  const [visible, setVisible] = useState(false);
  const [airportWeather, setAirportWeather] = useState({});
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const handleArrival = () => {
    setViewport({
      latitude: info.object.latitude,
      longitude: info.object.longitude,
      pitch: 55,
      zoom: 4,
      transitionDuration: 500,
    });
    // setPopupInfo();
    setVisible(false);
    setActiveLayer('arcLayer');
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `http://localhost:5555/api/airport/arrivals/${info.object.airport_iata}`
      );
      setAirportArrival({ arr: res.data, airportGeo: info.coordinate });
      console.log('arrivals', res.data);
    };
    fetchData();
  }, [info.coordinate, info.object.airport_iata, setAirportArrival]);

  useEffect(() => {
    const fetchData = async () => {
      console.log(info.object.airport_iata);
      const res = await axios.get(
        `http://localhost:5555/api/airport/weather/${info.object.airport_iata}`
      );
      setAirportWeather(res.data);
      console.log(res.data);
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
        <Button
          type="primary"
          block
          style={{ margin: '10px 0' }}
          onClick={handleArrival}
        >
          Show Arrival Flights
        </Button>
        <Button type="primary" block style={{ margin: '10px 0' }}>
          Show Departure Flights
        </Button>

        <p>{airportWeather?.metar}</p>
        <p>{airportWeather?.elevation?.ft}</p>
      </Drawer>
    </div>
  );
}

export default AirportInfo;
