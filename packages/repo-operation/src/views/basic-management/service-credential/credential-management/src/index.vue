<template>
  <div class="layout-route">
    <div class="card">
      <div class="q-mb-lg">
        <el-button type="primary"
                   v-on:click="addItem">新增</el-button>
      </div>

      <PeaceTable ref="table"
                  size="mini"
                  v-bind:page-size="5"
                  pagination>
        <el-table-column label="序号"
                         type="index"
                         align="center"
                         width="80px">
          <template slot-scope="{ $index, _self }">
            {{ (_self.Pagination.internalCurrentPage - 1) * (_self.Pagination.internalPageSize) + $index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="凭证来源"
                         prop="sourceName"></el-table-column>
        <el-table-column label="凭证详情"
                         prop="configDetails"></el-table-column>
        <el-table-column label="创建时间"
                         prop="createTime"></el-table-column>

        <el-table-column fixed="right"
                         width="150px"
                         label="操作">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="changeItem(scope.row)">修改</el-button>
            <el-button type="text"
                       v-on:click="deleteItem(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </PeaceTable>
    </div>

    <!-- 新建 -->
    <PeaceDialog width="475px"
                 append-to-body
                 v-bind:visible.sync="addCredentialDialog.visible"
                 :title="addCredentialDialog.title">
      <AddCredentialDialog :dataInfo="addCredentialDialog.dataInfo"
                           v-if="addCredentialDialog.visible"
                           v-on:onCancel="addCredentialDialog.visible = false"
                           v-on:onSucess="addItemSuccess"></AddCredentialDialog>

    </PeaceDialog>
  </div>
</template>

<script>
import AddCredentialDialog from './components/AddCredentialDialog'
import Service from './service'

export default {
  name: 'CredentialManagement',

  components: { AddCredentialDialog },

  data() {
    return {
      addCredentialDialog: {
        visible: false,
        title: '新增',
        dataInfo: {}
      }
    }
  },

  mounted() {
    this.$nextTick().then(() => {
      this.get()
    })
  },

  methods: {
    get() {
      const fetch = Service.getConfiguretoselfList
      const params = {}
      this.$refs.table.reloadData({ fetch, params }).then((res) => {
        return res
      })
    },
    addItem() {
      this.addCredentialDialog.title = '新增'
      this.addCredentialDialog.dataInfo = {}
      this.addCredentialDialog.visible = true
    },
    addItemSuccess() {
      this.addCredentialDialog.visible = false
      this.get()
    },
    changeItem(data) {
      this.addCredentialDialog.title = '修改'
      this.addCredentialDialog.dataInfo = data
      this.addCredentialDialog.visible = true
    },
    deleteItem(data) {
      const params = { id: data.id }
      Service.configuretoselfRemove(params).then((res) => {
        Peace.util.success(res.msg)
        this.get()
      })
    }
  }
}
</script>

<style>
</style>