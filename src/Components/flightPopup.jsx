import { Popup } from 'react-map-gl';
import FlightPanel from './flightPanel';

const FlightPopup = (prop) => {
  const { popupInfo, flightPanelInfo, setPopupInfo, setActiveLayer } = prop;

  return (
    <Popup
      tipSize={5}
      anchor="top"
      longitude={popupInfo.object.longitude}
      latitude={popupInfo.object.latitude}
      closeOnClick={false}
      onClose={setPopupInfo}
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
