<template>
  <div>
    <el-form v-bind:model="model"
             inline="inline"
             label-width="85px"
             label-position="right"
             label-suffix=""
             size="mini">
      <el-form-item label="机构名称：">
        <el-input v-model="model.custName"
                  placeholder="请输入机构名称"></el-input>
      </el-form-item>

      <el-form-item label=" ">
        <el-button type="primary"
                   icon="el-icon-search"
                   v-on:click="fetch">查询</el-button>
      </el-form-item>
    </el-form>

    <PeaceTable ref="table"
                pagination
                size="mini">
      <el-table-column label=""
                       type="index"></el-table-column>
      <el-table-column label="机构名称"
                       prop="Name"></el-table-column>
      <el-table-column label="已配置药品供应方"
                       prop="ConfSupplyNum">
        <template slot-scope="scope">
          <el-button type="text"
                     v-on:click="goDetailView(scope.row)">{{ scope.row.ConfSupplyNum }}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="机构认证时间"
                       prop="CreateTime"></el-table-column>
      <el-table-column label="配置更新时间"
                       prop="LastConfTime"></el-table-column>
      <peace-table-column label="操作"
                          prop="">
        <template slot-scope="scope">
          <el-button type="text"
                     v-on:click="goEditView(scope.row)">编辑</el-button>
        </template>
      </peace-table-column>
    </PeaceTable>
  </div>
</template>

<script>
import Peace from '@src/library'
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