<template>
  <div>
    <div class="card">
      <el-button style="width: 80px;"
                 type="primary"
                 v-on:click="onOpenTerminalModel('create',{})">新增</el-button>
    </div>
    <div class="card">
      <PeaceTable ref="table"
                  size="mini"
                  v-bind:page-size="5"
                  pagination>

        <el-table-column show-overflow-tooltip
                         label="产品名称"
                         min-width="220px"
                         prop="productName"
                         align="left">

        </el-table-column>
        <el-table-column label="创建时间"
                         align="center"
                         min-width="220px"
                         prop="createTime"></el-table-column>
        <el-table-column label="操作"
                         align="center"
                         width="140px">
          <template slot-scope="scope">
            <el-button class="q-px-none"
                       type="text"
                       v-on:click="onOpenTerminalModel('update',scope.row)">编辑</el-button>
            <el-button class="q-px-none"
                       type="text"
                       v-on:click="deleteItem(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </PeaceTable>
    </div>
    <el-dialog v-if="dialog.visible"
               width="450px"
               v-bind:visible.sync="dialog.visible"
               :title="dialog.type=='create'?'新建产品':'修改产品'">
      <ProduceModel v-on:onClose="onClose"
                    v-bind:info="dialog.data"></ProduceModel>
    </el-dialog>
  </div>

</template>

<script>
import Service from '../service'
import ProduceModel from './ProduceModel'
import Peace from '@src/library'
export default {
  name: 'ProduceMain',
  components: { ProduceModel },
  data() {
    return {
      dialog: {
        type: 'create',
        visible: false,
        data: {}
      }
    }
  },
  watch: {
    '$store.state.info.produce.clientId'() {
      this.getList()
    }
  },

  methods: {
    getList() {
      const params = { clientId: this.$store.state.info.produce.clientId }
      const fetch = Service.product().getList
      this.$refs.table.reloadData({ fetch, params })
    },
    onOpenTerminalModel(type, data) {
      this.dialog.visible = true
      this.dialog.type = type
      data.clientId = this.$store.state.info.produce.clientId
      this.dialog.data = data
    },
    onClose() {
      this.dialog.visible = false
      this.getList()
    },
    deleteItem(data) {
      const params = { productId: data.productId }
      this.$confirm('确定删除吗？').then(() => {
        Service.product()
          .delete(params)
          .then((res) => {
            Peace.util.success(res.msg)

            this.getList()
          })
      })
    }
  }
}
</script>

<style>
</style>