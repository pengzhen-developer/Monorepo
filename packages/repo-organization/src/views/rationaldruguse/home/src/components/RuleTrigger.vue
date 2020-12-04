<template>
  <div class="card-style flex column">
    <div class="card-title">规则触发统计</div>
    <el-tabs class="element-ui-default"
             v-model="activeName">
      <q-tabs v-model="activeName"
              dense
              v-bind:breakpoint="0"
              active-color="primary"
              indicator-color="primary"
              align="left"
              style="border-bottom:1px solid #EFEFEF">
        <q-tab v-for="item in resource"
               v-bind:key="item"
               v-bind:label="item"
               v-bind:name="item" />
      </q-tabs>
    </el-tabs>
    <div class="col chart-container">
      <v-chart :options="polar"
               :autoresize="true" />
    </div>
  </div>
</template>

<script>
const bgColor = '#fff',
  fontColor = 'rgba(0, 0, 0, 0.85)'
const lineOption = {
  lineStyle: {
    color: '#F7F7F7',
    type: 'dashed'
  }
}
import Util from '@src/util'
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
  watch: {
    activeName: {
      handler(val) {
        this.getData(val)
      },
      immediate: true,
      deep: true
    }
  },
  data() {
    return {
      activeName: '门诊',
      resource: ['门诊', '急诊', '住院'],
      polar: {
        backgroundColor: bgColor,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none'
          }
        },
        grid: {
          top: '14%',
          right: '3%',
          left: '3%',
          bottom: '20%'
        },

        xAxis: [
          {
            type: 'category',
            data: [],
            axisLine: lineOption,
            axisTick: {
              show: true
            },
            axisLabel: {
              margin: 10,
              color: fontColor,
              textStyle: {
                fontSize: 14
              },
              interval: 0
            }
          }
        ],
        yAxis: [
          {
            axisLabel: {
              formatter: '{value}',
              color: fontColor
            },
            axisTick: {
              show: false
            },
            axisLine: lineOption,
            splitLine: lineOption
          }
        ],
        series: [
          {
            type: 'bar',
            data: [],
            barWidth: '15px',
            itemStyle: {
              normal: {
                barBorderRadius: [100, 100, 0, 0],
                color: '#3099A6'
              }
            },
            emphasis: {
              itemStyle: {
                color: {
                  type: 'linear', //设置线性渐变
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: '#35C5D6' // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: '#1494A3' // 100% 处的颜色
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
  methods: {
    getData(source) {
      const params = {
        hosCode: Util.user.getUserInfo().custCode,
        prescriptionSource: source
      }
      Service.ruleTriggerStatisticsChart(params).then((res) => {
        let data = res.data.list
        this.polar.xAxis[0].data = data.map((v) => v.name)
        this.polar.series[0].data = data.map((v) => v.value)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.card-style {
  height: 308px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 1px 4px 0px rgba(224, 224, 224, 1);
  border-radius: 4px;
  padding: 20px 0 0 20px;
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
  .card-title {
    font-size: 16px;
    color: rgba(0, 0, 0, 0.85);
    line-height: 22px;
  }

  .echarts {
    width: 100% !important;
    height: 100% !important;
  }
}
</style>
