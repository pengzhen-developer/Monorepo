<template>
  <div class="flex row fullscreen bg-grey-4">
    <div class="flex column col-3 full-height">
      <div class="col-3 bg-grey-2">
        <v-chart :options="polar" :autoresize="true" />
      </div>
      <div class="col-3">2</div>
      <div class="col-3">3</div>
      <div class="col-3">4</div>
    </div>

    <div class="col-6"></div>
    <div class="col-3"></div>
  </div>
</template>

<script>
const data = [
  {
    date: '0701',
    value: 1,
  },
  {
    date: '0702',
    value: 5,
  },
  {
    date: '0703',
    value: 19,
  },
  {
    date: '0704',
    value: 8,
  },
  {
    date: '0705',
    value: 2,
  },
  {
    date: '0706',
    value: 5,
  },
]

const xAxiosData = data.map((item) => item.date)
const yAxiosData = data.map((item) => item.value)
import ECharts from 'vue-echarts'
// 手动引入 ECharts 各模块来减小打包体积
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'

export default {
  components: {
    'v-chart': ECharts,
  },

  data() {
    return {
      polar: {
        grid: {
          top: '15%',
          left: '0%',
          right: '5%',
          bottom: '10%',
          containLabel: true,
        },
        xAxis: {
          data: xAxiosData,
          //改变坐标轴文本的样式
          axisLabel: {
            textStyle: {
              color: '#999',
              fontSize: 12,
            },
          },
          //改变坐标轴和文本的样式
          axisLine: {
            lineStyle: {
              width: 0,
            },
          },
          axisTick: {
            show: false,
          },
        },
        yAxis: {
          //改变坐标轴文本的样式
          axisLabel: {
            textStyle: {
              color: '#999',
              fontSize: 12,
            },
          },
          //改变坐标轴和文本的样式
          axisLine: {
            lineStyle: {
              width: 0,
            },
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            //格线样式
            lineStyle: {
              type: 'dotted',
              color: '#F6F6F6',
            },
          },
        },
        tooltip: {
          trigger: 'item',
          formatter: function(params) {
            const val = params.data
            return val.value
          },
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
                      color: '#45DCCA', // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: '#20D5DE', // 100% 处的颜色
                    },
                  ],
                  globalCoord: false, // 缺省为 false
                },
              },
            },
          },
        ],
      },
    }
  },
}
</script>

<style>
.echarts {
  width: 100% !important;
  height: 100% !important;
}
</style>
