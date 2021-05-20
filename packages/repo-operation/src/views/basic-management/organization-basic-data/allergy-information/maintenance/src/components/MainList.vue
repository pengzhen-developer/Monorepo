<template>
  <div class="full-width">
    <div class="card card-search q-mb-md">
      <el-form inline
               label-suffix="："
               v-on:keyup.enter.native="fetch"
               v-on:submit.native.prevent
               v-bind:model="model">
        <el-form-item label="机构名称">
          <el-input v-model.trim="model.CustName"
                    placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="fetch"
                     type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="card">
      <div class="q-mb-md">
        <el-button v-on:click="onItemsClick">编码管理</el-button>
      </div>
      <PeaceTable ref="table"
                  pagination>
        <PeaceTableColumn type="index"
                          label="序号"></PeaceTableColumn>
        <PeaceTableColumn label="机构名称"
                          prop=""></PeaceTableColumn>
        <PeaceTableColumn label="ICD编码数量"
                          prop="">
          <template slot-scope="scope">
            <span>543</span>
            <el-button class="q-px-none"
                       type="text"
                       v-on:click="onItemsClick(scope.row)">编码管理</el-button>
          </template>
        </PeaceTableColumn>
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
        CustName: ''
      }
    }
  },
  methods: {
    fetch() {
      const params = Peace.util.deepClone(this.model)
      const fetch = Service.getSyncStatusList
      this.$refs.table.reloadData({ fetch, params })
    },
    onItemsClick(data) {
      this.$emit('onItemsClick', data)
    }
  }
}
</script>

<style>
</style>