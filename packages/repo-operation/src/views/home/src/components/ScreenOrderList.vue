<template>
  <v-chart :options="polar"
           :autoresize="true" />
</template>

<script>
const data = [
  {
    name: '微医广州',
    value: 744
  },
  {
    name: '微医黄冈',
    value: 563
  },
  {
    name: '微医广州',
    value: 620
  },
  {
    name: '微医黄冈',
    value: 631
  },
  {
    name: '微医黄冈',
    value: 740
  },
  {
    name: '微医黄冈',
    value: 705
  },
  {
    name: '微医黄冈',
    value: 530
  }
]

const xAxiosData = data.map((item) => item.name)
const yAxiosData = data.map((item) => item.value)
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

  data() {
    return {
      polar: {
        grid: {
          top: '5%',
          left: '0%',
          right: '0%',
          bottom: '0%',
          containLabel: true
        },
        xAxis: {
          data: xAxiosData,
          //改变坐标轴文本的样式
          axisLabel: {
            textStyle: {
              color: '#999',
              fontSize: 10
            },
            interval: 0,
            rotate: 50
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
              color: '#999',
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
          min: function() {
            return 0
          },
          max: function(value) {
            return value.max * 1.5
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: function(params) {
            const val = params.data
            return val.value
          }
        },
        series: [
          {
            name: '销量',
            type: 'bar',

            data: yAxiosData,
            barWidth: 14, //柱子宽度
            barGap: 1, //柱子之间间距
            label: {
              show: true,
              position: 'top',
              color: '#FFFFFF'
            },
            itemStyle: {
              //柱样式
              normal: {
                barBorderRadius: [3, 3, 0, 0],
                color: {
                  type: 'linear', //设置线性渐变
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: '#0477D5' // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: '#01D9FE' // 100% 处的颜色
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
