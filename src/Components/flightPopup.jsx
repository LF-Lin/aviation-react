import { Popup } from 'react-map-gl';
import { Button } from 'antd';
const FlightPopup = (prop) => {
  const { info, setPopupFlightInfo, setActiveLayer, setViewport } = prop;

  const handleBtnClick = () => {
    // console.log(info);
    setViewport({
      latitude: info.coordinate[1],
      longitude: info.coordinate[0],
      zoom: 5,
      transitionDuration: 500,
    });
    setActiveLayer('iconLayer');
    setPopupFlightInfo(null);
  };
  return (
    <Popup
      tipSize={5}
      anchor="top"
      longitude={info.coordinate[0]}
      latitude={info.coordinate[1]}
      closeOnClick={false}
      onClose={setPopupFlightInfo}
    >
      <h1>{info.object?.flight?.identification.number.default}</h1>
      <Button
        type="primary"
        block
        style={{ margin: '10px 0' }}
        onClick={handleBtnClick}
      >
        Show Airports
      </Button>
    </Popup>
  );
};

export default FlightPopup;
