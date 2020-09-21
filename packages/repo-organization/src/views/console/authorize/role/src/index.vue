<template>
  <div class=" layout-route">
    <div class="card card-search q-mb-md">
      <el-form inline=""
               label-width="auto"
               label-position="left">
        <el-form-item>
          <div class="flex inline"
               slot="label">
            <span>角色名称</span>
            <span class="text-center q-ml-sm">：</span>
          </div>
          <el-input v-model="model.name"
                    placeholder="请输入"></el-input>
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
                 v-on:click="toRole">新增</el-button>
      <PeaceTable ref="table"
                  style="width: 100%"
                  pagination
                  max-height="600">
        <el-table-column type="index"
                         fixed
                         align="center"
                         label=" "
                         width="60"></el-table-column>
        <el-table-column prop="roleName"
                         label="角色名称"></el-table-column>
        <el-table-column prop="remark"
                         label="备注">
          <template slot-scope="scope">
            {{scope.row.remark || '————'}}
          </template>
        </el-table-column>
        <el-table-column label="使用状态">
          <template slot-scope="scope">
            <div class="table-status">
              <div class="table-status-text">{{scope.row.status | getEnumLabel(CONSTANT.ENUM_ROLE_STATUS)}}</div>
              <el-switch v-model="scope.row.status"
                         :active-value="1"
                         :inactive-value="0"
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
                       v-on:click="toDetail(scope.row)">查看详情</el-button>
            <el-button type="text"
                       v-on:click="toRole(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </PeaceTable>
    </div>

    <!-- 账号 -->
    <el-dialog width="360px"
               v-bind:visible.sync="roleDialog.visible"
               :title="`${roleDialog.data.id ? '修改':'新建'}角色`">
      <RoleModel v-if="roleDialog.visible"
                 ref="roleModel"
                 v-on:close="roleDialog.visible = false"
                 v-on:refresh="get"></RoleModel>
    </el-dialog>

  </div>

</template>

<script>
import RoleModel from './components/RoleModel'

import Peace from '@src/library'
import Util from '@src/util'
import Service from './service'
import CONSTANT from './constant'

export default {
  name: 'role-management',
  components: {
    RoleModel
  },
  data() {
    return {
      CONSTANT,
      model: {
        clientId: Util.user.getUserInfo().clientId,
        organCode: Util.user.getUserInfo().custCode,
        name: ''
      },
      roleDialog: {
        visible: false,
        data: {}
      }
    }
  },

  filters: {
    getEnumLabel: function (value, ENUM) {
      return Object.keys(ENUM).find((key) => ENUM[key] === value)
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.get()
    })
  },

  methods: {
    get() {
      const fetch = Service.role().list
      const params = Peace.util.deepClone(this.model)
      this.$refs.table.loadData({ fetch, params })
    },
    changeStatus(row) {
      const message = row.status === 1 ? '确定启用该角色？' : '确定禁用该角色？'

      this.$confirm(message, '提示')
        .then(() => {
          const params = {
            accountId: row.id,
            status: row.status
          }
          Service.editRole(params).then((res) => {
            Peace.util.success(res.msg)
            this.get()
          })
        })
        .catch(() => {
          row.status = row.status === 1 ? 2 : 1
        })
    },
    toRole(row) {
      this.roleDialog.visible = true
      this.roleDialog.data = row ? row : {}
      this.$nextTick(() => {
        this.$refs.roleModel.init(row ? row.id : '')
      })
    },
    toDetail(row) {
      this.roleDialog.visible = true
      this.roleDialog.data = row ? row : {}
      this.$nextTick(() => {
        this.$refs.roleModel.init(row ? row.id : '')
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