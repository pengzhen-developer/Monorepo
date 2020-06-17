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
        <bloodRoutineResult v-bind:blood-routine="bloodRoutine.resultInfo"></bloodRoutineResult>
      </q-tab-panel>
      <q-tab-panel class="q-pa-none"
                   name="基本信息">
        <PersonInfo v-bind:baseInfo='bloodRoutine.baseInfo'></PersonInfo>
      </q-tab-panel>
    </q-tab-panels>
  </div>

</template>

<script>
  import Service from './service/index'
  import bloodRoutineResult from "./pages/bloodRoutineResult";
  import PersonInfo from "../../../components/PersonInfo";
  export default {
  components: {
    bloodRoutineResult,
    PersonInfo
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
      Service.fetch(params).then((res) => {
        this.bloodRoutine = res.data
      })
    }
  }
}
</script>

<style>
</style>
