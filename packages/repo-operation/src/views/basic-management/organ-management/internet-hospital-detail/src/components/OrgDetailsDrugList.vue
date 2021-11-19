<template>
  <div class="layout-route">

    <div>
      <el-form v-bind:model="model"
               inline="inline"
               label-width="auto"
               label-suffix="："
               size="mini">

        <el-form-item label="药品数据">
          <el-input placeholder="请输入药品名称、编码等搜索"
                    v-model="model.drug_id"></el-input>
        </el-form-item>

        <el-form-item label="药品来源"
                      prop="source">
          <el-select v-model="model.source"
                     clearable
                     placeholder="请选择">
            <el-option :key="item.label"
                       :label="item.label"
                       :value="item.value"
                       v-for="item in drugSource"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="使用状态"
                      prop="status">
          <el-select v-model="model.status"
                     clearable
                     placeholder="请选择">
            <el-option :key="item.label"
                       :label="item.label"
                       :value="item.value"
                       v-for="item in drugStatus"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="医保目录"
                      prop="source">
          <el-select v-model="model.is_medical"
                     clearable
                     placeholder="请选择">
            <el-option :key="item.label"
                       :label="item.label"
                       :value="item.value"
                       v-for="item in medicalStatus"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary"
                     v-on:click="getList">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div>

      <PeaceTable ref="table"
                  size="mini"
                  pagination>
        <PeaceTableColumn label="药品编号"
                          min-width="180"
                          prop="drug_number">
        </PeaceTableColumn>
        <PeaceTableColumn label="药品通用名称"
                          min-width="140"
                          prop="drug_name">
        </PeaceTableColumn>
        <PeaceTableColumn label="药品规格"
                          min-width="140"
                          prop="drug_spec">
        </PeaceTableColumn>
        <PeaceTableColumn label="药品厂家"
                          min-width="160"
                          prop="drug_factory">
        </PeaceTableColumn>
        <PeaceTableColumn label="剂型"
                          min-width="120"
                          prop="drug_form">
        </PeaceTableColumn>
        <PeaceTableColumn label="药品单价（元）"
                          min-width="140"
                          prop="drug_unitPrice">
          <template slot-scope="scope">
            <div> {{scope.row.drug_unitPrice || '--'}} </div>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="批准文号"
                          min-width="160"
                          prop="license_number">
        </PeaceTableColumn>
        <PeaceTableColumn label="使用状态"
                          min-width="110"
                          prop="status">
          <template slot-scope="scope">
            <div>
              <span>{{scope.row.status | filterDictionary(drugStatus)}}</span>
            </div>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="更新时间"
                          min-width="160"
                          prop="updated_time">
        </PeaceTableColumn>
        <PeaceTableColumn fixed="right"
                          label="操作"
                          width="160">
          <template slot-scope="scope">
            <div>
              <el-button @click="getDetails(scope.row)"
                         type="text">查看详情</el-button>
            </div>
          </template>
        </PeaceTableColumn>
      </PeaceTable>
    </div>

    <!-- 药品详情 -->
    <peace-dialog :close-on-click-modal="false"
                  :close-on-press-escape="false"
                  :visible.sync="detailsDialogVisible"
                  title="药品详情"
                  v-if="detailsDialogVisible"
                  append-to-body
                  width="750px">
      <DrugView :drug="currentDetails"
                :id="id"
                @close="closeDetailsDialog"
                @success="getList()" />
    </peace-dialog>
    <!-- 新增药品 -->
    <peace-dialog :close-on-click-modal="false"
                  :close-on-press-escape="false"
                  :visible.sync="addDialogVisible"
                  title="添加药品"
                  v-if="addDialogVisible"
                  append-to-body
                  width="600px">
      <div class="el-dialog__title"
           slot="title">
        <span>{{currentDetails.drugType=='update'? '修改药品':'添加药品'}}</span>
        <span>（药品信息需与药品说明书一致）</span>
      </div>
      <DrugModel :id="id"
                 :drugInfo="currentDetails"
                 @close="closeAddDialog"
                 @success="getList()" />
    </peace-dialog>
    <!-- 导入药品 -->
    <peace-dialog :before-close="close"
                  :close-on-click-modal="false"
                  :close-on-press-escape="false"
                  :visible.sync="importDialogVisible"
                  title="批量导入药品"
                  v-if="importDialogVisible"
                  append-to-body
                  width="500px">
      <DrugsImport :id="id"
                   @close="closeImportDialog"
                   @success="getList()" />
    </peace-dialog>
  </div>
</template>
<script>
import Service from '../service'
import CONSTANT from '../constant'
import DrugsImport from './DrugsImport.vue'
import DrugModel from './DrugModel.vue'
import DrugView from './DrugView.vue'

export default {
  name: 'DrugList',
  props: {
    tableid: {
      type: String
    }
  },
  data() {
    return {
      id: '',
      list: [],
      drugSource: CONSTANT.DrugSource,
      drugStatus: CONSTANT.DrugStatus,
      medicalStatus: CONSTANT.MedicalStatus,
      model: {
        table_id: '',
        drug_id: '',
        source: '',
        status: '',
        price: '',
        is_medical: ''
      },
      count: 0,
      currentDetails: '',
      detailsDialogVisible: false,
      addDialogVisible: false,
      importDialogVisible: false
    }
  },
  components: { DrugsImport, DrugModel, DrugView },

  methods: {
    /* 获取列表 */
    getList() {
      const fetch = Service.getDrugList
      const params = Peace.util.deepClone(this.model)
      params.table_id = this.tableid
      this.$refs.table.reloadData({ fetch, params })
    },
    close(done) {
      this.getList()
      done()
    },
    tableRowClassName({ row }) {
      if (row.status === 2) {
        return 'disabled-row'
      } else {
        return ''
      }
    },
    //修改药品状态
    updateDrugItemStatus(drug, idx) {
      if (drug.status == 2) {
        this.$confirm('确认要停用该药品吗？', '提示', { closeOnClickModal: false, closeOnPressEscape: false })
          .then(() => {
            this.operateDrugStatus(drug)
          })
          .catch(() => {
            this.list[idx].status = 1
          })
      } else {
        this.operateDrugStatus(drug)
      }
    },
    operateDrugStatus(drug) {
      const params = {
        drugId: drug.id,
        status: drug.status,
        tableId: this.id
      }
      Service.operateDrugStatus(params)
        .then((res) => {
          const msg = res.msg || '保存成功'
          Peace.util.success(msg)
        })
        .finally(() => {
          this.getList()
        })
    },
    /* 药品详情 */
    // 获取药品详情信息
    getDetails(row, type) {
      const orgId = this.id
      const id = row.id
      Service.getDrugDetails({ tableId: orgId, drugId: id }).then((res) => {
        const info = res.data
        this.currentDetails = info
        if (type == 'update') {
          this.openAddDialog(type)
        } else {
          this.openDetailsDialog()
        }
      })
    },
    // 打开 Dialog
    openDetailsDialog() {
      this.detailsDialogVisible = true
    },
    // 关闭 Dialog
    closeDetailsDialog() {
      this.detailsDialogVisible = false
    },

    /* 新增药品 */
    // 新增一个药品
    saved() {
      //
    },
    // 打开 Dialog
    openAddDialog(type) {
      this.addDialogVisible = true
      this.currentDetails.drugType = type
      if (type !== 'update') {
        this.currentDetails = {}
      }
    },
    // 关闭 Dialog
    closeAddDialog() {
      this.addDialogVisible = false
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

    /* 下载导入模板 */
    download() {
      this.$confirm('下载 <strong>药品批量导入模板<strong> ？', '文件下载', {
        dangerouslyUseHTMLString: true,
        closeOnClickModal: false,
        closeOnPressEscape: false,
        type: 'info'
      }).then(() => {
        const url = `${process.env.VUE_APP_API_BASE}excel/drug.xls`
        window.open(url, '_blank')
        this.$notify({
          title: '药品批量导入模板获取成功！',
          message: `若无法正常下载,请复制链接至其他浏览器重试${url}`,
          duration: 10000
        })
      })
    }
  },
  created() {
    this.id = Peace.cache.sessionStorage.get('196-hospitalId')
    this.$nextTick().then(() => {
      this.getList()
    })
  }
}
</script>
<style lang="scss" scoped>
.content {
  margin-top: 10px;
  padding: 20px;
  background-color: #fff;
  padding-top: 0;
  &-hd {
    margin-bottom: 10px;
  }
  .list {
    overflow: auto;
  }
}
.el-switch.is-disabled {
  opacity: 1;
}

::v-deep .el-table__row.disabled-row td {
  opacity: 0.6;
}
::v-deep .el-table__row.disabled-row .fixed {
  opacity: 1;
}

.search {
  padding: 18px 20px 0 20px;
  width: 100%;
  color: #23313f;
  background-color: #fff;
  // .el-input {
  //   width: 120px;
  // }
  &-btn {
    margin-right: 0;
  }
}
</style>
