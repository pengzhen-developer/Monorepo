<template>
  <div class="layout-route">

    <div class="card card-search q-mb-md">
      <el-form inline
               label-width="auto"
               v-on:keyup.enter.native="get"
               v-on:submit.native.prevent
               v-bind:model="model">
        <el-form-item label="医院名称：">
          <el-input v-model="model.hosName"
                    placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="医生姓名：">
          <el-input v-model="model.docName"
                    placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="科别：">
          <el-input v-model="model.deptName"
                    placeholder=""></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     style="min-width: 80px;"
                     v-on:click="get">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="card">
      <div class="q-mb-md">
        <el-button style="min-width: 80px"
                   v-on:click="exportFile">导出</el-button>
      </div>

      <PeaceTable ref="table"
                  size="mini"
                  pagination>
        <el-table-column width="60px"
                         label="序号"
                         align="center"
                         prop="orderNumber"></el-table-column>
        <el-table-column width="150px"
                         align="center"
                         label="医院名称"
                         prop="hosName"></el-table-column>
        <el-table-column width="80px"
                         align="center"
                         label="医生姓名"
                         prop="docName"></el-table-column>
        <el-table-column width="150px"
                         align="center"
                         label="科别"
                         prop="deptName"></el-table-column>
        <el-table-column width="150px"
                         align="center"
                         label="药品名称"
                         prop="drugName"></el-table-column>
        <el-table-column width="150px"
                         align="center"
                         label="药品规格"
                         prop="drugSpec"></el-table-column>
        <el-table-column width="150px"
                         align="center"
                         label="药品厂家"
                         prop="drugFactory"></el-table-column>
        <el-table-column width="150px"
                         align="center"
                         label="剂型"
                         prop="drugForm"></el-table-column>
        <el-table-column width="80px"
                         align="center"
                         label="开方数量"
                         prop="prescripNum"></el-table-column>
        <el-table-column width="150px"
                         align="center"
                         label="提交时间"
                         prop="createdTime"></el-table-column>
      </PeaceTable>
    </div>

  </div>
</template>

<script>
import Service from './service'

export default {
  data() {
    return {
      model: {}
    }
  },

  mounted() {
    this.$nextTick().then(() => {
      this.get()
    })
  },

  methods: {
    get() {
      const fetch = Service.getStockLog
      const params = this.model

      this.$refs.table.reloadData({ fetch, params })
    },

    exportFile() {
      Service.exportGetStockLog(this.model)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
