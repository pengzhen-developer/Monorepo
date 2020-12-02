<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <el-form inline
               label-width="auto"
               v-on:keyup.enter.native="get"
               v-on:submit.native.prevent
               v-bind:model="model">
        <el-form-item label="查询时间：">
          <PeaceDatePicker type="daterange"
                           value-format="yyyy-MM-dd"
                           v-model="model.timeRange"></PeaceDatePicker>
        </el-form-item>

        <el-form-item>
          <el-button type="primary"
                     style="min-width: 80px;"
                     v-on:click="get">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="card">
      <div class="q-mb-md">
        <el-button style="min-width: 80px"
                   v-on:click="exportFile">导出</el-button>
      </div>

      <PeaceTable ref="table"
                  pagination>
        <el-table-column width="60px"
                         label="序号"
                         align="center"
                         prop="orderNumber"></el-table-column>
        <el-table-column min-width="150px"
                         align="center"
                         label="输入内容"
                         prop="keyWord"></el-table-column>
        <el-table-column width="110px"
                         align="center"
                         label="查询结果总数"
                         prop="drugNum"></el-table-column>
        <el-table-column width="150px"
                         align="center"
                         label="医院名称"
                         prop="hosName"></el-table-column>
        <el-table-column width="150px"
                         align="center"
                         label="医生姓名"
                         prop="docName"></el-table-column>
        <el-table-column width="150px"
                         align="center"
                         label="科别"
                         prop="deptName"></el-table-column>
        <el-table-column width="150px"
                         align="center"
                         label="查询时间"
                         prop="createdTime"></el-table-column>

      </PeaceTable>
    </div>

  </div>
</template>

<script>
import Service from './service'

export default {
  data() {
    return {
      model: {
        timeRange: []
      }
    }
  },

  watch: {
    'model.timeRange'(timeRange) {
      this.model.startDate = timeRange?.[0] ?? ''
      this.model.endDate = timeRange?.[1] ?? ''
    }
  },

  mounted() {
    this.$nextTick().then(() => {
      this.get()
    })
  },

  methods: {
    get() {
      const fetch = Service.getSearchLog
      const params = this.model

      this.$refs.table.reloadData({ fetch, params })
    },

    exportFile() {
      Service.exportGetSearchLog(this.model)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
