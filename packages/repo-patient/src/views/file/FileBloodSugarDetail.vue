<template>
  <div class="file-blood-detail">
    <div class="file-blood-detail-header"
         :class="{ normal: data.bloodSugarData.resultType === '2', unnormal: data.bloodSugarData.resultType !== '2' }">
      <p class="header-text">{{ data.bloodSugarData.result }}</p>
      <p class="header-text"
         style="padding: 0 0 0 15px ;font-size: 10px; ">
        {{ data.bloodSugarData.measureTime && data.bloodSugarData.measureTime.toDate().formatDate('yyyy-MM-dd HH:mm') }}
      </p>

      <div class="header-image">
        <div class="bg"
             :class="{ normal: data.bloodSugarData.resultType === '2', unnormal: data.bloodSugarData.resultType !== '2' }">
          <p style="font-size: 25px; font-weight:bold; line-height: 25px;">
            {{ data.bloodSugarData.bloodSugar }}
          </p>
          <p style="font-size: 12px; font-weight:400; line-height: 18px;">
            {{ util.getUnit('血糖') }}
          </p>
        </div>
      </div>
    </div>

    <div class="file-blood-detail-button">
      <van-button round
                  disabled>数据解读</van-button>
    </div>

    <div class="file-blood-detail-content">
      <div style="color: #666666; line-height: 22px; text-align: justify;"
           v-html="data.bloodSugarData.itemResultUnscramble">
      </div>

      <van-divider style="margin: 10px 0;" />

      <div class="report flex around">
        <div class="content-left">
          <van-button @click="util.goReportList('血糖', '周报', $peace.util.decode($peace.$route.params.json).idCard)"
                      :icon="require('@src/assets/images/file/ic_week.png')"
                      type="info">血糖周报</van-button>
        </div>
        <div class="content-right">
          <van-button @click="util.goReportList('血糖', '月报', $peace.util.decode($peace.$route.params.json).idCard)"
                      :icon="require('@src/assets/images/file/ic_calendar.png')"
                      type="info">血糖月报</van-button>
        </div>
      </div>
    </div>
    <div class="file-tab-wrap">
      <div class="file-tab">
        <span :class="tabIndex==1 ? 'active' : ''"
              @click="getOscillogram(1,'click')">空腹</span>
        <span :class="tabIndex==2 ? 'active' : ''"
              @click="getOscillogram(2,'click')">餐后</span>
      </div>
    </div>
    <div class="file-blood-detail-charts">
      <div class="charts-header flex between">
        <div style="font-size: 16px; font-weight: bold; color: #333333;">
          血糖趋势
        </div>
        <div @click="goReportHistory()"
             style="font-size: 12px; font-weight: 400; color: #00c6ae;">
          历史测量数据 》
        </div>
      </div>
      <div class="charts-body">
        <v-chart class="charts"
                 :options="options"
                 v-if="options.xAxis.data.length>0" />
        <div class="none-page"
             v-else>
          <div class="icon icon_none_source"></div>
          <div class="none-text">暂无数据</div>
        </div>
      </div>
    </div>

    <div class="file-blood-detail-control">
      <van-button @click="goReportAddData"
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
      tabIndex: '1',
      data: {
        bloodSugarData: {}
      },

      historyData: [],

      options: {
        color: ['#00c6ae'],
        grid: {
          top: 20,
          bottom: 20,
          right: 20,
          left: 40
        },
        tooltip: { show: true },
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
          },
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
    console.log($peace.util.decode($peace.$route.params.json))
    // this.tabIndex=$peace.util.decode($peace.$route.params.json).type
    this.getOscillogram(2)
  },

  methods: {
    getOscillogram(tag, type) {
      // debugger
      const params = $peace.util.decode($peace.$route.params.json)
      peace.service.health.getOscillogram(params).then(res => {
        const upData = res.data.upInfo
        const downData = res.data.downInfo
        if (typeof type == 'undefined') {
          this.tabIndex = upData.bloodSugarData.measureState == '1' ? 1 : 2
          tag = this.tabIndex
        } else {
          this.tabIndex = tag == '1' ? 1 : 2
        }

        let xAxisData = null,
          seriesDataOne = null
        if (tag == 1) {
          xAxisData = downData.bloodSugarDataBefore.map(item =>
            item.measureTime.toDate().formatDate('MM-dd')
          )
          seriesDataOne = downData.bloodSugarDataBefore.map(item => item.bloodSugar)
        } else {
          xAxisData = downData.bloodSugarDataAfter.map(item =>
            item.measureTime.toDate().formatDate('MM-dd')
          )
          seriesDataOne = downData.bloodSugarDataAfter.map(item => item.bloodSugar)
        }

        console.log(this.tabIndex)
        this.data.bloodSugarData = upData.bloodSugarData
        this.options.xAxis.data = xAxisData
        this.options.series[0].data = seriesDataOne
      })
    },

    goReportHistory() {
      const json = this.$route.params.json

      this.$router.push(`/file/fileBloodSugarHistory/${json}`)
    },

    goReportAddData() {
      const json = this.$route.params.json

      this.$router.replace(`/file/fileBloodSugarAddData/${json}`)
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
  .file-tab-wrap {
    overflow: hidden;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 15px;
    .file-tab {
      width: auto;
      height: 28px;
      border-radius: 4px;
      border: 1px solid rgba(0, 198, 174, 1);
      span {
        width: 69px;
        height: 100%;
        display: inline-block;
        text-align: center;
        line-height: 28px;
        font-size: 14px;
        font-weight: 400;
        color: #666;
      }
      span.active {
        background: rgba(0, 198, 174, 1);
        color: #fff;
      }
    }
  }

  .file-blood-detail-header {
    height: 190px;
    background: linear-gradient(56deg, rgba(2, 211, 183, 1) 0%, rgba(104, 208, 225, 1) 100%);

    &.normal {
      background: linear-gradient(56deg, rgba(2, 211, 183, 1) 0%, rgba(104, 208, 225, 1) 100%);
    }
    &.unnormal {
      background: linear-gradient(90deg, rgba(254, 114, 162, 1) 0%, rgba(251, 125, 116, 1) 100%);
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
        width: 100%;
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

    .charts-header {
    }

    .charts {
      width: 100%;
      height: 150px;
    }
  }

  .file-blood-detail-control {
    background: #fff;
    padding: 0 10px;

    .van-button {
      width: 100%;
    }
  }
}
</style>
