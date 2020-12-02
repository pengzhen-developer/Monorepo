<template>
  <div class="layout-route">
    <div class="card">
      <div class="q-mb-lg">
        <el-button type="primary"
                   style="width: 80px;"
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
        <el-table-column label="主体名称"
                         prop="name"></el-table-column>
        <el-table-column label="主体属性"
                         prop="attributeName"></el-table-column>
        <el-table-column label="Accesskey  ID"
                         prop="accessId"></el-table-column>
        <el-table-column label="AccessKey Secret">

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

        </el-table-column>
        <el-table-column label="创建时间"
                         prop="createTime"></el-table-column>

        <el-table-column fixed="right"
                         width="150px"
                         label="使用状态">
          <template slot-scope="scope">
            {{scope.row.enableStatus ? '已启用':'未启用'}}
            <el-switch v-model="scope.row.enableStatus"
                       @change="changeStatus(scope.row)"></el-switch>
          </template>
        </el-table-column>
      </PeaceTable>
    </div>

    <!-- 新建 -->
    <PeaceDialog width="475px"
                 append-to-body
                 v-bind:visible.sync="addMechanismDialog.visible"
                 title="新增">
      <AddMechanismDialog v-if="addMechanismDialog.visible"
                          :typeData="addMechanismDialog.typeData"
                          v-on:onSucess="addItemSuccess"
                          v-on:onCancel="addMechanismDialog.visible = false"></AddMechanismDialog>

    </PeaceDialog>
  </div>
</template>

<script>
import AddMechanismDialog from './components/AddMechanismDialog'
import Service from './service'

export default {
  name: 'distribution',

  components: { AddMechanismDialog },
  data() {
    return {
      addMechanismDialog: {
        visible: false,
        typeData: []
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

    async addItem() {
      this.addMechanismDialog.typeData = await Peace.identity.dictionary.getList('sysattribute')
      if (this.addMechanismDialog.typeData.length == 0) {
        Peace.util.error('缺少主体属性类型列表')
      } else {
        this.addMechanismDialog.visible = true
      }
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