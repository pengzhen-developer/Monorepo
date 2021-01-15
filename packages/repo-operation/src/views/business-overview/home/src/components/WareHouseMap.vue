<template>
  <div class="card-style q-pa-md">
    <div class="row items-center justify-between">
      <div class="card-title">多店云仓分布图</div>
      <div class="">{{ mapTitle }}</div>
    </div>
    <div class="chart-container">
      <v-chart :options="polar"
               :autoresize="true" />
    </div>
  </div>
</template>

<script>
import ECharts from 'vue-echarts'
// 手动引入 ECharts 各模块来减小打包体积
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/map/js/china.js'

export default {
  name: 'ware-house-map',

  components: {
    'v-chart': ECharts
  },

  props: {
    count: {
      type: Object,
      default: () => {}
    },
    map: {
      type: Array,
      default: () => []
    }
  },

  watch: {
    count: {
      handler(val) {
        this.shopCount = val.store
        this.warehouse = val.warehouse
      },
      immediate: true,
      deep: true
    },
    map: {
      handler(val) {
        this.polar.series[0].data = val
      },
      immediate: true,
      deep: true
    }
  },

  data() {
    return {
      shopCount: 0,
      warehouse: 0,
      polar: {
        backgroundColor: '#fff',
        tooltip: {
          trigger: 'item',
          padding: [10, 15],
          textStyle: {
            fontSize: 20
          },
          formatter: function (params) {
            const { name, value } = params
            return `
                    ${name} <br/>
                    云仓：${value[2]} <br/>
                    药店：${value[3]} <br/>
                `
          }
        },
        geo: {
          map: 'china',
          itemStyle: {
            areaColor: '#E6FBF9',
            borderColor: '#40DBCC',
            color: '#E6FBF9'
          },
          emphasis: {
            itemStyle: {
              areaColor: '#E6FBF9'
            },
            label: {
              show: false
            }
          }
        },
        series: [
          {
            name: '多店云仓',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: [],
            symbolSize: 12,
            itemStyle: {
              normal: {
                color: '#69C0FF',
                borderColor: '#BAE7FF',
                borderWidth: 3
              }
            },
            emphasis: {
              itemStyle: {
                borderColor: '#fff',
                borderWidth: 1
              }
            }
          }
        ]
      }
    }
  },
  computed: {
    mapTitle() {
      return `门店：${this.shopCount}家  云仓：${this.warehouse}个`
    }
  }
}
</script>

<style lang="scss" scoped>
.card-style {
  height: 576px;
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
    height: 530px;

    .echarts {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
