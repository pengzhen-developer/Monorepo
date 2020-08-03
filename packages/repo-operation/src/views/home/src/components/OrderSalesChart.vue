<template>
  <v-chart :options="option"
           :autoresize="true" />
</template>
<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
export default {
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
        this.option.xAxis.data = val.xAxis
        this.option.series[0].data = val.data
      },
      immediate: true,
      deep: true
    }
  },

  data() {
    return {
      option: {
        grid: {
          top: 10,
          left: 40,
          right: 10,
          bottom: 20
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none'
          },
          formatter: function (params) {
            return (
              params[0].name +
              '月<br/>' +
              "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:rgba(36,207,233,0.9)'></span> 销售额 : " +
              params[0].value +
              '元'
            )
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          //改变坐标轴文本的样式
          axisLabel: {
            textStyle: {
              color: '#5092C1',
              fontSize: 12
            },
            formatter: '{value}月'
          },
          //改变坐标轴和文本的样式
          axisLine: {
            lineStyle: {
              width: 0
            }
          },
          axisTick: {
            lineStyle: {
              color: '#5092C1'
            }
          },
          data: []
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            textStyle: {
              color: 'rgba(101, 171, 231, 0.7)',
              fontSize: 12
            },
            formatter: function (value) {
              if (value >= 10000) {
                return (value / 10000).toLocaleString() + '万'
              } else {
                return value.toLocaleString()
              }
            }
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(101, 198, 231, 0.2)',
              type: 'solid'
            }
          },
          splitNumber: 3
        },
        series: [
          {
            data: [],
            type: 'line',
            symbol: 'circle', //折点设定为实心点
            symbolSize: 6, //设定实心点的大小
            itemStyle: {
              color: '#65D5FD',
              borderColor: '#2B80FF',
              borderWidth: 2
            },
            lineStyle: {
              color: '#65D5FD',
              width: 1
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
                      color: 'rgba(43, 128, 255, 0.9)' // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: 'rgba(43, 128, 255, 0.1)' // 100% 处的颜色
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
.echarts {
  width: 100% !important;
  height: 100% !important;
}
</style>