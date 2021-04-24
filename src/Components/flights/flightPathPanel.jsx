import ReactECharts from 'echarts-for-react';
import React, { useState } from 'react';
import { Button, Drawer } from 'antd';

const popupBoxStyle = {
  padding: '10px',
};
const popupStyle = {
  margin: '0',
  textAlign: 'left',
};

const DrawerTitle = ({ popupPathInfo, handleBackBtnClick }) => {
  console.log(popupPathInfo);
  return (
    <>
      Flight Information: {popupPathInfo?.object?.identification.number.default}
      <Button
        type="primary"
        onClick={handleBackBtnClick}
        style={{ marginLeft: '10px' }}
      >
        Show All Flights
      </Button>
    </>
  );
};

const FlightPathPanel = (props) => {
  const { popupPathInfo, setPopupPathInfo, setActiveLayer } = props;
  const [visible, setVisible] = useState(false);

  const handlePopupClick = () => {
    setVisible(true);
  };
  const handleDrawerClose = () => {
    setVisible(false);
  };
  const handleBackBtnClick = () => {
    setActiveLayer('iconLayer');
    setVisible(false);
    setPopupPathInfo();
  };

  const speedData = popupPathInfo.object.trail.path
    .map((item) => {
      return item[3];
    })
    .reverse();

  const altitudeData = popupPathInfo.object.trail.path
    .map((item) => {
      return item[2];
    })
    .reverse();

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        label: {
          show: true,
        },
      },
    },
    legend: {
      data: ['航空器高度', '航空器速度'],
    },

    xAxis: {
      data: popupPathInfo.object.trail.ts.slice().reverse(),
      type: 'category',
    },
    yAxis: [
      {
        type: 'value',
        name: '航空器高度',
        position: 'left',
        min: Math.min(...altitudeData),
        max: Math.max(...altitudeData),
        axisLine: {
          show: true,
          lineStyle: {
            color: '#3063b0',
          },
        },
        axisLabel: {
          formatter: '{value} ft',
        },
      },
      {
        type: 'value',
        name: '航空器速度',
        position: 'right',
        min: Math.min(...speedData),
        max: Math.max(...speedData),
        axisLine: {
          show: true,
          lineStyle: {
            color: '#93d141',
          },
        },
        axisLabel: {
          formatter: '{value} kts',
        },
      },
    ],
    series: [
      {
        name: '航空器高度',
        type: 'line',
        showSymbol: false,
        data: altitudeData,
      },
      {
        name: '航空器速度',
        type: 'line',
        showSymbol: false,
        data: speedData,
        yAxisIndex: 1,
      },
    ],
  };

  return (
    <div>
      <div style={popupBoxStyle}>
        <p
          style={popupStyle}
        >{`航班号：${popupPathInfo?.object?.identification.number.default}`}</p>
      </div>
      <Button type="primary" onClick={handlePopupClick} block>
        More detail
      </Button>
      <Drawer
        height={300}
        title={
          popupPathInfo && (
            <DrawerTitle
              popupPathInfo={popupPathInfo}
              handleBackBtnClick={handleBackBtnClick}
            />
          )
        }
        placement="bottom"
        closable={false}
        onClose={handleDrawerClose}
        visible={visible}
        bodyStyle={{ padding: '0px', position: 'relative' }}
      >
        <ReactECharts
          option={option}
          style={{ height: '250px', width: '50%' }}
        />
      </Drawer>
    </div>
  );
};

export default FlightPathPanel;
