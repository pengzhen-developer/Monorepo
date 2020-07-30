<template>
  <div class="col row full-width full-height">
    <div class="flex column justify-center items-center col">
      <v-chart :options="opComplete"
               :autoresize="true" />
    </div>
    <div class="flex justify-center items-center col">
      <v-chart :options="opUncomplete"
               :autoresize="true" />
    </div>
  </div>
</template>

<script>
import ECharts from 'vue-echarts'
// 手动引入 ECharts 各模块来减小打包体积
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'

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
        this.opComplete.series[0].data[1].value = val.complete
        this.opComplete.series[0].data[0].value = 100 - val.complete

        this.opUncomplete.series[0].data[1].value = val.incomplete
        this.opUncomplete.series[0].data[0].value = 100 - val.incomplete
      },
      immediate: true,
      deep: true
    }
  },

  data() {
    return {
      opComplete: {
        title: [
          {
            text: '已完成',
            left: 'center',
            top: '78%',
            textStyle: { fontWeight: 'normal', fontSize: '12', color: 'rgba(255,255,255,0.3)', textAlign: 'center' }
          }
        ],
        tooltip: {
          trigger: 'item',
          axisPointer: {
            type: 'none'
          },
          formatter: function (params) {
            return (
              "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:" +
              params.color +
              ";'></span>" +
              params.name +
              ' : ' +
              params.value +
              '%'
            )
          }
        },
        series: [
          {
            name: '',
            type: 'pie',
            clockWise: false,
            radius: [34, 36],
            hoverAnimation: false,
            center: ['50%', '40%'],
            labelLine: {
              show: false
            },
            data: [
              {
                value: 0,
                name: '其他',
                itemStyle: { normal: { color: '#193F80', borderColor: '#193F80', borderWidth: 6 } },
                label: {
                  normal: {
                    show: false
                  }
                }
              },
              {
                value: 0,
                name: '已完成',
                itemStyle: {
                  normal: {
                    color: '#BB42EF',
                    borderColor: '#BB42EF',
                    borderWidth: 6
                  }
                },
                label: {
                  normal: {
                    position: 'center',
                    show: true,
                    textStyle: { fontSize: '16', fontWeight: 'bold', color: '#fff' },
                    formatter: (val) => {
                      return val.value + '%'
                    }
                  }
                }
              }
            ]
          }
        ]
      },

      opUncomplete: {
        title: {
          text: '未完成',
          left: 'center',
          top: '78%',
          textStyle: { fontWeight: 'normal', fontSize: '12', color: 'rgba(255,255,255,0.3)', textAlign: 'center' }
        },
        tooltip: {
          trigger: 'item',
          axisPointer: {
            type: 'none'
          },
          formatter: function (params) {
            return (
              "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:" +
              params.color +
              ";'></span>" +
              params.name +
              ' : ' +
              params.value +
              '%'
            )
          }
        },
        series: [
          {
            name: '',
            type: 'pie',
            clockWise: false,
            radius: [34, 36],
            hoverAnimation: false,
            center: ['50%', '40%'],
            labelLine: {
              show: false
            },
            data: [
              {
                value: 0,
                name: '其他',
                itemStyle: { normal: { color: '#193F80', borderColor: '#193F80', borderWidth: 6 } },
                label: {
                  normal: {
                    show: false
                  }
                }
              },
              {
                value: 0,
                name: '未完成',
                itemStyle: {
                  normal: {
                    color: '#4366F3',
                    borderColor: '#4366F3',
                    borderWidth: 6
                  }
                },
                label: {
                  normal: {
                    position: 'center',
                    show: true,
                    textStyle: {
                      fontSize: '16',
                      fontWeight: 'bold',
                      color: '#fff'
                    },
                    formatter: (val) => {
                      return val.value + '%'
                    }
                  }
                }
              }
            ]
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