<template>
  <div class="rule-item__content flex items-center q-pa-sm q-mr-md">
    <div class="flex row items-center"
         v-if="isEditing">
      <el-select v-model="model.compatibilityconcRuleList.operator"
                 placeholder="请选择"
                 style="width: 100px; margin-right: 8px;">
        <el-option v-for="item in source.Compare"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>

      <el-input-number v-model="model.compatibilityconcRuleList.concentrationValue"
                       :controls="false"
                       class="q-mr-8 q-ml-8"
                       :precision="5"
                       :min="0.00001"
                       placeholder="请输入"></el-input-number>

      <div v-on:click="addUnit"
           class="input-number-style justify-center">
        <span v-if="!model.compatibilityconcRuleList.concentrationUnit"
              class="text-primary">请选择</span>
        <span>{{ model.compatibilityconcRuleList.concentrationUnit }}</span>
      </div>

    </div>

    <div class="flex row items-center"
         v-else>

      <span class="q-mr-8"> {{model.compatibilityconcRuleList.operator | filterDictionary(source.Compare,'--')}}</span>
      <span class="q-mr-8">{{ model.compatibilityconcRuleList.concentrationValue }}</span>
      <span>{{ model.compatibilityconcRuleList.concentrationUnit }}</span>

    </div>

    <!-- 选择单位 -->
    <PeaceDialog append-to-body
                 :close-on-click-modal="false"
                 :close-on-press-escape="false"
                 :visible.sync="dialog.visible"
                 title="请选择单位"
                 v-if="dialog.visible"
                 width="500px">
      <ChoiceUnitDialog v-on:onSuccess="editIndication"
                        v-bind:data="dialog.data"
                        v-on:onClose="dialog.visible = false" />
    </PeaceDialog>
  </div>
</template>

<script>
import CONSTANT from '../constant'
import ChoiceUnitDialog from './ChoiceUnitDialog'
export default {
  props: {
    model: Object,
    isEditing: {
      required: false,
      type: Boolean,
      default: true
    }
  },
  components: {
    ChoiceUnitDialog
  },
  data() {
    return {
      source: {
        Compare: []
      },
      dialog: {
        visible: false,
        data: {}
      }
    }
  },

  async mounted() {
    this.source.Compare = await Peace.identity.dictionary.getList('compare')
  },

  methods: {
    addUnit() {
      this.dialog.data.doseUnit = this.model.compatibilityconcRuleList.concentrationUnit
      this.dialog.data.unitType = this.model.compatibilityconcRuleList.unitType
      this.dialog.visible = true
    },

    editIndication(data) {
      this.model.compatibilityconcRuleList.concentrationUnit = data.unit
      this.model.compatibilityconcRuleList.unitType = data.unitType
      this.dialog.visible = false
    },

    verificationResults() {
      const tmp = this.model.compatibilityconcRuleList
      if (tmp.concentrationUnit && (tmp.concentrationValue || tmp.concentrationValue === 0) && tmp.unitType) {
        return CONSTANT.RULE_VALIDATION_RESULTS.已完成
      } else {
        if (tmp.concentrationUnit || tmp.concentrationValue || tmp.concentrationValue === 0 || tmp.unitType) {
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
::v-deep .el-input-number .el-input__inner {
  text-align: left;
}
</style>
