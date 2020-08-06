<template>
  <v-chart :options="polar"
           :autoresize="true" />
</template>

<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/pie'

const COLOR_MAP = [
  ['#ffab61', '#ff4f42'],
  ['#3ed3bf', '#35ffe0'],
  ['#28b1ff', '#00ffff'],
  ['#ff6600', '#ffb400'],
  ['#e23af5', '#bc42ef'],
  ['#68a9fa', '#2b8aff']
]

export default {
  name: 'screen-order-list',

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
        let len = val.xAxis.length

        let xAxis = val.xAxis.map((item, index) => {
          return index === len - 1 ? `${item * 50}以上` : `${(item - 1) * 50}-${item * 50}`
        })

        let data = val.data.map((item, index) => {
          return {
            name: index === len - 1 ? `${item.name * 50}以上` : `${(item.name - 1) * 50}-${item.name * 50}`,
            value: item.value
          }
        })

        this.polar.legend.data = xAxis
        this.polar.series[0].data = data
      },
      immediate: true,
      deep: true
    }
  },

  data() {
    return {
      polar: {
        backgroundColor: 'transparent',
        legend: {
          orient: 'vertical',
          top: 'middle',
          right: 8,
          height: 70,
          itemWidth: 10,
          itemHeight: 10,
          icon: 'circle',
          data: [],
          textStyle: {
            color: '#fff',
            fontSize: 12
          }
        },
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: '订单价格',
            type: 'pie',
            radius: ['35%', '90%'],
            center: ['30%', '50%'],
            roseType: 'radius',
            itemStyle: {
              borderWidth: 2,
              borderColor: '#000a3b',
              color: (params) => {
                return {
                  type: 'radial',
                  x: 0,
                  y: 1,
                  r: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: COLOR_MAP[params.dataIndex][0] // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: COLOR_MAP[params.dataIndex][1] // 100% 处的颜色
                    }
                  ],
                  global: false // 缺省为 false
                }
              }
            },
            label: {
              normal: {
                show: false,
                position: 'outside',
                fontSize: 16,
                color: '#fff'
              }
            },
            labelLine: {
              length: 1,
              length2: 20,
              smooth: false
            },
            data: []
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
