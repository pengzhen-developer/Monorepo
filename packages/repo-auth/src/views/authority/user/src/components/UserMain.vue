<template>
  <div>
    <div class="card">
      <el-form inline
               label-suffix="："
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
        <PeaceTableColumn show-overflow-tooltip
                          type="index"
                          label="序号"
                          width="60">

        </PeaceTableColumn>
        <PeaceTableColumn show-overflow-tooltip
                          label="登录账号"
                          width="120px"
                          prop="username"
                          align="left">

        </PeaceTableColumn>
        <PeaceTableColumn show-overflow-tooltip
                          label="角色"
                          width="120px"
                          prop="roleList">
          <template slot-scope="scope">
            <span>{{getRoleNames(scope.row.roleList)}}</span>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="电话"
                          width="120px"
                          prop="phone"></PeaceTableColumn>
        <PeaceTableColumn label="密码"
                          min-width="120px"
                          prop="password"></PeaceTableColumn>
        <PeaceTableColumn label="创建时间"
                          width="170px"
                          prop="createTime"></PeaceTableColumn>
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