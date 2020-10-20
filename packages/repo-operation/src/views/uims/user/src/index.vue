<template>
  <div class="layout-route">

    <div class="card card-search q-mb-md">
      <el-form inline
               label-width="auto"
               v-bind:model="model"
               v-on:keyup.enter.native="fetch"
               v-on:submit.native.prevent>
        <el-form-item label="用户账号：">
          <el-input v-model.trim="model.account"></el-input>
        </el-form-item>
        <el-form-item label="用户姓名：">
          <el-input v-model.trim="model.realName"></el-input>
        </el-form-item>
        <el-form-item label="所在部门：">
          <el-select clearable
                     v-model.trim="model.sectorId">
            <el-option v-for="item in options"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建日期：">
          <peace-date-picker value-format="yyyy-MM-dd HH:mm:ss"
                             v-bind:default-time="['00:00:00', '23:59:59']"
                             format="yyyy-MM-dd"
                             type="daterange"
                             v-model.trim="model.dateValue"></peace-date-picker>
        </el-form-item>
        <el-form-item label="">
          <el-button style="width: 80px;"
                     type="primary"
                     v-on:click="fetch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="card">
      <div class="q-mb-lg">
        <el-button style="width: 80px;"
                   type="primary"
                   v-on:click="showAdd">新增</el-button>
      </div>

      <peace-table ref="table"
                   pagination>
        <el-table-column label="序号"
                         prop="index"
                         align="center"
                         width="80px">
        </el-table-column>
        <el-table-column label="账号"
                         prop="account"></el-table-column>
        <el-table-column label="所在部门"
                         prop="sector"></el-table-column>
        <el-table-column label="姓名"
                         prop="realName"></el-table-column>
        <el-table-column label="角色"
                         prop="role"></el-table-column>
        <el-table-column label="账号状态"
                         align="center"
                         width="120px">
          <template slot-scope="scope">
            <span class="q-mr-sm">{{ scope.row.status ? '已启用' : '已禁用' }}</span>
            <el-switch v-model="scope.row.status"
                       v-on:change="changeStatus(scope.row)"></el-switch>
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
    </div>

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
import Service from './service/index'

export default {
  name: 'User',

  components: {
    UserModel
  },

  data() {
    return {
      model: {
        account: '',
        realName: '',
        sectorId: '',
        startTime: '',
        endTime: '',
        dateValue: []
      },
      options: [],
      dialog: {
        title: '',
        visible: false,
        data: {}
      }
    }
  },

  computed: {
    dateValueList() {
      return this.model.dateValue || []
    }
  },

  watch: {
    dateValueList(value) {
      this.model.startTime = value?.[0] ?? ''
      this.model.endTime = value?.[1] ?? ''
    }
  },

  mounted() {
    this.$nextTick().then(() => {
      this.sectorDictionary()
      this.fetch()
    })
  },

  methods: {
    sectorDictionary() {
      const params = { tag: 'sector' }
      Service.getQueryDictionary(params).then((res) => {
        this.options = res.data.list || []
      })
    },

    fetch() {
      const fetch = Service.getUseAccountList
      const params = Object.assign({}, this.model)
      this.$refs.table.reloadData({ fetch, params }).then((res) => {
        return res
      })
    },

    showAdd() {
      this.dialog.title = '新增账号'
      this.dialog.visible = true
      this.dialog.data = {}
    },

    showEdit(params) {
      this.dialog.title = '修改账号'
      this.dialog.visible = true
      this.dialog.data = {
        ...params
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
    },

    changeStatus(row) {
      const message = row.status ? '确定启用吗？' : '确定禁用吗？'

      this.$confirm(message, '提示', { closeOnClickModal: false, closeOnPressEscape: false })
        .then(() => {
          Service.editUseAccount(row)
            .then((res) => {
              Peace.util.success(res.msg)

              this.fetch()
            })
            .catch(() => {
              row.status = !row.status
            })
        })
        .catch(() => {
          row.status = !row.status
        })
    }
  }
}
</script>

<style>
</style>