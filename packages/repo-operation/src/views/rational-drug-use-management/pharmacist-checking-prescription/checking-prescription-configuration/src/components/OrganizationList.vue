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
          <peace-input v-model.trim="model.SourceHospitalName"
                       placeholder="请输入"></peace-input>
        </el-form-item>
        <el-form-item label="审方团队">
          <peace-input v-model.trim="model.CheckHospitalName"
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
        <PeaceTableColumn min-width="200px"
                          label="机构名称"
                          prop="SourceHospitalName"></PeaceTableColumn>
        <PeaceTableColumn min-width="100px"
                          label="服务状态">
          <template slot-scope="scope">
            {{ scope.row.IsPrescriptionReview !== true?"禁用":"启用"}}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="审方团队"
                          prop="CheckHospitalNames"
                          min-width="200px"></PeaceTableColumn>
        <PeaceTableColumn width="140px"
                          fixed="right"
                          label="操作">
          <template slot-scope="{ row }">
            <!-- <el-button type="text"
                       v-bind:disabled="row.IsSmartReviewer !== true"
                       v-on:click="$emit('showIntelligenceConfig', row)">智能审方设置</el-button> -->
            <el-button type="text"
                       v-bind:disabled="row.IsPrescriptionReview !== true"
                       v-on:click="$emit('showPharmacistConfig', row)">药师审方设置</el-button>
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
        SourceHospitalName: '',
        CheckHospitalName: ''
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