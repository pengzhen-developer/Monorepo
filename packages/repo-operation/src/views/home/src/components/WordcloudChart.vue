<template>
  <v-chart :options="option"
           :autoresize="true" />
</template>

<script>
import ECharts from 'vue-echarts'

import 'dragon-echarts-wordcloud'

const data = [
  { name: '急性肠梗阻', value: 3328 },
  { name: '消化系溃疡', value: 289 },
  { name: '急性腹膜炎', value: 287 },
  { name: '急性阑尾炎', value: 233 },
  { name: '消化性溃疡穿孔', value: 228 },
  { name: '急性胰腺炎', value: 207 },
  { name: '尿路感染', value: 206 },
  { name: '急性胃炎', value: 201 },
  { name: '急性胃肠炎', value: 180 },
  { name: '食管癌', value: 178 },
  { name: '慢性肠炎', value: 151 },
  { name: '东莞时报', value: 143 },
  { name: '莞讯网', value: 139 },
  { name: '广州日报', value: 137 },
  { name: '东莞阳光台', value: 132 },
  { name: '搜狐新闻', value: 129 },
  { name: '今日头条.APP', value: 116 },
  { name: '东莞阳光平台', value: 108 },
  { name: '腾讯新闻.APP', value: 107 },
  { name: '南方网', value: 103 },
  { name: 'UC头条', value: 98 },
  { name: '口，鼻出血', value: 93 },
  { name: '报告诉', value: 77 },
  { name: '网易新闻.APP', value: 74 }
].slice()
// 随机颜色
let randcolor = () => {
  let r = 100 + ~~(Math.random() * 100)
  let g = 135 + ~~(Math.random() * 100)
  let b = 100 + ~~(Math.random() * 100)
  return `rgb(${r}, ${g}, ${b})`
}
export default {
  components: {
    'v-chart': ECharts
  },
  data() {
    return {
      option: {
        backgroundColor: 'transparent',
        tooltip: {
          trigger: 'item',
          padding: [10, 15],
          textStyle: {
            fontSize: 20
          },
          formatter: (params) => {
            const { name, value } = params
            return `
                    平台：${name} <br/>
                    数量：${value}
                `
          }
        },
        series: [
          {
            type: 'wordCloud',
            gridSize: 20,
            sizeRange: [12, 50],
            rotationRange: [0, 0],
            shape: 'circle',
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
            data: data
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