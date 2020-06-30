<template>
  <div>
    <el-form v-bind:model="model"
             inline="inline"
             label-width="85px"
             label-position="right"
             label-suffix=""
             size="mini">
      <el-form-item label="机构名称：">
        <el-input v-model="model.机构名称Field"
                  placeholder="请输入机构名称"></el-input>
      </el-form-item>

      <el-form-item label=" ">
        <el-button type="primary"
                   icon="el-icon-search"
                   v-on:click="fetch">查询</el-button>
      </el-form-item>
    </el-form>

    <PeaceTable ref="table"
                size="mini"
                pagination>
      <el-table-column label=""
                       type="index"></el-table-column>
      <el-table-column label="机构名称"
                       prop=""></el-table-column>
      <el-table-column label="已配置药品供应方"
                       prop=""></el-table-column>
      <el-table-column label="机构认证时间"
                       prop=""></el-table-column>
      <el-table-column label="配置更新时间"
                       prop=""></el-table-column>
      <el-table-column label="操作"
                       prop="">
        <template slot-scope="scope">
          <el-button type="text"
                     v-on:click="goEditView(scope)"> 编辑 </el-button>
        </template>
      </el-table-column>
    </PeaceTable>
  </div>
</template>

<script>
import Peace from '@src/library'
import Service from './../service'
import CONSTANT from './../../constant'

export default {
  inject: ['provideSetDispalyView'],

  data() {
    return {
      model: {
        机构名称Field: ''
      }
    }
  },

  computed: {
    setDispalyView() {
      return this.provideSetDispalyView
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

      this.$refs.table.loadData({ fetch, params })
    },

    goEditView() {
      this.setDispalyView(CONSTANT.DISPLAY_VIEW.编辑)
    }
  }
}
</script>

<style>
</style>