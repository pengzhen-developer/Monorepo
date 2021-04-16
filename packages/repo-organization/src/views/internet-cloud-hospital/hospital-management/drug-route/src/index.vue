<template>
  <div class="layout-route bg-grey-2">
    <div class="card card-search q-mb-md">
      <el-form inline=""
               label-width="auto"
               label-suffix="："
               label-position="left">
        <el-form-item label="给药途径">
          <el-input placeholder="请输入给药途径"
                    v-model.trim="model.drugwayName"></el-input>
        </el-form-item>
        <el-form-item label="给药途径编码">
          <el-input placeholder="请输入给药途径编码"
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
        <PeaceTableColumn label="给药途径编码"
                          prop="code"></PeaceTableColumn>
        <PeaceTableColumn label="给药途径"
                          prop="drugwayName"></PeaceTableColumn>
        <PeaceTableColumn label="更新时间"
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
                          width="270px"
                          fixed="right">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="changeItem(scope.row)"
                       class="no-padding">修改</el-button>
            <!-- <el-button type="text"
                       v-on:click="deleteItem(scope.row)"
                       class="no-padding">删除</el-button> -->
          </template>
        </PeaceTableColumn>
      </PeaceTable>
    </div>
    <!-- 导入 -->
    <PeaceDialog width="480px"
                 append-to-body
                 v-if="importDialog.visible"
                 v-bind:visible.sync="importDialog.visible"
                 title="批量导入给药途径">
      <RouteImport @close="closeDialog"
                   @refresh="get"></RouteImport>
    </PeaceDialog>

    <!-- 新建和修改 -->
    <PeaceDialog width="400px"
                 v-if="routeAddDialog.visible"
                 append-to-body
                 v-bind:visible.sync="routeAddDialog.visible"
                 :title="routeAddDialog.dialogTitle">
      <RouteAddDialog :drugwayData="routeAddDialog.drugwayData"
                      v-on:onCancel="routeAddDialog.visible = false"
                      v-on:onSucess="addSuccess"></RouteAddDialog>

    </PeaceDialog>

  </div>
</template>
<script>
import RouteImport from './components/RouteImport'
import RouteAddDialog from './components/RouteAddDialog'
import Service from './service'

export default {
  name: 'DrugRoute',
  data() {
    return {
      model: {
        drugwayName: '',
        code: '',
        status
      },
      list: [],
      importDialog: {
        visible: false
      },
      routeAddDialog: {
        visible: false,
        dialogTitle: '新增给药途径',
        drugwayData: {}
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
  components: { RouteImport, RouteAddDialog },
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
      const fetch = Service.getDrugwayGetList
      const params = Peace.util.deepClone(this.model)
      this.$refs.table.reloadData({ fetch, params })
    },
    closeDialog() {
      this.importDialog.visible = false
      this.get()
    },
    /* 下载模板 */
    download() {
      this.$confirm('<div style="text-align:center;">下载给药途径数据导入模板？</div>', '文件下载', {
        dangerouslyUseHTMLString: ' true',
        closeOnClickModal: false
      }).then(() => {
        const url = `${process.env.VUE_APP_API_BASE}nethospital/excel/给药途径.xlsx`
        window.open(url, '_blank')
        this.$notify({
          title: '给药途径数据导入模板获取成功！',
          message: `若无法正常下载,请复制链接至其他浏览器重试${url}`,
          duration: 10000
        })
      })
    },
    addItem() {
      this.routeAddDialog.dialogTitle = '新增给药途径'
      this.routeAddDialog.drugwayData = null
      this.routeAddDialog.visible = true
    },
    changeItem(row) {
      this.routeAddDialog.dialogTitle = '修改给药途径'
      this.routeAddDialog.drugwayData = row
      this.routeAddDialog.visible = true
    },
    deleteItem(row) {
      this.$confirm('此操作将删除该条给药途径, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnClickModal: false
      })
        .then(() => {
          const params = { id: row.id }
          Service.delDrugway(params).then((res) => {
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
      this.routeAddDialog.visible = false
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
::v-deep.el-form-item.el-form-item--mini {
  .el-form-item__label-wrap {
    margin-left: 0 !important;
  }
}
</style>
