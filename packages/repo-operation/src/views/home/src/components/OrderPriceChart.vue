<template>
  <div class="column full-width full-height"
       style="border:2px solid rgba(26, 63, 129, 1);">
    <div class="card-title text-grey col-2 q-px-md q-my-sm">近7日订单价格区间</div>
    <div class="col q-px-sm">
      <v-chart :options="polar"
               :autoresize="true" />
    </div>
  </div>
</template>

<script>
const data = {
  '0-50': '50',
  '50-100': '100',
  '100-150': '70',
  '150-200': '250',
  '200-250': '150',
  '250以上': '10'
}

const result = [
  {
    value: 1,
    name: '0-50',
    itemStyle: {
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: '#FF4F42' // 0% 处的颜色
          },
          {
            offset: 1,
            color: '#FFAB61' // 100% 处的颜色
          }
        ],
        global: false // 缺省为 false
      }
    }
  },
  {
    value: 2,
    name: '50-100',
    itemStyle: {
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: '#FF6600' // 0% 处的颜色
          },
          {
            offset: 1,
            color: '#EDFF2A' // 100% 处的颜色
          }
        ],
        global: false // 缺省为 false
      }
    }
  },
  {
    value: 3,
    name: '100-150',
    itemStyle: {
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: '#00FCFF' // 0% 处的颜色
          },
          {
            offset: 1,
            color: '#28B1FF' // 100% 处的颜色
          }
        ],
        global: false // 缺省为 false
      }
    }
  },
  {
    value: 4,
    name: '150-200',
    itemStyle: {
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: '#2BFFDF' // 0% 处的颜色
          },
          {
            offset: 1,
            color: '#28B1FF' // 100% 处的颜色
          }
        ],
        global: false // 缺省为 false
      }
    }
  },
  {
    value: 5,
    name: '200-250',
    itemStyle: {
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: '#BB42EF' // 0% 处的颜色
          },
          {
            offset: 1,
            color: '#E23AF5' // 100% 处的颜色
          }
        ],
        global: false // 缺省为 false
      }
    }
  },
  {
    value: 2,
    name: '250以上',
    itemStyle: {
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: '#2B8AFF' // 0% 处的颜色
          },
          {
            offset: 1,
            color: '#68A9FA' // 100% 处的颜色
          }
        ],
        global: false // 缺省为 false
      }
    }
  }
]
result.map((item) => {
  item.value = data[item.name]
})

import ECharts from 'vue-echarts'
// 手动引入 ECharts 各模块来减小打包体积
import 'echarts/lib/chart/pie'
export default {
  name: 'screen-order-list',

  components: {
    'v-chart': ECharts
  },

  data() {
    return {
      polar: {
        backgroundColor: 'transparent',
        legend: {
          orient: 'vertical',
          top: 'center',
          right: '5%',
          // data: xAxiosData,
          textStyle: {
            color: '#fff',
            fontSize: 16
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}'
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['30%', '80%'],
            center: ['40%', '50%'],
            roseType: 'radius',
            label: {
              show: true,
              normal: {
                position: 'outside',
                fontSize: 16,
                color: '#fff'
              }
            },
            labelLine: {
              length: 1,
              length2: 20,
              smooth: true
            },
            data: result
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
