<template>
  <div class="layout-route">
    <template v-if="shouldDisplayOrganizationList">
      <OrganizationList v-on:showIntelligenceConfig="showIntelligenceConfig"
                        v-on:showPharmacistConfig="showPharmacistConfig"></OrganizationList>
    </template>

    <template v-if="shouldDisplayPharmacistConfig">
      <PharmacistConfig v-on:back="back"
                        v-bind:data="data"></PharmacistConfig>
    </template>

    <PeaceDialog title="智能审方设置"
                 v-if="shouldDisplayIntelligenceConfig"
                 v-bind:visible.sync="shouldDisplayIntelligenceConfig">
      <IntelligenceConfig v-on:save="back"
                          v-on:cancel="back"
                          v-bind:data="data"></IntelligenceConfig>
    </PeaceDialog>
  </div>
</template>

<script>
import OrganizationList from './components/OrganizationList.vue'
import IntelligenceConfig from './components/IntelligenceConfig.vue'
import PharmacistConfig from './components/PharmacistConfig.vue'

export default {
  name: 'OrganList',

  components: {
    OrganizationList,
    IntelligenceConfig,
    PharmacistConfig
  },

  data() {
    return {
      data: undefined,

      /**
       * @description: 是否应该显示机构列表
       */
      shouldDisplayOrganizationList: true,
      /**
       * @description: 是否应该显示智能审方设置
       */
      shouldDisplayIntelligenceConfig: false,
      /**
       * @description: 是否应该显示药师审方设置
       */
      shouldDisplayPharmacistConfig: false
    }
  },

  methods: {
    /**
     * @description: 返回页面到初始列表状态
     */
    back() {
      this.shouldDisplayOrganizationList = true
      this.shouldDisplayIntelligenceConfig = false
      this.shouldDisplayPharmacistConfig = false
    },

    /**
     * @description: 显示智能审方设置
     * @param {*} row
     * @return {*}
     */
    showIntelligenceConfig(row) {
      this.data = row
      this.shouldDisplayIntelligenceConfig = true
    },

    /**
     * @description: 显示药师审方设置
     * @param {*} row
     * @return {*}
     */
    showPharmacistConfig(row) {
      this.data = row
      this.shouldDisplayOrganizationList = false
      this.shouldDisplayPharmacistConfig = true
    }
  }
}
</script>

<style>
</style>