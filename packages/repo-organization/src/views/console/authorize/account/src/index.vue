<template>
  <div class=" layout-route">
    <div class="card card-search q-mb-md">
      <el-form inline=""
               label-width="auto"
               label-position="left">
        <el-form-item>
          <div class="flex inline"
               slot="label">
            <span>账号</span>
            <span class="text-center q-ml-sm">：</span>
          </div>
          <el-input v-model="model.username"
                    placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="flex inline"
               slot="label">
            <span>姓名</span>
            <span class="text-center q-ml-sm">：</span>
          </div>
          <el-input v-model="model.name"
                    placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="flex inline"
               slot="label">
            <span>创建日期</span>
            <span class="text-center q-ml-sm">：</span>
          </div>
          <el-date-picker type="daterange"
                          v-model="model.pickDate"
                          value-format="yyyy-MM-dd"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"></el-date-picker>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary"
                     v-on:click="get">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="card">
      <el-button type="primary"
                 icon="el-icon-plus"
                 style="margin-bottom: 20px;"
                 v-on:click="toAccount">新增</el-button>
      <PeaceTable ref="table"
                  style="width: 100%"
                  pagination
                  max-height="600">
        <el-table-column type="index"
                         fixed
                         align="center"
                         label=" "
                         width="60"></el-table-column>
        <el-table-column prop="username"
                         label="账号"></el-table-column>
        <el-table-column prop="name"
                         label="姓名"></el-table-column>
        <el-table-column prop="roleList"
                         label="角色">
          <template slot-scope="scope">
            <span>{{scope.row.roleList | getRoleNames}}</span>
          </template>
        </el-table-column>
        <el-table-column label="账号状态">
          <template slot-scope="scope">
            <div class="table-status">
              <div class="table-status-text">{{scope.row.lockFlag | getEnumLabel(CONSTANT.ENUM_ACCOUNT_STATUS)}}</div>
              <el-switch v-model="scope.row.lockFlag"
                         active-value="0"
                         inactive-value="1"
                         @change="changeStatus(scope.row)"></el-switch>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="createTime"
                         label="创建时间">
        </el-table-column>
        <el-table-column min-width="100px"
                         align="center"
                         fixed="right"
                         label="操作">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="toAccount(scope.row)">修改</el-button>
            <el-button type="text"
                       v-on:click="resetPassword(scope.row)">重置密码</el-button>
          </template>
        </el-table-column>
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
import Util from '@src/util'
import CONSTANT from './constant'

export default {
  name: 'AccountManager',

  components: {
    AccountModel
  },
  data() {
    return {
      CONSTANT,
      model: {
        clientId: Util.user.getUserInfo().clientId,
        organCode: Util.user.getUserInfo().custCode,
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
    getEnumLabel: function (value, ENUM) {
      return Object.keys(ENUM).find((key) => ENUM[key] === value)
    },
    getRoleNames: function (roleList) {
      return roleList.map((item) => item.roleName).join('，')
    }
  },

  mounted() {
    this.$nextTick(() => {
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
      this.$refs.table.loadData({ fetch, params })
    },
    changeStatus(row) {
      const message = row.lockFlag == '0' ? '确定启用该账号？' : '确定禁用该账号？'

      this.$confirm(message, '提示')
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
      this.$confirm('确定重置密码？', '提示')
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