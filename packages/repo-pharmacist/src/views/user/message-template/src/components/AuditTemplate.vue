<template>
  <div>
    <div class="q-mb-lg">
      <el-button type="primary"
                 icon="el-icon-plus"
                 v-on:click="add">新增</el-button>
    </div>
    <PeaceTable ref="table"
                size="mini"
                pagination>
      <el-table-column label="序号"
                       type="index"
                       align="center"
                       width="80px">
      </el-table-column>
      <el-table-column min-width="100px"
                       label="模板内容"
                       prop="linkman"></el-table-column>
      <el-table-column min-width="80px"
                       align="center"
                       fixed="right"
                       label="操作">
        <template>
          <el-button type="text">删除</el-button>
          <el-button type="text">修改</el-button>

        </template>
      </el-table-column>
    </PeaceTable>

    <PeaceDialog width="480px"
                 v-bind:visible.sync="dialog.visible"
                 :title="dialog.title">
      <AddAuditTemplate v-if="dialog.visible"
                        v-on:close="dialog.visible = false"></AddAuditTemplate>
    </PeaceDialog>

  </div>
</template>

<script>
import AddAuditTemplate from './AddAuditTemplate'
export default {
  components: {
    AddAuditTemplate
  },
  data() {
    return {
      dialog: {
        title: '新增',
        visible: false
      }
    }
  },
  methods: {
    add() {
      this.dialog.visible = true
    }
  }
}
</script>

<style>
</style>