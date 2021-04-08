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
        <PeaceTableColumn label="序号"
                          type="index"
                          width="80px">
          <template slot-scope="{ $index, _self }">
            {{ (_self.Pagination.internalCurrentPage - 1) * (_self.Pagination.internalPageSize) + $index + 1 }}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="系统名称"
                          prop="name"></PeaceTableColumn>
        <PeaceTableColumn label="系统属性"
                          prop="attributeName"></PeaceTableColumn>
        <PeaceTableColumn label="Accesskey  ID"
                          prop="accessId"></PeaceTableColumn>
        <PeaceTableColumn label="AccessKey Secret">

          <template slot-scope="scope">
            <div class="status-item">
              <span v-if='scope.row.isHide'>
                ******
              </span>
              <span v-else>
                {{ scope.row.accessSecret }}
              </span>
              <i class="icon el-icon-view eyes"
                 @click="showAndHid(scope.row)"></i>
            </div>
          </template>

        </PeaceTableColumn>
        <PeaceTableColumn label="创建时间"
                          prop="createTime"
                          width="180px"></PeaceTableColumn>

        <PeaceTableColumn fixed="right"
                          width="150px"
                          label="使用状态">
          <template slot-scope="scope">
            {{scope.row.enableStatus ? '已启用':'未启用'}}
            <el-switch v-model="scope.row.enableStatus"
                       @change="changeStatus(scope.row)"></el-switch>
          </template>
        </PeaceTableColumn>
      </PeaceTable>
    </div>

    <!-- 新建 -->
    <PeaceDialog width="475px"
                 append-to-body
                 v-bind:visible.sync="addMechanismDialog.visible"
                 title="新增凭证">
      <AddMechanismDialog v-if="addMechanismDialog.visible"
                          v-on:onSucess="addItemSuccess"
                          v-on:onCancel="addMechanismDialog.visible = false"></AddMechanismDialog>

    </PeaceDialog>
  </div>
</template>

<script>
import AddMechanismDialog from './components/AddMechanismDialog'
import Service from './service'

export default {
  name: 'CredentialDistribution',

  components: { AddMechanismDialog },
  data() {
    return {
      addMechanismDialog: {
        visible: false
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
      const fetch = Service.getConfigureList
      const params = {}
      const filter = (res) => {
        for (var i = 0; i < res.data.list.length; i++) {
          res.data.list[i].isHide = true
        }
        return res
      }
      this.$refs.table.reloadData({ fetch, params, filter })
    },

    addItem() {
      this.addMechanismDialog.visible = true
    },
    showAndHid(row) {
      row.isHide = !row.isHide
    },

    addItemSuccess() {
      this.addMechanismDialog.visible = false
      this.get()
    },

    changeStatus(row) {
      const params = {
        id: row.id,
        enableStatus: row.enableStatus
      }
      Service.updateStatus(params)
        .then((res) => {
          Peace.util.success(res.msg)
          this.get()
        })
        .catch(() => {
          row.enableStatus = !row.enableStatus
        })
    }
  }
}
</script>

<style scoped>
.status-item {
  display: flex;
  align-items: center;
}
.eyes {
  margin-left: 5px;
}
</style>