<template>
  <div>
    <div class="el-dialog__body">
      <el-form ref="model"
               label-position="right"
               label-width="120px"
               label-suffix="："
               v-bind:model="model">

        <el-form-item label="平台药品编码">
          <span>{{model.code}}</span>
        </el-form-item>

        <el-form-item label="药品名称">
          <span>{{model.name}}</span>
        </el-form-item>

        <el-form-item label="规格">
          <span>{{model.spec}}</span>
        </el-form-item>

        <el-form-item label="生产厂家">
          <span>{{model.company}}</span>
        </el-form-item>

        <el-form-item label="药品成分">
          <template>
            <div class="flex">
              <el-button type="text"
                         v-on:click="choice">选择成分</el-button>
              <div>
                <el-tag v-for="tag in model.tags"
                        :key="tag.name"
                        size="medium"
                        class="q-mr-4"
                        closable
                        type="info">
                  {{tag.name}}
                </el-tag>
              </div>
            </div>
          </template>
        </el-form-item>

      </el-form>
    </div>
    <div class="el-dialog__footer">
      <el-button v-on:click="onCancel">取消</el-button>
      <el-button type="primary"
                 v-on:click="onSave">保存</el-button>
    </div>

    <PeaceDialog v-if="choiceDialog.visible"
                 width="800px"
                 append-to-body
                 v-bind:visible.sync="choiceDialog.visible"
                 title="编辑药品成分">
      <ChoiceIngredientAttributesDialog v-on:onSuccess="choiceConfirm"
                                        v-on:onClose="choiceClose"></ChoiceIngredientAttributesDialog>
    </PeaceDialog>
  </div>
</template>

<script>
import ChoiceIngredientAttributesDialog from './ChoiceIngredientAttributesDialog'
export default {
  name: 'EditDrugIngredientAttributesDialog',
  props: {
    data: Object
  },

  components: {
    ChoiceIngredientAttributesDialog
  },

  data() {
    return {
      model: {
        code: 'dadadadada',
        name: '附档要多卡看',
        spec: '1.5*1.2',
        company: '山东哈扬生物交罚款的骄傲',
        tags: [
          { name: '标签一标签一标签一标签一' },
          { name: '标签二' },
          { name: '标签三' },
          { name: '标签四' },
          { name: '标签五' }
        ]
      },
      choiceDialog: {
        visible: false
      }
    }
  },

  methods: {
    onCancel() {
      this.$emit('onClose', {})
    },
    onSave() {},
    //选择成分
    choice() {
      this.choiceDialog.visible = true
    },
    //选择成分关闭
    choiceClose() {
      this.choiceDialog.visible = false
    },
    //选择成分确定
    choiceConfirm() {}
  }
}
</script>
  
<style>
</style>