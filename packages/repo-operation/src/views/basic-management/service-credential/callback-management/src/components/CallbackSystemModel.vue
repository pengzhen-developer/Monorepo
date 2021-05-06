<template>
  <div>
    <el-form :model="model"
             label-suffix="："
             space-md
             label-width="auto">
      <el-form-item label="选择机构系统">
        <el-cascader v-model="model.org"
                     :options="source.orgList"
                     @change="handleChange"
                     placeholder="请选择"
                     :disabled="type!=='add'"
                     style="width:100%;"></el-cascader>
      </el-form-item>
      <el-form-item label="接口回调配置">
        <el-checkbox v-model="model.status"
                     class="block q-mb-4">处方状态变更</el-checkbox>

        <el-checkbox :indeterminate="isIndeterminate"
                     v-model="model.checkAll"
                     @change="handleCheckAllChange"
                     class="block  q-mb-8">订单状态变更</el-checkbox>
        <el-checkbox-group v-model="model.checkedStatus"
                           @change="handleCheckedStatusChange"
                           style="background: #FBFBFB;"
                           class="q-px-8 q-py-16 block">
          <el-checkbox v-for="status in source.preStatus"
                       :label="status.value"
                       :key="status.value"
                       class="q-mb-16 block">{{status.label}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>

    <div class="flex justify-end q-pt-8">
      <el-button v-on:click="cancel">取消</el-button>
      <el-button type="primary"
                 v-on:click="save">保存</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CallbackSystemModel',
  props: {
    type: String,
    info: Object
  },
  data() {
    return {
      model: {
        org: '',
        status: false,
        checkAll: false,
        checkedStatus: []
      },
      isIndeterminate: false,
      source: {
        orgList: [],
        preStatus: [
          { label: '订单已接单状态', value: 1 },
          { label: '订单已发货状态', value: 2 },
          { label: '订单已签收状态', value: 3 },
          { label: '订单已自提状态', value: 4 },
          { label: '订单已完成状态', value: 5 },
          { label: '订单已取消状态', value: 6 },
          { label: '物流记录详情', value: 7 },
          { label: '发货批号、效期详情', value: 8 }
        ]
      }
    }
  },
  methods: {
    handleChange() {},
    handleCheckAllChange(val) {
      this.model.checkedStatus = val ? this.source.preStatus.map((item) => item.value) : []
      this.isIndeterminate = false
    },
    handleCheckedStatusChange(value) {
      let checkedCount = value.length
      this.model.checkAll = checkedCount === this.source.preStatus.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.source.preStatus.length
    },
    cancel() {
      if (this.type === 'add') {
        this.$emit('onCancel')
      } else {
        this.$emit('onCancelEdit')
      }
    },
    save() {
      if (this.type === 'add') {
        this.$emit('onSave')
      } else {
        this.$emit('onSaveEdit')
      }
    }
  }
}
</script>

<style lang="scss" >
.el-checkbox-group {
  .el-checkbox {
    &:last-of-type {
      margin-bottom: 0;
    }
  }
}
</style>