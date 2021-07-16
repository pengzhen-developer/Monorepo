<template>
  <div class="rule-item__content flex items-center q-pa-sm q-mr-md">
    <div class="flex row items-center"
         v-if="isEditing">
      <span>不在范围</span>

      <div v-on:click="choiceFrequency"
           class="input-number-style justify-center q-ml-8">
        <span v-if="!model.frequencyRuleList.minFrequencyName"
              class="text-primary">请选择</span>
        <span>{{ model.frequencyRuleList.minFrequencyName }}</span>
      </div>

      <span>至</span>

      <div v-on:click="choiceFrequencyOhter"
           class="input-number-style justify-center  q-ml-8">
        <span v-if="!model.frequencyRuleList.maxFrequencyName"
              class="text-primary">请选择</span>
        <span>{{ model.frequencyRuleList.maxFrequencyName }}</span>
      </div>

    </div>

    <div class="flex row items-center"
         v-else>
      <span class="q-mr-8">不在范围</span>
      <span class="q-mr-8">{{ model.frequencyRuleList.minFrequencyName }}</span>
      <span class="q-mr-8">至</span>
      <span>{{ model.frequencyRuleList.maxFrequencyName }}</span>

    </div>

    <ChoiceDrugUseFrequencyDialog v-if="dialog.visible"
                                  v-model="dialog.visible"
                                  v-bind:model="dialog.data"
                                  v-bind:joinType="dialog.type"
                                  v-on:onSuccess="editIndication"></ChoiceDrugUseFrequencyDialog>
    <ChoiceDrugUseFrequencyThreeDialog v-if="dialogThree.visible"
                                       v-model="dialogThree.visible"
                                       v-bind:model="dialogThree.data"
                                       v-bind:joinType="dialogThree.type"
                                       v-on:onSuccess="editIndication"></ChoiceDrugUseFrequencyThreeDialog>

  </div>
</template>

<script>
import CONSTANT from '../constant'
import ChoiceDrugUseFrequencyDialog from './ChoiceDrugUseFrequencyDialog'
import ChoiceDrugUseFrequencyThreeDialog from './ChoiceDrugUseFrequencyThreeDialog'

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

  components: {
    ChoiceDrugUseFrequencyDialog,
    ChoiceDrugUseFrequencyThreeDialog
  },

  data() {
    return {
      dialog: {
        visible: false,
        data: {},
        type: 0, //0:第一个选择框   1：第二个选择框
        otherCoefficient: ''
      },
      dialogThree: {
        visible: false,
        data: {},
        type: 0, //0:第一个选择框   1：第二个选择框
        otherCoefficient: ''
      }
    }
  },
  computed: {
    description() {
      return `不在范围${this.model.frequencyRuleList.minFrequencyName || '--'}至${this.model.frequencyRuleList.maxFrequencyName || '--'}`
    }
  },
  methods: {
    choiceFrequency() {
      if (this.drugType === 'platform') {
        this.dialog.data = {
          coefficient: this.model.frequencyRuleList.minFrequency,
          name: this.model.frequencyRuleList.minFrequencyName,
          otherCoefficient: this.model.frequencyRuleList.maxFrequency
        }
        this.dialog.type = 0
        this.dialog.visible = true
      } else if (this.drugType === 'org' || this.drugType === 'department') {
        this.dialogThree.data = {
          coefficient: this.model.frequencyRuleList.minFrequency,
          name: this.model.frequencyRuleList.minFrequencyName,
          otherCoefficient: this.model.frequencyRuleList.maxFrequency
        }
        this.dialogThree.type = 0
        this.dialogThree.visible = true
      }
    },
    choiceFrequencyOhter() {
      if (this.drugType === 'platform') {
        this.dialog.data = {
          coefficient: this.model.frequencyRuleList.maxFrequency,
          name: this.model.frequencyRuleList.maxFrequencyName,
          otherCoefficient: this.model.frequencyRuleList.minFrequency
        }
        this.dialog.type = 1
        this.dialog.visible = true
      } else if (this.drugType === 'org' || this.drugType === 'department') {
        this.dialogThree.data = {
          coefficient: this.model.frequencyRuleList.maxFrequency,
          name: this.model.frequencyRuleList.maxFrequencyName,
          otherCoefficient: this.model.frequencyRuleList.minFrequency
        }
        this.dialogThree.type = 1
        this.dialogThree.visible = true
      }
    },
    editIndication(data) {
      if (data.type === 0) {
        this.model.frequencyRuleList.minFrequency = data.coefficient
        this.model.frequencyRuleList.minFrequencyName = data.name
      } else if (data.type === 1) {
        this.model.frequencyRuleList.maxFrequency = data.coefficient
        this.model.frequencyRuleList.maxFrequencyName = data.name
      }
      if (this.drugType === 'platform') {
        this.dialog.visible = false
      } else if (this.drugType === 'org' || this.drugType === 'department') {
        this.dialogThree.visible = false
      }
    },

    verificationResults() {
      const tmp = this.model.frequencyRuleList
      if (tmp.minFrequency && tmp.minFrequencyName && tmp.maxFrequency && tmp.maxFrequencyName) {
        return CONSTANT.RULE_VALIDATION_RESULTS.已完成
      } else {
        if (tmp.minFrequency || tmp.minFrequencyName || tmp.maxFrequency || tmp.maxFrequencyName) {
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
  width: 180px;
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
