import React, { useState, useEffect } from 'react';
import { Button, Drawer } from 'antd';
import axios from 'axios';

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
  const [detail, setDetail] = useState([]);

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('http://localhost:5555/api/airportPEK');
      console.log(res.data);
      // How to save json dict into React state!
      // setDetail(res.data);
    };
    fetchData();
  }, []);

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
