<template>
  <div class="full-width"
       v-loading="loading">
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
          <el-button @click="fetch"
                     type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="card">
      <PeaceTable ref="table"
                  pagination>
        <PeaceTableColumn type="index"
                          label="序号"
                          width="80px">
          <template slot-scope="{ $index, _self }">
            {{ (_self.Pagination.internalCurrentPage - 1) * (_self.Pagination.internalPageSize) + $index + 1 }}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="机构名称"
                          prop="orgName"
                          min-width="160px"></PeaceTableColumn>
        <PeaceTableColumn label="待配码数量"
                          prop="waitNumber"
                          min-width="160px">
          <template slot-scope="scope">
            <span>{{scope.row.waitNumber}}</span>
            <el-button class="q-px-none q-ml-20"
                       type="text"
                       v-on:click="onItemsClick(scope.row)">配码管理</el-button>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="配码成功数量"
                          prop="successNumber"
                          min-width="160px"></PeaceTableColumn>
        <PeaceTableColumn label="无法配码数量"
                          prop="failNumber"
                          min-width="160px"></PeaceTableColumn>
      </PeaceTable>

    </div>

  </div>
</template>

<script>
import Observable from './../observable'
import Service from '../service'

export default {
  name: 'MainList',
  data() {
    return {
      loading: true,
      model: {
        orgName: ''
      }
    }
  },
  computed: {
    view() {
      console.log('computed   ewew', Observable.state.view)
      return Observable.state.view
    }
  },

  watch: {
    view(value) {
      if (value === Observable.constants.view.LIST) {
        this.fetch()
      }
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.fetch()
    })
  },

  methods: {
    fetch() {
      const params = Peace.util.deepClone(this.model)
      const fetch = Service.getPageMatchStatisticsCodeByCondition
      this.$refs.table.reloadData({ fetch, params }).finally(() => {
        this.loading = false
      })
    },
    onItemsClick(row) {
      Observable.mutations.setProps(row)
      Observable.mutations.changeView(Observable.constants.view.DETAIL)
    }
  }
}
</script>

<style>
</style>