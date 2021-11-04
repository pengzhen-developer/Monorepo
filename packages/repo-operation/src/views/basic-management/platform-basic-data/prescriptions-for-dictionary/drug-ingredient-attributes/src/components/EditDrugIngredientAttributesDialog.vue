<template>
  <div>
    <div class="el-dialog__body">
      <el-form ref="model"
               label-position="right"
               label-width="120px"
               label-suffix="："
               v-bind:model="model">

        <el-form-item label="主数据ID">
          <span>{{model.skuId}}</span>
        </el-form-item>

        <el-form-item label="药品名称">
          <span>{{model.drugName}}</span>
        </el-form-item>

        <el-form-item label="规格">
          <span>{{model.drugSpecifications || "——"}}</span>
        </el-form-item>

        <el-form-item label="生产厂家">
          <span>{{model.enterpriseCnName || "——"}}</span>
        </el-form-item>

        <el-form-item label="药品成分">
          <template>
            <div>
              <el-button type="text"
                         v-on:click="choice">新增成分</el-button>
              <div>
                <el-tag v-for="tag in ingredientList"
                        :key="tag.code"
                        size="medium"
                        class="q-mr-4"
                        closable
                        @close="handleClose(tag)"
                        type="info">
                  {{tag.cnName}}
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
                 title="新增成分">
      <ChoiceIngredientAttributesDialog v-on:onSuccess="choiceConfirm"
                                        v-on:onClose="choiceClose"></ChoiceIngredientAttributesDialog>
    </PeaceDialog>
  </div>
</template>

<script>
import ChoiceIngredientAttributesDialog from './ChoiceIngredientAttributesDialog'
import Service from '../service/index'

export default {
  name: 'EditDrugIngredientAttributesDialog',
  props: {
    data: Object
  },
  watch: {
    data: {
      handler() {
        if (this.data != null) {
          this.model.id = this.data.id
        }
      },
      immediate: true
    }
  },

  components: {
    ChoiceIngredientAttributesDialog
  },

  data() {
    return {
      model: {
        drugName: '',
        drugSpecifications: '',
        enterpriseCnName: '',
        id: '',
        platformDrugCode: '',
        skuId: '',
        ingredientCode: ''
      },
      ingredientList: [], //药品成分数据集合
      choiceDialog: {
        visible: false
      }
    }
  },

  async mounted() {
    this.$nextTick().then(() => {
      this.platformDrugIngredient()
    })
  },

  methods: {
    platformDrugIngredient() {
      const params = { id: this.data?.id }
      Service.platformDrugIngredient(params).then((res) => {
        this.model.drugName = res.data.drugName
        this.model.drugSpecifications = res.data.drugSpecifications
        this.model.enterpriseCnName = res.data.enterpriseCnName
        this.model.platformDrugCode = res.data.platformDrugCode
        this.model.skuId = res.data.skuId
        this.model.ingredientCode = res.data.ingredientCode
        this.getListNameByCodes()
      })
    },
    getListNameByCodes() {
      const params = this.model?.ingredientCode.split('；')
      Service.getListNameByCodes(params).then((res) => {
        this.ingredientList = res.data
      })
    },

    handleClose(tag) {
      this.ingredientList.splice(this.ingredientList.indexOf(tag), 1)
    },

    onCancel() {
      this.$emit('onClose', {})
    },
    onSave() {
      const params = Peace.util.deepClone(this.model)
      params.ingredientCode = this.ingredientList.map((item) => item.code).join('；')
      Service.editPlatformDrugIngredient(params).then((res) => {
        Peace.util.success(res.message)
        this.$emit('onSuccess')
      })
    },
    //选择成分
    choice() {
      this.choiceDialog.visible = true
    },
    //选择成分关闭
    choiceClose() {
      this.choiceDialog.visible = false
    },
    //选择成分确定
    choiceConfirm(data) {
      this.choiceDialog.visible = false
      const aa = this.ingredientList.concat(data.filter((v) => !this.ingredientList.some((item) => item.code === v.code)))
      this.ingredientList = aa
    }
  }
}
</script>
  
<style>
</style>