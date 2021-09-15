<template>
  <div class="full-width full-height column">

    <div class="card card-search relative-position q-mb-md">
      <div class="q-mb-lg">
        <el-button icon="el-icon-arrow-left"
                   v-on:click="back">返回上一页
        </el-button>
      </div>

      <span class="text-weight-medium text-grey-333"
            style="font-size: 20px;">通用规则编辑</span>

      <knowledgeButton class="q-mb-xg absolute"
                       style="bottom: 20px; right: 20px"
                       v-bind:drugCscCode="drugInfo.drugCscCode"></knowledgeButton>

      <div class="q-mb-md q-mt-xs">
        <span class="text-weight-medium q-mr-md">{{ drugInfo.drugName }}</span>
        <span class="text-grey-666  q-mr-md">{{ drugInfo.dosageFormName }}</span>
        <span class="text-grey-666  q-mr-md">{{ drugInfo.specifications }}</span>
        <span class="text-grey-666  q-mr-md">{{ drugInfo.manufacturer }}</span>
      </div>

    </div>

    <rule-view :id="drugInfo.drugCscCode"
               ref="ruleView"
               drug-type="platform"
               style="margin-bottom: 62px;"></rule-view>

    <div class="toolbar-style">
      <el-button v-on:click="back">退出编辑</el-button>
      <el-button v-on:click="save"
                 v-bind:loading="saveLoading">保存</el-button>
      <el-button type="primary"
                 v-bind:loading="submitLoading"
                 v-on:click="submit">提交审核
      </el-button>
    </div>
  </div>
</template>

<script>
import RuleView from '@src/views/rational-drug-use-management/rules-of-drug/Prescription_Rule'
import Service from '../service/index'
import KnowledgeButton from './KnowledgeButton'

export default {
  name: 'EditDrugRules',
  components: { RuleView, KnowledgeButton },
  props: {
    drugInfo: {
      required: true,
      type: Object
    }
  },

  data() {
    return {
      saveLoading: false,
      submitLoading: false
    }
  },

  methods: {
    back() {
      this.$emit('onBack')
    },
    save() {
      this.$refs.ruleView.validate().then((data) => {
        this.$refs.ruleView.loading = true
        this.saveLoading = true
        const { drugName, manufacturer, drugCscCode } = this.drugInfo
        Service.saveRules({
          drugCscCode: drugCscCode,
          drugType: 'platform',
          submitReview: 0,
          rules: data,
          drugName: drugName,
          manufactory: manufacturer
        })
          .then(() => {
            Peace.util.success('保存成功')
            this.saveLoading = false
            this.$refs.ruleView.loading = false
            this.$emit('onSuccess')
          })
          .catch(() => {
            this.saveLoading = false
            this.$refs.ruleView.loading = false
          })
      })
    },
    submit() {
      this.$refs.ruleView.validate().then((data) => {
        this.$refs.ruleView.loading = true
        this.submitLoading = true
        const { drugName, manufacturer, drugCscCode } = this.drugInfo
        Service.saveRules({
          drugCscCode: drugCscCode,
          drugType: 'platform',
          submitReview: 1,
          rules: data,
          drugName: drugName,
          manufactory: manufacturer
        })
          .then(() => {
            Peace.util.success('提交审核成功')
            this.submitLoading = false
            this.$refs.ruleView.loading = false
            this.$emit('onSuccess')
          })
          .catch(() => {
            this.submitLoading = false
            this.$refs.ruleView.loading = false
          })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.toolbar-style {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: #fff;
  padding: 16px;
  box-shadow: 0px 1px 8px 0px #e0e0e0;
}
</style>
