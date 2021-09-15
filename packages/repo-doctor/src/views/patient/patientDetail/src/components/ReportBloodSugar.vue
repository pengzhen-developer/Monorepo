/*
 * 血糖
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
        <el-button :type="view.active === source.active['血糖数据'] ? 'primary' : '' "
                   @click="changeActive('血糖数据')">血糖数据</el-button>
        <el-button :type="view.active === source.active['分析报告'] ? 'primary' : '' "
                   @click="changeActive('分析报告')">分析报告</el-button>
        <el-button :type="view.active === source.active['历史数据'] ? 'primary' : '' "
                   @click="changeActive('历史数据')">历史数据</el-button>
      </el-button-group>
    </div>

    <div class="report-recent"
         v-show="view.active === source.active['血糖数据']">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card shadow="never">
            <h4>
              <i class="icon_ic_measure"></i>测量详情
            </h4>
            <el-divider></el-divider>

            <div class="report-recent-row">
              <div class="report-recent-col">
                <label>血糖值：</label>
                <span>{{ view.model.bloodSugar }}mmol/L</span>
              </div>

              <div class="report-recent-col">
                <label>测量时间：</label>
                <span>{{ view.model.measureTime }}</span>
              </div>
            </div>
            <div class="report-recent-row">
              <label>测量状态：</label>
              <span>{{ view.model.measureState === '1' ? '空腹' : '餐后' }}</span>
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
            <div class="card-header"
                 slot="header">
              <h4>
                <i class="icon_ic_datatrends"></i> 数据趋势
              </h4>

              <div class="report-filter">
                <el-button :class="{ 'active': this.view.activeForFilter === source.activeForFilter['空腹'] }"
                           @click="changeActiveForFilter('空腹')"
                           class="chart-button"
                           type="text">空腹</el-button>
                <el-divider direction="vertical"></el-divider>
                <el-button :class="{ 'active': this.view.activeForFilter === source.activeForFilter['餐后'] }"
                           @click="changeActiveForFilter('餐后')"
                           class="chart-button"
                           type="text">餐后</el-button>
              </div>
            </div>

            <v-chart :options="options"
                     autoresize
                     style="width: 100%;"
                     v-if="this.view.activeForFilter === source.activeForFilter['空腹']" />
            <v-chart :options="options"
                     autoresize
                     style="width: 100%;"
                     v-if="this.view.activeForFilter === source.activeForFilter['餐后']" />
          </el-card>
        </el-col>
      </el-row>
    </div>

    <div class="report-report"
         v-show="view.active === source.active['分析报告']">
      <PeaceTable pagination
                  ref="tableReport">
        <PeaceTableColumn label="报告名称"
                          prop="title"></PeaceTableColumn>
        <PeaceTableColumn label="操作">
          <template slot-scope="scope">
            <el-button @click="openReport(scope.row)"
                       type="text">查看详情</el-button>
          </template>
        </PeaceTableColumn>
      </PeaceTable>
    </div>

    <div class="report-history"
         v-show="view.active === source.active['历史数据']">
      <PeaceTable pagination
                  ref="tableHistory"
                  v-show="this.$route.params.type === Peace.type.HEALTH.TYPE.血糖">
        <PeaceTableColumn label="血糖值（mmol/L）"
                          prop="bloodSugar"></PeaceTableColumn>
        <PeaceTableColumn label="测量状态"
                          prop="measureState">
          <template slot-scope="scope">
            <span>{{ scope.row.measureState === '1' ? '空腹' : '餐后' }}</span>
          </template>
        </PeaceTableColumn>
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
import reportChatOption from './reportChatOption'

import Vue from 'vue'
import ECharts from 'vue-echarts'

import 'echarts/lib/chart/line'
import 'echarts/lib/component/polar'
import 'echarts/lib/component/tooltip'

Vue.component('v-chart', ECharts)

export default {
  data() {
    return {
      view: {
        active: '血糖数据',
        activeForFilter: '空腹',

        model: {}
      },

      source: {
        active: {
          血糖数据: '血糖数据',
          分析报告: '分析报告',
          历史数据: '历史数据'
        },

        activeForFilter: {
          空腹: '空腹',
          餐后: '餐后'
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

    changeActiveForFilter(activeForFilterName) {
      this.view.activeForFilter = activeForFilterName

      this.$nextTick(function() {
        this.get()
      })
    },

    get() {
      if (this.view.active === '血糖数据') {
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
      Peace.service.health.getOscillogram(params).then((res) => {
        const options = Peace.util.deepClone(reportChatOption)

        options.tooltip.formatter = function(params) {
          return `<span style="width: 5rem; text-align: right; display: inline-block; color:rgba(153,153,153,1); margin: 0 0 10px 0;">血糖值：</span> 
                  <span style="color: rgba(51,51,51,1);">${params[0].data.bloodSugar}mmol/L</span>
                  <br/>
                  <span style="width: 5rem; text-align: right; display: inline-block; color:rgba(153,153,153,1); margin: 0 0 10px 0;">测量状态：</span> 
                  <span style="color: rgba(51,51,51,1);">${params[0].data.measureState === '1' ? '空腹' : '餐后'}</span>
                  <br/>
                  <span style="width: 5rem; text-align: right; display: inline-block; color:rgba(153,153,153,1); margin: 0 0 10px 0;">血糖状态：</span> 
                  <span style="color: rgba(51,51,51,1);">${params[0].data.result}</span>
                  <br/>
                  <span style="width: 5rem; text-align: right; display: inline-block; color:rgba(153,153,153,1);">测量时间：</span> 
                  <span style="color: rgba(51,51,51,1);">${params[0].data.measureTime}</span>
                   `
        }

        if (this.view.activeForFilter === this.source.activeForFilter.空腹) {
          res.data.downInfo.bloodSugarDataBefore.forEach((item) => {
            options.xAxis.data.push(item.measureTime)
            options.series[0].data.push({ name: '血糖', value: item.bloodSugar, ...item })
          })
        }

        if (this.view.activeForFilter === this.source.activeForFilter.餐后) {
          res.data.downInfo.bloodSugarDataAfter.forEach((item) => {
            options.xAxis.data.push(item.measureTime)
            options.series[0].data.push({ name: '血糖', value: item.bloodSugar, ...item })
          })
        }
        options.yAxis.axisLabel.formatter = '{value}mmol/L'

        this.options = options
        this.view.model = res.data.upInfo.bloodSugarData
      })
    },

    getReport() {
      const fetch = Peace.service.health.getWeekList
      const params = {
        idCard: this.$route.params.idCard,
        serviceId: this.$route.params.serviceId,
        type: this.$route.params.type
      }
      this.$refs.tableReport.loadData({ fetch, params })
    },

    getHistory() {
      const fetch = Peace.service.health.getOneRecord
      const params = {
        idCard: this.$route.params.idCard,
        serviceId: this.$route.params.serviceId,
        type: this.$route.params.type
      }
      this.$refs.tableHistory.loadData({ fetch, params })
    },

    openReport(row) {
      const params = { reportId: row.id, idCard: this.$route.params.idCard }
      Peace.service.health.getWeekDetail(params).then((res) => {
        var win = window.open()
        win.document.write(res.data.message)
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

    .el-card {
      border: 0;
      min-height: 160px;
    }

    .card-header {
      width: 100%;
      display: flex;
      justify-content: space-between;

      .chart-button {
        margin: 0 10px;
        color: #a9a9a9;

        &.active {
          color: $--color-primary;
        }
      }
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

