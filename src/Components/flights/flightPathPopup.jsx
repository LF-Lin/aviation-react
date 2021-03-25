import { Popup } from 'react-map-gl';
import FlightPathPanel from './flightPathPanel';

const FlightPathPopup = (prop) => {
  const { popupPathInfo, setPopupPathInfo, setActiveLayer } = prop;
  return (
    <Popup
      tipSize={5}
      anchor="top"
      longitude={popupPathInfo.object.trail.current.lng}
      latitude={popupPathInfo.object.trail.current.lat}
      closeOnClick={false}
      onClose={setPopupPathInfo}
    >
      <FlightPathPanel
        popupPathInfo={popupPathInfo}
        setPopupPathInfo={setPopupPathInfo}
        setActiveLayer={setActiveLayer}
      />
    </Popup>
  );
};

export default FlightPathPopup;
