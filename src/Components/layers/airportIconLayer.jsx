import { IconLayer } from '@deck.gl/layers';

const iconLayer = ({ AirportGeo, Airport, handleAirportClick }) => {
  // console.log(AirportGeo);
  return new IconLayer({
    id: 'airplanes',
    data: AirportGeo,
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
