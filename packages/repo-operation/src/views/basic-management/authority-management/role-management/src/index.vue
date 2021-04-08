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
          <el-input v-model="model.roleName"
                    placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     v-on:click="get">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="card">
      <el-button type="primary"
                 icon="el-icon-plus"
                 style="margin-bottom: 20px;"
                 v-on:click="toRole('add', {})">新增</el-button>
      <PeaceTable ref="table"
                  style="width: 100%"
                  pagination
                  :tableProps="{
                    pageIndex: 'current',
                    pageSize: 'size'
                  }"
                  max-height="600">
        <el-table-column label="序号"
                         type="index"
                         align="center"
                         width="80px">
          <template slot-scope="{ $index, _self }">
            {{ (_self.Pagination.internalCurrentPage - 1) * (_self.Pagination.internalPageSize) + $index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="roleName"
                         label="角色名称"></el-table-column>
        <el-table-column prop="roleDesc"
                         label="备注">
          <template slot-scope="scope">
            {{scope.row.roleDesc}}
          </template>
        </el-table-column>
        <el-table-column label="使用状态">
          <template slot-scope="scope">
            <div class="table-status">
              <div class="table-status-text">{{scope.row.enable | getEnumLabel(CONSTANT.ENUM_ROLE_STATUS)}}</div>
              <el-switch v-model="scope.row.enable"
                         active-value="0"
                         inactive-value="1"
                         @change="changeStatus(scope.row)"></el-switch>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="createTime"
                         label="创建时间"
                         width="180px">
        </el-table-column>
        <el-table-column min-width="100px"
                         align="center"
                         fixed="right"
                         label="操作">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="toRole('detail', scope.row)">查看详情</el-button>
            <el-button type="text"
                       v-on:click="toRole('edit', scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </PeaceTable>
    </div>

    <!-- 账号 -->
    <PeaceDialog width="360px"
                 v-bind:visible.sync="roleDialog.visible"
                 :title="roleDialog.title">
      <RoleModel v-if="roleDialog.visible"
                 ref="roleModel"
                 v-on:close="roleDialog.visible = false"
                 v-on:refresh="get"></RoleModel>
    </PeaceDialog>
  </div>

</template>

<script>
import RoleModel from './components/RoleModel'

import Service from './service'
import CONSTANT from './constant'

export default {
  name: 'RoleManagement',
  components: {
    RoleModel
  },
  data() {
    return {
      CONSTANT,
      model: {
        clientId: process.env.VUE_APP_AUTH_CLIENT_ID,
        roleName: ''
      },
      roleDialog: {
        visible: false,
        type: '',
        title: '',
        data: {}
      }
    }
  },

  filters: {
    getEnumLabel: function(value, ENUM) {
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
      const fetch = Service.role().page
      const params = Peace.util.deepClone(this.model)
      this.$refs.table.reloadData({ fetch, params })
    },
    changeStatus(row) {
      const message = row.enable == '0' ? '确定启用该角色？' : '确定禁用该角色？'

      this.$confirm(message, '提示', { closeOnClickModal: false })
        .then(() => {
          const params = row
          Service.role()
            .edit(params)
            .then((res) => {
              Peace.util.success(res.msg)
              this.get()
            })
        })
        .catch(() => {
          row.enable = row.enable == '1' ? '0' : '1'
        })
    },
    toRole(type, row) {
      this.roleDialog.visible = true
      this.roleDialog.type = type
      this.roleDialog.data = row ? row : {}
      if (type === 'detail') {
        this.roleDialog.title = '查看详情'
      } else {
        this.roleDialog.title = type === 'edit' ? '修改角色' : '新建角色'
      }
      this.$nextTick(() => {
        this.$refs.roleModel.init(type, row ? row.roleId : '')
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