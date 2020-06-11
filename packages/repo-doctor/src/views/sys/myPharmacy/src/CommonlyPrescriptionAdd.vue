// 添加常用处方

<template>
  <div class="q-px-lg q-py-sm">
    <div class="q-mb-md row">
      <span class="text-justify em-4">疾病诊断</span>
      <span class="q-mx-sm">：</span>
      <el-select class="col"
                 remote
                 filterable
                 placeholder="请输入诊断"
                 ref="diagnosis"
                 v-bind:disabled="detailedly"
                 v-bind:remote-method="getDiagnosisList"
                 v-model="model.diagnosis">
        <el-option v-bind:key="item.id"
                   v-bind:label="item.name"
                   v-bind:value="item.name"
                   v-for="item in diagnosisList"></el-option>
      </el-select>
    </div>

    <div class="row q-mb-md">
      <div class="col-6">
        <span class="text-justify em-4">性别</span>
        <span class="q-mx-sm">：</span>
        <el-select style="width: 140px"
                   placeholder="请选择"
                   v-bind:disabled="detailedly"
                   v-model="model.sex">
          <el-option v-for="item in sexList"
                     v-bind:key="item"
                     v-bind:label="item"
                     v-bind:value="item"></el-option>
        </el-select>
      </div>

      <div class="col-6">
        <span class="text-justify em-4">年龄</span>
        <span class="q-mx-sm">：</span>
        <el-select style="width: 140px"
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

    <div class="q-mb-md">
      <span class="text-justify em-4">Rp</span>
      <span class="q-mx-sm">：</span>
      <span class="cursor-pointer text-primary"
            v-show="!detailedly"
            v-on:click="addCommonlyPrescriptionDrug">添加药品</span>
    </div>

    <div class="q-mb-md">
      <el-table style="min-height: 200px"
                empty-text="暂无药品"
                v-bind:data="prescriptionDrugList"
                v-bind:show-header="false">
        <el-table-column>
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
              <span>每次{{ scope.row.singleDose }}{{ scope.row.drugUnit }}</span>
              <span>，{{ scope.row.drugFrequency }}</span>
              <span>，{{ scope.row.drugRoute }}</span>
              <span v-if="scope.row.useDrugDays">
                ，{{ scope.row.useDrugDays }} 天
              </span>
            </div>
          </template>
        </el-table-column>

        <el-table-column width="100px"
                         v-if="!detailedly">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="changeCommonlyPrescriptionDrugUsage(scope.row)">修改</el-button>
            <el-button type="text"
                       v-on:click="removeCommonlyPrescriptionDrugUsage(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="text-center"
         v-show="!detailedly">
      <el-button style="width: 80px;"
                 class="q-mr-md"
                 v-on:click="cancelCommonlyPrescription">取消</el-button>
      <el-button style="width: 80px;"
                 type="primary"
                 v-on:click="saveCommonlyPrescription">保存</el-button>
    </div>

    <peace-dialog title="添加药品"
                  heigth="600px"
                  style="heigth: 600px;"
                  append-to-body
                  v-if="drugAddDialog.visible"
                  v-bind:visible.sync="drugAddDialog.visible">
      <CommonlyPrescriptionDrugAdd v-bind:addedList="drugAddDialog.addedList"
                                   v-on:success="onDrugAddSuccess"
                                   v-on:cancel="onDrugAddCancel"></CommonlyPrescriptionDrugAdd>
    </peace-dialog>

    <!-- 添加药品用法 -->
    <peace-dialog title="药品用法"
                  append-to-body
                  v-if="drugUsageAddDialog.visible"
                  v-bind:visible.sync="drugUsageAddDialog.visible">
      <CommonlyPrescriptionDrugUsageAdd v-bind:data="prescriptionDrug"
                                        v-on:success="onDrugUsageAddSuccess"
                                        v-on:cancel="onDrugUsageAddCancel"></CommonlyPrescriptionDrugUsageAdd>
    </peace-dialog>
  </div>
</template>

<script>
import Peace from '@src/library'
import Service from './../service'

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
    detailedly: Boolean
  },

  components: {
    CommonlyPrescriptionDrugAdd,
    CommonlyPrescriptionDrugUsageAdd
  },

  data() {
    return {
      sexList: ['不限', '男', '女'],
      ageList: ['不限', '初生~1个月', '1个月~6个月', '6个月~1岁', '1~2岁', '2~4岁', '4~6岁', '6~9岁', '9~14岁', '14~18岁', '18~60岁', '60~80岁', '80岁以上'],

      model: {
        diagnosis: '',
        sex: '不限',
        age: '不限'
      },

      prescriptionDrugList: [],
      prescriptionDrug: {},

      diagnosisList: [],

      drugAddDialog: {
        visible: false,
        addedList: []
      },

      drugUsageAddDialog: {
        visible: false
      }
    }
  },

  created() {
    this.setPropsToModel()
  },

  methods: {
    setPropsToModel() {
      this.model.diagnosis = this.data.diagnosis ?? ''
      this.model.age = this.data.age ?? '不限'
      this.model.sex = this.data.sex ?? '不限'

      this.prescriptionDrugList = this.data.drugList ?? []
    },

    getDiagnosisList(queryString) {
      if (queryString) {
        const params = {
          name: queryString
        }

        Service.getDiagnosisInfo(params).then((res) => {
          this.diagnosisList = res.data.list
        })
      } else {
        this.diagnosisList = []
      }
    },

    addCommonlyPrescriptionDrug() {
      if (this.prescriptionDrugList.length >= 5) {
        Peace.util.warning('处方药品最多可添加 5 种药品')
      } else {
        this.drugAddDialog.visible = true
        this.drugAddDialog.addedList = this.prescriptionDrugList
      }
    },

    changeCommonlyPrescriptionDrugUsage(row) {
      this.prescriptionDrug = row
      this.drugUsageAddDialog.visible = true
    },

    removeCommonlyPrescriptionDrugUsage(row) {
      const drugIndex = this.prescriptionDrugList.findIndex((prescriptionDrug) => prescriptionDrug.drugId === row.drugId)

      this.prescriptionDrugList.splice(drugIndex, 1)
    },

    cancelCommonlyPrescription() {
      this.$emit('cancel')
    },

    saveCommonlyPrescription() {
      const saveToServer = () => {
        const params = {
          ...this.model,

          drugList: this.prescriptionDrugList
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

      if (!this.model.diagnosis) {
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

      if (this.prescriptionDrugList.length === 0) {
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

      if (this.prescriptionDrugList.some((drug) => drug.drugStatus === 'disable')) {
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

      const drugIndex = this.prescriptionDrugList.findIndex((prescriptionDrug) => prescriptionDrug.drugId === drug.drugId)

      if (drugIndex === -1) {
        this.prescriptionDrugList.push(drug)
      } else {
        this.prescriptionDrugList.splice(drugIndex, 1, drug)
      }
    },

    onDrugAddCancel() {
      this.drugAddDialog.visible = false
    },

    onDrugUsageAddSuccess(drug) {
      this.drugUsageAddDialog.visible = false

      const drugIndex = this.prescriptionDrugList.findIndex((prescriptionDrug) => prescriptionDrug.drugId === drug.drugId)

      if (drugIndex === -1) {
        this.prescriptionDrugList.push(drug)
      } else {
        this.prescriptionDrugList.splice(drugIndex, 1, drug)
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

::v-deep .el-input.is-disabled .el-input__inner {
  color: #000;
}
</style>