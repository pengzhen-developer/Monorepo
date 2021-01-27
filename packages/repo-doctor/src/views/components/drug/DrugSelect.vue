<template>
  <div>
    <div class="flex justify-between q-my-md">
      <el-form inline
               v-bind:model="model">
        <el-form-item v-if="type !== `faceToFace`"
                      required
                      label="Rp 类型：">

          <el-radio-group v-model="model.prescriptionTag">
            <el-radio v-for="item in source.prescriptionTag"
                      v-bind:key="item.value"
                      v-bind:label="item.value"
                      v-bind:disabled="disabledInsideDrug(item)">
              <template v-if="disabledInsideDrug(item)">
                <el-tooltip content=""
                            placement="top"
                            effect="light">
                  <div class="flex items-center justify-center"
                       slot="content">
                    <i style="color: #EA940FFF;"
                       class="el-alert__icon el-icon-warning q-mr-sm"></i>
                    <span>该就诊人在 HIS无建档信息，不能开具院内处方</span>
                  </div>
                  <span>{{ item.label }}</span>
                </el-tooltip>
              </template>
              <template v-else>
                <span>{{ item.label }}</span>
              </template>
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <el-button plain
                 type="primary"
                 v-on:click="showCommonlyPrescription">引用处方</el-button>

    </div>

    <el-card class="q-mb-md"
             v-show="value && value.length > 0">
      <PeaceTable class="editable element-ui-default"
                  v-bind:data="value">
        <PeaceTableColumn label="药品名称"
                          prop="drugName"
                          align="left"
                          min-width="140px">
          <template slot-scope="{ row }">
            <el-tooltip effect="light"
                        placement="top">
              <div class="ellipsis">
                <span>{{ row.drugName }}</span>
              </div>

              <div style="max-width: 200px;"
                   slot="content">
                <div class="flex q-mb-sm">
                  <span class="text-black"
                        style="width: 60px;">药品名称：</span>
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
          </template>
        </PeaceTableColumn>

        <PeaceTableColumn show-overflow-tooltip
                          label="药品规格"
                          prop="specification"
                          align="left"
                          min-width="70px">
          <template slot-scope="{ row }">
            {{ row.specification }}
          </template>
        </PeaceTableColumn>

        <PeaceTableColumn label="单次剂量"
                          align="left"
                          min-width="100px">
          <template slot="header">
            <span class="text-red">*</span>
            <span>单次剂量</span>
          </template>
          <template slot-scope="{ $index, row }">
            <el-form v-on:submit.native.prevent
                     v-bind:show-message="false"
                     v-bind:model="row">
              <el-form-item required
                            prop="singleDose">
                <div class="flex justify-center items-center">
                  <el-input-number class="editable col"
                                   style="width: 90px"
                                   placeholder="请输入"
                                   controls-position="right"
                                   v-on:change="calculateCount(row)"
                                   v-on:blur="formatNumeral(row, 'singleDose', '0.000')"
                                   v-bind:id="`row-${$index}-component`"
                                   v-bind:min="0.001"
                                   v-model="row.singleDose"></el-input-number>
                  <span class="text-caption text-grey-7 q-mx-xs">{{ row.drugUnit }}</span>
                </div>
              </el-form-item>
            </el-form>
          </template>
        </PeaceTableColumn>

        <PeaceTableColumn label="用药频次"
                          align="left"
                          min-width="90px">
          <template slot="header">
            <span class="text-red">*</span>
            <span>用药频次</span>
          </template>
          <template slot-scope="{ row }">
            <el-form v-on:submit.native.prevent
                     v-bind:show-message="false"
                     v-bind:model="row">
              <el-form-item required
                            inline-message
                            prop="drugFrequencyId">
                <el-select clearable
                           class="editable"
                           placeholder="请选择"
                           v-on:change="calculateCount(row)"
                           v-model="row.drugFrequencyId">
                  <el-option v-for="item in source.drugFrequencyList"
                             v-bind:key="item.id"
                             v-bind:label="item.drugtimes_name"
                             v-bind:value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </template>
        </PeaceTableColumn>

        <PeaceTableColumn label="给药途径"
                          align="left"
                          min-width="90px">
          <template slot="header">
            <span class="text-red">*</span>
            <span>给药途径</span>
          </template>
          <template slot-scope="{ row }">
            <el-form v-on:submit.native.prevent
                     v-bind:show-message="false"
                     v-bind:model="row">
              <el-form-item required
                            inline-message
                            prop="drugRouteId">
                <el-select clearable
                           class="editable"
                           placeholder="请选择"
                           v-model="row.drugRouteId">
                  <el-option v-for="item in source.drugRouteList"
                             v-bind:key="item.id"
                             v-bind:label="item.drugway_name"
                             v-bind:value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </template>
        </PeaceTableColumn>

        <PeaceTableColumn label="用药天数"
                          align="left"
                          min-width="90px">
          <template slot="header">
            <span class="text-red">*</span>
            <span>用药天数</span>
          </template>
          <template slot-scope="{ row }">
            <el-form v-on:submit.native.prevent
                     v-bind:show-message="false"
                     v-bind:model="row">
              <el-form-item required
                            inline-message
                            prop="useDrugDays">
                <div class="flex justify-center items-center">
                  <el-input-number class="editable col"
                                   controls-position="right"
                                   placeholder="请输入"
                                   v-bind:min="1"
                                   v-bind:max="60"
                                   v-on:change="calculateCount(row)"
                                   v-model="row.useDrugDays"></el-input-number>
                </div>
              </el-form-item>
            </el-form>
          </template>
        </PeaceTableColumn>

        <PeaceTableColumn label="药品数量"
                          align="left"
                          min-width="100px">
          <template slot="header">
            <span class="text-red">*</span>
            <span>药品数量</span>
          </template>
          <template slot-scope="{ row }">
            <el-form v-on:submit.native.prevent
                     v-bind:show-message="false"
                     v-bind:model="row">
              <el-form-item required
                            prop="drugNum">
                <div class="flex justify-center items-center">
                  <el-input-number class="editable col"
                                   placeholder="请输入"
                                   controls-position="right"
                                   v-bind:min="1"
                                   v-bind:precision="0"
                                   v-model="row.drugNum"></el-input-number>
                  <span class="text-caption text-grey-7 q-mx-xs">{{ row.drugQuantityUnit }}</span>
                </div>
              </el-form-item>
            </el-form>
          </template>
        </PeaceTableColumn>

        <PeaceTableColumn fixed="right"
                          label="操作"
                          width="40px">
          <template slot-scope="scope">
            <span class="cursor-pointer text-caption"
                  v-on:click="deleteDrugList(scope.row)">删除</span>
          </template>
        </PeaceTableColumn>
      </PeaceTable>
    </el-card>

    <el-autocomplete size="medium"
                     class="q-mb-md full-width"
                     suffix-icon="el-icon-search"
                     popper-class="el-autocomplete-drug"
                     placeholder="+ 添加药品（最多可添加 5 种药品）"
                     v-model="queryDrugString"
                     v-bind:fetch-suggestions="getDrugList"
                     v-on:select="selectDrugList">
      <template slot-scope="{ item }">
        <div class="flex q-py-sm el-autocomplete-drug-item"
             v-bind:class="{ disabled: item.drugStock === 0 }">
          <div class="col q-mr-md ellipsis">
            <span class="text-subtitle2"
                  v-bind:title="item.drugName">{{ item.drugName }}</span>
          </div>
          <div class="q-mr-md ellipsis"
               style="width: 120px;">
            <span class="text-grey-6 text-caption"
                  v-bind:title="item.specification">{{ item.specification }}</span>
          </div>
          <div class="col q-mr-md ellipsis">
            <span class="text-grey-6 text-caption"
                  v-bind:title="item.companyName">{{ item.companyName }}</span>
          </div>
          <div style="width: 60px;">
            <span v-if="item.drugStock === 0"
                  class="text-subtitle2 text-grey-6">暂无库存</span>
          </div>
        </div>
      </template>
    </el-autocomplete>

    <peace-dialog v-if="commonlyPrescriptionDialog.visible"
                  v-bind:visible.sync="commonlyPrescriptionDialog.visible"
                  title="常用处方"
                  width="800px">
      <peace-table pagination
                   ref="table">
        <peace-table-column label="疾病诊断"
                            min-width="160px"
                            prop="diagnosis"></peace-table-column>
        <peace-table-column label="性别"
                            width="80px"
                            prop="sex"></peace-table-column>
        <peace-table-column label="年龄"
                            width="120px"
                            prop="age"></peace-table-column>
        <peace-table-column align="left"
                            label="处方药品"
                            min-width="300px"
                            prop="drugjson">
          <template slot-scope="scope">
            <div v-for="drug in scope.row.drugList"
                 v-bind:key="drug.durgId"
                 class="q-mb-sm">
              <div>
                <el-tag class="q-mr-sm"
                        effect="dark"
                        type="warning"
                        v-if="drug.drugStatus === 'disable'">停用</el-tag>
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
        </peace-table-column>
        <peace-table-column v-bind:show-overflow-tooltip="false"
                            fixed="right"
                            label="操作"
                            width="80px">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="checkCommonlyPrescription(scope.row)">选择</el-button>
          </template>
        </peace-table-column>
      </peace-table>
    </peace-dialog>

  </div>
</template>

<script>
import Service from './service'

export default {
  props: {
    isBuilding: Boolean,

    value: {
      type: Array,
      default() {
        return []
      }
    },

    prescriptionTag: {
      type: Number,
      default() {
        return 1
      }
    },

    type: String
  },

  data() {
    return {
      queryDrugString: '',

      model: {
        prescriptionTag: 1
      },

      source: {
        drugFrequencyList: [],
        drugRouteList: [],
        prescriptionTag: [
          { label: '院内处方', value: 1 },
          { label: '外延处方', value: 2 }
        ]
      },

      commonlyPrescriptionDialog: {
        visible: false
      }
    }
  },

  watch: {
    value(value) {
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
        this.$confirm('一张处方中只可开具同类药品目录，更换类型则已添加药品将清空，请确认', '提示', { center: true })
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

  methods: {
    disabledInsideDrug(item) {
      const config = Peace.cache.sessionStorage.get('config')

      if (this.isBuilding === false && item.label === '院内处方' && config.hospitalTag === 'beichen') {
        return true
      } else {
        return false
      }
    },

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

    calculateCount(row) {
      if (row.drugNature === 1) {
        // 药品数量 = (单次剂量 * 用药天数 * 用药频次) /（基础规格 * 包装规格)
        const 单次剂量 = parseFloat(row.singleDose)
        const 用药天数 = parseFloat(row.useDrugDays)
        const 用药频次 = parseFloat(this.source.drugFrequencyList.find((item) => item.id === row.drugFrequencyId)?.frequencyValue)
        const 基础规格_包装规格 = parseFloat(row.drugSpecNum)
        const 药品数量 = (单次剂量 * 用药天数 * 用药频次) / 基础规格_包装规格

        if (!Number.isNaN(药品数量) && Number.isFinite(药品数量)) {
          row.drugNum = Math.ceil(药品数量)
        }
      }
    },

    getDrugList(queryString, cb) {
      const params = { drugName: queryString, prescriptionTag: this.model.prescriptionTag }
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

    selectDrugList(drug) {
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
      // 添加到药品列表
      this.value.push(drugObject)

      // 交互性优化，选中药品后，焦点第一个需要输入的 input
      this.$nextTick(() => {
        this.$el.querySelector(`#row-${this.value.length - 1}-component input`)?.focus()
      })
    },

    deleteDrugList(drug) {
      this.$confirm(`确定从处方中删除【${drug.drugName}】`, '提示', { center: true }).then(() => {
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
          // 验证给药途径
          if (Peace.validate.isEmpty(drug.drugRouteId)) {
            validObj = {
              isValid: false,
              message: `【${drug.drugName}】请选择给药途径`
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

          // 验证单次剂量
          if (Peace.validate.isEmpty(drug.singleDose)) {
            validObj = {
              isValid: false,
              message: `【${drug.drugName}】请输入单次剂量`
            }

            break
          }

          // 验证用药数量
          if (Peace.validate.isEmpty(drug.drugNum)) {
            validObj = {
              isValid: false,
              message: `【${drug.drugName}】请输入用药数量`
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
        }
      }

      return validObj
    },

    formatNumeral(object, property, formatString) {
      if (object[property]) {
        object[property] = Peace.numeral(object[property]).format(formatString)
      }
    },

    showCommonlyPrescription() {
      this.commonlyPrescriptionDialog.visible = true

      this.$nextTick().then(() => {
        this.getCommonlyPrescriptionList()
      })
    },

    getCommonlyPrescriptionList() {
      const fetch = Service.getCommonlyPrescriptionList
      const params = this.model

      this.$refs.table.loadData({ fetch, params })
    },

    checkCommonlyPrescription(row) {
      const notifyAlreadySelect = () => {
        return new Promise((resolve) => {
          if (this.value && this.value.length > 0) {
            return Peace.util.confirm('选择常用处方，将清除已选药品', '提示', {}, resolve)
          } else {
            return resolve()
          }
        })
      }

      const notifyDrguSource = () => {
        return new Promise((resolve) => {
          const excludeDrug = row.drugList.filter((item) => item.drugSource !== this.model.prescriptionTag)

          if (excludeDrug && excludeDrug.length > 0) {
            const excludeDrugMessName = excludeDrug.map((item) => `【${item.drugName}】`).join('、')
            const message = `${excludeDrugMessName} 不属于${this.model.prescriptionTag === 1 ? '院内' : '外延'}处方目录药品，不能添加`
            Peace.util.warning(message)
          }

          return resolve()
        })
      }

      const mergeDrug = () => {
        const includeDrug = row.drugList.filter((item) => item.drugSource === this.model.prescriptionTag)

        includeDrug.forEach((drug) => {
          drug.drugNum = drug.drugNum ?? undefined
          drug.singleDose = drug.singleDose ?? undefined
          drug.useDrugDays = drug.useDrugDays ?? undefined
        })

        this.value.splice(0, this.value.length)
        this.value.splice(0, includeDrug.length, ...includeDrug)

        this.commonlyPrescriptionDialog.visible = false
      }

      // 1， 提醒选择 - 将覆盖
      // 1， 提醒选择 - 来源不符
      // 2， 选择药品
      notifyAlreadySelect()
        .then(notifyDrguSource)
        .then(mergeDrug)
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
::v-deep .el-table.editable {
  td,
  th {
    padding: 4px 0;
  }

  thead {
    color: #000000;
  }

  .cell {
    padding: 2px 4px;
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

::v-deep .editable.el-input .el-input__inner:hover,
::v-deep .editable.el-input-number .el-input__inner:hover,
::v-deep .el-select .el-input__inner:hover,
::v-deep .editable.el-input .el-input__inner:focus,
::v-deep .editable.el-input-number .el-input__inner:focus,
::v-deep .el-select .el-input__inner:focus {
  border-color: var(--q-color-primary);
}

.el-form .el-form-item--mini.el-form-item {
  margin-bottom: 0;
}
</style>