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
        <el-table-column type="index"
                         width="100px"
                         label="序号"
                         align="center"></el-table-column>
        <el-table-column label="主体名称"
                         prop="hospitalName"></el-table-column>
        <el-table-column label="主体属性"
                         prop="role"></el-table-column>
        <el-table-column label="Accesskey  ID"
                         prop="source"></el-table-column>
        <el-table-column label="AccessKey Secret "
                         prop="role"></el-table-column>
        <el-table-column label="创建时间"
                         prop="role"></el-table-column>

        <el-table-column fixed="right"
                         width="150px"
                         label="使用状态">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="toDetail(scope.row)">基本信息</el-button>
            <el-button type="text"
                       v-on:click="toService(scope.row)">服务管理</el-button>
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
                          v-on:onCancel="addMechanismDialog.visible = false"></AddMechanismDialog>
      <!-- v-on:onSucess="addDrugSuccess"  -->

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
      this.$refs.table.reloadData({ fetch, params }).then((res) => {
        return res
      })
    },

    addItem() {
      this.addMechanismDialog.visible = true
    }
  }
}
</script>

<style>
</style>