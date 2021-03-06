/*
 * 血氧
*/

<template>
  <div class="report">
    <div class="report-header">
      <el-button @click="back"
                 class="back"
                 type="primary">
        <i class="el-icon-arrow-left"></i> 返回
      </el-button>
      <el-button-group>
        <el-button :type="view.active === source.active['血氧数据'] ? 'primary' : '' "
                   @click="changeActive('血氧数据')">血氧数据</el-button>
        <el-button :type="view.active === source.active['历史数据'] ? 'primary' : '' "
                   @click="changeActive('历史数据')">历史数据</el-button>
      </el-button-group>
    </div>

    <div class="report-recent"
         v-show="view.active === source.active['血氧数据']">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card shadow="never">
            <h4>
              <i class="icon_ic_measure"></i>测量详情
            </h4>
            <el-divider></el-divider>

            <div class="report-recent-row">
              <div class="report-recent-col">
                <label>血氧浓度：</label>
                <span>{{ view.model.bloodOxygen }}%</span>
              </div>

              <div class="report-recent-col">
                <label>测量时间：</label>
                <span>{{ view.model.measureTime }}</span>
              </div>
            </div>
            <div class="report-recent-row">
              <label>脉率：</label>
              <span>{{ view.model.pulseRate }}次/分</span>
            </div>
            <div class="report-recent-row">
              <label>分析结果：</label>
              <span>{{ view.model.result }}</span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card shadow="never">
            <h4>
              <i class="icon_ic_datainterpretation"></i> 数据解读
            </h4>
            <el-divider></el-divider>
            <p>{{ view.model.itemResultUnscramble }}</p>
          </el-card>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-card shadow="never">
            <h4>
              <i class="icon_ic_datatrends"></i> 数据趋势
            </h4>
            <v-chart :options="options"
                     autoresize
                     style="width: 100%;" />
          </el-card>
        </el-col>
      </el-row>
    </div>

    <div class="report-history"
         v-show="view.active === source.active['历史数据']">
      <PeaceTable pagination
                  ref="tableHistory"
                  v-show="this.$route.params.type === Type.HEALTH.TYPE.血氧">
        <PeaceTableColumn label="血氧浓度（%）"
                          prop="bloodOxygen"></PeaceTableColumn>
        <PeaceTableColumn label="分析结果"
                          prop="result"></PeaceTableColumn>
        <PeaceTableColumn label="检测时间"
                          prop="measureTime"></PeaceTableColumn>
        <PeaceTableColumn label="来源"
                          prop="measureMethod"></PeaceTableColumn>
      </PeaceTable>
    </div>
  </div>
</template>

<script>
import Type from '@src/type'
import Vue from 'vue'
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/polar'
import 'echarts/lib/component/tooltip'
Vue.component('v-chart', ECharts)

import reportChatOption from './reportChatOption.js'
import Service from './../service/index.js'

export default {
  data() {
    return {
      Type,

      view: {
        active: '血氧数据',

        model: {}
      },

      source: {
        active: {
          血氧数据: '血氧数据',
          分析报告: '分析报告',
          历史数据: '历史数据'
        }
      },

      options: undefined
    }
  },

  mounted() {
    this.$nextTick(function() {
      this.get()
    })
  },

  methods: {
    changeActive(activeName) {
      this.view.active = activeName

      this.$nextTick(function() {
        this.get()
      })
    },

    get() {
      if (this.view.active === '血氧数据') {
        this.getRecent()
      }

      if (this.view.active === '分析报告') {
        this.getReport()
      }

      if (this.view.active === '历史数据') {
        this.getHistory()
      }
    },

    getRecent() {
      this.options = undefined

      const params = {
        idCard: this.$route.params.idCard,
        dataId: this.$route.params.dataId,
        type: this.$route.params.type
      }
      Service.getOscillogram(params).then((res) => {
        const options = Peace.util.deepClone(reportChatOption)

        options.tooltip.formatter = function(params) {
          return `<span style="width: 6rem; text-align: right; display: inline-block; color:rgba(153,153,153,1); margin: 0 0 10px 0;">血氧浓度：</span> 
                  <span style="color: rgba(51,51,51,1);">${params[0].data.bloodOxygen}%</span>
                  <br/>
                  <span style="width: 6rem; text-align: right; display: inline-block; color:rgba(153,153,153,1); margin: 0 0 10px 0;">脉率：</span> 
                  <span style="color: rgba(51,51,51,1);">${params[0].data.pulseRate}次/分</span>
                  <br/>
                  <span style="width: 6rem; text-align: right; display: inline-block; color:rgba(153,153,153,1); margin: 0 0 10px 0;">分析结果：</span> 
                  <span style="color: rgba(51,51,51,1);">${params[0].data.result}</span>
                  <br/>
                  <span style="width: 6rem; text-align: right; display: inline-block; color:rgba(153,153,153,1);">测量时间：</span> 
                  <span style="color: rgba(51,51,51,1);">${params[0].data.measureTime}</span>
                   `
        }

        res.data.downInfo.bloodOxygenData.forEach((item) => {
          options.xAxis.data.push(item.measureTime)
          options.series[0].data.push({ name: '血氧', value: item.bloodOxygen, ...item })
        })
        options.yAxis.axisLabel.formatter = '{value}%'

        this.options = options
        this.view.model = res.data.upInfo.bloodOxygenData
      })
    },

    getReport() {
      const fetch = Service.getWeekList
      const params = {
        idCard: this.$route.params.idCard,
        serviceId: this.$route.params.serviceId,
        type: this.$route.params.type
      }
      this.$refs.tableReport.loadData({ fetch, params })
    },

    getHistory() {
      const fetch = Service.getOneRecord
      const params = {
        idCard: this.$route.params.idCard,
        serviceId: this.$route.params.serviceId,
        type: this.$route.params.type
      }
      this.$refs.tableHistory.loadData({ fetch, params })
    },

    openReport(row) {
      const params = { reportId: row.id, idCard: this.$route.params.idCard }
      Service.getWeekDetail(params).then((res) => {
        var win = window.open()
        win.document.write(res.message)
        win.document.close()
      })
    },

    back() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.report {
  .back {
    position: absolute;
    left: 30px;
  }

  .report-header {
    position: relative;
    text-align: center;
    background: #f9f9f9;
    margin: -20px -20px 0;
    padding: 20px 20px 20px 10px;
  }

  .report-recent {
    background: linear-gradient(#f9f9f9, #fff);
    margin: -20px -20px 0;
    padding: 20px 20px 20px 10px;

    .el-card {
      border: 0;
      min-height: 160px;
    }

    .report-recent-row {
      margin: 0 0 5px 0;

      .report-recent-col {
        display: inline-block;
        width: 50%;
      }

      &:last-child {
        margin: 0;
      }
    }

    h4 {
      font-size: 16px;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);

      i {
        margin-right: 5px;
      }
    }
    label {
      color: #999999;
      text-align: right;
      width: 6rem;
      display: inline-block;
    }
    span {
      color: rgba(51, 51, 51, 1);
    }

    .el-divider--horizontal {
      margin: 10px 0;
      background: #eee;
    }

    .el-row {
      margin: 0 0 20px 0;
    }
  }

  .report-report {
    padding: 20px 0 0 0;
  }

  .report-history {
    padding: 20px 0 0 0;
  }
}
</style>

