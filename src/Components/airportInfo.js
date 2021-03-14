import React, { useState, useEffect } from 'react';
import { Button, Drawer } from 'antd';
import update from 'immutability-helper';

// import DataPEK from '../asset/realtime_pek.json';
const popupBoxStyle = {
  padding: '10px',
};
const popupStyle = {
  margin: '0',
  textAlign: 'left',
};

function AirportInfo(props) {
  const { info } = props;
  const [visible, setVisible] = useState(false);
  const [detail, setDetail] = useState({});

  const getData = () => {
    fetch('http://localhost:5555/api/airportPEK', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((d) => {
        setDetail(d.temp);
      });
    //   .then((data) => setDetail(data));
  };

  const showDrawer = () => {
    getData();
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  return (
    <div>
      <div style={popupBoxStyle}>
        <p style={popupStyle}>{`机场名称：${info.airport_name}`}</p>
        <p style={popupStyle}>{`机场 IATA：${info.airport_iata}`}</p>
      </div>
      <Button type="primary" onClick={showDrawer} block>
        More detail
      </Button>
      <Drawer
        width={600}
        title={`Airport Information: ${info.airport_name}`}
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <p>{detail}</p>
      </Drawer>
    </div>
  );
}

export default AirportInfo;
