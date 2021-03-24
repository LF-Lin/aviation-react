import { Popup } from 'react-map-gl';
import FlightPanel from './flightPanel';

const FlightPopup = ({ popupInfo, setPopupInfo, flightPanelInfo }) => {
  return (
    <Popup
      tipSize={5}
      anchor="top"
      longitude={popupInfo.object.longitude}
      latitude={popupInfo.object.latitude}
      closeOnClick={false}
      onClose={setPopupInfo}
    >
      <FlightPanel trackInfo={flightPanelInfo} basicInfo={popupInfo} />
    </Popup>
  );
};

export default FlightPopup;
