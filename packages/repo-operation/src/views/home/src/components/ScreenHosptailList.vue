<template>
  <v-chart :options="polar"
           :autoresize="true" />
</template>

<script>
import ECharts from 'vue-echarts'
// 手动引入 ECharts 各模块来减小打包体积
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
export default {
  name: 'screen-hosptail-list',

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
        this.polar.yAxis[0].data = val.xAxis
        this.polar.yAxis[1].data = val.data
        let max = Math.max(...val.data)
        this.polar.series[0].data = val.data
        this.polar.series[1].data = val.data.map(() => max)
      },
      immediate: true,
      deep: true
    }
  },

  data() {
    return {
      polar: {
        grid: {
          top: 0,
          left: 6,
          right: 6,
          bottom: 0,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none'
          },
          formatter: function (params) {
            return (
              params[0].name +
              '<br/>' +
              "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:rgba(36,207,233,0.9)'></span>" +
              params[0].seriesName +
              ' : ' +
              params[0].value
            )
          }
        },
        xAxis: {
          type: 'value',
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          max: function (value) {
            return value.max
          }
        },
        yAxis: [
          {
            type: 'category',
            inverse: true,
            axisTick: 'none',
            axisLine: 'none',
            show: true,
            data: [],
            //改变坐标轴文本的样式
            axisLabel: {
              textStyle: {
                color: '#02D9FD',
                fontSize: 12
              },
              formatter: (value) => {
                return value.length > 4 ? value.substring(0, 4) + '...' : value
              }
            }
          },
          {
            type: 'category',
            inverse: true,
            axisTick: 'none',
            axisLine: 'none',
            show: true,
            axisLabel: {
              textStyle: {
                color: '#ffffff',
                fontSize: '12'
              },
              formatter: function (value) {
                if (value >= 10000) {
                  return (value / 10000).toLocaleString() + '万'
                } else {
                  return value.toLocaleString()
                }
              }
            },
            data: []
          }
        ],
        series: [
          {
            name: '处方量',
            type: 'bar',
            data: [],
            barWidth: 5, //柱子宽度
            zlevel: 1,
            label: {
              show: false
            },
            itemStyle: {
              barBorderRadius: 4,
              color: {
                type: 'linear', //设置线性渐变
                x: 0,
                y: 0,
                x2: 1,
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
          },
          {
            type: 'bar',
            itemStyle: {
              barBorderRadius: 4,
              color: 'rgba(25,63,128,1)'
            },
            barWidth: 5, //柱子宽度
            barGap: '-100%',
            data: [],
            animation: false
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
