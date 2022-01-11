<template>
  <div class="layout-route">
    <div class="card q-mb-md">
      <PeaceButton v-on:click="back">返回上一页</PeaceButton>

      <div class="text-h6">
        {{ this.institution.institutionName }}
      </div>
    </div>

    <div class="card card-search q-mb-md">
      <el-form inline
               label-width="auto"
               label-suffix="："
               v-bind:model="model"
               v-on:submit.native.prevent
               v-on:keyup.enter.native="fetch">
        <el-form-item label="主要编码">
          <PeaceInput v-model.trim="model.code"
                      placeholder="请输入"></PeaceInput>
        </el-form-item>
        <el-form-item label="疾病名称">
          <PeaceInput v-model.trim="model.diseaseName"
                      placeholder="请输入"></PeaceInput>
        </el-form-item>
        <el-form-item>
          <PeaceButton type="primary"
                       v-on:click="fetch">查询</PeaceButton>
        </el-form-item>
      </el-form>
    </div>

    <div class="card">
      <PeaceTable ref="table">
        <PeaceTableColumn label="主要编码"
                          prop="code"
                          min-width="180"></PeaceTableColumn>
        <PeaceTableColumn label="附加编码"
                          prop="extCode"
                          min-width="180"></PeaceTableColumn>
        <PeaceTableColumn label="疾病名称"
                          prop="diseaseName"
                          min-width="180"></PeaceTableColumn>
        <PeaceTableColumn label="使用状态"
                          prop="status"
                          width="120"></PeaceTableColumn>
        <PeaceTableColumn label="操作"
                          width="120"
                          fixed="right">
          <template slot-scope="scope">
            <PeaceButton type="text"
                         v-on:click="getLog(scope.row)">更新记录</PeaceButton>
          </template>
        </PeaceTableColumn>
      </PeaceTable>
    </div>

    <PeaceDialog title="更新记录"
                 v-if="dialogLog.visible"
                 v-bind:visible.sync="dialogLog.visible">
      <Log dicType="orgIcd"
           v-bind:id="dialogLog.id"></Log>
    </PeaceDialog>
  </div>
</template>

<script>
import obState from '../observable/ob-state'
import Service from '../service'

import Log from '@src/components/log'

export default {
  components: {
    Log
  },

  data() {
    return {
      model: {},

      source: {},

      dialogLog: {
        visible: false,
        id: undefined
      }
    }
  },

  computed: {
    institution: () => obState.state.institution
  },

  created() {
    this.model.applicationCode = this.institution.applicationCode
    this.model.institutionCode = this.institution.institutionCode
  },

  async mounted() {
    await this.$nextTick()

    this.fetch()
  },

  methods: {
    fetch() {
      const fetch = Service.queryOrgIcdList
      const params = this.model

      this.$refs.table.reloadData({ fetch, params })
    },

    getLog(row) {
      this.dialogLog.visible = true
      this.dialogLog.id = row.id
    },

    back() {
      obState.mutations.setView('OrganizationList')
    }
  }
}
</script>

<style>
</style>