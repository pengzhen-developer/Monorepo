<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <el-form inline
               label-width="auto"
               label-suffix="："
               v-on:keyup.enter.native="get"
               v-on:submit.native.prevent
               v-bind:model="model">
        <el-form-item label="查询时间">
          <PeaceDatePicker type="daterange"
                           value-format="yyyy-MM-dd"
                           v-model="model.timeRange"></PeaceDatePicker>
        </el-form-item>

        <el-form-item>
          <el-button type="primary"
                     v-on:click="get">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="card">
      <div class="q-mb-md">
        <el-button v-on:click="exportFile">导出</el-button>
      </div>

      <PeaceTable ref="table"
                  pagination>
        <PeaceTableColumn label="序号"
                          type="index"
                          width="80px">
          <template slot-scope="{ $index, _self }">
            {{ (_self.Pagination.internalCurrentPage - 1) * (_self.Pagination.internalPageSize) + $index + 1 }}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn min-width="150px"
                          label="输入内容"
                          prop="keyWord"></PeaceTableColumn>
        <PeaceTableColumn min-width="110px"
                          label="查询结果总数"
                          prop="drugNum"></PeaceTableColumn>
        <PeaceTableColumn min-width="150px"
                          label="医院名称"
                          prop="hosName"></PeaceTableColumn>
        <PeaceTableColumn min-width="150px"
                          label="医生姓名"
                          prop="docName"></PeaceTableColumn>
        <PeaceTableColumn min-width="150px"
                          label="科别"
                          prop="deptName"></PeaceTableColumn>
        <PeaceTableColumn min-width="180px"
                          label="查询时间"
                          prop="createdTime"></PeaceTableColumn>

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
