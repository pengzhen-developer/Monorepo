<template>
  <div class="layout-route">

    <div class="card card-search q-mb-md">
      <el-form inline
               label-suffix="："
               v-on:keyup.enter.native="fetch"
               v-on:submit.native.prevent
               v-bind:model="model">
        <el-form-item label="机构名称">
          <PeaceInput v-model.trim="model.orgName"
                      placeholder="请输入"></PeaceInput>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     v-on:click="fetch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="card">

      <PeaceTable ref="table"
                  size="mini"
                  pagination
                  v-loading="loading">
        <PeaceTableColumn min-width="160px"
                          label="序号">
          <template slot-scope="{ $index, _self }">
            {{ (_self.Pagination.internalCurrentPage - 1) * (_self.Pagination.internalPageSize) + $index + 1 }}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn min-width="160px"
                          label="机构名称"
                          prop="orgName">
        </PeaceTableColumn>
        <PeaceTableColumn min-width="160px"
                          label="待配码数量"
                          prop="waitNumber">
          <template slot-scope="scope">
            <span class="q-mr-md">{{ scope.row.waitNumber }}</span>
            <el-button type="text"
                       v-on:click="gotoDetailView(scope.row)">配码管理</el-button>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn min-width="160px"
                          label="配码成功数量"
                          prop="successNumber">
        </PeaceTableColumn>
        <PeaceTableColumn min-width="160px"
                          label="无法配码数量"
                          prop="failNumber">
        </PeaceTableColumn>
      </PeaceTable>
    </div>
  </div>
</template>

<script>
import Observable from './../observable'
import Service from './../service'

export default {
  name: 'Main',
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
    this.$nextTick().then(() => {
      this.fetch()
    })
  },

  methods: {
    fetch() {
      const fetch = Service.getList
      const params = this.model

      this.$refs.table.reloadData({ fetch, params }).finally(() => {
        this.loading = false
      })
    },

    gotoDetailView(row) {
      Observable.mutations.setProps(row)
      Observable.mutations.changeView(Observable.constants.view.DETAIL)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
