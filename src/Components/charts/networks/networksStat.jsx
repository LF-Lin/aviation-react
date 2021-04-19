import ReactECharts from 'echarts-for-react';

const Degree = ({ networkStatData }) => {
  const option = {
    dataset: [
      {
        source: networkStatData.degree,
      },
    ],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
    },
    xAxis: {
      name: 'k',
      type: 'log',
      splitLine: {
        lineStyle: {
          type: 'dashed',
        },
      },
    },
    yAxis: {
      name: 'P(>k)',
      type: 'log',
      splitLine: {
        lineStyle: {
          type: 'dashed',
        },
      },
    },
    series: [
      {
        name: 'scatter1',
        type: 'scatter',
        datasetIndex: 0,
      },
    ],
  };
  return (
    <ReactECharts option={option} style={{ height: '450px', width: '100%' }} />
  );
};

const NodeStrength = ({ networkStatData }) => {
  const option = {
    dataset: [
      {
        source: networkStatData.nodes_strength,
      },
    ],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
    },
    xAxis: {
      name: 'S',
      splitLine: {
        lineStyle: {
          type: 'dashed',
        },
      },
    },
    yAxis: {
      name: 'P(S)',
      splitLine: {
        lineStyle: {
          type: 'dashed',
        },
      },
    },
    series: [
      {
        name: 'scatter',
        type: 'scatter',
        datasetIndex: 0,
      },
    ],
  };
  return (
    <ReactECharts option={option} style={{ height: '450px', width: '100%' }} />
  );
};

const Betweenness = ({ networkStatData }) => {
  const option = {
    dataset: [
      {
        source: networkStatData.nodes_bet,
      },
    ],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
    },
    xAxis: {
      name: 'B',
      splitLine: {
        lineStyle: {
          type: 'dashed',
        },
      },
    },
    yAxis: {
      name: 'P(B)',
      splitLine: {
        lineStyle: {
          type: 'dashed',
        },
      },
    },
    series: [
      {
        name: 'scatter',
        type: 'scatter',
        datasetIndex: 0,
      },
    ],
  };
  return (
    <ReactECharts option={option} style={{ height: '450px', width: '100%' }} />
  );
};

const DegreeCluster = ({ networkStatData }) => {
  const option = {
    dataset: [
      {
        source: networkStatData.degree_clustering,
      },
    ],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
      formatter: function (param) {
        return `<div>${param[0].value[2]}</div>`;
      },
    },
    xAxis: {
      name: 'Degree',
      type: 'log',
      splitLine: {
        lineStyle: {
          type: 'dashed',
        },
      },
    },
    yAxis: {
      name: 'C(k)',
      splitLine: {
        lineStyle: {
          type: 'dashed',
        },
      },
    },
    series: [
      {
        name: 'scatter',
        type: 'scatter',
        datasetIndex: 0,
      },
    ],
  };
  return (
    <ReactECharts option={option} style={{ height: '450px', width: '100%' }} />
  );
};

const DegreeNeighbor = ({ networkStatData }) => {
  const option = {
    dataset: [
      {
        source: networkStatData.degree_knn,
      },
    ],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
      formatter: function (param) {
        return `<div>${param[0].value[2]}</div>`;
      },
    },
    xAxis: {
      name: 'degree',
      splitLine: {
        lineStyle: {
          type: 'dashed',
        },
      },
    },
    yAxis: {
      name: 'K_nn',
      splitLine: {
        lineStyle: {
          type: 'dashed',
        },
      },
    },
    series: [
      {
        name: 'scatter',
        type: 'scatter',
        datasetIndex: 0,
      },
    ],
  };
  return (
    <ReactECharts option={option} style={{ height: '450px', width: '100%' }} />
  );
};

const DegreeBet = ({ networkStatData }) => {
  const option = {
    dataset: [
      {
        source: networkStatData.degree_bet,
      },
    ],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
      formatter: function (param) {
        return `<div>${param[0].value[2]}</div>`;
      },
    },
    xAxis: {
      name: 'degree',
      splitLine: {
        lineStyle: {
          type: 'dashed',
        },
      },
    },
    yAxis: {
      name: 'betweenness',
      splitLine: {
        lineStyle: {
          type: 'dashed',
        },
      },
    },
    series: [
      {
        name: 'scatter',
        type: 'scatter',
        datasetIndex: 0,
      },
    ],
  };
  return (
    <ReactECharts option={option} style={{ height: '450px', width: '100%' }} />
  );
};

export {
  Degree,
  DegreeCluster,
  DegreeNeighbor,
  NodeStrength,
  Betweenness,
  DegreeBet,
};
