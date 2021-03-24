import { IconLayer } from '@deck.gl/layers';
import Airplane from '../../asset/airplane-icon.jpg';

const iconLayer = ({ flights, handleFlightClick }) => {
  console.log(flights);
  return new IconLayer({
    id: 'airplanes',
    data: flights,
    pickable: true,
    iconAtlas: Airplane,
    iconMapping: {
      airplane: {
        x: 0,
        y: 0,
        width: 512,
        height: 512,
      },
    },
    sizeScale: 50,
    getPosition: (d) => [d.longitude, d.latitude],
    getAngle: (d) => d.angle,
    getIcon: (d) => 'airplane',
    onClick: handleFlightClick,
  });
};

export default iconLayer;
