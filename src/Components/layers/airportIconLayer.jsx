import { IconLayer } from '@deck.gl/layers';

const iconLayer = ({ airportLocation, Airport, handleAirportClick }) => {
  // console.log(airportLocation);
  return new IconLayer({
    id: 'airplanes',
    data: airportLocation,
    pickable: true,
    iconAtlas: Airport,
    iconMapping: {
      airport_name: {
        x: 0,
        y: 0,
        width: 200,
        height: 200,
        mask: true,
        anchorY: 200,
      },
    },
    sizeScale: 40,
    getPosition: (d) => [d.longitude, d.latitude],
    getIcon: (d) => 'airport_name',
    getColor: (d) => [112, 252, 81],
    autoHighlight: true,
    // highlightColor: [43, 176, 14],
    onClick: handleAirportClick,
  });
};

export default iconLayer;
