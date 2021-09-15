<template>
  <div>
    <GeneralDrugRegulationsList ref="GeneralDrugRegulationsListRef"
                                v-show="!generalDrugRegulationsAudit.visible"
                                v-on:showAudit="onShowAudit"
                                v-on:showLog="onShowLog"></GeneralDrugRegulationsList>

    <GeneralDrugRegulationsLog v-if="generalDrugRegulationsLog.visible"
                               v-bind:data="generalDrugRegulationsLog.data"
                               v-bind:visible.sync="generalDrugRegulationsLog.visible"></GeneralDrugRegulationsLog>

    <GeneralDrugRegulationsAudit v-if="generalDrugRegulationsAudit.visible"
                                 v-on:fecth="onFecth"
                                 v-bind:data="generalDrugRegulationsAudit.data"
                                 v-bind:visible.sync="generalDrugRegulationsAudit.visible"></GeneralDrugRegulationsAudit>
  </div>
</template>

<script>
export default {
  components: {
    GeneralDrugRegulationsList: () => import('./components/GeneralDrugRegulationsList'),
    GeneralDrugRegulationsLog: () => import('./components/GeneralDrugRegulationsLog'),
    GeneralDrugRegulationsAudit: () => import('./components/GeneralDrugRegulationsAudit')
  },

  data() {
    return {
      generalDrugRegulationsLog: {
        data: null,
        visible: false
      },

      generalDrugRegulationsAudit: {
        data: null,
        visible: false
      }
    }
  },

  methods: {
    onShowAudit(data) {
      this.generalDrugRegulationsAudit.data = data
      this.generalDrugRegulationsAudit.visible = true
    },

    onShowLog(data) {
      this.generalDrugRegulationsLog.data = data
      this.generalDrugRegulationsLog.visible = true
    },

    onFecth() {
      this.$refs.GeneralDrugRegulationsListRef.fetch()
    }
  }
}
</script>

<style>
</style>