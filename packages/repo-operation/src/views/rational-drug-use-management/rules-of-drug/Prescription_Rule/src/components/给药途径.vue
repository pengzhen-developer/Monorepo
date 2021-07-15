<template>
  <div class="rule-item__content flex items-center q-pa-sm q-mr-md">
    <el-form ref="validateForm"
             inline
             v-if="isEditing"
             space-none
             class="flex items-center"
             v-bind:show-message="false"
             v-bind:model="model">

      <div class="flex row items-center">
        <el-select v-model="model.routeRuleObj.contain"
                   placeholder="请选择"
                   style="width: 80px; margin-right: 8px;">
          <el-option v-for="item in source.BelongedType"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>

        <div class="col flex row items-center"
             v-on:click="addTag">
          <span v-if="model.routeRuleObj.routeItemList.length === 0"
                class="text-primary">+点击添加</span>
          <el-tag v-for="item in model.routeRuleObj.routeItemList"
                  v-bind:key="item.code"
                  class="q-mr-8 q-mb-8"
                  type="info">
            {{ item.name }}
          </el-tag>
        </div>
      </div>
    </el-form>

    <div class="flex row items-center"
         v-else>
      <span class="q-mr-md text-red">{{model.routeRuleObj.contain | filterDictionary(source.BelongedType,'--')}}</span>
      <div class="col flex row items-center">
        <el-tag v-for="item in model.routeRuleObj.routeItemList"
                v-bind:key="item.code"
                class="q-mr-8 q-mb-8"
                type="info">
          {{ item.name }}
        </el-tag>
      </div>
    </div>

    <DeliveryWayDialog v-if="dialog.visible"
                       v-model="dialog.visible"
                       v-bind:model="dialog.data"
                       v-on:onSuccess="editSuccess"></DeliveryWayDialog>
    <DeliveryWayThreeDialog v-if="dialogThree.visible"
                            v-model="dialogThree.visible"
                            v-bind:model="dialogThree.data"
                            v-on:onSuccess="editSuccess"></DeliveryWayThreeDialog>
  </div>
</template>

<script>
import CONSTANT from '../constant'
import DeliveryWayDialog from './DeliveryWayDialog'
import DeliveryWayThreeDialog from './DeliveryWayThreeDialog'

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
    DeliveryWayDialog,
    DeliveryWayThreeDialog
  },
  data() {
    return {
      source: {
        BelongedType: []
      },
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

  async mounted() {
    this.source.BelongedType = await Peace.identity.dictionary.getList('belonged_type')
  },

  methods: {
    addTag() {
      if (this.drugType === 'platform') {
        this.dialog.visible = true
        this.dialog.data = [...this.model.routeRuleObj.routeItemList]
      } else if (this.drugType === 'org') {
        this.dialogThree.visible = true
        this.dialogThree.data = [...this.model.routeRuleObj.routeItemList]
      }
    },

    editSuccess(data) {
      if (this.drugType === 'platform') {
        this.dialog.visible = false
      } else if (this.drugType === 'org') {
        this.dialogThree.visible = false
      }

      this.model.routeRuleObj.routeItemList = data.map((item) => {
        return { code: item.code, name: item.name }
      })
    },

    verificationResults() {
      const tmp = this.model.routeRuleObj
      if (tmp.routeItemList.length > 0) {
        return CONSTANT.RULE_VALIDATION_RESULTS.已完成
      } else {
        return CONSTANT.RULE_VALIDATION_RESULTS.未开始
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
