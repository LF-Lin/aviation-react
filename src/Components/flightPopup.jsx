import { Popup } from 'react-map-gl';
import FlightPanel from './flightPanel';

const FlightPopup = (prop) => {
  const {
    popupInfo,
    flightPanelInfo,
    setFlightPanelInfo,
    setPopupInfo,
    setActiveLayer,
  } = prop;
  const handlePopupClose = () => {
    setPopupInfo();
    setFlightPanelInfo();
  };
  return (
    <Popup
      tipSize={5}
      anchor="top"
      longitude={popupInfo.object.longitude}
      latitude={popupInfo.object.latitude}
      closeOnClick={false}
      onClose={handlePopupClose}
    >
      <FlightPanel
        popupInfo={popupInfo}
        flightPanelInfo={flightPanelInfo}
        setPopupInfo={setPopupInfo}
        setActiveLayer={setActiveLayer}
      />
    </Popup>
  );
};

export default FlightPopup;
