<template>
  <div class="card-style q-pa-md">
    <div class="card-title">处方量趋势图 (近7日)</div>
    <div class="chart-container">
      <v-chart :options="polar"
               :autoresize="true" />
    </div>
  </div>
</template>

<script>
const ySplitLineColors = ['#F6F6F6', '#F6F6F6', '#fff']
import ECharts from 'vue-echarts'

// 手动引入 ECharts 各模块来减小打包体积
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'

export default {
  name: 'prescription-count-chart',

  components: {
    'v-chart': ECharts
  },

  props: {
    data: {
      type: Object
    }
  },

  watch: {
    data: {
      handler(val) {
        this.polar.xAxis.data = val.xAxis
        this.polar.series[0].data = val.data
      },
      immediate: true,
      deep: true
    }
  },

  data() {
    return {
      polar: {
        grid: {
          top: '15%',
          left: '0%',
          right: '5%',
          bottom: '10%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          show: true,
          data: [],
          //改变坐标轴文本的样式
          axisLabel: {
            textStyle: {
              color: '#999',
              fontSize: 12
            },
            formatter: (value) => {
              return value.split('-').splice(1, 2).join('-')
            }
          },
          //改变坐标轴和文本的样式
          axisLine: {
            lineStyle: {
              width: 0
            }
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          //改变坐标轴文本的样式
          axisLabel: {
            textStyle: {
              color: '#999',
              fontSize: 12
            },
            showMaxLabel: false
          },
          splitNumber: 2,
          max: function (value) {
            return value.max * 1.3
          },
          //改变坐标轴和文本的样式
          axisLine: {
            lineStyle: {
              width: 0
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            //格线样式
            lineStyle: {
              type: 'dotted',
              color: ySplitLineColors
            }
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            const val = params.data
            return val.value
          }
        },
        series: [
          {
            data: [],
            label: {
              show: true,
              position: 'top',
              textStyle: {
                color: '#999999'
              }
            },
            type: 'line',
            symbol: 'circle', //折点设定为实心点
            symbolSize: 7, //设定实心点的大小
            smooth: true,
            hoverAnimation: true,
            itemStyle: {
              normal: {
                color: '#3099A6', //折点颜色
                lineStyle: {
                  normal: {
                    color: '#3099A6',
                    width: 1
                  }
                },
                borderColor: '#fff',
                borderWidth: 1
              }
            },
            areaStyle: {
              normal: {
                color: {
                  type: 'linear', //设置线性渐变
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: '#00C6AE' // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: 'white' // 100% 处的颜色
                    }
                  ],
                  globalCoord: false // 缺省为 false
                }
              }
            }
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.card-style {
  height: 280px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 1px 4px 0px rgba(224, 224, 224, 1);
  border-radius: 4px;

  .card-title:before {
    content: '';
    display: inline-block;
    position: relative;
    top: 3px;
    margin-right: 10px;
    width: 4px;
    height: 16px;
    background: rgba(48, 153, 166, 1);
    border-radius: 2px;
  }
}
.chart-container {
  width: 100%;
  height: 250px;

  .echarts {
    width: 100% !important;
    height: 100% !important;
  }
}
</style>
