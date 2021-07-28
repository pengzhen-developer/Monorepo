<template>
  <div class="rule-item__content flex items-center q-pa-sm q-mr-md">
    <div class="flex col"
         v-if="isEditing">
      <div class="col">
        <p>药品成分</p>
        <div v-on:click="addTag">
          <span v-if="model.ddiRuleObj.ddiItemList.length === 0"
                class="text-primary">请选择</span>
          <el-tag v-for="item in model.ddiRuleObj.ddiItemList"
                  v-bind:key="item.code"
                  class="q-mr-8 q-mb-8"
                  type="info">
            {{ item.name }}
          </el-tag>
        </div>
      </div>
      <div class="col q-ml-16">
        <p>相互冲突的药品成分/成分类别</p>
        <div v-on:click="addTagOther">
          <span v-if="model.ddiRuleObj.ddiContraryItemList.length === 0"
                class="text-primary">请选择</span>
          <el-tag v-for="item in model.ddiRuleObj.ddiContraryItemList"
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
        <el-tag v-for="item in model.ddiRuleObj.ddiItemList"
                v-bind:key="item.code"
                class="q-mr-8 q-mb-8"
                type="info">
          {{ item.name }}
        </el-tag>
      </div>
      <div class="col q-ml-16">
        <el-tag v-for="item in model.ddiRuleObj.ddiContraryItemList"
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
                 title="请设置相互作用药品成分"
                 v-if="dialog.visible"
                 width="600px">
      <DdiRuleSetDialog v-on:onSuccess="editIndication"
                        v-bind:data="dialog.data"
                        v-bind:id="id"
                        v-on:onClose="dialog.visible = false" />
    </PeaceDialog>

    <!-- 平台成分/成分类别 -->
    <PeaceDialog append-to-body
                 :close-on-click-modal="false"
                 :close-on-press-escape="false"
                 :visible.sync="dialogOther.visible"
                 title="请选择相互冲突的成分/成分类别"
                 v-if="dialogOther.visible"
                 width="600px">
      <DdiRuleChoiceDialog v-on:onSuccess="editIndicationOther"
                           v-bind:data="dialogOther.data"
                           v-on:onClose="dialogOther.visible = false" />
    </PeaceDialog>

  </div>
</template>

<script>
import CONSTANT from '../constant'
import DdiRuleSetDialog from './DdiRuleSetDialog'
import DdiRuleChoiceDialog from './DdiRuleChoiceDialog'

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
    DdiRuleSetDialog,
    DdiRuleChoiceDialog
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
      this.dialog.data = this.model.ddiRuleObj.ddiItemList
      this.dialog.visible = true
    },

    editIndication(data) {
      this.model.ddiRuleObj.ddiItemList = data
      this.dialog.visible = false
    },

    addTagOther() {
      if (this.model.ddiRuleObj.ddiContraryItemList.length > 0) {
        const type = this.model.ddiRuleObj.ddiContraryItemList[0]?.type
        if (Number(type) === 1) {
          this.dialogOther.data = this.model.ddiRuleObj.ddiContraryItemList.map((item) => {
            return { type: item.type, code: item.code, cnName: item.name }
          })
        } else if (Number(type) === 2) {
          this.dialogOther.data = this.model.ddiRuleObj.ddiContraryItemList.map((item) => {
            return { type: item.type, atcCode: item.atcCode, classifyName: item.name }
          })
        }
      }
      this.dialogOther.visible = true
    },

    editIndicationOther(data) {
      if (data.length > 0) {
        const type = data[0]?.type
        if (Number(type) === 1) {
          this.model.ddiRuleObj.ddiContraryItemList = data.map((item) => {
            return { type: item.type, code: item.code, name: item.cnName }
          })
        } else if (Number(type) === 2) {
          this.model.ddiRuleObj.ddiContraryItemList = data.map((item) => {
            return { type: item.type, atcCode: item.atcCode, name: item.classifyName }
          })
        }
      }

      this.dialogOther.visible = false
    },

    verificationResults() {
      const tmp = this.model.ddiRuleObj
      if (tmp.ddiItemList.length > 0 && tmp.ddiContraryItemList.length > 0) {
        return CONSTANT.RULE_VALIDATION_RESULTS.已完成
      } else {
        if (tmp.ddiItemList.length > 0 || tmp.ddiContraryItemList.length > 0) {
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
