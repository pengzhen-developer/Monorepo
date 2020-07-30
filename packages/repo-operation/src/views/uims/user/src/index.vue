<template>
  <div>
    <el-form inline
             label-width="auto"
             v-bind:model="model"
             v-on:keyup.enter.native="fetch"
             v-on:submit.native.prevent>
      <el-form-item label="用户账号：">
        <el-input v-model.trim="model.account"></el-input>
      </el-form-item>
      <el-form-item label="用户姓名：">
        <el-input v-model.trim="model.name"></el-input>
      </el-form-item>
      <el-form-item label="所在部门：">
        <el-select v-model.trim="model.department"></el-select>
      </el-form-item>
      <el-form-item label="创建日期：">
        <el-date-picker style="width: 220px;"
                        value-format="yyyy-MM-dd"
                        format="yyyy-MM-dd"
                        type="daterange"
                        v-model.trim="model.startDate"></el-date-picker>
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
                 v-bind:data="[{},{}]">
      <el-table-column label="序号"
                       prop="index"
                       align="center"
                       width="60px">
      </el-table-column>
      <el-table-column label="账号"></el-table-column>
      <el-table-column label="所在部门"></el-table-column>
      <el-table-column label="姓名"></el-table-column>
      <el-table-column label="角色"></el-table-column>
      <el-table-column label="账号状态"
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
                  v-if="dialog.visible"
                  v-bind:title="dialog.title"
                  v-bind:visible.sync="dialog.visible">
      <UserModel v-bind:data="dialog.data"
                 v-on:save="save"
                 v-on:cancel="cancel"></UserModel>
    </peace-dialog>
  </div>
</template>

<script>
import UserModel from './components/UserModel'

export default {
  name: 'User',

  components: {
    UserModel
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
      this.dialog.title = '新增账号'
      this.dialog.visible = true
      this.dialog.data = {}
    },

    showEdit(row) {
      this.dialog.title = '修改账号'
      this.dialog.visible = true
      this.dialog.data = {
        ...row,
        id: 'test'
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