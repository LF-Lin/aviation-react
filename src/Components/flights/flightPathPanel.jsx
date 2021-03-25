import React, { useState } from 'react';
import { Button, Drawer } from 'antd';

const popupBoxStyle = {
  padding: '10px',
};
const popupStyle = {
  margin: '0',
  textAlign: 'left',
};

function FlightPathPanel(props) {
  const { popupPathInfo, setPopupPathInfo, setActiveLayer } = props;
  const [visible, setVisible] = useState(false);

  const handlePopupClick = () => {
    setVisible(true);
  };
  const handleDrawerClose = () => {
    setVisible(false);
  };
  const handlePathBtnClick = () => {
    setActiveLayer('iconLayer');
    setVisible(false);
    setPopupPathInfo();
  };

  return (
    <div>
      <div style={popupBoxStyle}>
        <p
          style={popupStyle}
        >{`航班号：${popupPathInfo?.object?.identification.number.default}`}</p>
      </div>
      <Button type="primary" onClick={handlePopupClick} block>
        More detail
      </Button>
      <Drawer
        width={500}
        title={`Flight Information: ${popupPathInfo?.object?.identification.number.default}`}
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
        >
          Show All Flights
        </Button>
        <p>{popupPathInfo?.object?.identification.number.default}</p>
      </Drawer>
    </div>
  );
}

export default FlightPathPanel;
