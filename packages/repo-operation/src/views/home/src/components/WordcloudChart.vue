<template>
  <v-chart :options="option"
           :autoresize="true" />
</template>

<script>
import ECharts from 'vue-echarts'

import 'dragon-echarts-wordcloud'

// 随机颜色
let randcolor = () => {
  let a = Math.ceil(Math.random() * (10 - 2) + 2) / 10
  return `rgba(2, 217, 253, ${a})`
}

export default {
  components: {
    'v-chart': ECharts
  },

  props: {
    data: {
      type: Array
    }
  },

  watch: {
    data: {
      handler(val) {
        this.option.series[0].data = val
      },
      immediate: true,
      deep: true
    }
  },

  data() {
    return {
      option: {
        backgroundColor: 'transparent',
        tooltip: {
          trigger: 'item',
          formatter: (params) => {
            const { name, value } = params
            return `
                    关键字：${name} <br/>
                    数量：${value}
                `
          }
        },
        series: [
          {
            type: 'wordCloud',
            gridSize: 24,
            sizeRange: [12, 20],
            rotationRange: [0, 0],
            shape: 'circle ',
            textStyle: {
              normal: {
                color: () => {
                  return randcolor()
                }
              },
              emphasis: {
                shadowBlur: 10,
                shadowColor: '#333'
              }
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