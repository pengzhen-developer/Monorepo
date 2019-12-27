<template>
  <div>
    <div class="header">
      <el-button-group>
        <el-button :type="view.action === source.action.DRUG ? 'primary' : '' "
                   @click="changeAction(source.action.DRUG)">常用药品</el-button>
        <el-button :type="view.action === source.action.PRESC ? 'primary' : '' "
                   @click="changeAction(source.action.PRESC)">常用处方</el-button>
      </el-button-group>
    </div>

    <hr />

    <!-- 常用药品 -->
    <div :key="source.action.DRUG"
         v-if="view.action === source.action.DRUG">
      <el-form inline>
        <el-form-item label=" ">
          <el-button @click="openDrugDialog"
                     icon="el-icon-plus"
                     type="primary">添加药品</el-button>
        </el-form-item>
      </el-form>

      <hr />

      <peace-table pagination
                   ref="table">
        <peace-table-column type="index"
                            align="left"
                            min-width="200"
                            label="序号"></peace-table-column>
        <peace-table-column align="left"
                            label="药品名称"
                            min-width="200"
                            prop="drug_name"></peace-table-column>
        <peace-table-column label="规格"
                            prop="drug_spec"></peace-table-column>
        <peace-table-column align="left"
                            label="厂家"
                            min-width="200"
                            prop="drug_factory"></peace-table-column>
        <peace-table-column align="left"
                            label="添加时间"
                            prop="created_time"
                            width="180"></peace-table-column>
        <peace-table-column :show-overflow-tooltip="false"
                            fixed="right"
                            label="操作"
                            width="150px">
          <template slot-scope="scope">
            <el-button @click="getSynopsis(scope.row)"
                       type="text">查看说明书</el-button>
            <el-button @click="deleted(scope.row)"
                       type="text">删除</el-button>
          </template>
        </peace-table-column>
      </peace-table>
    </div>

    <!-- 常用处方 -->
    <div :key="source.action.PRESC"
         v-if="view.action === source.action.PRESC">
      <el-form :model="view.prescModel"
               inline>
        <el-form-item label="疾病诊断">
          <el-input placeholder
                    v-model="view.prescModel.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="get"
                     round
                     type="primary">查询</el-button>
        </el-form-item>
        <br />
        <el-form-item>
          <el-button @click="openPrescDialog"
                     icon="el-icon-plus"
                     type="primary">添加处方</el-button>
        </el-form-item>
      </el-form>

      <hr />

      <peace-table pagination
                   ref="table">
        <peace-table-column label="疾病诊断"
                            prop="diagnosis"></peace-table-column>
        <peace-table-column label="性别"
                            prop="sex"></peace-table-column>
        <peace-table-column label="年龄"
                            prop="age"></peace-table-column>
        <peace-table-column align="left"
                            label="处方药品"
                            min-width="300px"
                            prop="drugjson">
          <template slot-scope="scope">
            <span>{{ format(scope.row.drugjson) }}</span>
          </template>
        </peace-table-column>
        <peace-table-column :show-overflow-tooltip="false"
                            fixed="right"
                            label="操作"
                            width="180px">
          <template slot-scope="scope">
            <el-button @click="openViewPrescDialog(scope.row)"
                       type="text">查看详情</el-button>
            <el-button @click="openEditPrescDialog(scope.row)"
                       type="text">修改</el-button>
            <el-button @click="deleted(scope.row)"
                       type="text">删除</el-button>
          </template>
        </peace-table-column>
      </peace-table>
    </div>

    <peace-dialog :close-on-click-modal="false"
                  :visible.sync="drugDialog.visible"
                  custom-class="dialog"
                  title="添加药品"
                  v-if="drugDialog.visible">
      <into-drug @cancel="cancel"
                 @into="intoDrug"></into-drug>
    </peace-dialog>

    <peace-dialog :close-on-click-modal="false"
                  :visible.sync="prescDialog.visible"
                  custom-class="dialog"
                  title="添加处方"
                  v-if="prescDialog.visible">
      <into-presc @cancel="cancel"
                  @submit="intoPresc"></into-presc>
    </peace-dialog>

    <peace-dialog :close-on-click-modal="false"
                  :visible.sync="viewPrescDialog.visible"
                  custom-class="dialog"
                  title="处方详情"
                  v-if="viewPrescDialog.visible">
      <presc-details :data="viewPrescDialog.data"></presc-details>
    </peace-dialog>

    <peace-dialog :close-on-click-modal="false"
                  :visible.sync="editPrescDialog.visible"
                  custom-class="dialog"
                  title="修改处方"
                  v-if="editPrescDialog.visible">
      <into-presc :data="editPrescDialog.data"
                  @cancel="closeEditPrescDialog"
                  @submit="editPresc"></into-presc>
    </peace-dialog>

    <peace-dialog :visible.sync="synopsisListDialog.visible"
                  custom-class="dialog"
                  title="药品说明书列表">
      <drug-synopsis-list :data="synopsisListDialog.data"
                          @getInfo="showSynopsis"></drug-synopsis-list>
    </peace-dialog>

    <peace-dialog :visible.sync="synopsisDialog.visible"
                  custom-class="dialog"
                  title="药品说明书">
      <drug-synopsis :data="synopsisDialog.data"
                     @close="() => synopsisDialog.visible = false"></drug-synopsis>
    </peace-dialog>
  </div>
</template>

<script>
import config from './config'
import DrugSynopsis from './DrugSynopsis'
import DrugSynopsisList from './DrugSynopsisList'
import PrescDetails from './PrescDetails'
import IntoDrug from './IntoDrug'
import IntoPresc from './IntoPresc'

export default {
  components: {
    DrugSynopsis,
    DrugSynopsisList,
    IntoDrug,
    IntoPresc,
    PrescDetails
  },

  data() {
    return {
      config,

      view: {
        action: undefined,

        prescModel: {
          diagnosis: undefined
        }
      },

      synopsisListDialog: {
        visible: false,

        data: undefined
      },

      synopsisDialog: {
        visible: false,

        data: undefined
      },

      drugDialog: {
        visible: false
      },

      prescDialog: {
        visible: false
      },

      viewPrescDialog: {
        visible: false,

        data: undefined
      },

      editPrescDialog: {
        visible: false,

        data: undefined
      },

      source: {
        action: {
          DRUG: '常用药品',
          PRESC: '常用处方'
        },

        consultStatus: []
      }
    }
  },

  computed: {
    isDrugList() {
      return this.view.action === this.source.action.DRUG
    }
  },

  created() {
    this.view.action = this.source.action.DRUG
  },

  mounted() {
    this.$nextTick().then(() => {
      this.get()
    })
  },

  methods: {
    changeAction(action) {
      this.view.action = action

      this.$nextTick().then(() => {
        this.get()
      })
    },

    // 获取列表数据
    get() {
      if (this.isDrugList) {
        const api = this.config.api.getDrugList

        this.$refs.table.loadData({
          method: 'get',
          api
        })
      } else {
        const api = this.config.api.getPrescList
        const params = { name: this.view.prescModel.name }

        this.$refs.table.loadData({
          method: 'get',
          api,
          params
        })
      }
    },

    format(json) {
      const drugList = JSON.parse(json)
      return drugList
        .map(element => {
          return element.drug_name
        })
        .join('、')
    },

    // 获取说明书列表
    getSynopsis(row) {
      const api = this.config.api.getDrugSynopsisList
      const params = {
        name: row.drug_name,
        factory: row.drug_factory
      }

      this.http.get(api, { params }).then(res => {
        if (!res.data || !res.data.length) {
          this.$message.warning('没有查询到药品相关说明书！')
        } else if (res.data.length === 1) {
          this.showSynopsis(res.data[0])
        } else {
          this.synopsisListDialog.visible = true
          this.synopsisListDialog.data = res.data
        }
      })
    },

    // 查看说明书
    showSynopsis(row) {
      this.synopsisDialog.data = undefined
      this.synopsisListDialog.visible = false
      this.synopsisDialog.visible = true

      const api = this.config.api.getDrugSynopsisDetail
      const params = {
        pzwh: row.pzwh
      }

      this.http.get(api, { params }).then(res => {
        this.synopsisDialog.data = res.data
      })
    },

    // 删除记录
    deleted(row) {
      const isDrugList = this.isDrugList
      const api = isDrugList ? this.config.api.removeDrug : this.config.api.removePresc
      const params = isDrugList
        ? {
            commonlyUsedDrug_id: row.commonlyuseddrug_id
          }
        : {
            id: row.id
          }
      const msg = isDrugList ? `从常用药品列表中删除 <br><strong>${row.drug_name}</strong>` : `删除此常用处方？`

      this.$confirm(msg, '提示', {
        dangerouslyUseHTMLString: true,
        type: 'error'
      }).then(() => {
        this.http.post(api, params).then(res => {
          const msg = res.data.msg || '删除成功'
          this.$message.success(msg)
          this.get()
        })
      })
    },

    cancel() {
      if (this.isDrugList) {
        this.closeDrugDialog()
      } else {
        this.closePrescDialog()
      }
      this.get()
    },

    // ----------- 常用药品 -------------

    // 打开 Dialog
    openDrugDialog() {
      this.drugDialog.visible = true
    },

    // 关闭 Dialog
    closeDrugDialog() {
      this.drugDialog.visible = false
    },

    // 添加药品
    intoDrug(params) {
      const drugId = params
      this.http
        .post(this.config.api.intoDrug, {
          drug_id: drugId
        })
        .then(res => {
          const msg = res.data.msg || '药品添加成功'
          this.$message.success(msg)
          this.get()
        })
    },

    // ----------- 常用处方 -------------
    // 查看常用处方
    openViewPrescDialog(data) {
      this.viewPrescDialog.data = data
      this.viewPrescDialog.visible = true
    },

    // 打开新增处方 Dialog
    openPrescDialog() {
      this.prescDialog.visible = true
    },

    // 关闭新增处方 Dialog
    closePrescDialog() {
      this.prescDialog.visible = false
    },

    // 添加常用处方
    intoPresc(params) {
      const api = this.config.api.intoPresc

      this.http.post(api, params).then(() => {
        this.closePrescDialog()
        this.$message.success('常用处方添加成功')
        this.get()
      })
    },

    // 打开修改处方 Dialog
    openEditPrescDialog(data) {
      this.currentPrescId = data.id
      this.editPrescDialog.data = data
      this.editPrescDialog.visible = true
    },

    // 关闭修改处方 Dialog
    closeEditPrescDialog() {
      this.editPrescDialog.visible = false
    },

    // 修改处方
    editPresc(_params) {
      const api = this.config.api.editPresc
      const params = Object.assign(_params, {
        commonPrescriptionId: this.currentPrescId
      })

      this.http.post(api, params).then(() => {
        this.closeEditPrescDialog()
        this.$message.success('常用处方修改成功')
        this.get()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  text-align: center;
}
</style>
