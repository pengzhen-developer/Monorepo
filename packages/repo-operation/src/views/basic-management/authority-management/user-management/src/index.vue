<template>
  <div class=" layout-route">
    <div class="card card-search q-mb-md">
      <el-form inline=""
               label-width="auto"
               label-suffix="：">
        <el-form-item label="账号">
          <el-input v-model="model.username"
                    placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="model.name"
                    placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="创建日期">
          <PeaceDatePicker type="daterange"
                           v-model="model.pickDate"
                           value-format="yyyy-MM-dd"
                           start-placeholder="开始日期"
                           end-placeholder="结束日期"></PeaceDatePicker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     v-on:click="get">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="card">
      <div class="q-mb-lg">
        <el-button type="primary"
                   icon="el-icon-plus"
                   v-on:click="toAccount">新增</el-button>
      </div>

      <PeaceTable ref="table"
                  style="width: 100%"
                  pagination
                  :tableProps="{
                    pageIndex: 'current',
                    pageSize: 'size'
                  }"
                  max-height="600">
        <PeaceTableColumn label="序号"
                          type="index"
                          width="80px">
          <template slot-scope="{ $index, _self }">
            {{ (_self.Pagination.internalCurrentPage - 1) * (_self.Pagination.internalPageSize) + $index + 1 }}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn prop="username"
                          label="账号"></PeaceTableColumn>
        <PeaceTableColumn prop="name"
                          label="姓名"></PeaceTableColumn>
        <PeaceTableColumn prop="roleList"
                          label="角色">
          <template slot-scope="scope">
            <span>{{scope.row.roleList | getRoleNames}}</span>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="账号状态">
          <template slot-scope="scope">
            <div class="table-status">
              <div class="table-status-text">{{scope.row.lockFlag | getEnumLabel(CONSTANT.ENUM_ACCOUNT_STATUS)}}</div>
              <el-switch v-model="scope.row.lockFlag"
                         active-value="0"
                         inactive-value="1"
                         @change="changeStatus(scope.row)"></el-switch>
            </div>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn prop="createTime"
                          label="创建时间"
                          width="180px">
        </PeaceTableColumn>
        <PeaceTableColumn min-width="100px"
                          fixed="right"
                          label="操作">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="toAccount(scope.row)">修改</el-button>
            <el-button type="text"
                       v-on:click="resetPassword(scope.row)">重置密码</el-button>
          </template>
        </PeaceTableColumn>
      </PeaceTable>
    </div>

    <!-- 账号 -->
    <PeaceDialog width="360px"
                 v-bind:visible.sync="accountDialog.visible"
                 :title="`${accountDialog.data.userId ? '修改':'新建'}账号`">
      <AccountModel v-if="accountDialog.visible"
                    ref="accountModel"
                    v-on:close="accountDialog.visible = false"
                    v-on:refresh="get"></AccountModel>
    </PeaceDialog>

  </div>

</template>

<script>
import AccountModel from './components/AccountModel'

import Service from './service'
import CONSTANT from './constant'

export default {
  name: 'UserManagement',

  components: {
    AccountModel
  },
  data() {
    return {
      CONSTANT,
      model: {
        clientId: process.env.VUE_APP_AUTH_CLIENT_ID,
        username: '',
        name: '',
        pickDate: [],
        startTime: '',
        endTime: ''
      },
      accountDialog: {
        visible: false,
        data: {}
      }
    }
  },

  filters: {
    getEnumLabel: function(value, ENUM) {
      return Object.keys(ENUM).find((key) => ENUM[key] === value)
    },
    getRoleNames: function(roleList) {
      return roleList.map((item) => item.roleName).join('，')
    }
  },

  async mounted() {
    this.clientId = await this.$nextTick(() => {
      this.get()
    })
  },

  methods: {
    get() {
      const fetch = Service.user().page
      const params = Peace.util.deepClone(this.model)
      if (params.pickDate == null) {
        params.pickDate = ['', '']
      }
      const [start, end] = params.pickDate
      params.startTime = start
      params.endTime = end
      this.$refs.table.reloadData({ fetch, params })
    },
    changeStatus(row) {
      const message = row.lockFlag == '0' ? '确定启用该账号？' : '确定禁用该账号？'

      this.$confirm(message, '提示', { closeOnClickModal: false })
        .then(() => {
          const params = {
            userId: row.userId,
            lockFlag: row.lockFlag
          }
          Service.user()
            .updateUser(params)
            .then((res) => {
              Peace.util.success(res.msg)
              this.get()
            })
        })
        .catch(() => {
          row.lockFlag = row.lockFlag == '1' ? '0' : '1'
        })
    },
    resetPassword(row) {
      this.$confirm('确定重置密码？', '提示', { closeOnClickModal: false })
        .then(() => {
          const params = {
            userId: row.userId
          }
          Service.user()
            .resetPassword(params)
            .then((res) => {
              Peace.util.success(res.msg)
              this.get()
            })
        })
        .catch(() => {})
    },
    toAccount(row) {
      this.accountDialog.visible = true
      this.accountDialog.data = row ? row : {}
      this.$nextTick(() => {
        this.$refs.accountModel.init(row ? row.userId : '')
      })
    }
  }
}
</script>

<style scoped>
.table-status {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.table-status-text {
  margin-right: 10px;
}
</style>