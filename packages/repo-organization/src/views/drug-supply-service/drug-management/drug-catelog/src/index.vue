<template>
  <div class="layout-route">

    <div class="card card-search q-mb-md">
      <el-form inline=""
               label-width="auto"
               label-position="left">

        <el-form-item>
          <span slot="label">
            <span>药品编号</span>
            <span>：</span>
          </span>
          <el-input v-model.trim=" model.CustDrugsCode"
                    placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item>
          <span slot="label">
            <span>药品名称</span>
            <span>：</span>
          </span>
          <el-input v-model.trim=" model.ProductName"
                    placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item>
          <span slot="label">
            <span>批准文号</span>
            <span>：</span>
          </span>
          <el-input v-model.trim=" model.ApprovalNumber"
                    placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item>
          <span slot="label">
            <span>生产厂家</span>
            <span>：</span>
          </span>
          <el-input v-model.trim=" model.EnterpriseName"
                    placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item>
          <span slot="label">
            <span>创建日期</span>
            <span>：</span>
          </span>
          <peace-date-picker type="daterange"
                             v-model="model.createDate"
                             value-format="yyyy-MM-dd"
                             start-placeholder="开始日期"
                             end-placeholder="结束日期">
          </peace-date-picker>
        </el-form-item>

        <el-form-item>
          <span slot="label">
            <span>更新日期</span>
            <span>：</span>
          </span>
          <peace-date-picker type="daterange"
                             v-model="model.upDateDate"
                             value-format="yyyy-MM-dd"
                             start-placeholder="开始日期"
                             end-placeholder="结束日期">
          </peace-date-picker>
        </el-form-item>

        <el-form-item label="">
          <el-button type="primary"
                     @click="get()">查询</el-button>
        </el-form-item>

      </el-form>
    </div>

    <div class="card">

      <div class="top-menu">
        <el-button type="primary"
                   @click="addDrug">新增</el-button>
        <el-button @click="openImportDialog">批量新增</el-button>
        <el-button @click="openImportDrugCodeDialog">批量修改编码</el-button>
      </div>

      <PeaceTable ref="table"
                  style="width: 100%"
                  pagination>
        <el-table-column prop="CustDrugsCode"
                         min-width="120px"
                         label="药品编码">
        </el-table-column>
        <el-table-column prop="ProductName"
                         min-width="120px"
                         label="药品名称">
        </el-table-column>
        <el-table-column prop="DrugSpecifications"
                         label="药品规格"
                         min-width="120px">
        </el-table-column>
        <el-table-column prop="EnterpriseName"
                         label="生产厂家"
                         min-width="180px">
        </el-table-column>
        <el-table-column label="剂型"
                         min-width="120px">
          <template slot-scope="scope">
            {{ scope.row.DrugDosageForm ? scope.row.DrugDosageForm : "——"  }}
          </template>
        </el-table-column>
        <el-table-column label="包装单位"
                         min-width="120px">
          <template slot-scope="scope">
            {{ scope.row.PackUnit ? scope.row.PackUnit : "——"  }}
          </template>
        </el-table-column>
        <el-table-column label="批准文号"
                         min-width="120px">
          <template slot-scope="scope">
            {{ scope.row.ApprovalNumber ? scope.row.ApprovalNumber : "——"  }}
          </template>
        </el-table-column>

        <el-table-column prop="CreateTime"
                         label="创建时间"
                         min-width="180px">
        </el-table-column>

        <el-table-column label="更新时间"
                         min-width="180px">
          <template slot-scope="scope">
            {{ scope.row.LastModifyTime ? scope.row.LastModifyTime : "——"  }}
          </template>
        </el-table-column>

        <el-table-column fixed="right"
                         label="操作"
                         width="160px">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="openChangeImageDialog(scope.row)">图片维护</el-button>
            <el-button type="text"
                       v-on:click="toDetail(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </PeaceTable>
    </div>

    <!-- 药品详情 -->
    <PeaceDialog v-if="detailDialog.visible"
                 width="380px"
                 :close-on-click-modal="false"
                 :close-on-press-escape="false"
                 v-bind:visible.sync="detailDialog.visible"
                 :title="detailDialog.dialogTitle">
      <DrugDetail :drugInfo="detailDialog.drugInfo"
                  v-on:onSucess="addDrugSuccess"
                  v-on:onCancel="detailDialog.visible = false"></DrugDetail>
    </PeaceDialog>

    <!-- 导入药品 -->
    <PeaceDialog :close-on-click-modal="false"
                 :close-on-press-escape="false"
                 :visible.sync="importDialogVisible"
                 title="批量新增药品"
                 v-if="importDialogVisible"
                 append-to-body
                 width="500px">
      <DrugsImport @success="get()" />
    </PeaceDialog>

    <!-- 导入药品编码 -->
    <PeaceDialog :before-close="close"
                 :close-on-click-modal="false"
                 :close-on-press-escape="false"
                 :visible.sync="importDrugCodeDialogVisible"
                 title="批量修改药品编码"
                 v-if="importDrugCodeDialogVisible"
                 append-to-body
                 width="500px">
      <DrugsCodeImport @close="closeImportDrugCodeDialog"
                       @success="get()" />
    </PeaceDialog>

    <!-- 图片维护 -->
    <PeaceDialog v-if="imageDataDialog.visible"
                 width="644px"
                 :close-on-click-modal="false"
                 :close-on-press-escape="false"
                 v-bind:visible.sync="imageDataDialog.visible"
                 title="图片维护">
      <ImageDataChangeDialog :drugId="imageDataDialog.drugId"
                             v-on:onSucess="changeImageSuccess"
                             v-on:onCancel="imageDataDialog.visible = false"></ImageDataChangeDialog>
    </PeaceDialog>

  </div>
</template>

<script>
import Service from './service'
import DrugDetail from './components/DrugDetail'
import DrugsImport from './components/DrugsImport'
import DrugsCodeImport from './components/DrugsCodeImport'
import ImageDataChangeDialog from './components/ImageDataChangeDialog'

export default {
  name: 'DrugCatelog',
  components: {
    DrugDetail,
    DrugsImport,
    DrugsCodeImport,
    ImageDataChangeDialog
  },
  data() {
    return {
      model: {
        CustDrugsCode: '',
        ProductName: '',
        ApprovalNumber: '',
        EnterpriseName: '',
        Circulate: '',
        MappingStatus: '',
        MappingExamineStatus: '',
        createDate: [],
        upDateDate: [],
        StarCreateDate: '',
        EndCreateDate: '',
        StarUpdateDate: '',
        EndUpdateDate: ''
      },
      tableData: [],
      detailDialog: {
        visible: false,
        dialogTitle: '',
        drugInfo: {}
      },
      importDialogVisible: false,
      imageDataDialog: {
        visible: false,
        drugId: ''
      },
      importDrugCodeDialogVisible: false
    }
  },

  mounted() {
    this.$nextTick().then(() => {
      this.get()
    })
  },

  methods: {
    get() {
      const fetch = Service.GetDrugListPaing
      const params = this.model

      if (this.model.createDate == null) {
        this.model.createDate = ['', '']
      }
      const [startCreate, endCreate] = this.model.createDate
      params.StarCreateDate = startCreate
      params.EndCreateDate = endCreate

      if (this.model.upDateDate == null) {
        this.model.upDateDate = ['', '']
      }
      const [startUpdate, endUpdate] = this.model.upDateDate
      params.StarUpdateDate = startUpdate
      params.EndUpdateDate = endUpdate

      this.$refs.table.reloadData({ fetch, params })
    },

    addDrug() {
      this.detailDialog.dialogTitle = '新增药品'
      this.detailDialog.drugInfo = null
      this.detailDialog.visible = true
    },

    toDetail(data) {
      this.detailDialog.dialogTitle = '修改药品'
      this.detailDialog.drugInfo = data
      this.detailDialog.visible = true
    },

    /* 批量导入药品 */
    // 打开 Dialog
    openImportDialog() {
      this.importDialogVisible = true
    },
    // 关闭 Dialog
    closeImportDialog() {
      this.importDialogVisible = false
    },
    close(done) {
      this.get()
      done()
    },

    addDrugSuccess() {
      this.detailDialog.visible = false
      this.get()
    },

    openChangeImageDialog(data) {
      this.imageDataDialog.drugId = data.ID
      this.imageDataDialog.visible = true
    },
    changeImageSuccess() {
      this.imageDataDialog.visible = false
    },
    openImportDrugCodeDialog() {
      this.importDrugCodeDialogVisible = true
    },
    closeImportDrugCodeDialog() {
      this.importDrugCodeDialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.status-item {
  display: flex;
  align-items: center;
}

.statusColor1 {
  width: 6px;
  height: 6px;
  border-radius: 8px;
  margin-right: 8px;
  background: #faad14;
}
.statusColor2 {
  width: 6px;
  width: 6px;
  margin-right: 8px;
  height: 6px;
  border-radius: 8px;
  background: #dddddd;
}
.statusColor3 {
  width: 6px;
  margin-right: 8px;
  height: 6px;
  border-radius: 8px;
  background: var(--q-color-primary);
}

.text-justify {
  text-align: justify;
  text-align-last: justify;
}

.em-4 {
  width: 4em;
}

.top-menu {
  margin-bottom: 20px;
}
</style>