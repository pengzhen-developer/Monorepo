<template>
  <div class="column full-width full-height"
       style="border:2px solid rgba(26, 63, 129, 1);">
    <div class="card-title text-grey col-2 q-px-md q-my-sm">
      近半年订单销售额
    </div>
    <div class="col q-px-sm">
      <v-chart :options="option"
               :autoresize="true" />
    </div>
  </div>
</template>
<script>
const data = [
  {
    date: '1月',
    value: 103
  },
  {
    date: '2月',
    value: 271
  },
  {
    date: '3月',
    value: 198
  },
  {
    date: '4月',
    value: 383
  },
  {
    date: '5月',
    value: 254
  },
  {
    date: '5月',
    value: 455
  }
]

const xAxiosData = data.map((item) => item.date)
const yAxiosData = data.map((item) => item.value)
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
export default {
  components: {
    'v-chart': ECharts
  },
  data() {
    return {
      option: {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: xAxiosData
        },
        yAxis: {
          type: 'value',
          show: false
        },
        series: [
          {
            data: yAxiosData,
            type: 'line',
            symbol: 'circle', //折点设定为实心点
            symbolSize: 6, //设定实心点的大小
            itemStyle: {
              color: '#65D5FD',
              borderColor: '#2B80FF',
              borderWidth: 2
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
                      color: '#4390FA' // 0% 处的颜色
                    },
                    {
                      offset: 0.5,
                      color: '#36ACFE' // 100% 处的颜色
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