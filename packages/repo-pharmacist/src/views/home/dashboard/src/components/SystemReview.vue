<template>
  <div class="card-style flex column">
    <div class="card-title">系统审方统计</div>
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
    <div class="chartCont col">
      <v-chart :options="polar"
               :autoresize="true" />
    </div>
  </div>
</template>

<script>
import Service from '../service'
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
export default {
  props: {
    data: {
      type: Object
    }
  },
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
      activeName: '互联网医院',
      resource: ['互联网医院', '门诊', '急诊', '住院'],
      polar: {
        grid: {
          top: 10,
          left: 40,
          right: 12,
          bottom: 20
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(53, 196, 214, 0.05)'
                  },
                  {
                    offset: 0.5,
                    color: 'rgba(53, 196, 214, 1)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(53, 196, 214, 0.05)'
                  }
                ],
                global: false
              }
            }
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: true,
          //改变坐标轴文本的样式
          axisLabel: {
            textStyle: {
              color: 'rgba(0, 0, 0, 0.85)',
              fontSize: 12
            },
            formatter: '{value}'
          },
          //改变坐标轴和文本的样式
          axisLine: {
            lineStyle: {
              width: 0
            }
          },
          axisTick: {
            show: false,
            lineStyle: {
              color: '#5092C1'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#F7F7F7',
              type: 'dashed'
            }
          },
          data: []
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            textStyle: {
              color: 'rgba(0, 0, 0, 0.85)',
              fontSize: 12
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
              color: '#F7F7F7',
              type: 'dashed'
            }
          },
          splitNumber: 3
        },

        series: [
          {
            data: [],
            type: 'line',
            symbol: 'emptyCircle',
            symbolSize: 6,
            hoverAnimation: false,
            itemStyle: {
              color: '#ffffff',
              borderColor: '#35C4D6',
              borderWidth: 1
            },
            emphasis: {
              itemStyle: {
                color: '#35C4D6',
                borderColor: 'rgba(53, 196, 214, 0.2)',
                borderWidth: 8
              }
            },
            lineStyle: {
              color: '#35C4D6',
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
                      color: 'rgba(53, 196, 214, 0.4)' // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: 'rgba(53, 196, 214, 0)' // 100% 处的颜色
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
    getData(source = this.activeName) {
      this.data.type = 1
      this.data.prescriptionSource = source
      const params = Peace.util.deepClone(this.data)
      Service.systemExeStatisticsChart(params).then((res) => {
        let data = res.data.list
        this.polar.xAxis.data = data.map((v) => v.name)
        this.polar.series[0].data = data.map((v) => v.value)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.card-style {
  height: 308px;
  background: #ffffff;
  box-shadow: 0px 0px 10px 0px rgba(48, 153, 166, 0.1);
  border-radius: 4px;
  padding: 20px 0 0 20px;
}
.echarts {
  width: 100% !important;
  height: 100% !important;
}
.card-title {
  font-size: 16px;
  color: rgba(0, 0, 0, 0.85);
  line-height: 22px;
}
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
.chartCont {
  padding: 13px 32px 32px 0;
}
</style>