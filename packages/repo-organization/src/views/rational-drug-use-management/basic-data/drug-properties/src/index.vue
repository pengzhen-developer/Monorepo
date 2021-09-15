<template>
  <div class="layout-route">

    <el-tabs type="card"
             v-model="activeName">

      <el-tab-pane :label="source.DRUG_ATTRIBUTE[0]"
                   lazy>
        <basicDrug />
      </el-tab-pane>

      <el-tab-pane :label="source.DRUG_ATTRIBUTE[1]"
                   lazy>
        <antimicrobialAgents />
      </el-tab-pane>

      <el-tab-pane :label="source.DRUG_ATTRIBUTE[2]"
                   lazy>
        <maJingDrugs />
      </el-tab-pane>

      <el-tab-pane :label="source.DRUG_ATTRIBUTE[3]"
                   lazy>
        <injectableDrugs />
      </el-tab-pane>

      <el-tab-pane :label="source.DRUG_ATTRIBUTE[4]"
                   lazy>
        <monitoringDrug />
      </el-tab-pane>

      <el-tab-pane :label="source.DRUG_ATTRIBUTE[5]"
                   lazy>
        <otherAttributes />
      </el-tab-pane>

      <el-tab-pane :label="source.DRUG_ATTRIBUTE[6]"
                   lazy>
        <classificationPharmacology />
      </el-tab-pane>

    </el-tabs>

  </div>

</template>

<script>
import CONSTANT from './constant'

export default {
  name: 'DrugProperties',
  data() {
    return {
      loading: true,
      activeName: '0',
      source: {
        DRUG_ATTRIBUTE: CONSTANT.DRUG_ATTRIBUTE
      },
      loades: [true, false, false, false, false, false, false]
    }
  },
  components: {
    basicDrug: () => import('./components/basicDrugs'),
    antimicrobialAgents: () => import('./components/antimicrobialAgents'),
    maJingDrugs: () => import('./components/maJingDrugs'),
    injectableDrugs: () => import('./components/injectableDrugs'),
    monitoringDrug: () => import('./components/monitoringDrug'),
    otherAttributes: () => import('./components/otherAttributes'),
    classificationPharmacology: () => import('./components/classificationPharmacology')
  },
  computed: {
    componentList() {
      return [
        this.basicDrug,
        this.antimicrobialAgents,
        this.maJingDrugs,
        this.injectableDrugs,
        this.monitoringDrug,
        this.otherAttributes,
        this.classificationPharmacology
      ]
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