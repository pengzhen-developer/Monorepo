<template>
  <div>
    <DepartmentRuleList v-show="!departmentRuleEdit.visible"
                        v-on:add="onAdd"></DepartmentRuleList>

    <DepartmentRuleAdd width="800px"
                       v-if="departmentRuleAdd.visible"
                       v-on:add="onAddRule"
                       v-bind:title="departmentRuleAdd.title"
                       v-bind:visible.sync="departmentRuleAdd.visible"></DepartmentRuleAdd>

    <DepartmentRuleEdit v-if="departmentRuleEdit.visible"
                        v-bind:data="departmentRuleEdit.data"
                        v-bind:department="departmentRuleEdit.department"
                        v-bind:visible.sync="departmentRuleEdit.visible"></DepartmentRuleEdit>
  </div>
</template>

<script>
export default {
  components: {
    DepartmentRuleList: () => import('./components/DepartmentRuleList.vue'),
    DepartmentRuleAdd: () => import('./components/DepartmentRuleAdd.vue'),
    DepartmentRuleEdit: () => import('./components/DepartmentRuleEdit.vue')
  },

  data() {
    return {
      departmentRuleAdd: {
        title: '',
        visible: false
      },

      departmentRuleEdit: {
        visible: false,
        data: {},
        department: {}
      }
    }
  },

  methods: {
    onAdd() {
      this.departmentRuleAdd.title = '新增科室规则'
      this.departmentRuleAdd.visible = true
    },

    onAddRule(data, department) {
      this.departmentRuleEdit.visible = true
      this.departmentRuleEdit.data = data
      this.departmentRuleEdit.department = department
    }
  }
}
</script>

<style>
</style>