<template>
  <div>
    <div class="q-mb-md">
      <el-button style="width: 80px;"
                 type="primary"
                 v-on:click="fetch">刷新</el-button>
      <el-button style="width: 80px;"
                 type="primary"
                 v-on:click="showAdd">新增</el-button>
    </div>

    <el-table row-key="id"
              default-expand-all
              v-bind:data="menuTree"
              v-bind:indent="24"
              v-bind:tree-props="{children: 'children', hasChildren: 'hasChildren'}">

      <el-table-column label="菜单名"
                       min-width="180px"
                       prop="menuName"
                       align="left">
        <template slot-scope="scope">
          <template v-if="scope.row.children">
            {{ scope.row.menuName }}
          </template>
          <template v-else>
            <div style="display: inline-block;
                        width: 20px;
                        line-height: 20px;
                        height: 20px;
                        text-align: center;
                        margin-right: 3px;">
              <i class="el-icon-document"></i>
            </div>
            {{ scope.row.menuName }}
          </template>

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
      <el-table-column label="排序"
                       width="60px"
                       align="center"
                       prop="sort">
      </el-table-column>
      <el-table-column label="路由地址"
                       align="left"
                       min-width="240px"
                       prop="menuRoute"></el-table-column>
      <el-table-column label="实际地址"
                       align="left"
                       min-width="240px"
                       prop="menuPath"></el-table-column>
      <el-table-column label="操作"
                       align="center"
                       fixed="right"
                       width="220px">
        <template slot-scope="scope">
          <el-button type="text"
                     v-on:click="showAdd(scope.row)">新增</el-button>
          <el-button type="text"
                     v-on:click="showEdit(scope.row)">编辑</el-button>
          <el-button type="text"
                     v-on:click="showRemove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

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
import Peace from '@src/library'
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