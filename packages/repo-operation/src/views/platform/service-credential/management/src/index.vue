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
        <el-table-column label="凭证来源"
                         prop="hospitalName"></el-table-column>
        <el-table-column label="凭证详情"
                         prop="role"></el-table-column>
        <el-table-column label="创建时间"
                         prop="source"></el-table-column>

        <el-table-column fixed="right"
                         width="150px"
                         label="操作">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="toDetail(scope.row)">修改</el-button>
            <el-button type="text"
                       v-on:click="toService(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </PeaceTable>
    </div>

    <!-- 新建 -->
    <PeaceDialog width="475px"
                 append-to-body
                 v-bind:visible.sync="addCredentialDialog.visible"
                 title="新增">
      <AddCredentialDialog v-if="addCredentialDialog.visible"
                           v-on:onCancel="addCredentialDialog.visible = false"></AddCredentialDialog>
      <!-- v-on:onSucess="addDrugSuccess"  -->

    </PeaceDialog>
  </div>
</template>

<script>
import AddCredentialDialog from './components/AddCredentialDialog'

export default {
  name: 'management',

  components: { AddCredentialDialog },

  data() {
    return {
      addCredentialDialog: {
        visible: false
      }
    }
  },

  methods: {
    addItem() {
      this.addCredentialDialog.visible = true
    }
  }
}
</script>

<style>
</style>