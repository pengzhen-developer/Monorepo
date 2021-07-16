<template>
  <div class="layout-route full-width">
    <div class="card card-search q-mb-md">
      <el-form inline
               label-suffix="："
               label-width="auto"
               v-bind:model="model"
               v-on:keyup.enter.native="fetch"
               v-on:submit.native.prevent>
        <el-form-item label="药品本位码">
          <el-input v-model.trim="model.drugCscCode"
                    placeholder="请输入药品本位码"
                    clearable></el-input>
        </el-form-item>
        <el-form-item label="操作人员">
          <el-input v-model.trim="model.operatorName"
                    placeholder="请输入姓名"
                    clearable></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary"
                     v-on:click="fetch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="card">
      <PeaceTable pagination
                  ref="tableRef">
        <PeaceTableColumn label="序号"
                          width="80px">
          <template slot-scope="{ $index, _self }">
            {{ (_self.Pagination.internalCurrentPage - 1) * (_self.Pagination.internalPageSize) + $index + 1 }}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="药品本位码"
                          prop="drugCscCode"
                          min-width="180"></PeaceTableColumn>
        <PeaceTableColumn label="批准文号"
                          prop="approvalNo"
                          min-width="180"></PeaceTableColumn>
        <PeaceTableColumn label="药品名称"
                          prop="drugName"
                          min-width="180"></PeaceTableColumn>
        <PeaceTableColumn label="规格"
                          prop="specifications"
                          min-width="120"></PeaceTableColumn>
        <PeaceTableColumn label="剂型"
                          prop="dosageFormName"
                          min-width="120"></PeaceTableColumn>
        <PeaceTableColumn label="厂家"
                          prop="manufacturer"
                          min-width="180"></PeaceTableColumn>
        <PeaceTableColumn label="药品成分名称"
                          prop="componentName"
                          min-width="180"></PeaceTableColumn>
        <PeaceTableColumn label="药品状态"
                          prop="drugState"
                          min-width="100">
          <template slot-scope="scope">
            {{ scope.row.drugState | filterDictionaryFuzzy(source.commonRuleState) }}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="规则数量"
                          prop="commonRuleCount"
                          min-width="120"></PeaceTableColumn>
        <PeaceTableColumn label="提交时间"
                          prop="submissionTime"
                          min-width="180"></PeaceTableColumn>
        <PeaceTableColumn label="操作人员"
                          prop="operatorName"
                          min-width="120"></PeaceTableColumn>
        <PeaceTableColumn label="操作"
                          fixed="right"
                          width="180">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="showAudit(scope.row)">审核</el-button>
            <el-button type="text"
                       v-on:click="showLog(scope.row)">查看日志</el-button>
          </template>
        </PeaceTableColumn>
      </PeaceTable>
    </div>
  </div>
</template>

<script>
import Service from './../service'

export default {
  data() {
    return {
      model: {
        // 只查询待审核的数据，参考字典值：commonRuleState
        drugState: '2'
      },

      source: {
        commonRuleState: []
      }
    }
  },

  async created() {
    this.source.commonRuleState = await Peace.identity.dictionary.getList('commonRuleState')

    this.fetch()
  },

  methods: {
    fetch() {
      const fetch = Service.get
      const params = this.model

      this.$refs.tableRef.reloadData({ fetch, params })
    },

    showAudit(data) {
      this.$emit('showAudit', data)
    },

    showLog(data) {
      this.$emit('showLog', data)
    }
  }
}
</script>

<style>
</style>