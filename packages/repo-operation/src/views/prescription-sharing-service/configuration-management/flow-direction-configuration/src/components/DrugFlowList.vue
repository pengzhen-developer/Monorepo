<template>
  <div>
    <div class="card card-search q-mb-md">
      <el-form v-bind:model="model"
               inline="inline"
               label-width="auto"
               label-suffix="："
               size="mini">
        <el-form-item label="机构名称">
          <el-input v-model.trim="model.custName"
                    placeholder="请输入机构名称"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary"
                     v-on:click="fetch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="card">
      <PeaceTable ref="table"
                  pagination
                  size="mini">
        <PeaceTableColumn label="序号"
                          type="index"
                          width="80px">
          <template slot-scope="{ $index, _self }">
            {{ (_self.Pagination.internalCurrentPage - 1) * (_self.Pagination.internalPageSize) + $index + 1 }}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="机构名称"
                          prop="Name"></PeaceTableColumn>
        <PeaceTableColumn label="已配置药品供应方"
                          prop="ConfSupplyNum">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="goDetailView(scope.row)">{{ scope.row.ConfSupplyNum }}</el-button>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="机构认证时间"
                          prop="CreateTime"
                          width="180px"></PeaceTableColumn>
        <PeaceTableColumn label="配置更新时间"
                          prop="LastConfTime"
                          width="180px"></PeaceTableColumn>
        <peace-table-column label="操作"
                            prop="">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="goEditView(scope.row)">编辑</el-button>
          </template>
        </peace-table-column>
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
        custName: ''
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
      const params = Peace.util.deepClone(this.model)

      this.$refs.table.reloadData({ fetch, params })
    },

    goEditView(row) {
      this.$emit('on-edit', row.Code, row.Name)
    },

    goDetailView(row) {
      this.$emit('on-preview', row.Code, row.Name)
    }
  }
}
</script>

<style>
</style>