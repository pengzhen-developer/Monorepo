/*
 * 血压
*/

<template>
  <div class="report">
    <div class="report-header">
      <el-button @click="back" class="back" type="primary">
        <i class="el-icon-arrow-left"></i> 返回
      </el-button>
      <el-button-group>
        <el-button :type="view.active === source.active['血压数据'] ? 'primary' : '' " @click="changeActive('血压数据')">血压数据</el-button>
        <el-button :type="view.active === source.active['分析报告'] ? 'primary' : '' " @click="changeActive('分析报告')">分析报告</el-button>
        <el-button :type="view.active === source.active['历史数据'] ? 'primary' : '' " @click="changeActive('历史数据')">历史数据</el-button>
      </el-button-group>
    </div>

    <div class="report-recent" v-show="view.active === source.active['血压数据']">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card shadow="never">
            <h4>
              <i class="icon_ic_measure"></i>测量详情
            </h4>
            <el-divider></el-divider>

            <div class="report-recent-row">
              <div class="report-recent-col">
                <label>血压：</label>
                <span>{{ view.model.diastolicPressure + '/' + view.model.systolicPressure }} mmHg</span>
              </div>

              <div class="report-recent-col">
                <label>测量时间：</label>
                <span>{{ view.model.measureTime }}</span>
              </div>
            </div>
            <div class="report-recent-row">
              <label>平均动脉压：</label>
              <span>{{ view.model.meanArterialPressure }}</span>
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
            <v-chart :options="options" autoresize style="width: 100%;" />
          </el-card>
        </el-col>
      </el-row>
    </div>

    <div class="report-report" v-show="view.active === source.active['分析报告']">
      <peace-table pagination ref="tableReport">
        <peace-table-column label="报告名称" prop="title"></peace-table-column>
        <peace-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="openReport(scope.row)" type="text">查看详情</el-button>
          </template>
        </peace-table-column>
      </peace-table>
    </div>

    <div :key="$route.fullpath + '历史数据'" class="report-history" v-show="view.active === source.active['历史数据']">
      <peace-table pagination ref="tableHistory">
        <peace-table-column label="收缩压（mmHg）" prop="systolicPressure" width="150"></peace-table-column>
        <peace-table-column label="舒张压（mmHg）" prop="diastolicPressure" width="150"></peace-table-column>
        <peace-table-column label="平均动脉压（mmHg）" prop="meanArterialPressure"></peace-table-column>
        <peace-table-column label="脉率" prop="pulseRate" width="120"></peace-table-column>
        <peace-table-column label="分析结果" prop="result"></peace-table-column>
        <peace-table-column label="检测时间" prop="measureTime"></peace-table-column>
        <peace-table-column label="来源" prop="measureMethod"></peace-table-column>
      </peace-table>
    </div>
  </div>
</template>

<script>
import peace from '@src/library'
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
        active: '血压数据',

        model: {}
      },

      source: {
        active: {
          血压数据: '血压数据',
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
      if (this.view.active === '血压数据') {
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
      peace.service.health.getOscillogram(params).then(res => {
        const options = peace.util.deepClone(reportChatOption)

        options.formatter = function(params) {
          return `<span style="width: 6rem; text-align: right; display: inline-block; color:rgba(153,153,153,1); margin: 0 0 10px 0;">血压：</span> 
                  <span style="color: rgba(51,51,51,1);">${params[0].data.value}/${params[1].data.value}mmHg</span>
                  <br/>
                  <span style="width: 6rem; text-align: right; display: inline-block; color:rgba(153,153,153,1); margin: 0 0 10px 0;">平均动脉压：</span> 
                  <span style="color: rgba(51,51,51,1);">${params[0].data.meanArterialPressure}</span>
                  <br/>
                  <span style="width: 6rem; text-align: right; display: inline-block; color:rgba(153,153,153,1); margin: 0 0 10px 0;">分析结果：</span> 
                  <span style="color: rgba(51,51,51,1);">${params[0].data.result}</span>
                  <br/>
                  <span style="width: 6rem; text-align: right; display: inline-block; color:rgba(153,153,153,1);">测量时间：</span> 
                  <span style="color: rgba(51,51,51,1);">${params[0].data.measureTime}</span>
                   `
        }

        res.data.downInfo.bloodPressureData.forEach(item => {
          options.xAxis.data.push(item.measureTime)
          options.series[0].data.push({ name: '舒张压', value: item.diastolicPressure, ...item })
          options.series[1].data.push({ name: '收缩压', value: item.systolicPressure, ...item })
        })
        options.yAxis.axisLabel.formatter = '{value} mmHg'

        this.options = options
        this.view.model = res.data.upInfo.bloodPressureData
      })
    },

    getReport() {
      const fetch = peace.service.health.getWeekList
      const params = {
        idCard: this.$route.params.idCard,
        serviceId: this.$route.params.serviceId,
        type: this.$route.params.type
      }
      this.$refs.tableReport.loadData({ fetch, params })
    },

    getHistory() {
      const fetch = peace.service.health.getOneRecord
      const params = {
        idCard: this.$route.params.idCard,
        serviceId: this.$route.params.serviceId,
        type: this.$route.params.type
      }
      this.$refs.tableHistory.loadData({ fetch, params })
    },

    openReport(row) {
      const params = { reportId: row.id, idCard: this.$route.params.idCard }
      peace.service.health.getWeekDetail(params).then(res => {
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

