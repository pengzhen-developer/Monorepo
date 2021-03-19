<template>
  <div class="layout-route bg-grey-2">
    <div class="card card-search q-mb-md">
      <el-form inline=""
               label-width="auto"
               label-suffix="："
               label-position="left">
        <el-form-item label="ICD名称">
          <el-input placeholder="请输入ICD名称"
                    v-model="model.name"></el-input>
        </el-form-item>
        <el-form-item label="ICD编码">
          <el-input placeholder="请输入ICD编码"
                    v-model="model.code"></el-input>
        </el-form-item>
        <el-form-item label="是否常见诊断">
          <el-select v-model="model.isCommon"
                     clearable
                     placeholder="全部">
            <el-option label="是"
                       :value="1"></el-option>
            <el-option label="否"
                       :value="100"></el-option>
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
      </div>

      <PeaceTable ref="table"
                  style="width: 100%"
                  pagination
                  :page-size="10"
                  max-height="600">
        <PeaceTableColumn label="ICD编码"
                          prop="code"></PeaceTableColumn>
        <PeaceTableColumn label="ICD名称"
                          prop="name"></PeaceTableColumn>
        <PeaceTableColumn label="是否常见诊断"
                          prop="isCommon">
          <template slot-scope="scope">
            {{scope.row.isCommon == 1 ? '是':'否'}}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="更新时间"
                          prop="createdTime">
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

  </div>
</template>
<script>
import Service from './service'
import IcdImport from './components/IcdImport'
export default {
  name: 'IcdManagement',
  data() {
    return {
      model: {
        name: '',
        code: '',
        isCommon: ''
      },
      list: [],
      importDialog: {
        visible: false
      }
    }
  },
  components: { IcdImport },
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
      this.$confirm('<div style="text-align:center;">下载ICD数据导入模板？</div>', '文件下载', {
        dangerouslyUseHTMLString: ' true',
        closeOnClickModal: false
      }).then(() => {
        const url = `${process.env.VUE_APP_API_HOSPITAL}/excel/ICD10诊断库.xls`
        window.open(url, '_blank')
        this.$notify({
          title: 'ICD数据导入模板获取成功！',
          message: `若无法正常下载,请复制链接至其他浏览器重试${url}`,
          duration: 10000
        })
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
