<template>
  <div class="layout-route">
    <!-- 列表 -->
    <DrugAuditList ref="DrugAuditList"
                   v-on:showDrugAudit="onShowDrugAudit"
                   v-on:showDrugDetail="onShowDrugDetail"></DrugAuditList>

    <!-- 审核 -->
    <template v-if="drugAuditDialog.visible">
      <DrugAuditModel v-on:success="onSuccess"
                      v-bind:view="`audit`"
                      v-bind:title="`审核新增药品包装规格`"
                      v-bind:width="`1200px`"
                      v-bind:DrugStandardCode="drugAuditDialog.DrugStandardCode"
                      v-bind:visible.sync="drugAuditDialog.visible"></DrugAuditModel>
    </template>

    <!-- 详情 -->
    <template v-if="drugDetailDialog.visible">
      <DrugAuditModel v-bind:view="`detail`"
                      v-bind:title="`审核新增药品包装规格详情`"
                      v-bind:width="`1200px`"
                      v-bind:DrugStandardCode="drugDetailDialog.DrugStandardCode"
                      v-bind:visible.sync="drugDetailDialog.visible"></DrugAuditModel>
    </template>

  </div>
</template>

<script>
import DrugAuditList from './components/DrugAuditList'
import DrugAuditModel from './components/DrugAuditModel'

export default {
  name: 'DrguAudit',

  components: {
    DrugAuditList,
    DrugAuditModel
  },

  data() {
    return {
      drugAuditDialog: {
        visible: false,
        DrugStandardCode: ''
      },

      drugDetailDialog: {
        visible: false,
        DrugStandardCode: ''
      }
    }
  },

  methods: {
    onSuccess() {
      this.$refs.DrugAuditList.fetch()
    },

    onShowDrugAudit({ DrugStandardCode }) {
      this.drugAuditDialog.visible = true
      this.drugAuditDialog.DrugStandardCode = DrugStandardCode
    },

    onShowDrugDetail({ DrugStandardCode }) {
      this.drugDetailDialog.visible = true
      this.drugDetailDialog.DrugStandardCode = DrugStandardCode
    }
  }
}
</script>

<style>
</style>