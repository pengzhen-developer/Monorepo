<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <el-form inline
               label-width="auto"
               label-suffix="："
               v-on:submit.native.prevent
               v-on:keyup.enter.native="fetch"
               v-bind:model="model">
        <el-form-item label="药品名称"
                      prop="drugName">
          <el-input clearable
                    placeholder="请输入"
                    v-model.trim="model.drugName"></el-input>
        </el-form-item>

        <el-form-item label="更新时间"
                      prop="times">
          <PeaceDatePicker type="daterange"
                           start-placeholder="开始日期"
                           end-placeholder="结束日期"
                           value-format="yyyy-MM-dd"
                           v-model.trim="model.times"></PeaceDatePicker>
        </el-form-item>

        <el-form-item>
          <el-button type="primary"
                     v-on:click="fetch">查询</el-button>
        </el-form-item>
      </el-form>

    </div>

    <div class="card">
      <div>
        <PeaceTable ref="table"
                    pagination>
          <PeaceTableColumn label="溶媒编码"
                            prop="code"
                            min-width="180"></PeaceTableColumn>
          <PeaceTableColumn label="药品名称"
                            prop="drugName"
                            min-width="180"></PeaceTableColumn>
          <PeaceTableColumn label="规格"
                            prop="specifications"
                            min-width="240"></PeaceTableColumn>
          <PeaceTableColumn label="溶媒规格"
                            prop="menstruumSpecifications"
                            min-width="180">
            <template slot-scope="scope">
              {{ scope.row.menstruumSpecifications || '--' }}
            </template>
          </PeaceTableColumn>
          <PeaceTableColumn label="已关联平台药品"
                            prop="count"
                            min-width="180">
            <template slot-scope="scope">
              <el-button type="text"
                         v-on:click="showMappingDetail(scope.row)">{{ scope.row.count }}</el-button>
            </template>
          </PeaceTableColumn>
          <PeaceTableColumn label="更新时间"
                            prop="updateTime"
                            min-width="180"></PeaceTableColumn>
          <PeaceTableColumn label="操作"
                            width="180"
                            fixed="right">
            <template slot-scope="scope">
              <el-button type="text"
                         v-on:click="edit(scope.row)">修改</el-button>
              <el-button type="text"
                         v-on:click="showMapping(scope.row)">关联平台药品</el-button>
            </template>
          </PeaceTableColumn>
        </PeaceTable>
      </div>
    </div>

    <PeaceDialog width="376px"
                 v-if="dialog.visible"
                 v-bind:visible.sync="dialog.visible"
                 v-bind:model="dialog.model"
                 v-bind:title="dialog.title">
      <div class="q-px-md">

        <el-form ref="form"
                 label-width="auto"
                 label-suffix="："
                 v-on:submit.native.prevent
                 v-on:keyup.enter.native="save"
                 v-bind:model="dialog.model"
                 v-bind:rules="dialog.rules">
          <el-form-item label="溶媒编码"
                        prop="code">
            <span>{{ dialog.model.code }}</span>
          </el-form-item>
          <el-form-item label="药品名称"
                        prop="drugName">
            <el-input v-model="dialog.model.drugName"
                      placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="规格"
                        prop="specifications">
            <el-input v-model="dialog.model.specifications"
                      placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="溶媒规格"
                        prop="menstruumSpecifications">
            <el-input v-model="dialog.model.menstruumSpecifications"
                      placeholder="请输入"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <div slot="footer">
        <el-button v-on:click="cancel">取消</el-button>
        <el-button type="primary"
                   v-on:click="save">保存</el-button>
      </div>
    </PeaceDialog>

    <PeaceDialog width="976px"
                 v-if="dialogMapping.visible"
                 v-bind:visible.sync="dialogMapping.visible"
                 v-bind:model="dialogMapping.model"
                 v-bind:title="dialogMapping.title">
      <div class="q-mb-md">
        <el-form ref="form"
                 inline
                 label-width="auto"
                 label-suffix="："
                 v-on:keyup.enter.native="fetchDrug"
                 v-on:submit.native.prevent
                 v-bind:model="dialogMapping.model">
          <el-form-item label="药品名称"
                        prop="drugName">
            <el-input v-model="dialogMapping.model.drugName"
                      placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       v-on:click="fetchDrug">查询</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="q-mb-md">
        <el-button type="primary"
                   v-on:click="confirmMappingDrugs">关联</el-button>
        <el-button v-on:click="cancelMappingDrugs">取消关联</el-button>
      </div>

      <div>
        <PeaceTable ref="mappingTable"
                    pagination
                    v-on:selection-change="selectionChange">
          <PeaceTableColumn type="selection"
                            width="55">
          </PeaceTableColumn>
          <PeaceTableColumn label="平台药品编码"
                            prop="platformDrugCode"
                            min-width="180"></PeaceTableColumn>
          <PeaceTableColumn label="药品名称"
                            prop="drugName"
                            min-width="180"></PeaceTableColumn>
          <PeaceTableColumn label="规格"
                            prop="drugSpecifications"
                            min-width="180"></PeaceTableColumn>
          <PeaceTableColumn label="厂家"
                            prop="enterpriseCnName"
                            min-width="180"></PeaceTableColumn>
          <PeaceTableColumn label="剂型"
                            prop="drugDosageForm"
                            min-width="120"></PeaceTableColumn>
          <PeaceTableColumn label="关联状态"
                            width="120"
                            fixed="right">
            <template slot-scope="scope">
              {{ scope.row.isRelated === 'yes' ? '已关联' : '未关联' }}
            </template>
          </PeaceTableColumn>
        </PeaceTable>
      </div>
    </PeaceDialog>

    <PeaceDialog width="976px"
                 v-if="dialogMappingDetail.visible"
                 v-bind:visible.sync="dialogMappingDetail.visible"
                 v-bind:model="dialogMappingDetail.model"
                 v-bind:title="dialogMappingDetail.title">
      <div>
        <PeaceTable ref="mappingTableDetail">
          <PeaceTableColumn label="平台药品编码"
                            prop="platformDrugCode"
                            min-width="180"></PeaceTableColumn>
          <PeaceTableColumn label="药品名称"
                            prop="drugName"
                            min-width="180"></PeaceTableColumn>
          <PeaceTableColumn label="规格"
                            prop="drugSpecifications"
                            min-width="180"></PeaceTableColumn>
          <PeaceTableColumn label="厂家"
                            prop="enterpriseCnName"
                            min-width="180"></PeaceTableColumn>
          <PeaceTableColumn label="剂型"
                            prop="drugDosageForm"
                            min-width="180"></PeaceTableColumn>
        </PeaceTable>
      </div>
    </PeaceDialog>

  </div>
</template>

<script>
import Service from './service'

export default {
  data() {
    return {
      model: {
        drugName: '',
        times: []
      },

      source: {
        dictionary: []
      },

      dialog: {
        visible: false,

        title: '',

        model: {},

        rules: {
          drugName: [{ required: true, message: '请输入药品名称' }],
          specifications: [{ required: true, message: '请输入规格' }]
        }
      },

      dialogMapping: {
        visible: false,

        title: '',

        platformDrugCodes: [],

        mappingDrugs: [],

        model: {}
      },

      dialogMappingDetail: {
        visible: false,

        title: ''
      }
    }
  },

  watch: {
    'model.times': {
      handler(timeRange) {
        this.model.beginTime = timeRange?.[0] ?? ''
        this.model.endTime = timeRange?.[1] ?? ''
      },
      immediate: true
    }
  },

  mounted() {
    this.$nextTick().then(async () => {
      await this.getDictionary()
      await this.fetch()
    })
  },

  methods: {
    async getDictionary() {},

    fetch() {
      const fetch = Service.platformDrugMenstruumDic.page
      const params = this.model

      this.$refs.table.reloadData({ fetch, params })
    },

    selectionChange(checkeds) {
      this.dialogMapping.platformDrugCodes = checkeds
    },

    fetchDrug() {
      const fetch = Service.platformDrugBaseInfo.pageMenstruumProperties
      const params = { drugName: this.dialogMapping.model.drugName }

      this.$refs.mappingTable.reloadData({ fetch, params })
    },

    isChecked(row) {
      return this.dialogMapping.mappingDrugs.some((item) => item.platformDrugCode === row.platformDrugCode)
    },

    async edit(row) {
      this.dialog.visible = true
      this.dialog.title = '修改'
      this.dialog.model = (await Service.platformDrugMenstruumDic.GET({ id: row.id })).data
    },

    showMappingDetail(row) {
      this.dialogMappingDetail.visible = true
      this.dialogMappingDetail.title = '关联平台药品'
      this.dialogMappingDetail.model = Peace.util.deepClone(row)

      this.$nextTick().then(() => {
        const fetch = Service.platformDrugMenstruumDic.pageDrugLists
        const params = { current: 1, size: 999999, code: row.code }

        this.$refs.mappingTableDetail.reloadData({ fetch, params })
      })
    },

    showMapping(row) {
      this.dialogMapping.visible = true
      this.dialogMapping.title = '关联平台药品'
      this.dialogMapping.model = Peace.util.deepClone(row)

      this.$nextTick().then(async () => {
        this.fetchDrug()
      })
    },

    confirmMappingDrugs() {
      const relatedCount = this.dialogMapping.platformDrugCodes.filter((item) => item.isRelated === 'yes')

      if (relatedCount.length > 0) {
        this.$confirm(`当前选中数据有${relatedCount.length}条已与其他溶媒关联，确定取消原有关联状态，关联现有溶媒？`, '关联确认').then(() => {
          Service.platformDrugMenstruumDic
            .relatedPlatformDrugs({
              code: this.dialogMapping.model.code,
              platformDrugCodes: this.dialogMapping.platformDrugCodes.map((item) => item.platformDrugCode),
              related: 'yes'
            })
            .then(() => {
              Peace.util.alert('操作成功')

              this.cancel()
              this.fetch()
            })
        })
      } else {
        Service.platformDrugMenstruumDic
          .relatedPlatformDrugs({
            code: this.dialogMapping.model.code,
            platformDrugCodes: this.dialogMapping.platformDrugCodes.map((item) => item.platformDrugCode),
            related: 'yes'
          })
          .then(() => {
            Peace.util.alert('操作成功')

            this.cancel()
            this.fetch()
          })
      }
    },

    cancelMappingDrugs() {
      Service.platformDrugMenstruumDic
        .relatedPlatformDrugs({
          code: this.dialogMapping.model.code,
          platformDrugCodes: this.dialogMapping.platformDrugCodes.map((item) => item.platformDrugCode),
          related: 'no'
        })
        .then(() => {
          Peace.util.alert('操作成功')

          this.cancel()
          this.fetch()
        })
    },

    save() {
      this.$refs.form.validate().then(() => {
        Service.platformDrugMenstruumDic.PUT(this.dialog.model).then(() => {
          Peace.util.alert('操作成功')

          this.cancel()
          this.fetch()
        })
      })
    },

    cancel() {
      this.dialog.visible = false
      this.dialog.model = {}

      this.dialogMapping.visible = false
      this.dialogMapping.model = {}

      this.dialogMappingDetail.visible = false
      this.dialogMappingDetail.model = {}
    }
  }
}
</script>

<style>
</style>