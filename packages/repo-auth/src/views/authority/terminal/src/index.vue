<template>
  <div class="layout-route">
    <div class="card q-mb-md">
      <el-button style="width: 80px;"
                 type="primary"
                 v-on:click="onOpenTerminalModel('create',{})">新增</el-button>
    </div>
    <div class="card">

      <PeaceTable ref="table"
                  size="mini"
                  v-bind:page-size="5"
                  pagination>
        <el-table-column show-overflow-tooltip
                         width="70px"
                         label="序号"
                         type=index
                         align="center">
        </el-table-column>
        <el-table-column show-overflow-tooltip
                         label="终端名称"
                         min-width="200px"
                         prop="clientName"
                         align="left">

        </el-table-column>
        <el-table-column show-overflow-tooltip
                         label="编号"
                         min-width="200px"
                         prop="clientId"
                         align="left">
        </el-table-column>
        <el-table-column show-overflow-tooltip
                         label="密钥"
                         min-width="200px"
                         prop="clientSecret"
                         align="left">
        </el-table-column>
        <el-table-column show-overflow-tooltip
                         label="域"
                         min-width="140px"
                         prop="scope"
                         align="left">
        </el-table-column>
        <el-table-column label="自动放行"
                         min-width="140px"
                         prop="autoapprove"
                         align="center">
          <template slot-scope="scope">
            <div>{{changeAutoapproveText(scope.row.autoapprove)}}</div>
          </template>
        </el-table-column>
        <el-table-column label="授权模式"
                         min-width="200px"
                         prop="authorizedGrantTypes"
                         align="left">
          <template slot-scope="scope">
            <div>{{changeAuAthorizedGrantTypesText(scope.row.authorizedGrantTypes)}}</div>
          </template>
        </el-table-column>
        <el-table-column label="令牌时效"
                         min-width="140px"
                         prop="accessTokenValidity"
                         align="left">
        </el-table-column>
        <el-table-column label="刷新时效"
                         align="left"
                         min-width="140px"
                         prop="refreshTokenValidity"></el-table-column>
        <el-table-column label="操作"
                         align="center"
                         fixed="right"
                         width="140px">
          <template slot-scope="scope">
            <el-button class="q-px-none"
                       type="text"
                       v-on:click="onOpenTerminalModel('update',scope.row)">编辑</el-button>
            <el-button class="q-px-none"
                       type="text"
                       v-on:click="deleteItem(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </PeaceTable>
    </div>
    <el-dialog v-if="dialog.visible"
               width="900px"
               v-bind:visible.sync="dialog.visible"
               :title="dialog.type=='create'?'新建终端':'修改终端'">
      <TerminalModel v-on:onClose="onClose"
                     v-bind:info="dialog.data"></TerminalModel>
    </el-dialog>
  </div>
</template>

<script>
import Service from './service'
import TerminalModel from './components/TerminalModel'
import Contant from './constant'
import Peace from '@src/library'
export default {
  name: 'Terminal',
  components: {
    TerminalModel
  },
  data() {
    return {
      query: {
        current: 1,
        size: 10
      },
      dialog: {
        type: 'create',
        visible: false,
        data: {}
      }
    }
  },
  mounted() {
    this.getList()
  },

  methods: {
    changeAutoapproveText(str) {
      return str == true ? '是' : '否'
    },
    changeAuAthorizedGrantTypesText(array) {
      const result = []
      array.forEach((item) => {
        result.push(Contant.authorizedGrantTypeObj[item])
      })
      return result.join('|')
    },
    getList() {
      const fetch = Service.client().getList
      this.$refs.table.reloadData({ fetch })
    },
    onOpenTerminalModel(type, data) {
      this.dialog.visible = true
      this.dialog.type = type
      this.dialog.data = data
    },
    onClose() {
      this.dialog.visible = false
      this.getList()
    },
    deleteItem(data) {
      const params = { clientId: data.clientId }
      this.$confirm('确定删除吗？').then(() => {
        Service.client()
          .delete(params)
          .then((res) => {
            Peace.util.success(res.msg)

            this.getList()
          })
      })
    }
  }
}
</script>

<style>
</style>