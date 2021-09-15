<template>
  <div>
    <DrugRuleList ref="managementRuleListRef"
                  v-show="!managementRuleEdit.visible && !managementRuleDetail.visible"
                  v-on:edit="onEdit"
                  v-on:modify="onModify"
                  v-on:onShowManagementRule="onShowManagementRule"></DrugRuleList>

    <management-edit v-if="managementRuleEdit.visible"
                  v-on:fetch="onFetch"
                  v-bind:data="managementRuleEdit.data"
                  v-bind:visible.sync="managementRuleEdit.visible"></management-edit>

    <management-detail v-if="managementRuleDetail.visible"
                    v-on:fetch="onFetch"
                    v-bind:data="managementRuleDetail.data"
                    v-bind:drugType="`platform`"
                    v-bind:visible.sync="managementRuleDetail.visible"></management-detail>

  </div>
</template>

<script>
export default {
  components: {
    DrugRuleList: () => import('./components/ManagementList'),
    ManagementEdit: () => import('./components/ManagementEdit'),
    ManagementDetail: () => import('./components/ManagementDetail')
  },

  data() {
    return {
      managementRuleEdit: {
        visible: false
      },

      managementRuleDetail: {
        visible: false,
        data: {}
      },

    }
  },

  methods: {
    onFetch() {
      this.$refs.managementRuleListRef.fetchData()
    },

    onModify(data) {
      console.log(data)
    },

    onEdit(data) {
      this.managementRuleEdit.data = data
      this.managementRuleEdit.visible = true
    },

    onShowManagementRule(data) {
      this.managementRuleDetail.data = data
      this.managementRuleDetail.visible = true
    },
  }
}
</script>

<style>
</style>
