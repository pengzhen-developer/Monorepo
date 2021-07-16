<template>
  <div>
    <DepartmentRuleList ref="DepartmentRuleListRef"
                        v-show="!departmentRuleAdd.visible && !departmentRuleEdit.visible && !departmentRuleDetail.visible"
                        v-on:add="onShowAddDialog"
                        v-on:edit="onEdit"
                        v-on:detail="onDetail"></DepartmentRuleList>

    <DepartmentRuleAddDialog width="800px"
                             v-if="departmentRuleAddDialog.visible"
                             v-on:add="onAdd"
                             v-bind:title="departmentRuleAddDialog.title"
                             v-bind:visible.sync="departmentRuleAddDialog.visible"></DepartmentRuleAddDialog>

    <DepartmentRuleAdd v-if="departmentRuleAdd.visible"
                       v-on:fetch="onFetch"
                       v-bind:data="departmentRuleAdd.data"
                       v-bind:department="departmentRuleAdd.department"
                       v-bind:visible.sync="departmentRuleAdd.visible"></DepartmentRuleAdd>

    <DepartmentRuleEdit v-if="departmentRuleEdit.visible"
                        v-on:fetch="onFetch"
                        v-bind:data="departmentRuleEdit.data"
                        v-bind:department="departmentRuleEdit.department"
                        v-bind:visible.sync="departmentRuleEdit.visible"></DepartmentRuleEdit>

    <DepartmentRuleDetail v-if="departmentRuleDetail.visible"
                          v-on:fetch="onFetch"
                          v-bind:data="departmentRuleDetail.data"
                          v-bind:department="departmentRuleDetail.department"
                          v-bind:visible.sync="departmentRuleDetail.visible"></DepartmentRuleDetail>
  </div>
</template>

<script>
export default {
  components: {
    DepartmentRuleList: () => import('./components/DepartmentRuleList.vue'),
    DepartmentRuleAddDialog: () => import('./components/DepartmentRuleAddDialog.vue'),
    DepartmentRuleAdd: () => import('./components/DepartmentRuleAdd.vue'),
    DepartmentRuleEdit: () => import('./components/DepartmentRuleEdit.vue'),
    DepartmentRuleDetail: () => import('./components/DepartmentRuleDetail.vue')
  },

  data() {
    return {
      departmentRuleAddDialog: {
        title: '',
        visible: false
      },

      departmentRuleAdd: {
        visible: false,
        data: {},
        department: {}
      },

      departmentRuleEdit: {
        visible: false,
        data: {},
        department: {}
      },

      departmentRuleDetail: {
        visible: false,
        data: {},
        department: {}
      }
    }
  },

  methods: {
    onFetch() {
      this.$refs.DepartmentRuleListRef.fetch()
    },

    onShowAddDialog() {
      this.departmentRuleAddDialog.title = '新增科室规则'
      this.departmentRuleAddDialog.visible = true
    },

    onAdd(data, department) {
      this.departmentRuleAdd.visible = true
      this.departmentRuleAdd.data = data
      this.departmentRuleAdd.department = department
    },

    onEdit(data) {
      this.departmentRuleEdit.visible = true

      this.departmentRuleEdit.data = data
      // 保持传参方式一致
      this.departmentRuleEdit.department = { label: data.departmentName, value: data.departmentCode }
    },

    onDetail(data) {
      this.departmentRuleDetail.visible = true

      this.departmentRuleDetail.data = data
      // 保持传参方式一致
      this.departmentRuleDetail.department = { label: data.departmentName, value: data.departmentCode }
    }
  }
}
</script>

<style>
</style>