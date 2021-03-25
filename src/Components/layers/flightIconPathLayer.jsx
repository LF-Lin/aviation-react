import { IconLayer, PathLayer } from '@deck.gl/layers';
import Airplane from '../../asset/airplane-icon.jpg';

const iconPathLayer = ({ flightPanelInfo, handleFlightPathClick }) => {
  return [
    new IconLayer({
      id: 'flight-single-icon',
      data: flightPanelInfo,
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
      getPosition: (d) => [d.trail.current.lng, d.trail.current.lat],
      getAngle: (d) => 45 - d.trail.current.hd,
      getIcon: (d) => 'airplane',
      onClick: handleFlightPathClick,
    }),
    new PathLayer({
      id: 'flight-single-path',
      data: flightPanelInfo,
      pickable: true,
      widthScale: 20,
      widthMinPixels: 2,
      getPath: (d) => d.trail.path,
      getColor: [223, 255, 61],
    }),
  ];
};

export default iconPathLayer;
