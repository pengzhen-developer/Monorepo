<template>
  <v-chart :options="polar"
           :autoresize="true" />
</template>

<script>
const data = [
  {
    name: '阿莫西林',
    value: 30
  },
  {
    name: '阿奇霉素',
    value: 40
  },
  {
    name: '厄贝沙坦',
    value: 50
  },
  {
    name: '双黄连口服液',
    value: 70
  },
  {
    name: '按下西邻较难',
    value: 80
  }
]

const yAxiosData = data.map((item) => item.name)
const xAxiosData = data.map((item) => item.value)
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
          type: 'value',
          //改变坐标轴文本的样式
          axisLabel: {
            show: false
          },
          splitLine: {
            //格线样式
            show: false
          }
        },
        yAxis: {
          type: 'category',
          data: yAxiosData,
          //改变坐标轴文本的样式
          axisLabel: {
            textStyle: {
              color: '#02D9FD',
              fontSize: 12
            }
          },
          //改变坐标轴和文本的样式
          axisLine: {
            show: false
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
            data: xAxiosData,
            barWidth: 5, //柱子宽度
            barGap: 1, //柱子之间间距
            label: {
              show: true,
              position: 'right',
              color: '#FFFFFF'
            },
            itemStyle: {
              //柱样式
              normal: {
                barBorderRadius: 2,
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
