<template>
  <div class="rule-item__content flex items-center q-pa-sm q-mr-md">
    <el-form ref="validateForm"
             inline
             space-none
             v-if="isEditing"
             class="flex items-center"
             v-bind:show-message="false"
             v-bind:model="model">

      <div class="flex row items-center">
        <el-select v-model="model.ageRuleList.humanCode"
                   placeholder="请选择"
                   v-on:change="onAgeChange"
                   style="width: 100px; margin-right: 8px;">
          <el-option v-for="item in source.humanCodeList"
                     :key="item.id"
                     :label="item.name"
                     :value="item.id">
          </el-option>
        </el-select>

        <el-input-number v-model="model.ageRuleList.minAge"
                         :controls="false"
                         class="q-mr-8"
                         :precision="0"
                         :disabled="ageDisable"
                         :max="parseInt(model.ageRuleList.maxAge)"
                         :min="0"
                         placeholder="请输入"></el-input-number>

        <span>至</span>

        <el-input-number v-model="model.ageRuleList.maxAge"
                         :controls="false"
                         class="q-mr-8 q-ml-8"
                         :precision="0"
                         :disabled="ageDisable"
                         :min="parseInt(model.ageRuleList.minAge) || 0"
                         placeholder="请输入"></el-input-number>

        <el-select v-model="model.ageRuleList.ageUnit"
                   placeholder="请选择"
                   :disabled="ageDisable"
                   style="width: 80px; margin-right: 8px;">
          <el-option v-for="item in source.AgeType"
                     :key="item.label"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </div>

    </el-form>

    <div class="flex row items-center"
         v-else>
      <span class="q-mr-md text-red">属于</span>
      <span class="q-mr-8">{{ model.ageRuleList.minAge ||  (model.ageRuleList.minAge === 0 ? '0' : '--')  }}</span>
      <span class="q-mr-8">至</span>
      <span class="q-mr-8">{{ model.ageRuleList.maxAge ||  (model.ageRuleList.maxAge === 0 ? '0' : '--')  }}</span>
      <span> {{model.ageRuleList.ageUnit | filterDictionary(source.AgeType,'--')}}</span>
    </div>
  </div>
</template>

<script>
import CONSTANT from '../constant'
import Service from '../service/index'

export default {
  props: {
    model: Object,
    isEditing: {
      required: false,
      type: Boolean,
      default: true
    },
    drugType: {
      required: true,
      type: String,
      validator(value) {
        return ['platform', 'department', 'org'].includes(value)
      }
    }
  },

  data() {
    return {
      source: {
        AgeType: [],
        humanCodeList: []
      }
    }
  },

  computed: {
    ageDisable() {
      return this.model.ageRuleList.humanCode !== ''
    }
  },

  created() {
    this.$nextTick(() => {
      this.getPlatformAgeClass()
    })
  },

  async mounted() {
    this.source.AgeType = await Peace.identity.dictionary.getList('age_type')
  },

  methods: {
    getPlatformAgeClass() {
      if (this.drugType === 'platform') {
        Service.getPlatformAgeClass().then((res) => {
          const tmp = {
            id: '',
            name: '自定义',
            ageMin: undefined,
            ageMax: undefined,
            ageUnit: undefined
          }
          this.source.humanCodeList = [tmp, ...res.data]
          this.source.humanCodeList.map((item) => {
            item.id = String(item.id)
          })
        })
      } else if (this.drugType === 'org' || this.drugType === 'department') {
        Service.getOrgAgeClass().then((res) => {
          const tmp = {
            id: '',
            name: '自定义',
            ageMin: undefined,
            ageMax: undefined,
            ageUnit: undefined
          }
          this.source.humanCodeList = [tmp, ...res.data.records]
          this.source.humanCodeList.map((item) => {
            item.id = String(item.id)
          })
        })
      }
    },
    onAgeChange(val) {
      if (Peace.validate.isEmpty(val)) {
        this.model.ageRuleList.minAge = undefined
        this.model.ageRuleList.maxAge = undefined
        this.model.ageRuleList.ageUnit = undefined
      } else {
        const item = this.source.humanCodeList.find((item) => item.id === val)
        if (item) {
          this.model.ageRuleList.minAge = item.ageMin
          this.model.ageRuleList.maxAge = item.ageMax
          this.model.ageRuleList.ageUnit = item.ageUnit
        }
      }
    },
    verificationResults() {
      const tmp = this.model.ageRuleList
      if ((tmp.minAge || tmp.minAge === 0) && (tmp.maxAge || tmp.maxAge === 0) && tmp.ageUnit) {
        return CONSTANT.RULE_VALIDATION_RESULTS.已完成
      } else {
        if (tmp.minAge || tmp.minAge === 0 || tmp.maxAge || tmp.maxAge === 0 || tmp.ageUnit) {
          return CONSTANT.RULE_VALIDATION_RESULTS.未完成
        } else {
          return CONSTANT.RULE_VALIDATION_RESULTS.未开始
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
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
    }
  }
}
</style>
