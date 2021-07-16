<template>
  <div>
    <PeaceDialog title="请设置规则审查条件"
                 v-bind:visible.sync="visible"
                 width="540px">

      <div v-if="ignoreType!=='ageRuleItemList'"
           class="item-style">
        <el-checkbox v-model="models.Age.checked" />
        <span class="item-title">年龄</span>
        <el-select v-model="models.Age.humanCode"
                   placeholder="请选择"
                   style="width: 86px; margin-right: 8px;"
                   v-on:change="onAgeChange">
          <el-option v-for="item in source.humanCodeList"
                     :key="item.id"
                     :label="item.name"
                     :value="item.id">
          </el-option>
        </el-select>

        <div class="input-number-style">
          <el-input-number v-model.trim="models.Age.value1"
                           :controls="false"
                           :disabled="ageDisable"
                           :max="parseInt(models.Age.value2)"
                           :min="0"
                           placeholder="请输入"></el-input-number>
          <span>至</span>
          <el-input-number v-model.trim="models.Age.value2"
                           :controls="false"
                           :disabled="ageDisable"
                           :min="parseInt(models.Age.value1) || 0"
                           placeholder="请输入"></el-input-number>
        </div>

        <el-select v-model="models.Age.value3"
                   :disabled="ageDisable"
                   placeholder="请选择"
                   style="width: 80px; margin-right: 8px;">
          <el-option v-for="item in utilList"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </div>

      <div class="item-style">
        <el-checkbox v-model="models.Weight.checked" />
        <span class="item-title">体重范围</span>
        <div class="input-number-style">
          <el-input-number v-model.trim="models.Weight.value1"
                           :controls="false"
                           :max="parseFloat(models.Weight.value2)"
                           :min="0"
                           :precision="2"
                           placeholder="请输入"></el-input-number>
          <span>至</span>
          <el-input-number v-model.trim="models.Weight.value2"
                           :controls="false"
                           :min="parseFloat(models.Weight.value1) || 0"
                           :precision="2"
                           placeholder="请输入"></el-input-number>
        </div>
        <span>kg</span>
      </div>

      <div class="item-style">
        <el-checkbox v-model="models.WeightSize.checked" />
        <span class="item-title">体重大小</span>
        <el-select v-model="models.WeightSize.value1"
                   placeholder="请选择"
                   style="width: 100px; margin-right: 8px;">
          <el-option v-for="item in weightList"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
        <el-input-number v-model.trim="models.WeightSize.value2"
                         :controls="false"
                         :precision="2"
                         class="q-mr-8"
                         placeholder="请输入"
                         style="width:150px"></el-input-number>
        <span>kg</span>
      </div>

      <div v-if="ignoreType!=='diagnosisRuleItemList'"
           class="item-style start"
           v-on:click="addIndication">
        <el-checkbox v-model="models.Indication.checked"
                     @click.native="stopDefault($event)" />
        <span class="item-title">适应症</span>
        <span class="q-mr-md">属于</span>
        <span v-if="models.Indication.listValue.length === 0"
              class="text-primary">请选择</span>
        <div v-else
             class="col">
          <el-tag v-for="item in models.Indication.listValue"
                  v-bind:key="item.code"
                  class="q-mr-4 q-mb-4"
                  type="info">{{ item.name }}
          </el-tag>
        </div>
      </div>

      <div v-if="ignoreType!=='humanClassifyRuleItemList'"
           class="item-style start"
           v-on:click="addHumanClassify">
        <el-checkbox v-model="models.HumanClassify.checked"
                     @click.native="stopDefault($event)" />
        <span class="item-title">人群</span>
        <span class="q-mr-md">属于</span>
        <span v-if="models.HumanClassify.listValue.length === 0"
              class="text-primary">请选择</span>
        <div v-else
             class="col">
          <el-tag v-for="item in models.HumanClassify.listValue"
                  v-bind:key="item.code"
                  class="q-mr-4 q-mb-4"
                  type="info">{{ item.name }}
          </el-tag>
        </div>
      </div>

      <div v-if="ignoreType!=='routeRuleItemList'"
           class="item-style start"
           v-on:click="addRoute">
        <el-checkbox v-model="models.Route.checked"
                     @click.native="stopDefault($event)" />
        <span class="item-title">给药途径</span>
        <el-select v-model="models.Route.contain"
                   class="q-mr-md"
                   placeholder="请选择"
                   style="width: 86px">
          <el-option v-for="item in containList"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
        <span v-if="models.Route.listValue.length === 0"
              class="text-primary"
              type="text">请选择</span>
        <div v-else
             class="col">
          <el-tag v-for="item in models.Route.listValue"
                  v-bind:key="item.code"
                  class="q-mr-4 q-mb-4"
                  type="info">{{ item.name }}
          </el-tag>
        </div>
      </div>

      <div v-if="ignoreType!=='genderRule'"
           class="item-style">
        <el-checkbox v-model="models.Gender.checked" />
        <span class="item-title">性别</span>
        <el-select v-model="models.Gender.value1"
                   placeholder="请选择"
                   style="width: 60px; margin-right: 8px;">
          <el-option v-for="item in sexList"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </div>

      <span class="text-red q-ml-10">*同时满足勾选条件才审查该规则</span>
      <div class="el-dialog__footer">
        <el-button class="btn"
                   v-on:click="cancel">取消
        </el-button>
        <el-button class="btn"
                   type="primary"
                   v-on:click="save">保存
        </el-button>
      </div>

    </PeaceDialog>

    <indication-view v-if="indicationDialogOptions.visible"
                     v-model="indicationDialogOptions.visible"
                     v-bind:model="indicationDialogOptions.data"
                     v-on:onSuccess="editIndication"></indication-view>
    <IndicationThreeView v-if="indicationDialogOptionsThree.visible"
                         v-model="indicationDialogOptionsThree.visible"
                         v-bind:model="indicationDialogOptionsThree.data"
                         v-on:onSuccess="editIndication"></IndicationThreeView>

    <choice-crowd-dialog v-if="choiceCrowdDialogOptions.visible"
                         v-model="choiceCrowdDialogOptions.visible"
                         v-bind:model="choiceCrowdDialogOptions.data"
                         v-on:onSuccess="editCrowd"></choice-crowd-dialog>
    <ChoiceCrowdThreeDialog v-if="choiceCrowdDialogOptionsThree.visible"
                            v-model="choiceCrowdDialogOptionsThree.visible"
                            v-bind:model="choiceCrowdDialogOptionsThree.data"
                            v-on:onSuccess="editCrowd"></ChoiceCrowdThreeDialog>

    <delivery-way-dialog v-if="deliveryWayDialogOptions.visible"
                         v-model="deliveryWayDialogOptions.visible"
                         v-bind:model="deliveryWayDialogOptions.data"
                         v-on:onSuccess="editDeliveryWay"></delivery-way-dialog>
    <DeliveryWayThreeDialog v-if="deliveryWayDialogOptionsThree.visible"
                            v-model="deliveryWayDialogOptionsThree.visible"
                            v-bind:model="deliveryWayDialogOptionsThree.data"
                            v-on:onSuccess="editDeliveryWay"></DeliveryWayThreeDialog>
  </div>
</template>

<script>
import Service from '../service/index'
import IndicationView from './IndicationView'
import IndicationThreeView from './IndicationThreeView'

import ChoiceCrowdDialog from './ChoiceCrowdDialog'
import ChoiceCrowdThreeDialog from './ChoiceCrowdThreeDialog'

import DeliveryWayDialog from './DeliveryWayDialog'
import DeliveryWayThreeDialog from './DeliveryWayThreeDialog'
import obPreconditionDic from '../observable/ob-precondition-dic'
export default {
  props: {
    value: {
      required: true,
      type: Boolean
    },
    IndexParams: {
      required: true,
      type: Object
    },
    model: {
      required: false,
      type: Object
    },
    ignoreType: {
      required: false,
      type: String
    },
    drugType: {
      required: true,
      type: String,
      validator(value) {
        return ['platform', 'department', 'org'].includes(value)
      }
    }
  },
  components: {
    IndicationView,
    IndicationThreeView,
    ChoiceCrowdDialog,
    ChoiceCrowdThreeDialog,
    DeliveryWayDialog,
    DeliveryWayThreeDialog
  },
  data() {
    return {
      isLoading: false,
      visible: this.value,
      source: {
        humanCodeList: []
      },
      models: {
        Age: {
          checked: false,
          humanCode: '',
          value1: undefined,
          value2: undefined,
          value3: undefined,
          ceType: 'Age',
          name: '年龄'
        },
        Weight: {
          checked: false,
          value1: undefined,
          value2: undefined,
          ceType: 'Weight',
          name: '体重范围'
        },
        WeightSize: {
          checked: false,
          value1: '>',
          value2: undefined,
          ceType: 'WeightSize',
          name: '体重大小'
        },
        Indication: {
          checked: false,
          listValue: [],
          ceType: 'Indication',
          name: '适应症'
        },
        HumanClassify: {
          checked: false,
          listValue: [],
          ceType: 'HumanClassify',
          name: '人群'
        },
        Route: {
          checked: false,
          contain: '0',
          listValue: [],
          ceType: 'Route',
          name: '给药途径'
        },
        Gender: {
          checked: false,
          value1: '男',
          ceType: 'Gender',
          name: '性别'
        }
      },
      indicationDialogOptions: {
        visible: false,
        data: undefined
      },
      indicationDialogOptionsThree: {
        visible: false,
        data: undefined
      },
      choiceCrowdDialogOptions: {
        visible: false,
        data: undefined
      },
      choiceCrowdDialogOptionsThree: {
        visible: false,
        data: undefined
      },
      deliveryWayDialogOptions: {
        visible: false,
        data: undefined
      },
      deliveryWayDialogOptionsThree: {
        visible: false,
        data: undefined
      }
    }
  },

  created() {
    if (Object.keys(this.model).length > 0) {
      const models = Object.assign({}, this.models, this.model)
      this.models = Peace.util.deepClone(models)
    }
    this.$nextTick(() => {
      this.getPlatformAgeClass()
    })
  },

  computed: {
    utilList: () => obPreconditionDic.state.utilList,
    weightList: () => obPreconditionDic.state.weightList,
    containList: () => obPreconditionDic.state.containList,
    sexList: () => obPreconditionDic.state.sexList,
    ageDisable() {
      return this.models.Age.humanCode !== ''
    }
  },

  watch: {
    value(value) {
      this.visible = value
    },

    visible(value) {
      this.$emit('input', value)
    },

    'models.Weight.checked': {
      handler(value) {
        if (value) {
          this.models.WeightSize.checked = false
        }
      },
      immediate: true
    },

    'models.WeightSize.checked': {
      handler(value) {
        if (value) {
          this.models.Weight.checked = false
        }
      },
      immediate: true
    }
  },

  methods: {
    cancel() {
      this.visible = false
    },
    stopDefault(e) {
      e.stopPropagation()
    },

    getPlatformAgeClass() {
      Service.getPlatformAgeClass().then((res) => {
        const tmp = {
          id: '',
          name: '自定义',
          ageMin: undefined,
          ageMax: undefined,
          ageUnit: undefined,
          ageUnitEn: undefined
        }
        this.source.humanCodeList = [tmp, ...res.data]
      })
    },

    onAgeChange(val) {
      if (Peace.validate.isEmpty(val)) {
        this.models.Age.value1 = undefined
        this.models.Age.value2 = undefined
        this.models.Age.value3 = undefined
      } else {
        const item = this.source.humanCodeList.find((item) => item.id === val)
        if (item) {
          this.models.Age.value1 = item.ageMin
          this.models.Age.value2 = item.ageMax
          this.models.Age.value3 = item.ageUnitEn
        }
      }
    },

    save() {
      let result = false
      const params = {}
      for (let key in this.models) {
        const item = this.models[key]
        if (item.checked) {
          if (!this.checked(item)) {
            Peace.util.warning(`${item.name} 未填写完整`)
            result = false
            return
          } else {
            params[`${key}`] = { ...item }
            result = true
          }
        }
      }
      if (result) {
        this.$emit('preconditionInfo', {
          IndexParams: { ...this.IndexParams },
          data: params
        })
      } else {
        //Peace.util.alert(`前置规则 ${item.ceType} 未完成编辑不能保存`)
        this.visible = false
      }
    },

    addIndication() {
      if (this.drugType === 'platform') {
        this.indicationDialogOptions.data = [...this.models.Indication.listValue]
        this.indicationDialogOptions.visible = true
      } else if (this.drugType === 'org' || this.drugType === 'department') {
        this.indicationDialogOptionsThree.data = [...this.models.Indication.listValue]
        this.indicationDialogOptionsThree.visible = true
      }
    },

    editIndication(data) {
      if (this.drugType === 'platform') {
        this.indicationDialogOptions.visible = false
      } else if (this.drugType === 'org' || this.drugType === 'department') {
        this.indicationDialogOptionsThree.visible = false
      }
      this.models.Indication.listValue = data
    },

    addHumanClassify() {
      if (this.drugType === 'platform') {
        this.choiceCrowdDialogOptions.data = [...this.models.HumanClassify.listValue]
        this.choiceCrowdDialogOptions.visible = true
      } else if (this.drugType === 'org' || this.drugType === 'department') {
        this.choiceCrowdDialogOptionsThree.data = [...this.models.HumanClassify.listValue]
        this.choiceCrowdDialogOptionsThree.visible = true
      }
    },

    editCrowd(data) {
      if (this.drugType === 'platform') {
        this.choiceCrowdDialogOptions.visible = false
      } else if (this.drugType === 'org' || this.drugType === 'department') {
        this.choiceCrowdDialogOptionsThree.visible = false
      }
      this.models.HumanClassify.listValue = data
    },

    addRoute() {
      if (this.drugType === 'platform') {
        this.deliveryWayDialogOptions.data = [...this.models.Route.listValue]
        this.deliveryWayDialogOptions.visible = true
      } else if (this.drugType === 'org' || this.drugType === 'department') {
        this.deliveryWayDialogOptionsThree.data = [...this.models.Route.listValue]
        this.deliveryWayDialogOptionsThree.visible = true
      }
    },

    editDeliveryWay(data) {
      if (this.drugType === 'platform') {
        this.deliveryWayDialogOptions.visible = false
      } else if (this.drugType === 'org' || this.drugType === 'department') {
        this.deliveryWayDialogOptionsThree.visible = false
      }
      this.models.Route.listValue = data
    },

    checked(item) {
      switch (item.ceType) {
        case 'Age':
          return (item.humanCode || item.humanCode === '') && (item.value1 || item.value1 === 0) && item.value2 && item.value3
        case 'Weight':
          return (item.value1 || item.value1 === 0) && (item.value2 || item.value2 === 0)
        case 'WeightSize':
          return (item.value1 || item.value1 === 0) && (item.value2 || item.value2 === 0)
        case 'Indication':
          return item.listValue && item.listValue.length > 0
        case 'HumanClassify':
          return item.listValue && item.listValue.length > 0
        case 'Route':
          return item.contain && item.listValue && item.listValue.length > 0
        case 'Gender':
          return item.value1
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.item-style {
  display: flex;
  margin-bottom: 24px;
  margin-left: 10px;
  margin-right: 10px;
  align-items: center;

  .item-title {
    width: 60px !important;
    margin-right: 16px;
  }

  .input-number-style {
    width: 150px;
    height: 34px;
    border-radius: 4px;
    border: 1px solid #e4e4e4;
    padding-top: 2px;
    padding-bottom: 2px;
    display: flex;
    align-items: center;
    margin-right: 8px;

    ::v-deep {
      .el-input__inner {
        border: 0;
        text-align: center;
      }
    }
  }
}

.start {
  align-items: start;
}
</style>
