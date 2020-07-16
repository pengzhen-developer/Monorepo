<template>
  <div class="card-style q-pa-md">
    <div class="card-title">订单量趋势图 (近7日)</div>
    <div class="chart-container">
      <v-chart :options="polar"
               :autoresize="true" />
    </div>
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
// 只有3根分割线，替换最值分割线的颜色为背景色隐藏
const ySplitLineColors = ['#F6F6F6', '#F6F6F6', '#fff']
// 如果分割线数量根据数据来如下替换
// (function() {
//   const tmp = data.map((_) => '#F6F6F6')
//   tmp[tmp.length] = '#fff'
//   return tmp
// })()
import Service from '../service'
import ECharts from 'vue-echarts'

// 手动引入 ECharts 各模块来减小打包体积
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'

export default {
  name: 'order-count-chart',

  components: {
    'v-chart': ECharts
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
            showMaxLabel: false
          },
          splitNumber: 2,
          min: function() {
            return 0
          },
          max: function(value) {
            return value.max * 1.2
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
              color: ySplitLineColors //[xx , '#F6F6F6'.data cout, xx];
            }
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
            barWidth: 16, //柱子宽度
            barGap: 1, //柱子之间间距
            itemStyle: {
              //柱样式
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
                      color: '#45DCCA' // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: '#20D5DE' // 100% 处的颜色
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
  },

  mounted() {
    this.$nextTick().then(() => {
      this.get()
    })
  },
  methods: {
    get() {
      Service.get7DaysOrderNum()
        .then((res) => {
          console.log(res)
        })
        .finally(() => {})
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

  .chart-container {
    width: 100%;
    height: 250px;

    .echarts {
      width: 100% !important;
      height: 100% !important;
    }
  }
}
</style>
