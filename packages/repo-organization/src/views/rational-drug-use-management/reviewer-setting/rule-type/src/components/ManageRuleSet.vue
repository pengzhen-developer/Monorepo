<template>
  <div>
    <el-checkbox-group v-model="manageRuleCheckListSel"
                       class="q-mb-32 q-ml-12">
      <el-checkbox v-for="item  in manageRuleCheckList"
                   v-bind:label="item.id"
                   v-bind:key="item.id">{{ item.name }}</el-checkbox>
    </el-checkbox-group>
    <div class="text-right">
      <el-button v-on:click="cancel">取消</el-button>
      <el-button type="primary"
                 v-bind:loading="isLoading"
                 v-on:click="save">保存</el-button>
    </div>
  </div>
</template>

<script>
import Service from '../service'
export default {
  data() {
    return {
      isLoading: false,
      manageRuleCheckListSel: [],
      manageRuleCheckList: []
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.fetch()
    })
  },
  methods: {
    fetch() {
      Service.getManagementRuleConfigDetails().then((res) => {
        this.manageRuleCheckListSel = res.data.manageRuleCheckListSel
        this.manageRuleCheckList = res.data.manageRuleCheckList
      })
    },
    cancel() {
      this.$emit('close')
    },
    save() {
      if (this.manageRuleCheckListSel.length == 0) {
        return Peace.util.error('必须勾选任意管理规则审查项')
      }
      this.isLoading = true
      Service.saveManagementRuleConfigDetails({ manageRuleCheckListSel: this.manageRuleCheckListSel })
        .then(() => {
          Peace.util.success('保存成功')
          this.$emit('close')
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-checkbox {
  color: #333333;
}
::v-deep .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #333333;
}
</style>