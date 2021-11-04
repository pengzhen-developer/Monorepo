<template>
  <div class="layout-route">
    <div class="flex justify-between items-end card q-mb-md">
      <div>
        <div class="q-mb-md">
          <el-button icon="el-icon-arrow-left"
                     v-on:click="back">返回上一页</el-button>
        </div>

        <div class="text-subtitle1 text-weight-bold q-mb-sm">
          <span class="text-grey-333">{{data.ruleName}}</span>
        </div>

      </div>
    </div>

    <div class="card"
         style="padding: 24px;">
      <management-rule-detail ref="ruleView"
                              style="padding: 0;"
                              v-bind:id="data.id"></management-rule-detail>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    data: Object,
    visible: Boolean
  },

  components: {
    ManagementRuleDetail: () => import('./ManagementRule/src/RulesDetail')
  },

  data() {
    return {
      loading: false
    }
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
