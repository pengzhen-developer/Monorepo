<template>
  <div class="q-pb-md">
    <q-tabs narrow-indicator
            class="q-mt-sm"
            dense
            align="justify"
            active-color="primary"
            v-model="tab">
      <q-tab v-bind:ripple="false"
             name="报告明细"
             label="报告明细" />
      <q-tab v-bind:ripple="false"
             name="基本信息"
             label="基本信息" />
    </q-tabs>

    <q-tab-panels v-model="tab"
                  animated
                  transition-prev="jump-up"
                  transition-next="jump-up">
      <q-tab-panel class="q-pa-none"
                   name="报告明细">
        <ReportDetails></ReportDetails>
      </q-tab-panel>
      <q-tab-panel class="q-pa-none"
                   name="基本信息">
        <PersonInfo></PersonInfo>
      </q-tab-panel>
    </q-tab-panels>
  </div>

</template>

<script>
export default {
  components: {
    ReportDetails: () => import('./components/ReportDetails'),
    PersonInfo: () => import('./components/PersonInfo')
  },

  data() {
    return {
      tab: '报告明细'
    }
  }
}
</script>

<style>
</style>