<template>
  <div class=" layout-route">
    <div class="card card-search q-mb-md">
      <el-form inline
               label-width="auto"
               v-bind:model="model"
               v-on:keyup.enter.native="get"
               v-on:submit.native.prevent>
        <el-form-item label="角色名称：">
          <el-input v-model.trim="model.roleName"></el-input>
        </el-form-item>

        <el-form-item label="">
          <el-button type="primary"
                     v-on:click="get">查询</el-button>

        </el-form-item>
      </el-form>
    </div>

    <div class="card">
      <el-button type="primary"
                 icon="el-icon-plus"
                 style="margin-bottom: 20px;"
                 v-on:click="add">新增</el-button>
      <PeaceTable ref="table"
                  style="width: 100%"
                  pagination
                  :tableProps="{
                    pageIndex: 'current',
                    pageSize: 'size'
                  }"
                  max-height="600">
        <el-table-column type="index"
                         fixed
                         align="center"
                         label=" "
                         width="60"></el-table-column>
        <el-table-column prop="roleName"
                         label="角色名称"></el-table-column>
        <el-table-column prop="roleDesc"
                         label="备注">
          <template slot-scope="scope">
            {{scope.row.roleDesc}}
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
                       v-on:click="toRole( scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </PeaceTable>
    </div>
    <!--角色 -->
    <PeaceDialog width="696px"
                 v-bind:visible.sync="dialog.visible"
                 :title="dialog.title">
      <accountModel v-if="dialog.visible"
                    ref="roleModel"
                    v-on:close="dialog.visible = false"
                    v-on:refresh="get"></accountModel>
    </PeaceDialog>
  </div>

</template>

<script>
import accountModel from './components/accountModel'
import Util from '@src/util'
import Service from './service'

export default {
  name: 'RoleManagement',
  components: {
    accountModel
  },
  data() {
    return {
      model: {
        clientId: Util.user.getUserInfo().clientId,
        organCode: Util.user.getUserInfo().custCode,
        roleName: ''
      },
      dialog: {
        visible: false,
        title: '新建部门'
      }
    }
  },

  filters: {},

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
    add() {
      this.dialog.visible = true
    },
    toRole() {}
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