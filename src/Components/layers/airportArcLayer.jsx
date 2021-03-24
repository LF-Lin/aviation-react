import { ArcLayer } from '@deck.gl/layers';

const arcLayer = ({ airportArrival, handleArcClick }) => {
  // console.log(airportArrival.arr);
  return new ArcLayer({
    id: 'arc-layer',
    data: airportArrival.arr,
    pickable: true,
    getWidth: 8,
    getSourcePosition: airportArrival.airportGeo,
    getTargetPosition: (d) => [
      d.flight.airport.origin.position.longitude,
      d.flight.airport.origin.position.latitude,
    ],
    getSourceColor: [66, 135, 245],
    getTargetColor: [230, 230, 255],
    autoHighlight: true,
    highlightColor: [249, 226, 0],
    onClick: handleArcClick,
  });
};

export default arcLayer;
