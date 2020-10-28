<template>
  <div>
    <div class="card">
      <el-button style="width: 80px;"
                 type="primary"
                 v-on:click="onOpenMenuModel('create',{})">新增</el-button>
    </div>
    <div class="card">
      <el-table row-key="id"
                default-expand-all
                v-bind:tree-props="{children: 'children', hasChildren: 'hasChildrens'}"
                v-bind:data='list'
                size="mini">

        <el-table-column label="菜单名称"
                         min-width="140px"
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
                       v-on:click="onOpenMenuModel('child',scope.row)">新增菜单</el-button>
            <el-button class="q-px-none"
                       type="text"
                       v-on:click="onOpenMenuRouteModel(scope.row)">路由管理</el-button>
            <el-button class="q-px-none"
                       type="text"
                       v-on:click="onOpenMenuModel('update',scope.row)">修改</el-button>
            <el-button class="q-px-none"
                       type="text"
                       v-on:click="deleteItem(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog v-if="dialogMenu.visible"
               width="450px"
               v-bind:visible.sync="dialogMenu.visible"
               :title="dialogMenu.type!=='update'?'新建菜单':'编辑菜单'">
      <MenuModel v-on:onClose="onClose"
                 v-bind:info="dialogMenu.data"></MenuModel>
    </el-dialog>
    <el-dialog v-if="dialogMenuRoute.visible"
               :close-on-click-modal="false"
               width="900px"
               v-bind:visible.sync="dialogMenuRoute.visible"
               title="路由管理">
      <MenuRouteModel v-on:onClose="onClose"
                      v-bind:info="dialogMenuRoute.data"></MenuRouteModel>
    </el-dialog>
  </div>

</template>

<script>
import Service from '../service'
import MenuModel from './MenuModel'
import MenuRouteModel from './MenuRouteModel'
export default {
  name: 'MenuMain',
  components: { MenuModel, MenuRouteModel },
  data() {
    return {
      list: [],
      dialogMenu: {
        type: 'create',
        visible: false,
        data: {}
      },
      dialogMenuRoute: {
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
      const params = { clientId: this.$store.state.info.menu.clientId, productCode: this.$store.state.info.menu.productCode }
      Service.menu()
        .getList(params)
        .then((res) => {
          this.list = res.data
        })
    },
    onOpenMenuModel(type, data) {
      this.dialogMenu.visible = true
      this.dialogMenu.type = type
      data.clientId = this.$store.state.info.menu.clientId
      data.productCode = this.$store.state.info.menu.productCode
      switch (type) {
        case 'create':
          data.parentId = -1
          break
        case 'child':
          data.parentId = data.id
          break
        default:
          break
      }

      data.mode = type
      data.menuId = data.id
      this.dialogMenu.data = data
    },
    onClose() {
      this.dialogMenu.visible = false
      this.dialogMenuRoute.visible = false
      this.getList()
    },
    onOpenMenuRouteModel(data) {
      this.dialogMenuRoute.visible = true
      this.dialogMenuRoute.data = data
    },
    deleteItem(data) {
      const params = { id: data.id }
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

