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
  const { popupInfo, flightPanelInfo, setPopupInfo, setActiveLayer } = props;
  const [visible, setVisible] = useState(false);

  const handlePopupClick = () => {
    setVisible(true);
  };
  const handleDrawerClose = () => {
    setVisible(false);
  };
  const handlePathBtnClick = () => {
    setActiveLayer('iconPathLayer');
    setVisible(false);
    setPopupInfo();
  };
  return (
    <div>
      <div style={popupBoxStyle}>
        <p style={popupStyle}>{`航班号：${popupInfo?.object?.callsign}`}</p>
      </div>
      <Button type="primary" onClick={handlePopupClick} block>
        More detail
      </Button>
      <Drawer
        width={500}
        title={`Flight Information: ${popupInfo?.object?.callsign}`}
        placement="right"
        closable={false}
        onClose={handleDrawerClose}
        visible={visible}
      >
        <p>{}</p>
        <Button
          type="primary"
          block
          style={{ margin: '10px 0' }}
          onClick={handlePathBtnClick}
          disabled={flightPanelInfo ? false : true}
        >
          Show Flight Path
        </Button>
      </Drawer>
    </div>
  );
}

export default FlightPanel;
