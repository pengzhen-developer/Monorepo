<template>
  <div class="layout-route">
    <div class="bg-white">
      <el-tabs v-model="active">
        <el-tab-pane name="我的服务包"
                     label="我的服务包">
          <SerivcePackList class="bg-grey-2"></SerivcePackList>
        </el-tab-pane>

        <el-tab-pane name="服务包订单"
                     label="服务包订单">
          <SerivcePackOrderList class="bg-grey-2"></SerivcePackOrderList>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import SerivcePackList from './components/SerivcePackList'
import SerivcePackOrderList from './components/SerivcePackOrderList'

export default {
  components: {
    SerivcePackList,
    SerivcePackOrderList
  },

  data() {
    return {
      active: '我的服务包'
    }
  },

  mounted() {},

  methods: {}
}
</script>

<style lang="scss" scoped>
::v-deep .el-tabs__header {
  margin: 0;
  padding: 8px 0 0 0;
}
</style>
