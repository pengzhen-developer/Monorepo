<template>
  <div class="rule-item__content flex items-center q-pa-sm q-mr-md">
    <div class="flex  items-center"
         v-if="isEditing">
      <span class="q-mr-md text-red">不属于</span>
      <div class="col"
           v-on:click="addTag">
        <span v-if="model.diagnosisItemList.length === 0"
              class="text-primary">请选择</span>
        <el-tag v-for="item in model.diagnosisItemList"
                v-bind:key="item.code"
                class="q-mr-8 q-mb-8"
                type="info">
          {{ item.name }}
        </el-tag>
      </div>
    </div>

    <div class="flex  items-center"
         v-else>
      <span class="q-mr-md text-red">不属于</span>
      <div class="col">
        <el-tag v-for="item in model.diagnosisItemList"
                v-bind:key="item.code"
                class="q-mr-8 q-mb-8"
                type="info">
          {{ item.name }}
        </el-tag>
      </div>
    </div>

    <indication-view v-if="dialog.visible"
                     v-model="dialog.visible"
                     v-bind:model="dialog.data"
                     v-on:onSuccess="editIndication"></indication-view>
    <IndicationThreeView v-if="dialogThree.visible"
                         v-model="dialogThree.visible"
                         v-bind:model="dialogThree.data"
                         v-on:onSuccess="editIndication"></IndicationThreeView>

  </div>
</template>

<script>
import CONSTANT from '../constant'
import IndicationView from './IndicationView'
import IndicationThreeView from './IndicationThreeView'

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
    IndicationView,
    IndicationThreeView
  },
  data() {
    return {
      dialog: {
        visible: false,
        data: []
      },
      dialogThree: {
        visible: false,
        data: []
      }
    }
  },

  created() {
    if (
      Peace.util.isUndefined(this.model.diagnosisItemList) ||
      Peace.util.isNull(this.model.diagnosisItemList) ||
      !Peace.util.isArray(this.model.diagnosisItemList)
    ) {
      this.model.diagnosisItemList = []
    }
  },

  methods: {
    addTag() {
      if (this.drugType === 'platform') {
        this.dialog.visible = true
        this.dialog.data = [...this.model.diagnosisItemList]
      } else if (this.drugType === 'org' || this.drugType === 'department') {
        this.dialogThree.visible = true
        this.dialogThree.data = [...this.model.diagnosisItemList]
      }
    },
    editIndication(data) {
      if (this.drugType === 'platform') {
        this.dialog.visible = false
      } else if (this.drugType === 'org' || this.drugType === 'department') {
        this.dialogThree.visible = false
      }
      this.model.diagnosisItemList = data
    },

    verificationResults() {
      if (this.model.diagnosisItemList.length > 0) {
        return CONSTANT.RULE_VALIDATION_RESULTS.已完成
      } else {
        return CONSTANT.RULE_VALIDATION_RESULTS.未开始
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.rule-item {
  border-radius: 4px;
}

.rule-item__content {
  border-radius: 4px;
}
</style>
