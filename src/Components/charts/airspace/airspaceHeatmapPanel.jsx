import { Card, Statistic } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';
import React, { useState } from 'react';

const panelStyle = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  borderRadius: '32px',
  width: '260px',
  height: '560px',
  zIndex: 999,
};

const AirspacePanel = (props) => {
  const { singleAirspaceStat, airspaceProperties } = props;
  const speedArr = singleAirspaceStat.map((row) => row.speed);
  const altitudeArr = singleAirspaceStat
    .map((row) => row.altitude)
    .filter((ele) => ele > 0);

  return (
    <Card title={airspaceProperties.properties.name} style={panelStyle}>
      <Statistic
        title="扇区内航空器数量"
        value={singleAirspaceStat.length}
        suffix="架"
      />
      <Statistic
        title="扇区内航空器平均速度"
        style={{ marginTop: '32px' }}
        value={
          speedArr.length
            ? speedArr.reduce((a, b) => a + b) / speedArr.length
            : 0
        }
        precision={2}
        suffix="节"
      />
      <Statistic
        title="扇区内航空器平均高度（飞行状态）"
        style={{ marginTop: '32px' }}
        value={
          altitudeArr.length
            ? altitudeArr.reduce((a, b) => a + b) / altitudeArr.length
            : 0
        }
        precision={2}
        suffix="米"
      />
    </Card>
  );
};

export default AirspacePanel;
