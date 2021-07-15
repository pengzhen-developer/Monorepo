<template>
  <div>

    <div v-show="!editRuleOptions.showEditRule && !ruleDetailOptions.showDetailRule"
         class="layout-route">

      <div class="card card-search q-mb-md">
        <el-form inline="inline"
                 label-suffix="："
                 label-width="auto"
                 size="mini"
                 v-bind:model="model"
                 v-on:keyup.enter.native="get"
                 v-on:submit.native.prevent>

          <el-form-item label="药品本位码">
            <el-input v-model.trim="model.drugCSCCode"
                      clearable
                      placeholder="请输入"></el-input>
          </el-form-item>

          <el-form-item label="规则状态">
            <el-select v-model="model.drugState"
                       clearable
                       placeholder="全部">
              <el-option v-for="item in remoteSource.drugStateList"
                         v-bind:key="item.label"
                         v-bind:label="item.label"
                         v-bind:value="item.value"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="操作人员">
            <el-input v-model.trim="model.operatorName"
                      clearable
                      placeholder="请输入"></el-input>
          </el-form-item>

          <el-form-item label="审核人员">
            <el-input v-model.trim="model.auditionName"
                      clearable
                      placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       v-on:click="fetchData">查询
            </el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="card">

        <div class="q-mb-lg">
          <el-button type="primary"
                     v-on:click="importData">导入
          </el-button>
        </div>
        <PeaceTable ref="table"
                    pagination
                    size="mini">

          <PeaceTableColumn label="药品本位码"
                            min-width="180px"
                            prop="drugCscCode">
          </PeaceTableColumn>
          <PeaceTableColumn label="批准文号"
                            min-width="180px"
                            prop="approvalNo">
          </PeaceTableColumn>
          <PeaceTableColumn label="药品名称"
                            min-width="180px"
                            prop="drugName">
          </PeaceTableColumn>
          <PeaceTableColumn label="规格"
                            min-width="140px"
                            prop="specifications">
          </PeaceTableColumn>
          <PeaceTableColumn label="剂型"
                            min-width="120px"
                            prop="dosageFormName">
          </PeaceTableColumn>
          <PeaceTableColumn label="厂家"
                            min-width="180px"
                            prop="manufacturer">
          </PeaceTableColumn>
          <PeaceTableColumn label="药品成分名称"
                            min-width="150px"
                            prop="componentName">
          </PeaceTableColumn>
          <PeaceTableColumn label="规则状态"
                            min-width="120px">
            <template slot-scope="scope">
              <span>{{ scope.row.drugState | filterDictionary(remoteSource.drugStateList,'--') }}</span>
            </template>
          </PeaceTableColumn>

          <PeaceTableColumn label="规则数量"
                            min-width="100px"
                            prop="commonRuleCount">
          </PeaceTableColumn>
          <PeaceTableColumn label="更新时间"
                            min-width="180px"
                            prop="updateTime">
          </PeaceTableColumn>
          <PeaceTableColumn label="操作人员"
                            min-width="120px"
                            prop="operatorName">
          </PeaceTableColumn>
          <PeaceTableColumn label="审核人员"
                            min-width="140px"
                            prop="auditionName">
          </PeaceTableColumn>

          <PeaceTableColumn fixed="right"
                            align="center"
                            width="220px">
            <template slot-scope="scope">
              <el-button type="text"
                         v-on:click="edit(scope.row)">编辑
              </el-button>
              <el-button type="text"
                         v-on:click="toDetail(scope.row)">查看详情
              </el-button>
              <el-button type="text"
                         v-on:click="toLog(scope.row)">查看日志
              </el-button>
            </template>
          </PeaceTableColumn>

        </PeaceTable>
      </div>
      <!-- 导入医生 -->
      <PeaceDialog v-if="importDialog.visible"
                   :before-close="close"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false"
                   :visible.sync="importDialog.visible"
                   append-to-body
                   title="导入数据"
                   width="720px">
        <peace-import :actions="importDialog.actions"
                      :stepsDataInput="importDialog.stepsDataInput"
                      :templateDownloadUrl="importDialog.templateDownloadUrl"
                      :templateName="importDialog.templateName"
                      :downloadErrorUrl="importDialog.downloadErrorUrl"
                      @close="closeImportDialog"
                      @success="importSuccess" />
      </PeaceDialog>

    </div>

    <edit-drug-rules v-if="editRuleOptions.showEditRule"
                     v-bind:drugInfo="editRuleOptions.drugInfo"
                     class="layout-route"
                     v-on:onSuccess="onSuccess"
                     v-on:onBack="onBack"></edit-drug-rules>

    <drug-rule-detail v-if="ruleDetailOptions.showDetailRule"
                      v-bind:drugInfo="ruleDetailOptions.drugInfo"
                      class="layout-route"
                      v-on:onDetailBack="onDetailBack"
                      drug-type="q"></drug-rule-detail>

    <general-drug-regulations-log v-if="logOptions.showLog"
                                  v-bind:visible.sync="logOptions.showLog"
                                  v-bind:data="logOptions.data"></general-drug-regulations-log>
  </div>

</template>

<script>
import Service from './service/index'
import EditDrugRules from './components/EditDrugRules'
import DrugRuleDetail from './components/DrugRuleDetail'
import GeneralDrugRegulationsLog from './components/GeneralDrugRegulationsLog'
import PeaceImport from '@/src/views/components/peace-import/src/PeaceImport.vue'

export default {
  components: { DrugRuleDetail, PeaceImport, EditDrugRules, GeneralDrugRegulationsLog },
  name: 'GeneralDrugRegulations',
  data() {
    return {
      model: {
        drugCSCCode: undefined,
        drugState: undefined,
        operatorName: undefined,
        auditionName: undefined
      },
      remoteSource: {
        drugStateList: []
      },
      importDialog: {
        visible: false,
        actions: `${process.env.VUE_APP_SITE_AUDITENGINE}quake/commonRule/upload`,
        templateDownloadUrl: `${process.env.VUE_APP_SITE_AUDITENGINE}quake/commonRule/download`,
        downloadErrorUrl: `${process.env.VUE_APP_SITE_AUDITENGINE}quake`,
        templateName: '导入通用药品',
        stepsDataInput: {
          active: 0,
          list: [
            {
              title: '上传文件',
              content: '请上传指定格式文件'
            },
            {
              title: '数据检验',
              content: '检查数据格式是否正确'
            },
            {
              title: '写入数据',
              content: '正在执行写入数据'
            }
          ]
        }
      },
      editRuleOptions: {
        showEditRule: false,
        drugInfo: undefined
      },
      ruleDetailOptions: {
        showDetailRule: false,
        drugInfo: undefined
      },
      logOptions: {
        showLog: false,
        data: {}
      }
    }
  },

  mounted() {
    this.$nextTick().then(() => {
      this.fetchData()
    })
  },

  created() {
    this.getDictionary()
  },

  methods: {
    async getDictionary() {
      this.remoteSource.drugStateList = await Peace.identity.dictionary.getList('commonRuleState')
    },

    fetchData() {
      const fetch = Service.getCustomRulesList
      const params = Object.assign(this.model)
      this.$refs.table.reloadData({ fetch, params })
    },

    //导入
    importData() {
      this.importDialog.visible = true
    },
    //导入关闭
    closeImportDialog() {
      this.importDialog.visible = false
    },
    //导入成功
    importSuccess() {
      this.importDialog.visible = false
      this.get()
    },

    //编辑
    edit(row) {
      this.editRuleOptions.drugInfo = row
      this.editRuleOptions.showEditRule = true
    },
    //查看详情
    toDetail(row) {
      this.ruleDetailOptions.drugInfo = row
      this.ruleDetailOptions.showDetailRule = true
    },
    //查看日志
    toLog(row) {
      this.logOptions.data = row
      this.logOptions.showLog = true
    },
    onBack() {
      this.editRuleOptions.showEditRule = false
    },
    onSuccess() {
      this.editRuleOptions.showEditRule = false
      this.fetchData()
    },
    onDetailBack() {
      this.ruleDetailOptions.showDetailRule = false
    }
  }
}
</script>

<style>
</style>
