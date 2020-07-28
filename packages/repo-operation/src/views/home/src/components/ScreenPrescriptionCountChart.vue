<template>
  <div class="column full-width full-height">
    <v-chart :options="polar"
             :autoresize="true" />
  </div>
</template>

<script>
const data = [
  {
    date: '0701',
    value: 1
  },
  {
    date: '0702',
    value: 5
  },
  {
    date: '0703',
    value: 19
  },
  {
    date: '0704',
    value: 8
  },
  {
    date: '0705',
    value: 2
  },
  {
    date: '0706',
    value: 5
  }
]

const xAxiosData = data.map((item) => item.date)
const yAxiosData = data.map((item) => item.value)
// 只有4根分割线，替换最值分割线的颜色为背景色隐藏
const ySplitLineColors = ['#0C2150', '#0C2150', '#0C2150', '#000a3b']

import ECharts from 'vue-echarts'
// 手动引入 ECharts 各模块来减小打包体积
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
export default {
  name: 'screen-prescription-count-chart',

  components: {
    'v-chart': ECharts
  },

  data() {
    return {
      polar: {
        grid: {
          top: '0%',
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
              fontSize: 12
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
              color: '#999',
              fontSize: 12
            },
            interval: 0,
            showMaxLabel: false
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
