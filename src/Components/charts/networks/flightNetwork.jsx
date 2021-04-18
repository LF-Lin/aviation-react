import ReactECharts from 'echarts-for-react';

const FlightNetwork = ({ networkData, layout }) => {
  const option = {
    tooltip: {},
    legend: [
      {
        selector: [
          {
            type: 'all',
            title: '全选',
          },
          {
            type: 'inverse',
            title: '反选',
          },
        ],
        type: 'scroll',
        orient: 'vertical',
        left: 70,
        top: 20,
        bottom: 20,
        data: networkData.categories.map(function (a) {
          return a.name;
        }),
      },
    ],
    animationEasingUpdate: 'quinticInOut',
    animationDurationUpdate: 1500,
    series: [
      {
        name: 'Airports',
        layout: layout,
        type: 'graph',
        data: networkData.nodes.map((node) => {
          node.x = node.lon * 10;
          node.y = -node.lat * 10;
          return node;
        }),
        links: networkData.flows,
        categories: networkData.categories,
        roam: true,
        labelLayout: {
          hideOverlap: true,
        },
        scaleLimit: {
          min: 0.4,
          max: 2,
        },
        lineStyle: {
          color: 'rgb(128, 128, 128)',
          opacity: 0.5,
        },
        emphasis: {
          scale: true,
          lineStyle: {
            color: 'rgb(252, 3, 28)',
            opacity: 1,
          },
          focus: 'adjacency',
          label: {
            position: 'right',
            show: true,
          },
        },
      },
    ],
  };
  return (
    <ReactECharts option={option} style={{ height: '700px', width: '100%' }} />
  );
};
export default FlightNetwork;
