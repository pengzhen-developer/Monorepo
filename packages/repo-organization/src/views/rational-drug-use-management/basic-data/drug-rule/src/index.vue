<template>
  <div>
    <DrugRuleList ref="drugRuleListRef"
                  v-show="!drugRuleEdit.visible && !showCommonRule.visible && !showOrgRule.visible"
                  v-on:edit="onEdit"
                  v-on:showCommomRule="onShowCommonRule"
                  v-on:showOrgRule="onShowOrgRule"></DrugRuleList>

    <DrugRuleEdit v-if="drugRuleEdit.visible"
                  v-on:fetch="onFetch"
                  v-bind:data="drugRuleEdit.data"
                  v-bind:visible.sync="drugRuleEdit.visible"></DrugRuleEdit>

    <DrugRuleDetail v-if="showCommonRule.visible"
                    v-on:fetch="onFetch"
                    v-bind:data="showCommonRule.data"
                    v-bind:drugType="`platform`"
                    v-bind:visible.sync="showCommonRule.visible"></DrugRuleDetail>

    <DrugRuleDetail v-if="showOrgRule.visible"
                    v-on:fetch="onFetch"
                    v-bind:data="showOrgRule.data"
                    v-bind:drugType="`org`"
                    v-bind:visible.sync="showOrgRule.visible"></DrugRuleDetail>
  </div>
</template>

<script>
export default {
  components: {
    DrugRuleList: () => import('./components/DrugRuleList'),
    DrugRuleEdit: () => import('./components/DrugRuleEdit'),
    DrugRuleDetail: () => import('./components/DrugRuleDetail')
  },

  data() {
    return {
      drugRuleEdit: {
        visible: false
      },

      showCommonRule: {
        visible: false,
        data: {}
      },

      showOrgRule: {
        visible: false,
        data: {}
      }
    }
  },

  methods: {
    onFetch() {
      this.$refs.drugRuleListRef.fetch()
    },

    onEdit(data) {
      this.drugRuleEdit.data = data
      this.drugRuleEdit.visible = true
    },

    onShowCommonRule(data) {
      this.showCommonRule.data = data
      this.showCommonRule.visible = true
    },

    onShowOrgRule(data) {
      this.showOrgRule.data = data
      this.showOrgRule.visible = true
    }
  }
}
</script>

<style>
</style>