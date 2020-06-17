<template>
  <div class="q-pb-md">
    <q-tabs narrow-indicator
            class="q-mt-sm"
            dense
            align="justify"
            active-color="primary"
            v-model="tab">
      <q-tab v-bind:ripple="false"
             name="检查结果"
             label="检查结果" />
      <q-tab v-bind:ripple="false"
             name="基本信息"
             label="基本信息" />
    </q-tabs>

    <q-tab-panels v-model="tab"
                  animated
                  transition-prev="jump-up"
                  transition-next="jump-up">
      <q-tab-panel class="q-pa-none"
                   name="检查结果">
        <BloodRoutineResult v-bind:blood-routine="bloodRoutine.resultInfo"></BloodRoutineResult>
      </q-tab-panel>
      <q-tab-panel class="q-pa-none"
                   name="基本信息">
        <PersonBaseInfo v-bind:data="bloodRoutine.baseInfo"></PersonBaseInfo>
      </q-tab-panel>
    </q-tab-panels>
  </div>

</template>

<script>
import Service from './service/index'
export default {
  components: {
    BloodRoutineResult: () => import('./pages/BloodRoutineResult'),
    PersonBaseInfo: () => import('./pages/PersonBaseInfo')
  },
  data() {
    return {
      tab: '检查结果',
      bloodRoutine: {
        resultInfo: {},
        baseInfo: {}
      }
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    fetch() {
      const params = {
        checkId: this.$route.params.checkId
      }
      Service.fetch(params).then(res => {
        this.bloodRoutine = res.data
      })
    }
  }
}
</script>

<style>
</style>
