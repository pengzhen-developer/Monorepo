<template>
  <div class="file-blood-detail">
    <div class="file-blood-detail-header"
         :class="{ normal: data.bloodOxygenData.resultType === '2', unnormal: data.bloodOxygenData.resultType !== '2' }">
      <p class="header-text">{{ data.bloodOxygenData.result }}</p>
      <p class="header-text"
         style="padding: 0 0 0 15px ;font-size: 10px; ">
        {{ data.bloodOxygenData.measureTime && data.bloodOxygenData.measureTime.toDate().formatDate('yyyy-MM-dd HH:mm') }}
      </p>

      <div class="header-image">
        <div class="bg"
             :class="{ normal: data.bloodOxygenData.resultType === '2', unnormal: data.bloodOxygenData.resultType !== '2' }">
          <p style="font-size: 25px; font-weight:bold; line-height: 32px;">
            {{ data.bloodOxygenData.bloodOxygen }} {{ util.getUnit('血氧') }}
          </p>
          <p style="font-size: 14px; font-weight:400; line-height: 24px;">
            脉率
            {{ data.bloodOxygenData.pulseRate }}
            次/分</p>
        </div>
      </div>
    </div>

    <div class="file-blood-detail-button">
      <van-button round
                  disabled>数据解读</van-button>
    </div>

    <div class="file-blood-detail-content">
      <div style="color: #666666; line-height: 22px; text-align: justify;"
           v-html="data.bloodOxygenData.itemResultUnscramble">
      </div>
    </div>

    <div class="file-blood-detail-charts">
      <div class="charts-header flex between">
        <div style="font-size: 16px; font-weight: bold; color: #333333;">
          血氧趋势
        </div>
        <div @click="goReportHistory()"
             style="font-size: 12px; font-weight: 400; color: #00c6ae;">
          历史测量数据 》
        </div>
      </div>
      <div class="charts-body">
        <v-chart class="charts"
                 :options="options" />
      </div>
    </div>

    <div class="file-blood-detail-control">
      <van-button @click="goReportAddData"
                  round
                  size="large"
                  class="full"
                  type="primary">手动添加</van-button>
    </div>
  </div>
</template>

<script>
import peace from '@src/library'
import util from './util'

import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'

export default {
  components: {
    'v-chart': ECharts
  },

  data() {
    return {
      util,

      data: {
        bloodOxygenData: {}
      },
      historyData: [],

      options: {
        color: ['#00c6ae'],
        tooltip: { show: true },
        grid: {
          top: 20,
          bottom: 20,
          right: 20,
          left: 40
        },
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [],
            type: 'line',
            smooth: true
          }
        ]
      }
    }
  },

  created() {
    this.getOscillogram()
  },

  methods: {
    getOscillogram() {
      const params = $peace.util.decode($peace.$route.params.json)

      peace.service.health.getOscillogram(params).then((res) => {
        const upData = res.data.upInfo
        const downData = res.data.downInfo

        const xAxisData = downData.bloodOxygenData.map((item) => item.measureTime.toDate().formatDate('MM-dd'))
        const seriesDataOne = downData.bloodOxygenData.map((item) => item.bloodOxygen)
        let lastData = downData.bloodOxygenData[downData.bloodOxygenData.length - 1]
        this.$peace.cache.set('bloodOxyGenLastData', lastData)
        this.options.xAxis.data = xAxisData
        this.options.series[0].data = seriesDataOne
        this.data.bloodOxygenData = upData.bloodOxygenData
      })
    },

    goReportHistory() {
      const json = this.$route.params.json

      this.$router.push(`/file/FileBloodOxyGenHistory/${json}`)
    },

    goReportAddData() {
      const json = this.$route.params.json
      this.$router.replace(`/file/FileBloodOxyGenAddData/${json}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  align-items: center;

  &.column {
    flex-direction: column;
  }
  &.between {
    justify-content: space-between;
  }
  &.around {
    justify-content: space-around;
  }
  &.center {
    justify-content: center;
  }
}

.file-blood-detail {
  height: 100%;
  background: #fafafa;

  .file-blood-detail-header {
    height: 190px;
    background: linear-gradient(56deg, rgba(2, 211, 183, 1) 0%, rgba(104, 208, 225, 1) 100%);

    &.normal {
      background: linear-gradient(56deg, rgba(2, 211, 183, 1) 0%, rgba(104, 208, 225, 1) 100%);
    }
    &.unnormal {
      background: linear-gradient(90deg, rgba(255, 187, 96, 1) 0%, rgba(252, 161, 56, 1) 100%);
    }

    .header-text {
      padding: 10px 0 0 15px;
      font-size: 20px;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
    }

    .header-image {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100px;

      .bg {
        width: 220px;
        height: 130px;

        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: 45px 0 0 0;
        color: #fff;

        &.normal {
          background-image: url('~@/assets/images/file/bg_img_normal.png');
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }
        &.unnormal {
          background-image: url('~@/assets/images/file/bg_img_unnormal.png');
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  }

  .file-blood-detail-button {
    text-align: center;
    margin: -20px 0 0 0;

    .van-button {
      padding: 0 20px;
      height: 32px;
      line-height: 32px;
      font-size: 14px;
      background: rgb(219, 235, 233) !important;
      border-color: rgb(219, 235, 233) !important;
      color: #333333 !important;
      opacity: 1 !important;
    }
  }

  .file-blood-detail-content {
    background: linear-gradient(to bottom, #fafafa, #ffffff);
    padding: 10px;
    margin: 0 0 10px 0;

    .content-left,
    .content-right {
      width: 50%;

      .van-button {
        border-color: transparent !important;
        background-color: transparent !important;
        color: #000 !important;

        i {
          font-size: 28px;
          margin: 0 10px 0 0;
        }
        span {
          color: #38485c;
          font-size: 16px;
        }
      }
    }

    .content-left {
      border-right: 1px solid #ededed;
    }
  }

  .file-blood-detail-charts {
    margin: 0 0 10px 0;
    background: #fff;
    padding: 12px 14px;

    // .charts-header {
    // }

    .charts {
      width: 100%;
      height: 150px;
    }
  }
}
</style>