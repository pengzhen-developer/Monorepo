<template>
  <div class="layout-route">
    <el-tabs class="tab-header-1 bg-grey-2"
             type="card"
             v-model="active">
      <el-tab-pane lazy
                   label="已开通的服务"
                   name="已开通的服务">
        <el-collapse-transition>
          <ServiceList></ServiceList>
        </el-collapse-transition>
      </el-tab-pane>
      <el-tab-pane lazy
                   label="申请记录"
                   name="申请记录">
        <RecordList></RecordList>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ServiceList from './components/ServiceList'
import RecordList from './components/RecordList'

export default {
  components: {
    ServiceList,
    RecordList
  },

  data() {
    return {
      active: '已开通的服务'
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .tab-header-1.el-tabs {
  .el-tabs__header {
    margin: 0;
  }

  &.el-tabs--card > .el-tabs__header .el-tabs__item {
    border: 1px solid #fafafa;
    background: #fafafa;
    margin: 0 8px 0 0;
    border-radius: 8px 8px 0 0;
  }

  &.el-tabs--card > .el-tabs__header .el-tabs__nav {
    border: 0;
  }

  &.el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
    border: 1px solid #fff;
    background: #fff;
  }
}
</style>