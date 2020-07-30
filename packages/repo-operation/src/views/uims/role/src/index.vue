<template>
  <div>
    <el-form inline
             label-width="auto"
             v-bind:model="model"
             v-on:keyup.enter.native="fetch"
             v-on:submit.native.prevent>
      <el-form-item label="角色名称：">
        <el-input v-model.trim="model.account"></el-input>
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
                 pagination
                 v-bind:data="[{},{},{}]">
      <el-table-column label="序号"
                       prop="index"
                       align="center"
                       width="60px">
      </el-table-column>
      <el-table-column label="角色名称"></el-table-column>
      <el-table-column label="角色备注"></el-table-column>
      <el-table-column label="使用状态"
                       align="center"
                       width="120px">
        <template slot-scope="scope">
          <span class="q-mr-sm">{{ scope.row.status ? '已启用' : '已禁用' }}</span>
          <el-switch v-model="scope.row.status"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="创建时间"
                       prop="createTime"
                       align="center"
                       width="160px"></el-table-column>
      <el-table-column label="操作"
                       align="center"
                       width="80px">
        <el-button type="text"
                   v-on:click="showEdit">修改</el-button>
      </el-table-column>
    </peace-table>

    <peace-dialog width="400px"
                  v-bind:title="dialog.title"
                  v-bind:visible.sync="dialog.visible">
      <RoleModel v-bind:data="dialog.data"
                 v-on:save="save"
                 v-on:cancel="cancel"></RoleModel>
    </peace-dialog>
  </div>
</template>

<script>
import RoleModel from './components/RoleModel'

export default {
  name: 'Role',

  components: {
    RoleModel
  },

  data() {
    return {
      model: {},

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
      // this.$refs.table.reloadData({ /** fetch, params */ })
    },

    showAdd() {
      this.dialog.title = '新增角色'
      this.dialog.visible = true
      this.dialog.data = {}
    },

    showEdit() {
      this.dialog.title = '修改角色'
      this.dialog.visible = true
      this.dialog.data = {
        id: 1
      }
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