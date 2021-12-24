<template>
  <div>
    <div class="card card-search q-mb-md">
      <el-form inline="inline"
               label-suffix="："
               label-width="auto"
               size="mini"
               v-on:keyup.enter.native="fetch"
               v-on:submit.native.prevent
               v-bind:model="model">
        <el-form-item label="机构名称">
          <peace-input v-model.trim="model.sourceHospitalName"
                       placeholder="请输入"></peace-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     v-on:click="fetch"
                     v-bind:loading="loading">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="card">
      <PeaceTable ref="table"
                  size="mini"
                  pagination>
        <PeaceTableColumn label="序号"
                          type="index"
                          width="80px">
          <template slot-scope="{ $index, _self }">
            {{ (_self.Pagination.internalCurrentPage - 1) * (_self.Pagination.internalPageSize) + $index + 1 }}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn min-width="180px"
                          label="机构名称"
                          prop="SourceHospitalName"></PeaceTableColumn>
        <PeaceTableColumn min-width="100px"
                          label="服务状态">
          <template slot-scope="scope">
            {{ scope.row.IsSmartReviewer?"启用":"禁用"}}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn min-width="180px"
                          label="更新时间"
                          prop="updateTime"></PeaceTableColumn>
        <PeaceTableColumn min-width="100px"
                          label="操作人"
                          prop="operator"></PeaceTableColumn>
        <PeaceTableColumn width="180px"
                          fixed="right"
                          label="操作">
          <template slot-scope="{ row }">
            <el-button type="text"
                       v-on:click="$emit('showConfigureDetail', row)">查看详情</el-button>
            <el-button type="text"
                       v-on:click="$emit('showOperationLog', row)">操作日志</el-button>
          </template>
        </PeaceTableColumn>
      </PeaceTable>
    </div>
  </div>
</template>

<script>
import Service from './../service'

export default {
  components: {},

  data() {
    return {
      loading: false,

      model: {
        sourceHospitalName: '',
        checkHospitalName: ''
      }
    }
  },

  async mounted() {
    await this.$nextTick()

    this.fetch()
  },

  methods: {
    fetch() {
      this.loading = true

      const fetch = Service.CheckOptionHospitalList
      const params = this.model

      this.$refs.table.reloadData({ fetch, params }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>