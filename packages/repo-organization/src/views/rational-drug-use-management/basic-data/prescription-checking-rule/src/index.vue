<template>
  <div class="layout-route">

    <el-tabs type="card"
             v-model="checkPos">
      <el-tab-pane label="基础规则"
                   name="基础规则"
                   lazy>
        <IframeView checkNum="基础规则"></IframeView>
      </el-tab-pane>
      <el-tab-pane label="TNA规则"
                   name="TNA规则"
                   lazy>
        <IframeView checkNum="TNA规则"></IframeView>
      </el-tab-pane>
      <el-tab-pane label="药品规则"
                   name="药品规则"
                   lazy>
      </el-tab-pane>
      <el-tab-pane label="科室规则"
                   name="科室规则"
                   lazy>
      </el-tab-pane>
      <el-tab-pane label="管理规则"
                   name="管理规则"
                   lazy>
        <IframeView checkNum="管理规则"></IframeView>
      </el-tab-pane>
    </el-tabs>

    <!-- el-tab-pane 不支持 positon: sticky，因此单独在外层 div 布局 -->
    <DrugRule v-show="checkPos === '药品规则'"></DrugRule>
    <DepartmentRule v-show="checkPos === '科室规则'"></DepartmentRule>

  </div>
</template>


<script>
import IframeView from './components/IframeView'

export default {
  name: 'PrescriptionCheckingRule',

  components: {
    IframeView,
    DrugRule: () => import('@src/views/rational-drug-use-management/basic-data/drug-rule'),
    DepartmentRule: () => import('@src/views/rational-drug-use-management/basic-data/department-rule')
  },

  data() {
    return {
      checkPos: '0'
    }
  },
  created() {
    if (this.$route.query.checkPos) {
      this.checkPos = this.$route.query.checkPos
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-tabs {
  .el-tabs__header {
    margin: 0;
  }

  &.el-tabs--card > .el-tabs__header .el-tabs__item {
    padding-left: 42px !important;
    padding-right: 42px !important;
    background: #efefef;
    border: 1px solid #f5f5f5;
    margin: 0 8px 0 0;
    border-radius: 4px 4px 0 0;
    font-weight: 400;
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