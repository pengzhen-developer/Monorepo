<template>
  <div class="layout-route bg-grey-2">
    <div class="card card-search q-mb-md">
      <el-form :model="model"
               label-width="auto"
               label-position="left"
               label-suffix="："
               inline>
        <el-form-item label="用药频次"
                      class="ml-none">
          <el-input placeholder="请输入用药频次"
                    v-model.trim="model.drugtimesName"></el-input>
        </el-form-item>
        <el-form-item label="用药频次编码">
          <el-input placeholder="请输入用药频次编码"
                    v-model.trim="model.code"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select placeholder="全部"
                     v-model="model.status"
                     clearable>
            <el-option v-for="item in source.ENUM_STATUS"
                       v-bind:key="item.value"
                       v-bind:label="item.label"
                       v-bind:value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="search-btn">
          <el-button @click.stop="get"
                     type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="card">
      <div style="margin-bottom: 16px;">
        <el-button @click="addItem"
                   type="primary">+ 新增</el-button>
        <el-button @click="importDialog.visible = true"
                   type="default">批量导入</el-button>
        <el-button @click="download"
                   type="default">模板下载</el-button>
      </div>

      <PeaceTable ref="table"
                  style="width: 100%"
                  pagination
                  :page-size="10"
                  max-height="600">
        <PeaceTableColumn label="用药频次编码"
                          align="left"
                          prop="code"></PeaceTableColumn>
        <PeaceTableColumn label="用药频次"
                          prop="drugtimesName"></PeaceTableColumn>
        <PeaceTableColumn>
          <template slot="header">
            <div class="table-heder-frequency">
              <div class="table-heder-frequency-text">系数</div>
              <img v-popover:popover
                   src="./assets/images/ic_warning.png" />
              <el-popover ref="popover"
                          placement="bottom-start"
                          width="270"
                          trigger="hover"
                          content="系数：指每日平均用药次数。用于开处方时药品数量的计算公式。">
              </el-popover>
            </div>
          </template>
          <template slot-scope="scope">
            {{scope.row.frequencyValue}}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="更新时间"
                          align="left"
                          prop="updatedTime">
        </PeaceTableColumn>
        <PeaceTableColumn label="状态"
                          align="left">
          <template slot-scope="scope">
            {{scope.row.status | getEnumLabel(source.ENUM_STATUS)}}
            <el-switch v-model="scope.row.status"
                       :active-value="1"
                       :inactive-value="2"
                       @change="changeStatus(scope.row)"></el-switch>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="操作"
                          align="left"
                          width="250px"
                          fixed="right">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="changeItem(scope.row)">修改</el-button>
            <!-- <el-button type="text"
                       v-on:click="deleteItem(scope.row)">删除</el-button> -->
          </template>
        </PeaceTableColumn>
      </PeaceTable>
    </div>

    <!-- 导入 -->
    <PeaceDialog width="480px"
                 append-to-body
                 v-bind:visible.sync="importDialog.visible"
                 title="批量导入用药频次">
      <DrugUseImport v-if="importDialog.visible"
                     @close="closeDialog"
                     @refresh="get"></DrugUseImport>
    </PeaceDialog>
    <!-- 新建和修改 -->
    <PeaceDialog width="400px"
                 append-to-body
                 v-if="drugUseAddDialog.visible"
                 v-bind:visible.sync="drugUseAddDialog.visible"
                 :title="drugUseAddDialog.dialogTitle">
      <DrugUseAddDialog :drugtimeData="drugUseAddDialog.drugtimeData"
                        v-on:onCancel="drugUseAddDialog.visible = false"
                        v-on:onSucess="addSuccess"></DrugUseAddDialog>

    </PeaceDialog>
  </div>
</template>
<script>
import Service from './service'
import DrugUseImport from './components/DrugUseImport'
import DrugUseAddDialog from './components/DrugUseAddDialog'
export default {
  name: 'icdManagement',
  data() {
    return {
      model: {
        drugtimesName: '',
        code: '',
        status: ''
      },
      list: [],
      importDialog: {
        visible: false
      },
      drugUseAddDialog: {
        visible: false,
        dialogTitle: '新增用药频次',
        drugtimeData: {}
      },
      source: {
        // 状态
        ENUM_STATUS: [
          { value: 1, label: '启用' },
          { value: 2, label: '停用' }
        ]
      }
    }
  },
  components: { DrugUseImport, DrugUseAddDialog },
  filters: {
    getEnumLabel: function(value, ENUM) {
      return ENUM.find((item) => item.value == value)?.label
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.get()
    })
  },

  methods: {
    get() {
      const fetch = Service.getDrugtimesGetList
      const params = Peace.util.deepClone(this.model)

      this.$refs.table.reloadData({ fetch, params })
    },
    closeDialog() {
      this.importDialog.visible = false
      this.get()
    },
    /* 下载模板 */
    download() {
      this.$confirm('<div style="text-align:center;">下载用药频次数据导入模板？</div>', '文件下载', {
        dangerouslyUseHTMLString: ' true',
        closeOnClickModal: false
      }).then(() => {
        const url = `${process.env.VUE_APP_API_HOSPITAL}/excel/用药频次.xlsx`
        window.open(url, '_blank')
        this.$notify({
          title: '用药频次数据导入模板获取成功！',
          message: `若无法正常下载,请复制链接至其他浏览器重试${url}`,
          duration: 10000
        })
      })
    },
    addItem() {
      this.drugUseAddDialog.dialogTitle = '新增用药频次'
      this.drugUseAddDialog.drugtimeData = null
      this.drugUseAddDialog.visible = true
    },
    changeItem(row) {
      this.drugUseAddDialog.dialogTitle = '修改用药频次'
      this.drugUseAddDialog.drugtimeData = row
      this.drugUseAddDialog.visible = true
    },
    deleteItem(row) {
      this.$confirm('此操作将删除该条用药频次, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnClickModal: false
      })
        .then(() => {
          const params = { id: row.id }
          Service.delDrugtimes(params).then((res) => {
            Peace.util.success(res.msg)
            this.get()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    addSuccess() {
      this.drugUseAddDialog.visible = false
      this.get()
    },
    changeStatus(row) {
      const message = row.status == 1 ? '确定启用？' : '确定停用？'
      this.$confirm(message, '提示', { closeOnClickModal: false })
        .then(() => {
          const params = row
          Service.setStatus(params).then((res) => {
            Peace.util.success(res.msg)
            this.get()
          })
        })
        .catch(() => {
          row.status = row.status == 1 ? 2 : 1
        })
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep.el-form-item {
  &.ml-none {
    .el-form-item__label-wrap {
      margin-left: 0 !important;
    }
  }
}

.table-heder-frequency {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.table-heder-frequency-text {
  margin-right: 4px;
}
</style>
