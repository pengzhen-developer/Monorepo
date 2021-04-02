// 添加常用处方

<template>
  <div class="q-px-lg q-py-sm">
    <div class="row items-center q-mb-md">
      <span class="text-justify em-4">疾病诊断</span>
      <span class="q-mx-sm">：</span>

      <QuickSelectDiagnose class="col"
                           v-model="model.diagnoseList"></QuickSelectDiagnose>
    </div>

    <div class="row q-col-gutter-x-md q-mb-md">
      <div class="col-6 flex items-center">
        <span class="text-justify em-4">性别</span>
        <span class="q-mx-sm">：</span>
        <el-select class="col"
                   placeholder="请选择"
                   v-bind:disabled="detailedly"
                   v-model="model.sex">
          <el-option v-for="item in sexList"
                     v-bind:key="item"
                     v-bind:label="item"
                     v-bind:value="item"></el-option>
        </el-select>
      </div>

      <div class="col-6 flex items-center">
        <span class="text-justify em-4">年龄</span>
        <span class="q-mx-sm">：</span>
        <el-select class="col"
                   placeholder="请选择"
                   v-bind:disabled="detailedly"
                   v-model="model.age">
          <el-option v-for="item in ageList"
                     v-bind:key="item"
                     v-bind:label="item"
                     v-bind:value="item"></el-option>
        </el-select>
      </div>
    </div>

    <div class="row q-mb-md">
      <span class="text-justify em-4">Rp类型</span>
      <span class="q-mx-sm">：</span>
      <div>
        <el-radio-group v-model="model.prescriptionTag"
                        v-bind:disabled="detailedly">
          <el-radio v-for="item in source.prescriptionTag"
                    v-bind:key="item.value"
                    v-bind:label="item.value">
            {{ item.label }}
          </el-radio>
        </el-radio-group>
        <div v-show="!detailedly"
             class="q-mt-md cursor-pointer text-primary text-add-drug"
             v-on:click="addCommonlyPrescriptionDrug">+添加药品</div>
      </div>
    </div>

    <div class="q-mb-md">
      <PeaceTable style="min-height: 200px"
                  v-bind:data="model.drugList"
                  v-bind:show-header="false">
        <PeaceTableColumn>
          <template slot-scope="scope">
            <div class="q-mb-sm">
              <el-tag class="q-mr-sm"
                      effect="dark"
                      type="warning"
                      v-if="scope.row.drugStatus === 'disable'">停用</el-tag>
              <span class="text-weight-bold q-mr-md"> {{ scope.row.drugName }} </span>
              <span class="text-weight-bold"> {{ scope.row.specification }} </span>
              <br>
              <span class="text-weight-bold"> {{ scope.row.companyName }} </span>
            </div>
            <div>
              <span>用法用量：</span>
              <span>{{ scope.row.drugRoute }}</span>
              <span>，每次{{ scope.row.singleDose }}{{ scope.row.drugUnit }}</span>
              <span>，{{ scope.row.drugFrequency }}</span>
              <span v-if="scope.row.useDrugDays">
                ，{{ scope.row.useDrugDays }} 天
              </span>
            </div>
          </template>
        </PeaceTableColumn>

        <PeaceTableColumn width="120px">
          <template slot-scope="scope">
            <div class="column items-end q-pa-none justify-space-between">
              <span class="text-grey-333 text-weight-bold">x{{ scope.row.drugNum }}{{ scope.row.drugQuantityUnit }}</span>
              <br>
              <div v-if="!detailedly">
                <el-button type="text"
                           v-on:click="changeCommonlyPrescriptionDrugUsage(scope.row)">修改</el-button>
                <el-button type="text"
                           v-on:click="removeCommonlyPrescriptionDrugUsage(scope.row)">删除</el-button>
              </div>
              <br v-else>
            </div>
          </template>
        </PeaceTableColumn>
      </PeaceTable>
    </div>

    <div class="text-center"
         v-show="!detailedly">
      <el-button class="q-mr-md"
                 v-on:click="cancelCommonlyPrescription">取消</el-button>
      <el-button type="primary"
                 v-on:click="saveCommonlyPrescription">保存</el-button>
    </div>

    <PeaceDialog title="添加药品"
                 heigth="600px"
                 style="heigth: 600px;"
                 append-to-body
                 v-if="drugAddDialog.visible"
                 v-bind:visible.sync="drugAddDialog.visible">
      <CommonlyPrescriptionDrugAdd v-bind:addedList="drugAddDialog.addedList"
                                   v-bind:prescriptionTag="model.prescriptionTag"
                                   v-on:success="onDrugAddSuccess"
                                   v-on:cancel="onDrugAddCancel"></CommonlyPrescriptionDrugAdd>
    </PeaceDialog>

    <!-- 添加药品用法 -->
    <PeaceDialog title="药品用法"
                 append-to-body
                 v-if="drugUsageAddDialog.visible"
                 v-bind:visible.sync="drugUsageAddDialog.visible">
      <CommonlyPrescriptionDrugUsageAdd v-bind:data="prescriptionDrug"
                                        v-on:success="onDrugUsageAddSuccess"
                                        v-on:cancel="onDrugUsageAddCancel"></CommonlyPrescriptionDrugUsageAdd>
    </PeaceDialog>
  </div>
</template>

<script>
import Service from './../service'

import QuickSelectDiagnose from '@src/views/components/quick-select/src/components/QuickSelectDiagnose'
import CommonlyPrescriptionDrugAdd from './CommonlyPrescriptionDrugAdd'
import CommonlyPrescriptionDrugUsageAdd from './CommonlyPrescriptionDrugUsageAdd'

export default {
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    },

    // 展示性质的
    detailedly: Boolean,

    prescriptionTag: {
      type: Number,
      default() {
        return 1
      }
    }
  },

  components: {
    QuickSelectDiagnose,
    CommonlyPrescriptionDrugAdd,
    CommonlyPrescriptionDrugUsageAdd
  },

  data() {
    return {
      sexList: ['不限', '男', '女'],
      ageList: ['不限', '初生~1个月', '1个月~6个月', '6个月~1岁', '1~2岁', '2~4岁', '4~6岁', '6~9岁', '9~14岁', '14~18岁', '18~60岁', '60~80岁', '80岁以上'],

      model: {
        // 疾病诊断
        diagnoseList: [],
        // 性别
        sex: '不限',
        // 年龄
        age: '不限',
        // 处方类型
        prescriptionTag: 1,
        // 处方药品
        drugList: []
      },

      prescriptionDrug: {},

      drugAddDialog: {
        visible: false,
        addedList: []
      },

      drugUsageAddDialog: {
        visible: false
      },

      source: {
        prescriptionTag: [
          { label: '院内处方', value: 1 },
          { label: '外延处方', value: 2 }
        ]
      }
    }
  },

  created() {
    this.setPropsToModel()
  },

  watch: {
    'model.prescriptionTag'(newValue, oldValue) {
      // 验证互斥锁
      if (this.__lockRpCheck !== undefined && this.__lockRpCheck === newValue) {
        this.__lockRpCheck = undefined
        return
      }

      if (this.model.drugList.length) {
        this.$confirm('一张处方中只可开具同类药品目录，更换类型则已添加药品将清空，请确认', '提示', { center: true })
          .then(() => {
            this.model.drugList.splice(0, this.model.drugList.length)

            this.$emit('update:prescriptionTag', newValue)
          })
          .catch(() => {
            // 设定互斥锁
            this.__lockRpCheck = oldValue
            this.model.prescriptionTag = oldValue

            this.$emit('update:prescriptionTag', oldValue)
          })
      } else {
        this.__lockRpCheck = newValue
        this.$emit('update:prescriptionTag', newValue)
      }
    }
  },

  methods: {
    setPropsToModel() {
      this.__lockRpCheck = this.prescriptionTag

      this.model.age = this.data.age ?? '不限'
      this.model.sex = this.data.sex ?? '不限'
      this.model.prescriptionTag = this.prescriptionTag
      this.model.drugList = this.data.drugList ?? []
      this.model.diagnoseList = this.data.diagnoseList ?? []
    },

    addCommonlyPrescriptionDrug() {
      if (this.model.drugList.length >= 5) {
        Peace.util.warning('处方药品最多可添加 5 种药品')
      } else {
        this.drugAddDialog.visible = true
        this.drugAddDialog.addedList = this.model.drugList
      }
    },

    changeCommonlyPrescriptionDrugUsage(row) {
      this.prescriptionDrug = row
      this.drugUsageAddDialog.visible = true
    },

    removeCommonlyPrescriptionDrugUsage(row) {
      this.$confirm(`确定从处方中删除【${row.drugName}】`, '提示', { center: true }).then(() => {
        const drugIndex = this.model.drugList.findIndex((prescriptionDrug) => prescriptionDrug.drugId === row.drugId)

        this.model.drugList.splice(drugIndex, 1)
      })
    },

    cancelCommonlyPrescription() {
      this.$emit('cancel')
    },

    saveCommonlyPrescription() {
      const saveToServer = () => {
        const params = {
          ...this.model,

          drugList: this.model.drugList
        }

        if (this.data.commonPrescriptionId) {
          params.commonPrescriptionId = this.data.commonPrescriptionId

          Service.editCommonlyPrescription(params).then((res) => {
            Peace.util.success(res.msg)

            this.$emit('success')
          })
        } else {
          Service.addCommonlyPrescription(params).then((res) => {
            Peace.util.success(res.msg)

            this.$emit('success')
          })
        }
      }

      if (this.model.diagnoseList.length === 0) {
        return Peace.util.confirm(
          '诊断尚未选择，选择后才能保存',
          '提示',
          {
            confirmButtonText: '前往选择',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          },
          () => {
            this.$refs.diagnosis.focus()
          }
        )
      }

      if (this.model.drugList.length === 0) {
        return Peace.util.confirm(
          '处方药品尚未添加，添加后才能保存',
          '提示',
          {
            confirmButtonText: '前往添加',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          },
          () => {
            this.addCommonlyPrescriptionDrug()
          }
        )
      }

      if (this.model.drugList.some((drug) => drug.drugStatus === 'disable')) {
        return Peace.util.confirm(
          '处方内含有停用药品，是否保存为常用处方？',
          '提示',
          {
            confirmButtonText: '保存',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          },
          () => {
            saveToServer()
          }
        )
      }

      saveToServer()
    },

    onDrugAddSuccess(drug) {
      this.drugAddDialog.visible = false

      const drugIndex = this.model.drugList.findIndex((prescriptionDrug) => prescriptionDrug.drugId === drug.drugId)

      if (drugIndex === -1) {
        this.model.drugList.push(drug)
      } else {
        this.model.drugList.splice(drugIndex, 1, drug)
      }
    },

    onDrugAddCancel() {
      this.drugAddDialog.visible = false
    },

    onDrugUsageAddSuccess(drug) {
      this.drugUsageAddDialog.visible = false

      const drugIndex = this.model.drugList.findIndex((prescriptionDrug) => prescriptionDrug.drugId === drug.drugId)

      if (drugIndex === -1) {
        this.model.drugList.push(drug)
      } else {
        this.model.drugList.splice(drugIndex, 1, drug)
      }
    },

    onDrugUsageAddCancel() {
      this.drugUsageAddDialog.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.text-justify {
  display: inline-block;
  text-align: justify;
  text-align-last: justify;

  &.em-4 {
    width: 4em;
  }
}

/deep/ .el-input.is-disabled .el-input__inner {
  color: #000;
}

.text-add-drug {
  border: 1px dashed #ccc;
  border-radius: 4px;
  padding: 6px 12px;
  width: fit-content;
}
</style>