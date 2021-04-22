import { ArcLayer } from '@deck.gl/layers';

const arcLayer = ({ airportFlights, direction, handleArcClick }) => {
  const flightsFlow =
    direction === 'in'
      ? airportFlights.flights.filter((data) => {
          return data.flight.airport.origin.name ? true : false;
        })
      : direction === 'out'
      ? airportFlights.flights.filter((data) => {
          return data.flight.airport.destination.name ? data : null;
        })
      : airportFlights.flights;

  return new ArcLayer({
    id: 'arc-layer',
    data: flightsFlow,
    pickable: true,
    getWidth: 8,
    getSourcePosition: (d) => {
      return d.flight.airport.origin.name
        ? [
            d.flight.airport.origin.position.longitude,
            d.flight.airport.origin.position.latitude,
          ]
        : airportFlights.airportGeo;
    },
    getTargetPosition: (d) => {
      return d.flight.airport.origin.name
        ? airportFlights.airportGeo
        : [
            d.flight.airport.destination.position.longitude,
            d.flight.airport.destination.position.latitude,
          ];
    },
    getSourceColor: [219, 54, 164],
    getTargetColor: [247, 255, 0],
    autoHighlight: true,
    onClick: handleArcClick,
  });
};

export default arcLayer;
