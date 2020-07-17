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

  data() {
    return {
      opComplete: {
        title: [
          {
            text: '已完成',
            left: 'center',
            top: '80%',
            textStyle: { fontWeight: 'normal', fontSize: '12', color: '#389af4', textAlign: 'center' }
          }
        ],
        series: [
          {
            name: '已完成',
            type: 'pie',
            clockWise: false,
            radius: [30, 20],
            itemStyle: { normal: { color: '#BB42EF', shadowColor: '#BB42EF', shadowBlur: 0, label: { show: false }, labelLine: { show: false } } },
            hoverAnimation: false,
            center: ['50%', '40%'],
            label: {
              normal: {
                show: true,
                position: 'center',
                padding: [0, 0, 0, 0],
                align: 'center',
                width: 70,
                height: 50,
                lineHeight: 14,
                fontSize: 14,
                formatter() {
                  return '30%'
                }
              }
            },
            data: [
              { value: 70, name: 'invisible', itemStyle: { normal: { color: '#dfeaff' }, emphasis: { color: '#dfeaff' } } },
              { value: 30, label: { normal: { position: 'center', show: true, textStyle: { fontSize: '14', fontWeight: 'bold', color: '#fff' } } } }
            ]
          }
        ]
      },

      opUncomplete: {
        title: {
          text: '未完成',
          left: 'center',
          top: '80%',
          textStyle: { fontWeight: 'normal', fontSize: '12', color: '#389af4', textAlign: 'center' }
        },
        series: [
          {
            name: '未完成',
            type: 'pie',
            clockWise: false,
            radius: [30, 20],
            itemStyle: { normal: { color: '#389af4', shadowColor: '#389af4', shadowBlur: 0, label: { show: false }, labelLine: { show: false } } },
            hoverAnimation: false,
            center: ['50%', '40%'],
            label: {
              normal: {
                show: true,
                position: 'center',
                padding: [0, 0, 0, 0],
                align: 'center',
                width: 70,
                height: 50,
                lineHeight: 14,
                fontSize: 14,
                formatter() {
                  return '20%'
                }
              }
            },
            data: [
              { value: 80, name: 'invisible', itemStyle: { normal: { color: '#dfeaff' }, emphasis: { color: '#dfeaff' } } },
              { value: 20, label: { normal: { position: 'center', show: true, textStyle: { fontSize: '14', fontWeight: 'bold', color: '#fff' } } } }
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