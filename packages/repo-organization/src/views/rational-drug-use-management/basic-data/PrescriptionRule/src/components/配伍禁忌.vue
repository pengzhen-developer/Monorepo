<template>
  <div class="rule-item__content flex items-center q-pa-sm q-mr-md">
    <div class="flex col"
         v-if="isEditing">
      <div class="col">
        <p>药品成分</p>
        <div v-on:click="addTag">
          <span v-if="model.incompatibilityRuleObj.incompatibilitySourceItemList.length === 0"
                class="text-primary">请选择</span>
          <el-tag v-for="item in model.incompatibilityRuleObj.incompatibilitySourceItemList"
                  v-bind:key="item.code"
                  class="q-mr-8 q-mb-8"
                  type="info">
            {{ item.name }}
          </el-tag>
        </div>
      </div>
      <div class="col q-ml-16">
        <p>配伍禁忌的药品成分/成分类别/溶媒</p>
        <div v-on:click="addTagOther">
          <span v-if="model.incompatibilityRuleObj.incompatibilityTargetItemList.length === 0"
                class="text-primary">请选择</span>
          <el-tag v-for="item in model.incompatibilityRuleObj.incompatibilityTargetItemList"
                  v-bind:key="item.code"
                  class="q-mr-8 q-mb-8"
                  type="info">
            {{ item.name }}
          </el-tag>
        </div>
      </div>
    </div>

    <div class="flex col"
         v-else>
      <div class="col">
        <el-tag v-for="item in model.incompatibilityRuleObj.incompatibilitySourceItemList"
                v-bind:key="item.code"
                class="q-mr-8 q-mb-8"
                type="info">
          {{ item.name }}
        </el-tag>
      </div>
      <div class="col q-ml-16">
        <el-tag v-for="item in model.incompatibilityRuleObj.incompatibilityTargetItemList"
                v-bind:key="item.code"
                class="q-mr-8 q-mb-8"
                type="info">
          {{ item.name }}
        </el-tag>
      </div>
    </div>
    <!-- 药品成分选择框 -->
    <PeaceDialog append-to-body
                 :close-on-click-modal="false"
                 :close-on-press-escape="false"
                 :visible.sync="dialog.visible"
                 title="请设置配伍禁忌判断条件"
                 v-if="dialog.visible"
                 width="600px">
      <IncompatibilityRuleItemSetDialog v-on:onSuccess="editIndication"
                                        v-bind:data="dialog.data"
                                        v-bind:id="id"
                                        v-on:onClose="dialog.visible = false" />
    </PeaceDialog>

    <!-- 平台成分/成分类别 -->
    <PeaceDialog append-to-body
                 :close-on-click-modal="false"
                 :close-on-press-escape="false"
                 :visible.sync="dialogOther.visible"
                 title="请选择配伍禁忌的成分/成分类别/溶媒"
                 v-if="dialogOther.visible"
                 width="600px">
      <IncompatibilityRuleItemChoiceDialog v-on:onSuccess="editIndicationOther"
                                           v-bind:data="dialogOther.data"
                                           v-on:onClose="dialogOther.visible = false" />
    </PeaceDialog>
  </div>
</template>

<script>
import CONSTANT from '../constant'
import IncompatibilityRuleItemSetDialog from './IncompatibilityRuleItemSetDialog'
import IncompatibilityRuleItemChoiceDialog from './IncompatibilityRuleItemChoiceDialog'

export default {
  props: {
    model: Object,
    id: String,
    isEditing: {
      required: false,
      type: Boolean,
      default: true
    }
  },

  components: {
    IncompatibilityRuleItemSetDialog,
    IncompatibilityRuleItemChoiceDialog
  },

  data() {
    return {
      dialog: {
        visible: false,
        data: []
      },
      dialogOther: {
        visible: false,
        data: []
      }
    }
  },

  methods: {
    addTag() {
      this.dialog.data = this.model.incompatibilityRuleObj.incompatibilitySourceItemList
      this.dialog.visible = true
    },
    editIndication(data) {
      this.model.incompatibilityRuleObj.incompatibilitySourceItemList = data
      this.dialog.visible = false
    },

    addTagOther() {
      if (this.model.incompatibilityRuleObj.incompatibilityTargetItemList.length > 0) {
        const type = this.model.incompatibilityRuleObj.incompatibilityTargetItemList[0]?.type
        if (Number(type) === 1) {
          this.dialogOther.data = this.model.incompatibilityRuleObj.incompatibilityTargetItemList.map((item) => {
            return { type: item.type, code: item.code, cnName: item.name }
          })
        } else if (Number(type) === 2) {
          this.dialogOther.data = this.model.incompatibilityRuleObj.incompatibilityTargetItemList.map((item) => {
            return { type: item.type, atcCode: item.atcCode, classifyName: item.name }
          })
        } else if (Number(type) === 3) {
          this.dialogOther.data = this.model.incompatibilityRuleObj.incompatibilityTargetItemList.map((item) => {
            return { type: item.type, code: item.code, drugName: item.name }
          })
        }
      }
      this.dialogOther.visible = true
    },

    editIndicationOther(data) {
      if (data.length > 0) {
        const type = data[0]?.type
        if (Number(type) === 1) {
          this.model.incompatibilityRuleObj.incompatibilityTargetItemList = data.map((item) => {
            return { type: item.type, code: item.code, name: item.cnName }
          })
        } else if (Number(type) === 2) {
          this.model.incompatibilityRuleObj.incompatibilityTargetItemList = data.map((item) => {
            return { type: item.type, atcCode: item.atcCode, name: item.classifyName }
          })
        } else if (Number(type) === 3) {
          this.model.incompatibilityRuleObj.incompatibilityTargetItemList = data.map((item) => {
            return { type: item.type, code: item.code, name: item.drugName }
          })
        }
      }
      this.dialogOther.visible = false
    },

    verificationResults() {
      const tmp = this.model.incompatibilityRuleObj
      if (tmp.incompatibilitySourceItemList.length > 0 && tmp.incompatibilityTargetItemList.length > 0) {
        return CONSTANT.RULE_VALIDATION_RESULTS.已完成
      } else {
        if (tmp.incompatibilitySourceItemList.length > 0 || tmp.incompatibilityTargetItemList.length > 0) {
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
.rule-item {
  border-radius: 4px;
}

.rule-item__content {
  border-radius: 4px;
}
</style>
