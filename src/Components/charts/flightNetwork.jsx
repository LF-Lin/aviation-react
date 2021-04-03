import ReactECharts from 'echarts-for-react';

const FlightNetwork = ({ networkData }) => {
  const option = {
    tooltip: {},
    series: [
      {
        name: 'Airports',
        type: 'graph',
        layout: 'force',
        data: networkData.nodes,
        links: networkData.flows,
        categories: networkData.categories,
        roam: true,
        label: {
          show: false,
          position: 'right',
          formatter: '{b}',
        },
        labelLayout: {
          hideOverlap: true,
        },
        scaleLimit: {
          min: 0.4,
          max: 2,
        },
        lineStyle: {
          color: 'rgb(128, 128, 128)',
        },
        emphasis: {
          focus: 'self',
          blurScope: 'global',
        },
        draggable: true,
      },
    ],
  };
  return (
    <ReactECharts option={option} style={{ height: '700px', width: '100%' }} />
  );
};
export default FlightNetwork;
