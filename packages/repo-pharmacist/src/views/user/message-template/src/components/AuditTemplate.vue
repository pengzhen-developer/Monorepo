<template>
  <div>
    <div class="q-mb-lg">
      <el-button type="primary"
                 icon="el-icon-plus"
                 v-on:click="add">新增</el-button>
    </div>
    <PeaceTable ref="table"
                size="mini"
                :tableProps="{
                    pageIndex: 'pageNumber',
                    pageSize: 'pageSize'
                  }"
                pagination>
      <el-table-column label="
                序号"
                       type="index"
                       align="center"
                       width="80px">
      </el-table-column>
      <el-table-column min-width="180px"
                       label="模板内容"
                       prop="templateContent"></el-table-column>
      <el-table-column width="120px"
                       align="center"
                       fixed="right"
                       label="操作">
        <template slot-scope="scope">
          <el-button type="text"
                     v-on:click="deleted(scope.row)">删除</el-button>
          <el-button type="text"
                     v-on:click="edit(scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </PeaceTable>

    <PeaceDialog width="480px"
                 v-bind:visible.sync="dialog.visible"
                 :title="dialog.title">
      <AddAuditTemplate v-if="dialog.visible"
                        v-on:refresh="fetch"
                        v-on:close="dialog.visible = false"></AddAuditTemplate>
    </PeaceDialog>

    <PeaceDialog width="480px"
                 v-bind:visible.sync="editDialog.visible"
                 :title="editDialog.title">
      <AddAuditTemplate v-if="editDialog.visible"
                        v-bind:data="editDialog.data"
                        v-on:refresh="fetch"
                        v-on:close="editDialog.visible = false"></AddAuditTemplate>
    </PeaceDialog>

  </div>
</template>

<script>
import Service from '../service/index'
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
      },
      editDialog: {
        title: '编辑',
        visible: false,
        data: {}
      },
      organCode: ''
    }
  },

  async mounted() {
    const userinfo = await Peace.identity.auth.getAccountInfo()
    this.organCode = userinfo.organCode
    this.fetch()
  },

  methods: {
    add() {
      this.dialog.visible = true
    },
    deleted(row) {
      this.$confirm('确定删除模板？', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消'
      }).then(() => {
        const params = {
          templatesId: row.id,
          organCode: this.organCode
        }

        Service.delAuditingTemplates(params).then(() => {
          Peace.util.success('删除成功')
          this.fetch()
        })
      })
    },
    edit(row) {
      this.editDialog.data = Peace.util.deepClone(row)
      this.editDialog.visible = true
    },
    fetch() {
      const params = {
        organCode: this.organCode
      }
      const fetch = Service.getAuditingTemplatesList
      const filter = (res) => {
        res.data.total = res.data.pager.recordCount
        return res
      }
      this.$refs.table.reloadData({ fetch, params, filter }).then((res) => {
        return res
      })
    }
  }
}
</script>

<style>
</style>