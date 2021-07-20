<template>
  <div class="layout-route">
    <div class="card q-mb-md">
      <div class="text-subtitle1 text-weight-bold q-mb-sm">
        <span class="text-grey-333">科室药品规则 - {{ department.label }}</span>
      </div>

      <div class="flex text-grey-333 ">
        <div class="q-mr-md text-weight-bold">{{ data.drugName }}</div>
        <div class="q-mr-md">{{ data.dosageFormName }}</div>
        <div class="q-mr-md">{{ data.specifications }}</div>
        <div class="q-mr-md">{{ data.manufactory }}</div>
      </div>
    </div>

    <div class="card"
         style="margin-bottom: 72px">
      <RulesDetail ref="ruleView"
                   style="padding: 0;"
                   v-bind:id="data.drugCscCode"
                   v-bind:drugType="'department'"
                   v-bind:departmentCode="department.value"></RulesDetail>
    </div>

    <div class="fixed-bottom card text-right">
      <el-button v-on:click="back">关闭窗口</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object,
    department: Object,
    visible: Boolean
  },

  components: {
    RulesDetail: () => import('@src/views/rational-drug-use-management/basic-data/PrescriptionRule/src/RulesDetail')
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