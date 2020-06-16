export default {
  grid: {
    right: 40
  },
  tooltip: {
    padding: 10,
    backgroundColor: '#fff',
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
  },
  xAxis: {
    offset: 40,
    type: 'category',
    boundaryGap: false,
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      margin: -20,
      formatter: function(value) {
        return new Date(value).formatDate('MM-dd')
      }
    },
    data: []
  },
  yAxis: {
    type: 'value',
    splitLine: {
      show: true,
      lineStyle: {
        color: '#FFE5ECEE'
      }
    },
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      margin: 40
    }
  },
  series: [
    {
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 8,
      label: {
        show: true,
        color: '#000',
        backgroundColor: '#F4F7FD',
        borderColor: '#4A00C6AE',
        padding: [5, 10, 5, 10]
      },
      itemStyle: {
        color: '#FFF',
        borderColor: '#00C6AE',
        borderWidth: 2,
        shadowColor: '#00C6AE',
        shadowBlur: 5
      },
      lineStyle: {
        color: '#00C6AE',
        shadowColor: '#A8F3EA',
        shadowBlur: 10
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{ offset: 0, color: '#E2FCF9' }, { offset: 1, color: '#F4FDFC' }],
          global: false
        }
      },
      data: []
    },
    {
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 8,
      label: {
        show: true,
        color: '#000',
        backgroundColor: '#F4F7FD',
        borderColor: '#4A00C6AE',
        padding: [5, 10, 5, 10]
      },
      itemStyle: {
        color: '#FFF',
        borderColor: '#00C6AE',
        borderWidth: 2,
        shadowColor: '#00C6AE',
        shadowBlur: 5
      },
      lineStyle: {
        color: '#00C6AE',
        shadowColor: '#A8F3EA',
        shadowBlur: 10
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{ offset: 0, color: '#E2FCF9' }, { offset: 1, color: '#F4FDFC' }],
          global: false
        }
      },
      data: []
    }
  ]
}
