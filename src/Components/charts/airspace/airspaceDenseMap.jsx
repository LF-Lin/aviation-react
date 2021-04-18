import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts/core';

const AirspaceDenseMap = ({ airspaceData, airspaceStatData }) => {
  echarts.registerMap('ChinaAirspace', airspaceData);
  const option = {
    title: {
      text: '扇区内航空器数量',
      left: 'right',
    },
    tooltip: {
      trigger: 'item',
      showDelay: 0,
      transitionDuration: 0.2,
      formatter: function (params) {
        var value = (params.value + '').split('.');
        value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
        return params.seriesName + '<br/>' + params.name + ': ' + value;
      },
    },
    visualMap: {
      left: 'right',
      min: 0,
      max: 90,
      inRange: {
        color: [
          '#313695',
          '#4575b4',
          '#74add1',
          '#abd9e9',
          '#e0f3f8',
          '#ffffbf',
          '#fee090',
          '#fdae61',
          '#f46d43',
          '#d73027',
          '#a50026',
        ],
      },
      text: ['High', 'Low'], // 文本，默认为数值文本
      calculable: true,
    },
    toolbox: {
      show: true,
      left: 'left',
      top: 'top',
      feature: {
        dataView: { readOnly: false },
        restore: {},
        saveAsImage: {},
      },
    },
    series: [
      {
        name: '扇区内航空器数量',
        type: 'map',
        roam: true,
        map: 'ChinaAirspace',
        emphasis: {
          label: {
            show: true,
          },
        },
        data: airspaceStatData.map((row) => {
          return { name: row.name, value: row.flights_count };
        }),
      },
    ],
  };
  return (
    <ReactECharts
      echarts={echarts}
      option={option}
      style={{ height: '68vh', width: '100%' }}
    />
  );
};

export default AirspaceDenseMap;
