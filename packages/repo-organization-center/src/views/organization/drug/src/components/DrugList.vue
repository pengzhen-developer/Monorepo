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
        <el-form-item label="药品编码">
          <PeaceInput v-model.trim="model.code"
                      placeholder="请输入"></PeaceInput>
        </el-form-item>
        <el-form-item label="药品通用名称">
          <PeaceInput v-model.trim="model.name"
                      placeholder="请输入"></PeaceInput>
        </el-form-item>
        <el-form-item label="使用状态">
          <PeaceSelect v-model.trim="model.status"
                       placeholder="全部">
            <el-option v-for="item in source.status"
                       v-bind:key="item.value"
                       v-bind:label="item.label"
                       v-bind:value="item.value"></el-option>
          </PeaceSelect>
        </el-form-item>
        <el-form-item>
          <PeaceButton type="primary"
                       v-on:click="fetch">查询</PeaceButton>
        </el-form-item>
      </el-form>
    </div>

    <div class="card">
      <PeaceTable pagination
                  ref="table">
        <PeaceTableColumn label="药品编码"
                          prop="code"
                          min-width="120"></PeaceTableColumn>
        <PeaceTableColumn label="药品通用名称"
                          prop="name"
                          min-width="180"></PeaceTableColumn>
        <PeaceTableColumn label="药品规格"
                          prop="drugSpecifications"
                          min-width="120"></PeaceTableColumn>
        <PeaceTableColumn label="生产厂家"
                          prop="enterpriseCnName"
                          min-width="180"></PeaceTableColumn>
        <PeaceTableColumn label="批准文号"
                          prop="approvalNo"
                          min-width="120"></PeaceTableColumn>
        <PeaceTableColumn label="使用状态"
                          prop="status"
                          width="120">
          <template slot-scope="scope">
            {{ scope.row.status | filterDictionaryFuzzy(source.status) }}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="创建时间"
                          prop="createTime"
                          width="180"></PeaceTableColumn>
        <PeaceTableColumn label="更新时间"
                          prop="updateTime"
                          width="180"></PeaceTableColumn>
        <PeaceTableColumn label="操作"
                          width="180"
                          fixed="right">
          <template slot-scope="scope">
            <PeaceButton type="text"
                         v-on:click="getDrugDetail(scope.row)">查看详情</PeaceButton>
            <PeaceButton type="text"
                         v-on:click="getLog(scope.row)">更新记录</PeaceButton>
          </template>
        </PeaceTableColumn>
      </PeaceTable>
    </div>

    <PeaceDialog title="药品详情"
                 v-if="dialogDetail.visible"
                 v-bind:visible.sync="dialogDetail.visible">
      <DrugDetail v-bind:data="dialogDetail.data"></DrugDetail>
    </PeaceDialog>

    <PeaceDialog title="更新记录"
                 v-if="dialogLog.visible"
                 v-bind:visible.sync="dialogLog.visible">
      <Log dicType="orgDrug"
           v-bind:id="dialogLog.id"></Log>
    </PeaceDialog>
  </div>
</template>

<script>
import obState from './../observable/ob-state'
import Service from './../service'

import DrugDetail from './DrugDetail.vue'
import Log from '@src/components/log'

export default {
  components: {
    DrugDetail,
    Log
  },

  data() {
    return {
      model: {},

      source: {
        status: [
          { label: '启用', value: 1 },
          { label: '禁用', value: 2 }
        ]
      },

      dialogDetail: {
        visible: false,
        data: undefined
      },

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
      const fetch = Service.queryDrugList
      const params = this.model

      this.$refs.table.reloadData({ fetch, params })
    },

    getDrugDetail(row) {
      Service.queryDrugDetails({ id: row.id }).then((res) => {
        this.dialogDetail.visible = true
        this.dialogDetail.data = res.data
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