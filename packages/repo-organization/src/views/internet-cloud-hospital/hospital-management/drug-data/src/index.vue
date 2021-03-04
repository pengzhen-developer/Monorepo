<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <el-form inline=""
               label-width="auto"
               label-position="left">

        <el-form-item>
          <span slot="label">
            <span>药品数据</span>
            <span>：</span>
          </span>
          <el-input v-model="model.drugname"
                    placeholder="请输入药品名称、编码等"></el-input>
        </el-form-item>

        <el-form-item>
          <span slot="label">
            <span>药品来源</span>
            <span>：</span>
          </span>
          <el-select v-model="model.source"
                     clearable
                     placeholder="请选择">
            <el-option :key="item.label"
                       :label="item.label"
                       :value="item.value"
                       v-for="item in source.ENUM_DRUG_SOURCE"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <span slot="label">
            <span>使用状态</span>
            <span>：</span>
          </span>
          <el-select v-model="model.status"
                     clearable
                     placeholder="请选择">
            <el-option :key="item.label"
                       :label="item.label"
                       :value="item.value"
                       v-for="item in source.ENUM_DRUG_STATUS"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <span slot="label">
            <span>医保目录</span>
            <span>：</span>
          </span>
          <el-select v-model="model.is_medical"
                     clearable
                     placeholder="请选择">
            <el-option :key="item.label"
                       :label="item.label"
                       :value="item.value"
                       v-for="item in source.ENUM_MEDICAL_STATUS"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <span slot="label">
            <span>储存条件</span>
            <span>：</span>
          </span>
          <el-select v-model="model.drug_storage"
                     clearable
                     placeholder="请选择">
            <el-option :key="item.label"
                       :label="item.label"
                       :value="item.value"
                       v-for="item in source.ENUM_DRUG_STORAGE"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="">
          <el-button type="primary"
                     @click="getList()">查询</el-button>
        </el-form-item>

      </el-form>
    </div>

    <div class="card">

      <div class="top-menu">
        <el-button @click="openAddDialog({},'create')"
                   type="primary"
                   icon="el-icon-plus">新 增</el-button>
        <el-button @click="openImportDialog"
                   type="default">批量导入</el-button>
        <el-button @click="download"
                   type="default">模板下载</el-button>

      </div>

      <PeaceTable ref="table"
                  style="width: 100%"
                  pagination>
        <PeaceTableColumn label="药品编号"
                          width="150"
                          prop="drug_number"></PeaceTableColumn>
        <PeaceTableColumn label="药品通用名称"
                          min-width="160"
                          prop="drug_name"></PeaceTableColumn>
        <PeaceTableColumn label="药品规格"
                          min-width="160"
                          prop="drug_spec"></PeaceTableColumn>
        <PeaceTableColumn label="药品厂家"
                          min-width="180"
                          prop="drug_factory"></PeaceTableColumn>
        <PeaceTableColumn label="剂型"
                          min-width="100"
                          prop="drug_form"></PeaceTableColumn>
        <PeaceTableColumn label="药品单价（元）"
                          width="125"
                          prop="drug_unitPrice">
          <template slot-scope="scope">
            <div> {{scope.row.drug_unitPrice || '--'}} </div>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="批准文号"
                          min-width="180"
                          prop="license_number"></PeaceTableColumn>
        <PeaceTableColumn label="使用状态"
                          width="110"
                          prop="status">
          <template slot-scope="scope">
            <div class="oprate">
              <span>{{scope.row.status | getEnumLabel(source.ENUM_DRUG_STATUS)}}</span>
              <el-switch v-model="scope.row.status"
                         :active-value='1'
                         :inactive-value='2'
                         @change="updateDrugItemStatus(scope.row)"></el-switch>
            </div>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="更新时间"
                          min-width="160"
                          prop="updated_time"></PeaceTableColumn>
        <PeaceTableColumn fixed="right"
                          header-align="center"
                          align="center"
                          label="操作"
                          width="150">
          <template slot-scope="scope">
            <div class="oprate">
              <el-button @click="getInfo(scope.row)"
                         type="text">查看详情</el-button>
              <el-button @click="openAddDialog(scope.row,'update')"
                         type="text">修改</el-button>
            </div>
          </template>
        </PeaceTableColumn>
      </PeaceTable>
    </div>

    <!-- 药品详情 -->
    <PeaceDialog :visible.sync="dialogVisible"
                 append-to-body
                 title="药品详情"
                 v-if="dialogVisible"
                 width="750px">
      <drug-info :drug="currentDrug"></drug-info>
    </PeaceDialog>
    <!-- 新增药品 -->
    <PeaceDialog :close-on-click-modal="false"
                 :close-on-press-escape="false"
                 :visible.sync="addDialogVisible"
                 title="药品"
                 v-if="addDialogVisible"
                 append-to-body
                 width="720px">
      <div class="el-dialog__title"
           slot="title">
        <span>{{currentDrug.drugType=='update'? '修改药品':'添加药品'}}</span>
        <span>（药品信息需与药品说明书一致）</span>
      </div>
      <DrugModel :drugInfo="currentDrug"
                 @close="closeAddDialog"
                 @success="getList(1)"
                 @error="showErrorDialog" />
    </PeaceDialog>
    <!-- 导入药品 -->
    <PeaceDialog :before-close="close"
                 :close-on-click-modal="false"
                 :close-on-press-escape="false"
                 :visible.sync="importDialogVisible"
                 title="批量导入药品"
                 v-if="importDialogVisible"
                 append-to-body
                 width="500px">
      <DrugImport :id="id"
                  @close="closeImportDialog" />
    </PeaceDialog>

  </div>
</template>

<script>
import CONSTANT from './constant'
import Service from './service'
import DrugImport from './components/DrugImport'
import DrugModel from './components/DrugModel'
import DrugInfo from './components/DrugInfo'

export default {
  name: 'DrugData',
  components: { DrugImport, DrugModel, DrugInfo },
  data() {
    return {
      source: {
        ENUM_DRUG_SOURCE: CONSTANT.ENUM_DRUG_SOURCE,
        ENUM_DRUG_STATUS: CONSTANT.ENUM_DRUG_STATUS,
        ENUM_MEDICAL_STATUS: CONSTANT.ENUM_MEDICAL_STATUS,
        ENUM_DRUG_STORAGE: CONSTANT.ENUM_DRUG_STORAGE
      },
      model: {
        drugname: '',
        source: '',
        status: '',
        is_medical: '',
        drug_storage: ''
      },

      currentDrug: {},
      dialogVisible: false,
      addDialogVisible: false,
      importDialogVisible: false
    }
  },
  filters: {
    getEnumLabel: function(value, ENUM) {
      return ENUM.find((item) => item.value == value)?.label
    }
  },
  mounted() {
    this.$nextTick().then(() => {
      this.getList()
    })
  },
  methods: {
    getList() {
      const fetch = Service.getDrugList
      const params = Peace.util.deepClone(this.model)
      this.$refs.table.reloadData({ fetch, params })
    },
    getInfo(drug) {
      this.dialogVisible = true
      this.currentDrug = drug
    },
    //修改药品状态
    updateDrugItemStatus(drug) {
      if (drug.status == 2) {
        this.$confirm('确认要停用该药品吗？', '提示', { closeOnClickModal: false })
          .then(() => {
            this.updateDrugStatus(drug)
          })
          .catch(() => {
            this.getList()
          })
      } else {
        this.updateDrugStatus(drug)
      }
    },
    updateDrugStatus(drug) {
      const params = {
        drugId: drug.id,
        status: drug.status
      }
      Service.updateDrugStatus(params)
        .then((res) => {
          Peace.util.success(res.msg || '保存成功')
        })
        .finally(() => {
          this.getList()
        })
    },
    // 打开 Dialog
    openAddDialog(data, type) {
      this.addDialogVisible = true
      this.currentDrug = data
      this.currentDrug.drugType = type
    },
    // 关闭 Dialog
    closeAddDialog() {
      this.addDialogVisible = false
    },

    showErrorDialog(e) {
      const message = (
        <div>
          <div class="error-info">
            <div>院内目录的药品价格需与院内药房价格一致</div>
            <div>
              该药品的价格为：<span style="color: #FF344D;">{e.data.drugUnitPrice}元</span>
            </div>
          </div>
        </div>
      )

      this.$alert(message, '', {
        dangerouslyUseHTMLString: true,
        showClose: false,
        showCancelButton: false,
        confirmButtonText: '知道了',
        center: true
      })
    },

    /* 批量导入药品 */
    // 打开 Dialog
    openImportDialog() {
      this.importDialogVisible = true
    },
    // 关闭 Dialog
    closeImportDialog() {
      this.importDialogVisible = false
      this.getList()
    },
    close(done) {
      this.getList()
      done()
    },
    /* 下载导入模板 */
    download() {
      this.$confirm('下载 <strong>药品批量导入模板<strong> ？', '文件下载', {
        dangerouslyUseHTMLString: true,
        type: 'info',
        closeOnClickModal: false
      }).then(() => {
        const url = `${process.env.VUE_APP_API_HOSPITAL}excel/drug.xls`
        window.open(url, '_blank')
        this.$notify({
          title: '药品批量导入模板获取成功！',
          message: `若无法正常下载,请复制链接至其他浏览器重试${url}`,
          duration: 10000
        })
      })
    }
  }
}
</script>

<style scoped>
.top-menu {
  margin-bottom: 20px;
}
.error-info {
  width: 300px;
  padding-bottom: 40px;
  margin: 0 auto;
  font-size: 14px;
  color: #333;
  line-height: 32px;
  text-align: left;
}
</style>