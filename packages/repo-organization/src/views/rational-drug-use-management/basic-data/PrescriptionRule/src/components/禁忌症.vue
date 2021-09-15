<template>
  <div class="rule-item__content flex items-center q-pa-sm q-mr-md">
    <div v-if="isEditing"
         class="flex  items-center">
      <span class="q-mr-md text-red">属于</span>
      <div class="col"
           v-on:click="addTag">
        <span v-if="model.contraindicationItemList.length === 0"
              class="text-primary">请选择</span>
        <el-tag v-for="item in model.contraindicationItemList"
                v-bind:key="item.code"
                class="q-mr-8 q-mb-8"
                type="info">
          {{ item.name }}
        </el-tag>
      </div>
    </div>

    <div class="flex  items-center"
         v-else>
      <span class="q-mr-md text-red">属于</span>
      <div class="flex col">
        <el-tag v-for="item in model.contraindicationItemList"
                v-bind:key="item.code"
                class="q-mr-8 q-mb-8"
                type="info">
          {{ item.name }}
        </el-tag>
      </div>

    </div>

    <ContraindicationsView v-if="dialog.visible"
                           v-model="dialog.visible"
                           v-bind:model="dialog.data"
                           v-on:onSuccess="editIndication"></ContraindicationsView>
    <ContraindicationsThreeView v-if="dialogThree.visible"
                                v-model="dialogThree.visible"
                                v-bind:model="dialogThree.data"
                                v-on:onSuccess="editIndication"></ContraindicationsThreeView>
  </div>
</template>

<script>
import CONSTANT from '../constant'
import ContraindicationsView from './ContraindicationsView'
import ContraindicationsThreeView from './ContraindicationsThreeView'

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
    ContraindicationsView,
    ContraindicationsThreeView
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

  methods: {
    addTag() {
      if (this.drugType === 'platform') {
        this.dialog.visible = true
        this.dialog.data = [...this.model.contraindicationItemList]
      } else if (this.drugType === 'org' || this.drugType === 'department') {
        this.dialogThree.visible = true
        this.dialogThree.data = [...this.model.contraindicationItemList]
      }
    },
    editIndication(data) {
      if (this.drugType === 'platform') {
        this.dialog.visible = false
      } else if (this.drugType === 'org' || this.drugType === 'department') {
        this.dialogThree.visible = false
      }
      this.model.contraindicationItemList = data
    },
    verificationResults() {
      if (this.model.contraindicationItemList.length > 0) {
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
