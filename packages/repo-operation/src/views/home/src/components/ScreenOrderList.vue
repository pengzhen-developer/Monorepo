<template>
  <v-chart :options="polar"
           :autoresize="true" />
</template>

<script>
// 只有4根分割线，替换最值分割线的颜色为背景色隐藏
const ySplitLineColors = ['#0C2150', '#0C2150', '#0C2150', '#000a3b']

import ECharts from 'vue-echarts'
// 手动引入 ECharts 各模块来减小打包体积
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
export default {
  name: 'screen-order-list',

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
          top: 10,
          left: 6,
          right: 6,
          bottom: 0,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          data: [],
          //改变坐标轴文本的样式
          axisLabel: {
            textStyle: {
              color: 'rgba(255, 255, 255, 0.3)',
              fontSize: 10
            },
            interval: 0,
            // rotate: 50,
            formatter: (value) => {
              return value.length > 4 ? value.substring(0, 4) + '...' : value
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
          //改变坐标轴文本的样式
          axisLabel: {
            textStyle: {
              color: 'rgba(255, 255, 255, 0.3)',
              fontSize: 12
            },
            interval: 0
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
              color: ySplitLineColors
            }
          },
          //[x(0.5), y(1)] 在最小值下方扩充x%空间， 在最大值上方扩充100%空间
          // boundaryGap: [0.2, 1],
          // Max值分割 (2)
          splitNumber: 2,
          min: function () {
            return 0
          },
          max: function (value) {
            return value.max * 1.5
          }
        },
        series: [
          {
            name: '订单数',
            type: 'bar',
            data: [],
            barWidth: 14, //柱子宽度
            barGap: 1, //柱子之间间距
            label: {
              show: true,
              position: 'top',
              color: 'rgba(255, 255, 255, 0.6)'
            },
            itemStyle: {
              //柱样式
              normal: {
                barBorderRadius: [4, 4, 0, 0],
                color: {
                  type: 'linear', //设置线性渐变
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: '#01D9FE' // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: '#0477D5' // 100% 处的颜色
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
.card-title:before {
  content: '';
  display: inline-block;
  position: relative;
  top: 2px;
  margin-right: 10px;
  background: rgba(48, 153, 166, 1);
  width: 2px;
  height: 14px;
  border: 2px solid rgba(108, 206, 230, 1);
}

.echarts {
  width: 100% !important;
  height: 100% !important;
}
</style>
