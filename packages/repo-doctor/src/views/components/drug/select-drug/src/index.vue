<template>
  <div>
    <div class="flex justify-between q-my-md">
      <el-form inline
               space-none
               v-bind:model="model">
        <el-form-item label="Rp 类型："
                      required>
          <el-radio-group v-model="model.prescriptionTag">
            <el-radio v-for="item in source.prescriptionTag"
                      v-bind:key="item.value"
                      v-bind:label="Number(item.value)">
                <span>{{ item.label }}</span>
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <div>
        <el-button plain
                   v-on:click="showHistoryPrescription">历史处方
        </el-button>
      </div>
    </div>

    <div v-show="value && value.length > 0"
         class="q-mb-md">
      <PeaceTable class="editable q-mb-sm"
                  size="medium"
                  v-bind:data="value">
        <PeaceTableColumn label="药品名称"
                          min-width="120px"
                          prop="drugName">
          <template v-slot:default="{ row }">
            <div class="ellipsis">
              <el-tooltip effect="light"
                          placement="top-start">

                <div>
                  <span v-if="row.drugStatus === 'disable'"
                        class="disable_tags">停用</span>
                  <span v-if="row.isMedical === 1"
                        class="medical_tags">医保</span>
                  <span>{{ row.drugName }}</span>
                </div>

                <div slot="content"
                     style="max-width: 200px;">
                  <div class="flex q-mb-sm">
                    <span class="text-black"
                          style="width: 60px;">药品名称：</span>
                    <span v-if="row.drugStatus === 'disable'"
                          class="disable_tags">停用</span>
                    <span v-if="row.isMedical === 1"
                          class="medical_tags">医保</span>
                    <span class="col">{{ row.drugName }}</span>
                  </div>
                  <div class="flex q-mb-sm">
                    <span class="text-black"
                          style="width: 60px;">药品规格：</span>
                    <span class="col">{{ row.specification }}</span>
                  </div>
                  <div class="flex q-mb-sm">
                    <span class="text-black"
                          style="width: 60px;">生产厂家：</span>
                    <span class="col">{{ row.companyName }}</span>
                  </div>
                </div>
              </el-tooltip>
            </div>
          </template>
        </PeaceTableColumn>

        <PeaceTableColumn label="药品规格"
                          min-width="80px"
                          prop="specification"
                          show-overflow-tooltip>
          <template v-slot:default="{ row }">
            {{ row.specification }}
          </template>
        </PeaceTableColumn>

        <PeaceTableColumn min-width="120px">
          <template v-slot:header>
            <span class="text-red">*</span>
            <span>单次剂量</span>
          </template>
          <template v-slot:default="{ $index, row }">
            <el-form v-bind:model="row"
                     v-bind:show-message="false"
                     v-on:submit.native.prevent>
              <el-form-item prop="singleDose"
                            required>
                <div class="flex justify-center items-center">
                  <el-input-number v-bind:id="`row-${$index}-component`"
                                   v-model="row.singleDose"
                                   class="editable col"
                                   controls-position="right"
                                   placeholder="请输入"
                                   style="width: 90px"
                                   v-bind:min="0.001"
                                   v-on:blur="formatNumeral(row, 'singleDose', '0.000')"
                                   v-on:change="calculateCount(row)"></el-input-number>
                  <span class="text-caption ellipsis text-grey-666 q-mx-xs"
                        style="max-width: 50px;"
                        v-bind:title="row.drugUnit">{{ row.drugUnit }}</span>
                </div>
              </el-form-item>
            </el-form>
          </template>
        </PeaceTableColumn>

        <PeaceTableColumn min-width="104px">
          <template v-slot:header>
            <span class="text-red">*</span>
            <span>用药频次</span>
          </template>
          <template v-slot:default="{ row }">
            <el-form v-bind:model="row"
                     v-bind:show-message="false"
                     v-on:submit.native.prevent>
              <el-form-item inline-message
                            prop="drugFrequencyId"
                            required>
                <el-select v-model="row.drugFrequencyId"
                           class="editable"
                           clearable
                           filterable
                           placeholder="请选择"
                           v-on:change="calculateCount(row)">
                  <el-option v-for="item in source.drugFrequencyList"
                             v-bind:key="item.id"
                             v-bind:label="item.drugtimes_name"
                             v-bind:value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </template>
        </PeaceTableColumn>

        <PeaceTableColumn min-width="104px">
          <template v-slot:header>
            <span class="text-red">*</span>
            <span>给药途径</span>
          </template>
          <template v-slot:default="{ row }">
            <el-form v-bind:model="row"
                     v-bind:show-message="false"
                     v-on:submit.native.prevent>
              <el-form-item inline-message
                            prop="drugRouteId"
                            required>
                <el-select v-model="row.drugRouteId"
                           class="editable"
                           clearable
                           filterable
                           placeholder="请选择">
                  <el-option v-for="item in source.drugRouteList"
                             v-bind:key="item.id"
                             v-bind:label="item.drugway_name"
                             v-bind:value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </template>
        </PeaceTableColumn>

        <PeaceTableColumn min-width="104px">
          <template v-slot:header>
            <span class="text-red">*</span>
            <span>用药天数</span>
          </template>
          <template v-slot:default="{ row }">
            <el-form v-bind:model="row"
                     v-bind:show-message="false"
                     v-on:submit.native.prevent>
              <el-form-item inline-message
                            prop="useDrugDays"
                            required>
                <div class="flex justify-center items-center">
                  <el-input-number v-model="row.useDrugDays"
                                   class="editable col"
                                   controls-position="right"
                                   placeholder="请输入"
                                   v-bind:max="60"
                                   v-bind:min="1"
                                   v-on:change="calculateCount(row)"></el-input-number>
                </div>
              </el-form-item>
            </el-form>
          </template>
        </PeaceTableColumn>

        <PeaceTableColumn label="药品数量"
                          width="190px">
          <template v-slot:header>
            <span class="text-red">*</span>
            <span>药品数量</span>
          </template>
          <template v-slot:default="{ row }">
            <el-form inline
                     v-bind:model="row"
                     v-bind:show-message="false"
                     v-on:submit.native.prevent>
              <el-form-item prop="drugNum"
                            required
                            style="margin: 0 4px 0 0;">
                <el-input-number v-model="row.drugNum"
                                 class="editable"
                                 controls-position="right"
                                 placeholder="请输入"
                                 style="width: 80px"
                                 v-bind:min="1"
                                 v-bind:precision="0"></el-input-number>
              </el-form-item>

              <el-form-item prop="drugQuantityUnit"
                            required
                            style="margin: 0;">
                <el-select v-model="row.drugQuantityUnit"
                           style="width: 80px;"
                           v-on:change="() => {
                                                calculateCount(row)
                                                changeDrugQuantityUnit(row)
                                              }">
                  <el-option v-for="item in row.splitZeroList"
                             v-bind:key="item.packageUnitTag"
                             v-bind:label="item.unit"
                             v-bind:value="item.unit"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </template>
        </PeaceTableColumn>

        <PeaceTableColumn label="操作"
                          width="55px">
          <template v-slot:default="scope">
            <el-button type="text text-grey-333"
                       v-on:click="deleteDrugList(scope.row)">删除
            </el-button>
          </template>
        </PeaceTableColumn>
      </PeaceTable>

      <el-alert v-if="isColdStorag"
                show-icon=""
                title="处方中有冷藏储存的药品，请提醒患者到店/院自提"
                type="warning"
                v-bind:closable="false"></el-alert>
    </div>

    <el-autocomplete v-model="queryDrugString"
                     class="q-mb-md full-width"
                     placeholder="+ 添加药品（最多可添加 5 种药品）"
                     popper-class="el-autocomplete-drug"
                     size="medium"
                     suffix-icon="el-icon-search"
                     v-bind:fetch-suggestions="getDrugList"
                     v-on:select="selectDrugList">
      <template v-slot:default="{ item }">
        <div class="flex q-py-sm el-autocomplete-drug-item"
             v-bind:class="{ disabled: item.drugStock === 0 }">
          <div class="col q-mr-md ellipsis">
            <span v-if="item.drugStatus === 'disable'"
                  class="disable_tags">停用</span>
            <span v-if="item.isMedical === 1"
                  class="medical_tags">医保</span>
            <span class="text-grey-333"
                  v-bind:title="item.drugName">{{ item.drugName }}</span>
          </div>
          <div class="q-mr-md ellipsis"
               style="width: 120px;">
            <span class="text-grey-333"
                  v-bind:title="item.specification">{{ item.specification }}</span>
          </div>
          <div class="col q-mr-md ellipsis">
            <span class="text-grey-333"
                  v-bind:title="item.companyName">{{ item.companyName }}</span>
          </div>
          <div style="width: 60px;">
            <span v-if="item.drugStock === 0"
                  class="text-grey-333">暂无库存</span>
          </div>
        </div>
      </template>
    </el-autocomplete>

    <PeaceDialog v-if="historyPrescriptionDialog.visible"
                 title="历史处方"
                 v-bind:visible.sync="historyPrescriptionDialog.visible"
                 width="800px">
      <PeaceTable ref="table"
                  pagination>
        <PeaceTableColumn label="疾病诊断"
                          min-width="160px"
                          prop="diagnosis">
          <template v-slot:default="scope">{{ scope.row.diagnoseList.map((item) => item.name).join(' | ') }}</template>
        </PeaceTableColumn>
        <PeaceTableColumn label="处方药品"
                          min-width="300px"
                          prop="drugjson">
          <template v-slot:default="scope">
            <div v-for="drug in scope.row.drugList"
                 v-bind:key="drug.durgId"
                 class="q-mb-sm">
              <div>

                <span v-if="drug.drugStatus === 'disable'"
                      class="disable_tags">停用</span>
                <span v-if="drug.isMedical === 1"
                      class="medical_tags">医保</span>
                <span class="text-weight-bold q-mr-md">{{ drug.drugName }}</span>
                <span class="text-caption">{{ drug.specification }}</span>
              </div>
              <span>用法用量：</span>
              <span>每次{{ drug.singleDose }}{{ drug.drugUnit }}</span>
              <span>，{{ drug.drugFrequency }}</span>
              <span>，{{ drug.drugRoute }}</span>
              <span v-if="drug.useDrugDays">，{{ drug.useDrugDays }}天</span>
            </div>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn fixed="right"
                          label="操作"
                          v-bind:show-overflow-tooltip="false"
                          width="80px">
          <template v-slot:default="scope">
            <el-button type="text"
                       v-on:click="checkHistoryPrescription(scope.row)">选择
            </el-button>
          </template>
        </PeaceTableColumn>
      </PeaceTable>
    </PeaceDialog>
  </div>
</template>

<script>
import Service from './service'

export default {
  props: {

    value: {
      type: Array,
      default() {
        return []
      }
    },

    prescriptionTag: Number,

    type: String,
    scene: {
      type: String,
      required: true
    },
    patientNo: String,
    inquiryNo: String,
    familyId: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      queryDrugString: '',

      isColdStorag: false,

      model: {
        prescriptionTag: undefined
      },

      source: {
        drugFrequencyList: [],
        drugRouteList: [],
        prescriptionTag: []
      },

      commonlyPrescriptionDialog: {
        visible: false
      },

      historyPrescriptionDialog: {
        visible: false
      }
    }
  },

  watch: {
    value(value) {
      // 当选择药品发生变化后，判断是否有冷藏药品，提示用户
      this.isColdStorag = this.value.filter((item) => item.coldStorage === 1).length > 0

      // 当选择药品发生变化后，处理是否选择了最小单位/包装单位，修改行数据 packageUnitTag = '最小单位/包装单位'
      this.value.forEach((row) => this.changeDrugQuantityUnit(row))

      // v-model 语法糖，通知父组件自动更新绑定值
      this.$emit('input', value)
    },

    prescriptionTag: {
      handler() {
        // 由 props 传递的处方类型, 设定互斥锁
        this.__lockRpCheck = this.prescriptionTag
        this.model.prescriptionTag = this.prescriptionTag
      },
      immediate: true
    },

    'model.prescriptionTag'(newValue, oldValue) {
      // 验证互斥锁
      if (this.__lockRpCheck !== undefined && this.__lockRpCheck === newValue) {
        this.__lockRpCheck = undefined
        return
      }

      if (this.value.length) {
        this.$confirm('一张处方中只可开具同类药品目录，更换类型则已添加药品将清空，请确认', '提示', {center: true})
            .then(() => {
              this.value.splice(0, this.value.length)

              this.$emit('update:prescriptionTag', newValue)
            })
            .catch(() => {
              // 设定互斥锁
              this.__lockRpCheck = oldValue
              this.model.prescriptionTag = oldValue

              this.$emit('update:prescriptionTag', oldValue)
            })
      } else {
        this.$emit('update:prescriptionTag', newValue)
      }
    }
  },

  created() {
    this.getDictionary()
  },

  async mounted() {
    this.source.prescriptionTag = await Service.getPrescriptionSourceType({
      source: this.scene,
      inquiryNo: this.inquiryNo,
      familyId: this.familyId
    })

    if (this.prescriptionTag) {
      this.model.prescriptionTag = this.prescriptionTag
    } else {
      const tmp = this.source.prescriptionTag.filter((item) => `${item.selected}` === "1")
      this.model.prescriptionTag = tmp.value ?? 1
    }


  },

  methods: {

    getDictionary() {
      const userInfo = this.$store.state.user?.userInfo
      const params = {
        hospitalId: userInfo?.list?.docInfo?.netHospital_id
      }

      Service.drugFrequencyList(params).then((res) => {
        this.source.drugFrequencyList = res.data
      })
      Service.drugUsageList(params).then((res) => {
        this.source.drugRouteList = res.data
      })
    },

    /**
     * @description: 自动计算药品数量
     * @param {*} row
     * @return {*}
     */
    calculateCount(row) {
      if (row.drugNature === 1) {
        const 单次剂量 = parseFloat(row.singleDose)
        const 用药天数 = parseFloat(row.useDrugDays)
        const 用药频次 = parseFloat(this.source.drugFrequencyList.find((item) => item.id === row.drugFrequencyId)?.frequencyValue)

        // 包装单位
        // 药品数量 （包装单位）= (单次剂量 * 用药天数 * 用药频次) / (基础规格 * 包装规格)
        if (row.splitZeroList.find((item) => item.unit === row.drugQuantityUnit)?.packageUnitTag === 'packageUnit') {
          const 基础规格_包装规格 = parseFloat(row.splitZeroList.find((item) => item.unit === row.drugQuantityUnit)?.value)
          const 药品数量 = (单次剂量 * 用药天数 * 用药频次) / 基础规格_包装规格

          if (!Number.isNaN(药品数量) && Number.isFinite(药品数量)) {
            row.drugNum = Math.ceil(药品数量)
          }
        }

        // 最小单位
        // 药品数量（最小单位）=(单次剂量 * 频次系数 * 用药天数) / (基本剂量)
        if (row.splitZeroList.find((item) => item.unit === row.drugQuantityUnit)?.packageUnitTag === 'minUnit') {
          const 基本剂量 = parseFloat(row.splitZeroList.find((item) => item.unit === row.drugQuantityUnit)?.value)
          const 药品数量 = (单次剂量 * 用药天数 * 用药频次) / 基本剂量

          if (!Number.isNaN(药品数量) && Number.isFinite(药品数量)) {
            row.drugNum = Math.ceil(药品数量)
          }
        }
      }
    },

    getDrugList(queryString, cb) {
      const params = {drugName: queryString, prescriptionTag: this.model.prescriptionTag}
      const fetch = params.drugName ? Service.getDrugList : Service.getCommonlyDrugList

      fetch(params)
          .then((res) => cb(res.data.list))
          .finally(() => {
            const popperPanel = document.body.querySelectorAll('.el-autocomplete-drug-item.disabled')

            // 禁用点击事件
            popperPanel.forEach((dom) => {
              dom.parentElement.style.pointerEvents = 'none'
              dom.parentElement.style.cursor = 'not-allowed'
            })
          })
    },

    async selectDrugList(drug) {
      const drugObject = Peace.util.deepClone(drug)

      // 是否库存为 0
      if (drugObject.drugStock === 0) {
        return /* Peace.util.warning(`该药品库存不足，已为您通知运营补货`) */
      }
      // 是否重复选择
      if (this.value.some((item) => item.drugId === drug.drugId)) {
        return Peace.util.warning(`您已添加该药品，请勿重复添加`)
      }

      // 选择药品时，单次剂量不能带入
      drugObject.singleDose = undefined

      //获取药品推荐数据并赋值
      await this.getRecommendDrugInfo(drugObject)

      // 添加到药品列表
      this.value.push(drugObject)
      // 交互性优化，选中药品后，焦点第一个需要输入的 input
      this.$nextTick(() => {
        this.$el.querySelector(`#row-${this.value.length - 1}-component input`)?.focus()
      })
    },

    async getRecommendDrugInfo(drugObject) {
      const params = {
        drugId: drugObject.drugId
      }
      await Service.getRecommendDrugInfo(params).then((res) => {
        const infoBean = res.data.info
        drugObject.singleDose = infoBean.drugUseValue || undefined
        drugObject.drugFrequency = infoBean.recommendFrequency || undefined
        drugObject.drugFrequencyId = infoBean.recommendFrequencyId || undefined
        drugObject.drugRoute = infoBean.recommendRoute || undefined
        drugObject.drugRouteId = infoBean.recommendRouteId || undefined
      })
    },

    deleteDrugList(drug) {
      this.$confirm(`确定从处方中删除【${drug.drugName}】`, '提示', {center: true}).then(() => {
        const drugIndex = this.value.findIndex((item) => item.drugId === drug.drugId)

        this.value.splice(drugIndex, 1)
      })
    },

    validDrugList() {
      let validObj = {
        isValid: true,
        message: ''
      }

      for (let index = 0; index < this.value.length; index++) {
        const drug = this.value[index]

        if (drug.drugId && drug.drugName) {
          // 验证单次剂量
          if (Peace.validate.isEmpty(drug.singleDose)) {
            validObj = {
              isValid: false,
              message: `【${drug.drugName}】请输入单次剂量`
            }

            break
          }

          // 验证用药频次
          if (Peace.validate.isEmpty(drug.drugFrequencyId)) {
            validObj = {
              isValid: false,
              message: `【${drug.drugName}】请选择用药频次`
            }

            break
          }

          // 验证给药途径
          if (Peace.validate.isEmpty(drug.drugRouteId)) {
            validObj = {
              isValid: false,
              message: `【${drug.drugName}】请选择给药途径`
            }

            break
          }

          // 验证用药天数
          if (Peace.validate.isEmpty(drug.useDrugDays)) {
            validObj = {
              isValid: false,
              message: `【${drug.drugName}】请输入用药天数`
            }

            break
          }

          // 验证药品数量
          if (Peace.validate.isEmpty(drug.drugNum)) {
            validObj = {
              isValid: false,
              message: `【${drug.drugName}】请输入药品数量`
            }

            break
          }

          // 验证药品单位
          if (Peace.validate.isEmpty(drug.drugQuantityUnit)) {
            validObj = {
              isValid: false,
              message: `【${drug.drugName}】请输入药品单位`
            }

            break
          }
        }
      }

      return validObj
    },

    formatNumeral(object, property, formatString) {
      if (object[property]) {
        object[property] = Peace.numeral(object[property]).format(formatString)
      }
    },

    checkHistoryPrescription(row) {
      const notifyAlreadySelect = () => {
        return new Promise((resolve) => {
          if (this.value && this.value.length > 0) {
            return Peace.util.confirm('选择历史处方，将清除已选药品', '提示', {}, resolve)
          } else {
            return resolve()
          }
        })
      }

      const notifyDrguSource = () => {
        return new Promise((resolve) => {
          const excludeDrug = row.newDrugList.filter((item) => item.drugSource !== this.model.prescriptionTag)

          if (excludeDrug && excludeDrug.length > 0) {
            const excludeDrugMessName = excludeDrug.map((item) => `【${item.drugName}】`).join('、')
            const message = `${excludeDrugMessName} 不属于${this.model.prescriptionTag === 1 ? '院内' : '外延'}处方目录药品，不能添加`
            Peace.util.warning(message)
          }

          return resolve()
        })
      }

      const mergeDrug = () => {
        const includeDrug = row.newDrugList.filter((item) => item.drugSource === this.model.prescriptionTag)

        includeDrug.forEach((drug) => {
          drug.drugNum = drug.drugNum ?? undefined
          drug.singleDose = drug.singleDose ?? undefined
          drug.useDrugDays = drug.useDrugDays ?? undefined
        })

        this.value.splice(0, this.value.length)
        this.value.splice(0, includeDrug.length, ...includeDrug)

        this.commonlyPrescriptionDialog.visible = false
        this.historyPrescriptionDialog.visible = false
      }

      // 1， 提醒选择 - 将覆盖
      // 1， 提醒选择 - 来源不符
      // 2， 选择药品
      notifyAlreadySelect()
          .then(notifyDrguSource)
          .then(mergeDrug)
    },

    getHistoryPrescriptionList() {
      const fetch = Service.getHistoryPrescriptionList
      const params = this.model
      params.scene = this.scene
      params.patientNo = this.patientNo

      this.$refs.table.loadData({fetch, params})
    },

    showHistoryPrescription() {
      this.historyPrescriptionDialog.visible = true

      this.$nextTick().then(() => {
        this.getHistoryPrescriptionList()
      })
    },

    changeDrugQuantityUnit(row) {
      row.packageUnitTag = row.splitZeroList.find((item) => item.unit === row.drugQuantityUnit)?.packageUnitTag
    }
  }
}
</script>

<style>
.el-autocomplete-drug-item {
  border-bottom: 1px solid #f5f5f5;
}
</style>

<style lang="scss" scoped>
.medical_tags {
  font-size: 12px;
  color: #ffffff;
  padding: 1px 4px;
  background: #3099a6;
  border-radius: 2px;
  text-align: center;
  margin-right: 8px;
  max-height: 16px;
}

.disable_tags {
  font-size: 12px;
  color: #ffffff;
  padding: 1px 4px;
  background: #ffa00c;
  border-radius: 2px;
  text-align: center;
  margin-right: 8px;
  max-height: 16px;
}

::v-deep .editable .el-table {
  box-shadow: 0 0 7px 0 rgba(51, 51, 51, 0.1);

  th > .cell {
    padding: 8px 12px;
  }

  td > .cell {
    padding: 0 12px;
  }

  .el-input--suffix .el-input__inner {
    padding-left: 8px;
    padding-right: 30px;
  }

  .el-input-number.is-controls-right .el-input__inner {
    text-align: left;
    padding-left: 8px;
    padding-right: 24px;
  }
}

::v-deep .el-input-number--mini .el-input-number__increase,
::v-deep .el-input-number--mini .el-input-number__decrease {
  width: 20px;
}

::v-deep .editable.el-input .el-input__inner,
::v-deep .editable.el-input-number .el-input__inner,
::v-deep .editable.el-select .el-input__inner {
  border-width: 1px;
}

.el-form .el-form-item--mini.el-form-item {
  margin-bottom: 0;
}
</style>
