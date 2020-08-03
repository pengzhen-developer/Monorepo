<template>
  <div>
    <el-form inline
             label-width="auto"
             v-bind:model="model"
             v-on:keyup.enter.native="fetch"
             v-on:submit.native.prevent>
      <el-form-item label="角色名称：">
        <el-input v-model.trim="model.roleName"></el-input>
      </el-form-item>

      <el-form-item label=" ">
        <el-button style="width: 80px;"
                   type="primary"
                   v-on:click="fetch">查询</el-button>
        <el-button style="width: 80px;"
                   type="primary"
                   v-on:click="showAdd">新增</el-button>
      </el-form-item>
    </el-form>

    <peace-table ref="table"
                 pagination>
      <el-table-column label="序号"
                       prop="index"
                       align="center"
                       width="60px">
      </el-table-column>
      <el-table-column label="角色名称"
                       prop="roleName"></el-table-column>
      <el-table-column label="角色备注"
                       prop="remark"></el-table-column>
      <el-table-column label="使用状态"
                       align="center"
                       width="120px">
        <template slot-scope="scope">
          <span class="q-mr-sm">{{ scope.row.status ? '已启用' : '已禁用' }}</span>
          <el-switch v-on:change="changeStatus(scope.row)"
                     v-model="scope.row.status"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="创建时间"
                       prop="createdTime"
                       align="center"
                       width="160px"></el-table-column>
      <el-table-column label="操作"
                       align="center"
                       width="80px">
        <template slot-scope="scope">
          <el-button type="text"
                     v-on:click="showEdit(scope.row)">修改</el-button>
        </template>

      </el-table-column>
    </peace-table>

    <peace-dialog width="400px"
                  v-if="dialog.visible"
                  v-bind:title="dialog.title"
                  v-bind:visible.sync="dialog.visible">
      <RoleModel v-bind:data="dialog.data"
                 v-on:save="save"
                 v-on:cancel="cancel"></RoleModel>
    </peace-dialog>
  </div>
</template>

<script>
import Peace from '@src/library'
import Service from './service'

import RoleModel from './components/RoleModel'

export default {
  name: 'Role',

  components: {
    RoleModel
  },

  data() {
    return {
      model: {
        roleName: ''
      },

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
      const fetch = Service.getRoleList
      const params = this.model

      this.$refs.table.reloadData({ fetch, params })
    },

    showAdd() {
      this.dialog.title = '新增角色'
      this.dialog.visible = true
      this.dialog.data = {}
    },

    showEdit(row) {
      this.dialog.title = '修改角色'
      this.dialog.visible = true
      this.dialog.data = row
    },

    changeStatus(row) {
      Service.editRoleStatus(row)
        .then((res) => {
          Peace.util.success(res.msg)

          this.fetch()
        })
        .catch(() => {
          row.status = !row.status
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