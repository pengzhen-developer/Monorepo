<template>
  <div class="layout-route">
    <div class="card q-mb-md">
      <div class="flex text-grey-333 ">
        <div class="q-mr-md text-weight-bold">{{ data.productName }}</div>
        <div class="q-mr-md">{{ data.dosageFormName }}</div>
        <div class="q-mr-md">{{ data.drugSpecifications }}</div>
        <div class="q-mr-md">{{ data.enterpriseName }}</div>
      </div>
    </div>

    <div class="card"
         style="padding: 24px;">
      <RulesDetail ref="ruleView"
                   style="padding: 0;"
                   v-bind:id="data.drugStandardCode"
                   v-bind:drugType="drugType"></RulesDetail>
    </div>

    <div class="fixed-bottom card text-right"
         style="box-shadow: 0px 1px 8px 0px #e0e0e0; ">
      <el-button v-on:click="back">关闭窗口</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object,
    drugType: String,
    visible: Boolean
  },

  components: {
    RulesDetail: () => import('@src/views/rational-drug-use-management/basic-data/PrescriptionRule/src/RulesDetail.vue')
  },

  computed: {
    internalVisible: {
      get() {
        return this.visible
      },

      set(value) {
        this.$emit('update:visible', value)
      }
    }
  },

  methods: {
    back() {
      this.internalVisible = false

      this.$emit('fetch')
    }
  }
}
</script>

<style lang="scss" scoped>
.layout-route {
  padding: 0 !important;
}
</style>