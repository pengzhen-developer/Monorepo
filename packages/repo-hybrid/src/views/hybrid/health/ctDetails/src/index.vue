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
        <ReportDetails v-bind:resultInfo='resultInfo'></ReportDetails>
      </q-tab-panel>
      <q-tab-panel class="q-pa-none"
                   name="基本信息">
        <PersonInfo v-bind:baseInfo='baseInfo'></PersonInfo>
      </q-tab-panel>
    </q-tab-panels>
  </div>

</template>

<script>
import Service from './service'

export default {
  components: {
    ReportDetails: () => import('./components/ReportDetails'),
    PersonInfo: () => import('../../components/PersonInfo')
  },

  data() {
    return {
      tab: '报告明细',
      baseInfo: {},
      resultInfo: {}
    }
  },
  created() {
    this.fetch()
  },

  methods: {
    fetch() {
      this.getPacsDetail()
    },

    getPacsDetail() {
      const params = {
        checkId: this.$route.params.checkId
      }

      Service.getPacsDetail(params).then((res) => {
        this.baseInfo = res.data.baseInfo
        this.resultInfo = res.data.resultInfo
      })
    }
  }
}
</script>

<style>
</style>
