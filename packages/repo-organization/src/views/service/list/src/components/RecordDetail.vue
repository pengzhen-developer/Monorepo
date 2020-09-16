<template>
  <div>
    <el-form label-width="90px"
             label-suffix>
      <el-form-item class="inline-half"
                    label="服务名称">
        <span>{{data.serviceName}}</span>
      </el-form-item>
      <el-form-item class="inline-half"
                    label="服务内容"
                    v-if="data.serviceContentStr">
        <span>{{data.serviceContentStr}}</span>
      </el-form-item>
      <el-form-item class="inline-half"
                    label="对接方式"
                    v-if="data.accessModeStr">
        <span>{{data.accessModeStr}}</span>
      </el-form-item>
      <el-form-item class="inline-half"
                    label="提交时间">
        <span>{{data.applyTime}}</span>
      </el-form-item>
      <el-form-item class="inline-half"
                    label="审核结果">
        <span> {{ getStatusForCode() }}</span>
      </el-form-item>
      <el-form-item class="inline-half"
                    label="备注"
                    v-if="data.failureReason">
        <span>{{data.failureReason}}</span>
      </el-form-item>
      <el-form-item class="inline-half"
                    label="审核时间">
        <span>{{data.checkTime}}</span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    data: Object
  },

  data() {
    return {
      options: [
        {
          value: '1',
          label: '待审核'
        },
        {
          value: '2',
          label: '未通过'
        },
        {
          value: '3',
          label: '已通过'
        }
      ]
    }
  },

  created() {},

  methods: {
    getStatusForCode() {
      return this.options.find((item) => item.value == this.data.checkStatus).label
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-form-item__label {
  position: relative;
  padding-right: 30px;
  text-align: justify;
  color: #000;
  text-align-last: justify;
  &::after {
    content: '：';
    position: absolute;
    top: 0;
    right: 18px;
  }
}
.el-form-item__content {
  span {
    color: #000;
  }
}
.el-form-item {
  margin-bottom: 15px !important;
}
.el-form-item:last-child {
  margin-bottom: 0 !important;
}
</style>