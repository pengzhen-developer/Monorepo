<template>
  <div class="full-width">
    <div class="card card-search q-mb-md">
      <el-form inline
               label-suffix="："
               v-on:keyup.enter.native="fetch"
               v-on:submit.native.prevent
               v-bind:model="model">
        <el-form-item label="机构名称">
          <peace-input v-model.trim="model.orgName"
                       placeholder="请输入"></peace-input>
        </el-form-item>
        <el-form-item>
          <el-button v-on:click="fetch"
                     type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="card">
      <PeaceTable ref="table"
                  pagination
                  v-loading="loading">
        <PeaceTableColumn type="index"
                          label="序号"
                          width="80px"></PeaceTableColumn>
        <PeaceTableColumn label="机构名称"
                          prop="orgName"
                          min-width="160px"></PeaceTableColumn>
        <PeaceTableColumn label="待审核数量"
                          min-width="160px">
          <template slot-scope="scope">
            <span class="q-mr-20">{{scope.row.checkNumber}}</span>
            <el-button class="q-px-none"
                       type="text"
                       v-on:click="onItemsClick(scope.row)">审核管理</el-button>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="已通过数量"
                          prop="passNumber"
                          min-width="160px"></PeaceTableColumn>
        <PeaceTableColumn label="已驳回数量"
                          prop="rejectNumber"
                          min-width="160px"></PeaceTableColumn>
      </PeaceTable>

    </div>

  </div>
</template>

<script>
import Service from '../service'
export default {
  name: 'MainList',
  data() {
    return {
      model: {
        orgName: ''
      },
      loading: true
    }
  },
  mounted() {
    this.$nextTick().then(() => {
      this.fetch()
    })
  },
  methods: {
    fetch() {
      const params = Peace.util.deepClone(this.model)
      const fetch = Service.getAllergyInfoReviewByCondition
      this.$refs.table.reloadData({ fetch, params }).finally(() => {
        this.loading = false
      })
    },
    onItemsClick(data) {
      this.$emit('onItemsClick', data)
    }
  }
}
</script>

<style>
</style>