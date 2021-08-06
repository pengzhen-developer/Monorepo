<template>
  <div class="rule-item__content flex items-center q-pa-sm q-mr-md">
    <div class="flex col"
         v-if="isEditing">
      <div class="col">
        <p>药品成分</p>
        <div v-on:click="addTag">
          <span v-if="model.duplicatetherapyRuleObj.dupLists.length === 0"
                class="text-primary">请选择</span>
          <el-tag v-for="item in model.duplicatetherapyRuleObj.dupLists"
                  v-bind:key="item.code"
                  class="q-mr-8 q-mb-8"
                  type="info">
            {{ item.name }}
          </el-tag>
        </div>
      </div>
      <div class="col q-ml-16">
        <p>重复的药品成分/成分类别</p>
        <div v-on:click="addTagOther">
          <span v-if="model.duplicatetherapyRuleObj.dupItemList.length === 0"
                class="text-primary">请选择</span>
          <el-tag v-for="item in model.duplicatetherapyRuleObj.dupItemList"
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
        <el-tag v-for="item in model.duplicatetherapyRuleObj.dupLists"
                v-bind:key="item.code"
                class="q-mr-8 q-mb-8"
                type="info">
          {{ item.name }}
        </el-tag>
      </div>
      <div class="col q-ml-16">
        <el-tag v-for="item in model.duplicatetherapyRuleObj.dupItemList"
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
                 title="请设置重复用药判断条件"
                 v-if="dialog.visible"
                 width="600px">
      <DuplicatetherapyRuleSetDialog v-on:onSuccess="editIndication"
                                     v-bind:data="dialog.data"
                                     v-bind:id="id"
                                     v-on:onClose="dialog.visible = false" />
    </PeaceDialog>

    <!-- 平台成分/成分类别 -->
    <PeaceDialog append-to-body
                 :close-on-click-modal="false"
                 :close-on-press-escape="false"
                 :visible.sync="dialogOther.visible"
                 title="请选择重复用药的成分/成分类别"
                 v-if="dialogOther.visible"
                 width="600px">
      <DuplicatetherapyRuleChoiceDialog v-on:onSuccess="editIndicationOther"
                                        v-bind:data="dialogOther.data"
                                        v-on:onClose="dialogOther.visible = false" />
    </PeaceDialog>

  </div>
</template>

<script>
import CONSTANT from '../constant'
import DuplicatetherapyRuleSetDialog from './DuplicatetherapyRuleSetDialog'
import DuplicatetherapyRuleChoiceDialog from './DuplicatetherapyRuleChoiceDialog'

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
    DuplicatetherapyRuleSetDialog,
    DuplicatetherapyRuleChoiceDialog
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
      this.dialog.data = []
      this.dialog.data = this.model.duplicatetherapyRuleObj.dupLists
      this.dialog.visible = true
    },
    editIndication(data) {
      this.model.duplicatetherapyRuleObj.dupLists = data
      this.dialog.visible = false
    },

    addTagOther() {
      this.dialogOther.data = []
      if (this.model.duplicatetherapyRuleObj.dupItemList.length > 0) {
        const type = this.model.duplicatetherapyRuleObj.dupItemList[0]?.type
        if (Number(type) === 1) {
          this.dialogOther.data = this.model.duplicatetherapyRuleObj.dupItemList.map((item) => {
            return { type: item.type, code: item.code, cnName: item.name }
          })
        } else if (Number(type) === 2) {
          this.dialogOther.data = this.model.duplicatetherapyRuleObj.dupItemList.map((item) => {
            return { type: item.type, atcCode: item.atcCode, classifyName: item.name }
          })
        }
      }
      this.dialogOther.visible = true
    },

    editIndicationOther(data) {
      if (data && data.length > 0) {
        const type = data[0].type
        if (Number(type) === 1) {
          this.model.duplicatetherapyRuleObj.dupItemList = data.map((item) => {
            return { type: item.type, code: item.code, name: item.cnName }
          })
        } else if (Number(type) === 2) {
          this.model.duplicatetherapyRuleObj.dupItemList = data.map((item) => {
            return { type: item.type, atcCode: item.atcCode, name: item.classifyName }
          })
        }
      } else {
        this.model.duplicatetherapyRuleObj.dupItemList = []
      }

      this.dialogOther.visible = false
    },

    verificationResults() {
      const tmp = this.model.duplicatetherapyRuleObj
      if (tmp.dupLists.length > 0 && tmp.dupItemList.length > 0) {
        return CONSTANT.RULE_VALIDATION_RESULTS.已完成
      } else {
        if (tmp.dupLists.length > 0 || tmp.dupItemList.length > 0) {
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
