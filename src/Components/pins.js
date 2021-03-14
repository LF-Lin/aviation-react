import React from 'react';
import { Marker } from 'react-map-gl';
import { EnvironmentTwoTone } from '@ant-design/icons';

const SIZE = 26;

function Pins(props) {
  const { data, onClick } = props;

  return data.map((d, index) => {
    if (d.longitude && d.latitude) {
      return (
        <Marker
          key={`marker-${index}`}
          longitude={d.longitude}
          latitude={d.latitude}
        >
          <EnvironmentTwoTone
            style={{
              cursor: 'pointer',
              fontSize: `${SIZE}px`,
              transform: `translate(${-SIZE / 2}px,${-SIZE}px)`,
            }}
            onClick={() => onClick(d)}
          />
        </Marker>
      );
    }
  });
}

export default Pins;
