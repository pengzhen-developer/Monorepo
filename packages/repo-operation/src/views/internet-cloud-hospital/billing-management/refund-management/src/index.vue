<template>
  <div class="q-pa-20">
    <div class="bg-style">
      <el-tabs v-model="activeName"
               @tab-click="handleClick">
        <el-tab-pane label="退款查询"
                     name="refund_search">
          <refund-search></refund-search>
        </el-tab-pane>
        <el-tab-pane label="申请退款"
                     name="apply_refund">
          <apply-refund></apply-refund>
        </el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>

<script>
import ApplyRefund from './components/ApplyRefund'
import RefundSearch from './components/RefundSearch'

export default {
  name: 'index',
  components: {
    ApplyRefund,
    RefundSearch
  },
  data() {
    return {
      activeName: 'refund_search'
    }
  },
  methods: {
    handleClick() {}
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-tabs__nav-scroll {
  padding-left: 12px;
}

.bg-style {
  background: #fff;
  padding-top: 10px;
  border-radius: 2px;
}
</style>
