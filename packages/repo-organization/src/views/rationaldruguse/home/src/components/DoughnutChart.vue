<template>
  <div class="chartCont">
    <v-chart :options="polar"
             :autoresize="true" />
  </div>
</template>

<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/title'

export default {
  name: 'doughnut-chart',

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
        let total = Number(val.subject) + Number(val.other)
        if (total == 0) {
          this.polar.series[0].data[0].value = '0.00'
          this.polar.series[0].data[1].value = '0.00'
        } else {
          this.polar.series[0].data[0].value = ((Number(val.subject) / total) * 100).toFixed(2)
          this.polar.series[0].data[1].value = ((Number(val.other) / total) * 100).toFixed(2)
        }
      },
      immediate: true,
      deep: true
    }
  },

  data() {
    return {
      polar: {
        title: {
          text: this.data.title,
          textStyle: {
            color: 'rgba(0, 0, 0, 0.85)',
            fontSize: 12,
            textAlign: 'center'
          },
          bottom: 0,
          left: 'center'
        },
        color: [this.data.mainColor, this.data.secondaryColor],
        series: [
          {
            name: 'demo',
            type: 'pie',
            radius: ['44%', '88%'],
            center: ['50%', '40%'],
            hoverAnimation: false,
            itemStyle: {
              borderWidth: 4,
              borderColor: '#ffffff'
            },
            labelLine: {
              show: false
            },
            data: [
              {
                value: 0,
                name: 'success',
                label: {
                  position: 'center',
                  show: true,
                  textStyle: { fontSize: '16', fontWeight: 'bold', color: this.data.mainColor },
                  formatter: (val) => {
                    return val.value + '%'
                  }
                },
                emphasis: {
                  itemStyle: {
                    color: this.data.mainColor
                  }
                }
              },
              {
                value: 0,
                name: 'fail',
                label: {
                  show: false
                },
                emphasis: {
                  itemStyle: {
                    color: this.data.secondaryColor
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
.chartCont {
  height: 156px;
  width: 141px;
  margin: auto;
}
.echarts {
  width: 100% !important;
  height: 100% !important;
}
</style>
