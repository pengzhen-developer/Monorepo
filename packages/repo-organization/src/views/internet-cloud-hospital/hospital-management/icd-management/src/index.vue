<template>
  <div class="layout-route bg-grey-2">
    <div class="card card-search q-mb-md">
      <el-form inline=""
               label-width="auto"
               label-suffix="："
               label-position="left">
        <el-form-item label="ICD名称">
          <el-input placeholder="请输入"
                    v-model="model.name"></el-input>
        </el-form-item>
        <el-form-item label="ICD编码">
          <el-input placeholder="请输入"
                    v-model="model.code"></el-input>
        </el-form-item>

        <el-form-item>
          <span slot="label">
            <span>状态</span>
            <span>：</span>
          </span>
          <el-select v-model="model.status"
                     clearable
                     placeholder="请选择">
            <el-option :key="item.label"
                       :label="item.label"
                       :value="item.value"
                       v-for="item in source.ENUM_ICD_STATUS"></el-option>
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
        <el-button @click="importDialog.visible = true"
                   type="primary">批量导入</el-button>
        <el-button @click="download"
                   type="default">模板下载</el-button>
        <el-button @click="downloadDiagnosis"
                   type="default">下载平台诊断库</el-button>
        <el-button @click="batchEdit"
                   type="default">批量编辑</el-button>
      </div>

      <PeaceTable ref="table"
                  style="width: 100%"
                  pagination
                  :page-size="10"
                  @selection-change="handleSelectionChange"
                  max-height="600">
        <el-table-column type="selection"
                         width="55">
        </el-table-column>
        <PeaceTableColumn label="ICD编码"
                          prop="code"></PeaceTableColumn>
        <PeaceTableColumn label="ICD名称"
                          prop="name"></PeaceTableColumn>
        <PeaceTableColumn label="更新时间"
                          prop="createdTime">
        </PeaceTableColumn>
        <PeaceTableColumn label="状态"
                          prop="statusText">
        </PeaceTableColumn>
      </PeaceTable>
    </div>
    <!-- 导入 -->
    <PeaceDialog width="480px"
                 append-to-body
                 v-bind:visible.sync="importDialog.visible"
                 title="批量导入ICD">
      <IcdImport v-if="importDialog.visible"
                 @close="closeDialog"
                 @refresh="get"></IcdImport>
    </PeaceDialog>

    <!-- 批量编辑 -->
    <PeaceDialog :visible.sync="batchDialogVisible"
                 v-if="batchDialogVisible"
                 width="376px">
      <div class="el-dialog__title"
           slot="title">
        <span>批量编辑</span>
        <span style="font-size: 14px;color: #858585;">（已选中{{multipleSelection.length}}数据）</span>
      </div>
      <IcdBatchEdit :selection="multipleSelection"
                    @success="editSuccess"
                    @close="closeBatchDialog"></IcdBatchEdit>
    </PeaceDialog>
  </div>
</template>
<script>
import Service from './service'
import IcdImport from './components/IcdImport'
import IcdBatchEdit from './components/IcdBatchEdit'
import CONSTANT from './constant'

export default {
  name: 'IcdManagement',
  data() {
    return {
      source: {
        ENUM_ICD_STATUS: CONSTANT.ENUM_ICD_STATUS
      },
      model: {
        name: '',
        code: '',
        status: ''
      },
      list: [],
      importDialog: {
        visible: false
      },

      batchDialogVisible: false,
      multipleSelection: []
    }
  },
  components: { IcdImport, IcdBatchEdit },
  mounted() {
    this.$nextTick(() => {
      this.get()
    })
  },

  methods: {
    get() {
      const fetch = Service.getDiagnoseList
      const params = Peace.util.deepClone(this.model)

      this.$refs.table.reloadData({ fetch, params })
    },
    closeDialog() {
      this.importDialog.visible = false
      this.get()
    },
    /* 下载模板 */
    download() {
      this.$confirm('下载 <strong>ICD数据导入模板<strong> ？', '文件下载', {
        dangerouslyUseHTMLString: ' true',
        type: 'info',
        closeOnClickModal: false
      }).then(() => {
        const url = `${process.env.VUE_APP_API_HOSPITAL}excel/ICD10诊断库.xls`
        window.open(url, '_blank')
        this.$alert('', 'ICD数据导入模板获取成功！', {
          message: <div class="alert-text">若无法正常下载,请复制链接至其他浏览器重试{url}</div>
        })
      })
    },
    // 下载平台诊断库
    downloadDiagnosis() {
      this.$confirm('下载 <strong>平台诊断库<strong> ？', '文件下载', {
        dangerouslyUseHTMLString: ' true',
        type: 'info',
        closeOnClickModal: false
      }).then(() => {
        const url = `${process.env.VUE_APP_API_BASE}nethospital/hospital/v1/data/exportDiagnose`
        window.open(url, '_blank')
        this.$alert('', '下载平台诊断库获取成功！', {
          message: <div class="alert-text">若无法正常下载,请复制链接至其他浏览器重试{url}</div>
        })
      })
    },

    // 批量编辑
    batchEdit() {
      if (this.multipleSelection.length > 0) {
        this.batchDialogVisible = true
      } else {
        Peace.util.warning('请选择ICD分类数据')
      }
    },
    closeBatchDialog() {
      this.batchDialogVisible = false
    },
    editSuccess() {
      this.batchDialogVisible = false
      this.get()
    },
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val
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

.alert-text {
  word-break: break-all;
}
</style>
