<template>
  <div>
    <div class="card q-mb-md">
      <el-button style="width: 80px;"
                 type="primary"
                 v-on:click="onOpenTerminalModel('create',{})">新增</el-button>
    </div>
    <div class="card">
      <PeaceTable ref="table"
                  size="mini">

        <el-table-column show-overflow-tooltip
                         label="菜单名称"
                         min-width="220px"
                         prop="name"
                         align="left">
        </el-table-column>
        <el-table-column label="图标"
                         align="center"
                         min-width="100px"
                         prop="icon"></el-table-column>
        <el-table-column label="排序"
                         align="center"
                         min-width="100px"
                         prop="sort"></el-table-column>
        <el-table-column label="操作"
                         align="left"
                         min-width="240px">
          <template slot-scope="scope">
            <el-button class="q-px-none"
                       type="text"
                       v-on:click="onOpenTerminalModel('update',scope.row)">新增菜单</el-button>
            <el-button class="q-px-none"
                       type="text"
                       v-on:click="onOpenTerminalModel('update',scope.row)">路由管理</el-button>
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
      <MenuModel v-on:onClose="onClose"
                 v-bind:info="dialog.data"></MenuModel>
    </el-dialog>
  </div>

</template>

<script>
import Service from '../service'
import MenuModel from './MenuModel'
import Peace from '@src/library'
export default {
  name: 'MenuMain',
  components: { MenuModel },
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
    '$store.state.info.menu.clientId'() {
      this.getList()
    },
    '$store.state.info.menu.productId'(val) {
      if (val) {
        this.getList()
      }
    }
  },

  methods: {
    getList() {
      const params = { productId: this.$store.state.info.menu.productId }
      const fetch = Service.menu().getList
      this.$refs.table.reloadData({ fetch, params })
    },
    onOpenTerminalModel(type, data) {
      this.dialog.visible = true
      this.dialog.type = type
      data.clientId = this.$store.state.info.menu.clientId
      data.productId = this.$store.state.info.menu.productId
      this.dialog.data = data
    },
    onClose() {
      this.dialog.visible = false
      this.getList()
    },
    deleteItem(data) {
      const params = { productId: data.productId }
      this.$confirm('确定删除吗？').then(() => {
        Service.menu()
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

