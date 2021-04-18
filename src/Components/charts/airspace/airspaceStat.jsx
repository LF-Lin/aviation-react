import ReactECharts from 'echarts-for-react';

const AirspaceStat = ({ airspaceStatData }) => {
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
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ['line', 'bar'] },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    calculable: true,
    legend: {
      data: ['航空器数量', '航空器平均速度'],
      itemGap: 5,
    },
    grid: {
      top: '12%',
      left: '1%',
      right: '10%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: airspaceStatData.map((row) => {
          return row.name;
        }),
      },
    ],
    yAxis: [
      {
        type: 'value',
        name: '航空器数量',
        min: 0,
        max: 80,
        position: 'left',
        axisLine: {
          show: true,
          lineStyle: {
            color: '#3063b0',
          },
        },
        axisLabel: {
          formatter: '{value}',
        },
      },
      {
        type: 'value',
        name: '航空器平均速度',
        min: 0,
        max: 550,
        position: 'right',
        axisLine: {
          show: true,
          lineStyle: {
            color: '#93d141',
          },
        },
        axisLabel: {
          formatter: '{value}',
        },
      },
    ],
    dataZoom: [
      {
        show: true,
        start: 0,
        end: 100,
      },
      {
        type: 'inside',
        start: 0,
        end: 100,
      },
      {
        show: true,
        yAxisIndex: 0,
        filterMode: 'empty',
        width: 30,
        height: '80%',
        showDataShadow: false,
        left: '91%',
      },
      {
        show: true,
        yAxisIndex: 1,
        filterMode: 'empty',
        width: 30,
        height: '80%',
        showDataShadow: false,
        left: '95%',
      },
    ],
    series: [
      {
        name: '航空器数量',
        type: 'bar',
        data: airspaceStatData.map((row) => {
          return row.flights_count;
        }),
      },
      {
        name: '航空器平均速度',
        type: 'bar',
        yAxisIndex: 1,
        data: airspaceStatData.map((row) => {
          return row.flights_avg_speed;
        }),
      },
    ],
  };
  return (
    <ReactECharts option={option} style={{ height: '85vh', width: '100%' }} />
  );
};

export default AirspaceStat;
