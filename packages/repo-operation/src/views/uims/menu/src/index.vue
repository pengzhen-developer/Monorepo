<template>
  <div class="layout-route">
    <div class="card q-mb-md">
      <el-button style="width: 80px;"
                 type="primary"
                 v-on:click="fetch">刷新</el-button>
      <el-button style="width: 80px;"
                 type="primary"
                 v-on:click="showAdd">新增</el-button>
    </div>

    <div class="card">
      <el-table row-key="id"
                default-expand-all
                v-bind:data="menuTree"
                v-bind:indent="24"
                v-bind:tree-props="{children: 'children', hasChildren: 'hasChildren'}">

        <el-table-column show-overflow-tooltip
                         label="菜单名"
                         min-width="220px"
                         prop="menuName"
                         align="left">
          <template slot-scope="scope">
            {{ scope.row.menuName }}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip
                         label="ID"
                         align="left"
                         width="60px"
                         prop="id"></el-table-column>
        <el-table-column show-overflow-tooltip
                         label="Virtual"
                         align="center"
                         width="70px"
                         prop="virtual">
          <template slot-scope="scope">
            <i v-if="scope.row.virtual"
               class="el-icon-check"></i>
          </template>
        </el-table-column>
        <el-table-column label="图标"
                         width="60px"
                         align="center"
                         prop="menuIcon">
          <template slot-scope="scope">
            <i v-bind:class="scope.row.menuIcon"></i>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip
                         label="别名"
                         align="left"
                         width="120px"
                         prop="menuAlias"></el-table-column>
        <el-table-column show-overflow-tooltip
                         label="路由地址"
                         align="left"
                         min-width="200px"
                         prop="menuRoute"></el-table-column>
        <el-table-column show-overflow-tooltip
                         label="实际地址"
                         align="left"
                         min-width="240px"
                         prop="menuPath"></el-table-column>
        <el-table-column label="操作"
                         align="center"
                         fixed="right"
                         width="140px">
          <template slot-scope="scope">
            <el-button class="q-px-none"
                       type="text"
                       v-on:click="showAdd(scope.row)">添加</el-button>
            <el-button class="q-px-none"
                       type="text"
                       v-on:click="showEdit(scope.row)">编辑</el-button>
            <el-button class="q-px-none"
                       type="text"
                       v-on:click="showRemove(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <peace-dialog width="800px"
                  v-if="dialog.visible"
                  v-bind:title="dialog.title"
                  v-bind:visible.sync="dialog.visible">
      <MenuModel v-bind:menuTree="menuTree"
                 v-bind:data="dialog.data"
                 v-on:save="save"
                 v-on:cancel="cancel"></MenuModel>
    </peace-dialog>
  </div>
</template>

<script>
import Service from './service'

import MenuModel from './components/MenuModel'

export default {
  name: 'Menu',

  components: {
    MenuModel
  },

  data() {
    return {
      menuTree: [],
      defaultExpand: [],

      dialog: {
        title: '',
        visible: false,
        data: {}
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
      Service.getMenuList().then((res) => {
        this.menuTree = Peace.util.arrayToTree(res.data.list, 'id', 'parentId', 'children')
      })
    },

    showAdd(row) {
      this.dialog.title = '新增菜单'
      this.dialog.visible = true

      this.dialog.data = {
        parentId: row.id
      }
    },

    showEdit(row) {
      this.dialog.title = '修改角色'
      this.dialog.visible = true

      this.dialog.data = row
    },

    showRemove(row) {
      this.$confirm('确定删除吗？').then(() => {
        Service.delMenu(row).then((res) => {
          Peace.util.success(res.msg)

          this.fetch()
        })
      })
    },

    save() {
      this.cancel()
      this.fetch()
    },

    cancel() {
      this.dialog.title = ''
      this.dialog.visible = false
      this.dialog.data = {}
    }
  }
}
</script>

<style>
</style>