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
        <el-form-item label="开方医生：">
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
        <PeaceTableColumn label="序号"
                          prop="orderNumber"
                          align="center"
                          width="80px">
        </PeaceTableColumn>
        <PeaceTableColumn width="100px"
                          align="center"
                          label="来源"
                          prop="source"></PeaceTableColumn>
        <PeaceTableColumn min-width="150px"
                          align="center"
                          label="医院名称"
                          prop="hosName"></PeaceTableColumn>
        <PeaceTableColumn min-width="120px"
                          align="center"
                          label="医生姓名"
                          prop="docName"></PeaceTableColumn>
        <PeaceTableColumn min-width="120px"
                          align="center"
                          label="科别"
                          prop="deptName"></PeaceTableColumn>
        <PeaceTableColumn width="120px"
                          align="center"
                          label="开方药品数量"
                          prop="drugNum"></PeaceTableColumn>
        <PeaceTableColumn min-width="80px"
                          align="center"
                          label="商品件数"
                          prop="drugTypeNum"></PeaceTableColumn>
        <PeaceTableColumn width="160px"
                          align="center"
                          label="操作时间"
                          prop="createdTime"></PeaceTableColumn>
        <PeaceTableColumn width="120px"
                          align="center"
                          label="操作"
                          fixed="right">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="showDetail(scope.row)">查看详情</el-button>
          </template>
        </PeaceTableColumn>
      </PeaceTable>
    </div>

    <PeaceDialog v-if="dialog.visible"
                 v-bind:visible.sync="dialog.visible"
                 title="缺货登记处方药品详情"
                 width="800px">
      <PeaceTable ref="detailTable"
                  v-bind:data="dialog.data">
        <PeaceTableColumn min-width="180px"
                          align="center"
                          label="药品名称"
                          prop="drugName"></PeaceTableColumn>
        <PeaceTableColumn min-width="120px"
                          align="center"
                          label="药品规格"
                          prop="drugSpec"></PeaceTableColumn>
        <PeaceTableColumn min-width="180px"
                          align="center"
                          label="药品厂家"
                          prop="drugFactory"></PeaceTableColumn>
        <PeaceTableColumn width="120px"
                          align="center"
                          label="剂型"
                          prop="drugForm"></PeaceTableColumn>
        <PeaceTableColumn width="120px"
                          align="center"
                          label="开方药品数量"
                          prop="prescripNum"></PeaceTableColumn>
      </PeaceTable>
    </PeaceDialog>
  </div>
</template>

<script>
import Service from './service'

export default {
  data() {
    return {
      model: {},

      dialog: {
        visible: false,

        data: []
      }
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

    showDetail(row) {
      this.dialog.visible = true

      this.$nextTick().then(() => {
        const fetch = Service.getStockDrugList
        const params = { stockId: row.stockId }

        this.$refs.detailTable.reloadData({ fetch, params })
      })
    },

    exportFile() {
      Service.exportGetStockLog(this.model)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
