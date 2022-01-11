<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <el-form inline
               label-width="auto"
               label-suffix="："
               v-bind:model="model"
               v-on:submit.native.prevent
               v-on:keyup.enter.native="fetch">
        <el-form-item label="来源">
          <PeaceSelect v-model.trim="model.applicationCode"
                       placeholder="全部">
            <el-option v-for="item in source.applicationCode"
                       v-bind:key="item.code"
                       v-bind:label="item.name"
                       v-bind:value="item.code"></el-option>
          </PeaceSelect>
        </el-form-item>
        <el-form-item label="机构名称">
          <PeaceInput v-model.trim="model.institutionName"
                      placeholder="请输入"></PeaceInput>
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
        <PeaceTableColumn label="机构名称"
                          prop="institutionName"
                          min-width="180"></PeaceTableColumn>
        <PeaceTableColumn label="过敏信息数量"
                          prop="irritabilityCount"
                          min-width="180"></PeaceTableColumn>
        <PeaceTableColumn label="来源"
                          prop="applicationName"
                          min-width="180"></PeaceTableColumn>
        <PeaceTableColumn label="操作"
                          width="120"
                          fixed="right">
          <template slot-scope="scope">
            <PeaceButton type="text"
                         v-on:click="gotoDepartmentList(scope.row)">查看详情</PeaceButton>
          </template>
        </PeaceTableColumn>
      </PeaceTable>
    </div>
  </div>
</template>

<script>
import obState from './../observable/ob-state'
import Service from './../service'

export default {
  data() {
    return {
      model: {},

      source: {
        applicationCode: []
      }
    }
  },

  async mounted() {
    await this.$nextTick()

    this.source.applicationCode = (await Service.userSourceInfo()).data
    this.fetch()
  },

  methods: {
    fetch() {
      const fetch = Service.allergyCount
      const params = this.model

      this.$refs.table.reloadData({ fetch, params })
    },

    gotoDepartmentList(row) {
      obState.mutations.setInstitution(row)
      obState.mutations.setView('AllergyList')
    }
  }
}
</script>

<style>
</style>