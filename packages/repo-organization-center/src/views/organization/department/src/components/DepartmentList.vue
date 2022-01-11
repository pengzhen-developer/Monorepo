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
        <el-form-item label="科室名称">
          <PeaceInput v-model.trim="model.name"
                      placeholder="请输入"></PeaceInput>
        </el-form-item>
        <el-form-item>
          <PeaceButton type="primary"
                       v-on:click="fetch">查询</PeaceButton>
        </el-form-item>
      </el-form>
    </div>

    <div class="card">
      <PeaceTable default-expand-all
                  row-key="id"
                  ref="table"
                  v-bind:data="data"
                  v-bind:tree-props="{ children: 'list' } ">
        <PeaceTableColumnTree label="科室名称"
                              min-width="220px"
                              prop="id"
                              align="left">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </PeaceTableColumnTree>
        <PeaceTableColumn label="科室编码"
                          prop="code"
                          min-width="180"></PeaceTableColumn>
        <PeaceTableColumn label="his编码"
                          prop="hisCode"
                          min-width="180"></PeaceTableColumn>
        <PeaceTableColumn label="科室属性"
                          prop="property"
                          min-width="180"></PeaceTableColumn>
        <PeaceTableColumn label="使用状态"
                          prop="status"
                          width="120"> </PeaceTableColumn>
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
      <Log dicType="orgDepartment"
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
      data: [],

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
      Service.orgDepartmentList(this.model).then((res) => {
        this.data = res.data
      })
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