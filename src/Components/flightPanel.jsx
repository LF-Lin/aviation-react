import React, { useState } from 'react';
import { Button, Drawer } from 'antd';

const popupBoxStyle = {
  padding: '10px',
};
const popupStyle = {
  margin: '0',
  textAlign: 'left',
};

function FlightPanel(props) {
  const { trackInfo, basicInfo } = props;
  const [visible, setVisible] = useState(false);

  const handlePopupClick = () => {
    setVisible(true);
  };
  const handleDrawerClose = () => {
    setVisible(false);
  };

  return (
    <div>
      <div style={popupBoxStyle}>
        <p style={popupStyle}>{`航班号：${basicInfo?.object?.callsign}`}</p>
      </div>
      <Button type="primary" onClick={handlePopupClick} block>
        More detail
      </Button>
      <Drawer
        width={500}
        title={`Flight Information: ${basicInfo?.object?.callsign}`}
        placement="right"
        closable={false}
        onClose={handleDrawerClose}
        visible={visible}
      >
        <p>
          <span>{'latitude: '}</span>
          {basicInfo?.object?.latitude}
        </p>
        <p>
          <span>{'longitude: '}</span>
          {basicInfo?.object?.longitude}
        </p>
      </Drawer>
    </div>
  );
}

export default FlightPanel;
