import ReactECharts from 'echarts-for-react';

const AirportPanelStat = ({ airportStatData }) => {
  const option_dep = {
    title: {
      text: `计划出港航班：${airportStatData.count.dep}`,
      left: 'center',
    },
    tooltip: { trigger: 'item' },
    series: [
      {
        name: '航班',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '22',
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: airportStatData.departure,
      },
    ],
  };

  const option_arr = {
    title: {
      text: `计划进港航班：${airportStatData.count.arr}`,
      left: 'center',
    },
    tooltip: { trigger: 'item' },
    series: [
      {
        name: '航班',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '22',
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: airportStatData.arrival,
      },
    ],
  };

  return (
    <>
      <ReactECharts option={option_dep} />
      <ReactECharts option={option_arr} />
    </>
  );
};

export default AirportPanelStat;
