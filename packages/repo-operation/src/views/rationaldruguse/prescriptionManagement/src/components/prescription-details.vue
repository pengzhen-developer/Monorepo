<template>
  <div class="layout-route bg-white full-width full-height">
    <el-button plain
               class="q-mb-24"
               v-on:click="back"
               style="padding:1px 4px">
      <div class="q-px-md q-py-sm">
        <i class="el-icon-arrow-left"></i>
        <span>返回上一页</span>
      </div>
    </el-button>
    <div class="flex full-width">
      <!-- 处方详情 -->
      <div class="pre-left-content">
        处方详情
      </div>
      <!-- 审方结果-审方记录 -->
      <div class="pre-right-content">
        审方结果
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PrescriptionDetails',
  data() {
    return {}
  },
  methods: {
    back() {
      this.$emit('goback', true)
    }
  }
}
</script>

<style lang="scss" scoped>
.pre-left-content {
  width: calc((100% - 10px) * 53 / 100);
  border: 1px solid #ff0;
  margin-right: 10px;
}
.pre-right-content {
  width: calc((100% - 10px) * 47 / 100);
  border: 1px solid #ff0;
}
</style>