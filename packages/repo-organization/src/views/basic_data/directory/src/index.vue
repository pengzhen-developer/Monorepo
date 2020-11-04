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
          <el-input v-model=" model.CustDrugsCode"
                    placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item>
          <span slot="label">
            <span>药品名称</span>
            <span>：</span>
          </span>
          <el-input v-model=" model.ProductName"
                    placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item>
          <span slot="label">
            <span>批准文号</span>
            <span>：</span>
          </span>
          <el-input v-model=" model.ApprovalNumber"
                    placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item>
          <span slot="label">
            <span>生产厂家</span>
            <span>：</span>
          </span>
          <el-input v-model=" model.EnterpriseName"
                    placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item prop="source">
          <span slot="label">
            <span>配码状态</span>
            <span>：</span>
          </span>
          <el-select v-model="model.MappingStatus"
                     clearable
                     placeholder="请选择">
            <el-option :key="item.label"
                       :label="item.label"
                       :value="item.value"
                       v-for="item in source.ENUM_MATCH_CODE"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item prop="source">
          <span slot="label">
            <span>审核状态</span>
            <span>：</span>
          </span>
          <el-select v-model="model.MappingExamineStatus"
                     clearable
                     placeholder="请选择">
            <el-option :key="item.label"
                       :label="item.label"
                       :value="item.value"
                       v-for="item in source.ENUM_REVIEW_STATUS"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label=" ">
          <el-button type="primary"
                     @click="get()">查询</el-button>
        </el-form-item>

      </el-form>
    </div>

    <div class="card">

      <div class="top-menu">
        <el-button type="primary"
                   @click="addDrug()">新增</el-button>
        <el-button type="primary"
                   @click="openImportDialog">批量新增</el-button>

      </div>

      <PeaceTable ref="table"
                  style="width: 100%"
                  stripe
                  pagination
                  max-height="600">
        <el-table-column prop="CustDrugsCode"
                         width="120px"
                         label="药品编码">
        </el-table-column>
        <el-table-column prop="ProductName"
                         label="药品名称">
        </el-table-column>
        <el-table-column prop="DrugSpecifications"
                         label="药品规格">
        </el-table-column>
        <el-table-column prop="PackUnit"
                         width="100px"
                         label="包装单位">
        </el-table-column>
        <el-table-column prop="EnterpriseName"
                         label="生产厂家">
        </el-table-column>
        <el-table-column prop="ApprovalNumber"
                         label="批准文号">
        </el-table-column>

        <el-table-column prop="CreateTime"
                         label="创建时间">
        </el-table-column>

        <el-table-column label="配码状态"
                         width="100px">
          <template slot-scope="scope">
            <span>
              {{ getMappingStatus(scope.row.MappingStatus) }}
            </span>
          </template>
        </el-table-column>

        <el-table-column label="审核状态"
                         align="center"
                         width="100px">
          <template slot-scope="scope">
            <span>
              {{ getMappingExamineStatus(scope.row.MappingExamineStatus) }}
            </span>
          </template>
        </el-table-column>

        <el-table-column align="center"
                         fixed="right"
                         label="操作">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="toDetail(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </PeaceTable>
    </div>

    <PeaceDialog v-if="detailDialog.visible"
                 width="644px"
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

  </div>
</template>

<script>
import CONSTANT from './constant'
import Service from './service'
import DrugDetail from './components/DrugDetail'
import DrugsImport from './components/DrugsImport'

export default {
  components: {
    DrugDetail,
    DrugsImport
  },
  data() {
    return {
      source: {
        ENUM_MATCH_CODE: CONSTANT.ENUM_MATCH_CODE,
        ENUM_REVIEW_STATUS: CONSTANT.ENUM_REVIEW_STATUS
      },
      model: {
        CustDrugsCode: '',
        ProductName: '',
        ApprovalNumber: '',
        EnterpriseName: '',
        MappingStatus: '',
        MappingExamineStatus: ''
      },
      tableData: [],
      detailDialog: {
        visible: false,
        dialogTitle: '',
        drugInfo: {}
      },
      importDialogVisible: false
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
      const params = Peace.util.deepClone(this.model)
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
    getMappingStatus(code) {
      return this.source.ENUM_MATCH_CODE.find((item) => item.value == code).label
    },

    getMappingExamineStatus(code) {
      return this.source.ENUM_REVIEW_STATUS.find((item) => item.value == code).label
    },

    addDrugSuccess() {
      this.detailDialog.visible = false
      this.get()
    }
  }
}
</script>

<style scoped>
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