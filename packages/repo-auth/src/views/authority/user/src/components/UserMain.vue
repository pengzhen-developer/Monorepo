<template>
  <div>
    <div class="card">
      <el-form inline
               :model="query">
        <el-form-item label="登录账号">
          <el-input v-model="query.username"
                    placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 80px;"
                     type="primary"
                     v-on:click="search">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 80px;"
                     type="default"
                     v-on:click="clear">清空</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="card">
      <PeaceTable ref="table"
                  size="mini"
                  v-bind:page-size="5"
                  pagination>
        <el-table-column show-overflow-tooltip
                         type="index"
                         label="序号"
                         width="60"
                         align="center">

        </el-table-column>
        <el-table-column show-overflow-tooltip
                         label="登录账号"
                         min-width="120px"
                         prop="username"
                         align="left">

        </el-table-column>
        <el-table-column show-overflow-tooltip
                         label="角色"
                         min-width="220px"
                         prop="roleList"
                         align="center">
          <template slot-scope="scope">
            <span>{{getRoleNames(scope.row.roleList)}}</span>
          </template>
        </el-table-column>
        <el-table-column label=""
                         align="center"
                         min-width="220px"
                         prop="phone"></el-table-column>
        <el-table-column label="密码"
                         align="center"
                         min-width="220px"
                         prop="password"></el-table-column>
        <el-table-column label="创建时间"
                         align="center"
                         min-width="220px"
                         prop="createTime"></el-table-column>
      </PeaceTable>
    </div>
  </div>

</template>

<script>
import Service from '../service'
export default {
  name: 'UserMain',
  data() {
    return {
      dictList: [],
      query: {
        username: '',
        clientId: '',
        queryAdmin: true
      }
    }
  },
  watch: {
    '$store.state.info.user.clientId'() {
      this.query.clientId = this.$store.state.info.user.clientId
      this.getList()
    }
  },

  methods: {
    search() {
      this.getList()
    },
    clear() {
      this.query.username = ''
    },
    getRoleNames(list) {
      return list.map((item) => item.roleName).join(';')
    },
    getList() {
      const params = this.query
      const fetch = Service.user().getList
      this.$refs.table.reloadData({ fetch, params })
    }
  }
}
</script>

<style>
</style>