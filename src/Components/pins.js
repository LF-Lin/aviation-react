import React from 'react';
import { Marker } from 'react-map-gl';
import { EnvironmentTwoTone } from '@ant-design/icons';

function Pins(props) {
  const { data, onClick } = props;
  const SIZE = 26;
  const markers = React.useMemo(
    () =>
      data.map((d, index) => (
        <Marker key={index} longitude={d.longitude} latitude={d.latitude}>
          <EnvironmentTwoTone
            style={{
              cursor: 'pointer',
              fontSize: `${SIZE}px`,
              transform: `translate(${-SIZE / 2}px,${-SIZE}px)`,
            }}
            onClick={() => onClick(d)}
          />
        </Marker>
      )),
    []
  );

  return markers;
}

export default Pins;
