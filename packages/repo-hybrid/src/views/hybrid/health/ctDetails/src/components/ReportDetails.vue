<template>
  <q-list>
    <div class="bg-grey-2 q-mb-sm"
         style="height: 10px; width: 100%;"></div>
    <div v-for="(item,index) in items"
         :key="index">
      <ReportDetailsItem v-bind:item='item'></ReportDetailsItem>
      <q-separator class="q-my-sm bg-grey-2"
                   v-if="index!=4"></q-separator>
      <div class="bg-grey-2 q-mb-sm"
           style="height: 10px; width: 100%;"
           v-else></div>

    </div>

  </q-list>
</template>

<script>
export default {
  components: {
    ReportDetailsItem: () => import('./ReportDetailsItem.vue')
  },
  props: {
    resultInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      items: [
        { key: '诊断', value: this.resultInfo.diagnosis },
        { key: '症状', value: this.resultInfo.symptom },
        { key: '结论', value: this.resultInfo.conclusion },
        { key: '部位', value: this.resultInfo.bodyPart },
        { key: '阴性阳性', value: this.resultInfo.yinYang },
        { key: '检查医生', value: this.resultInfo.reportDoctor },
        { key: '接收时间', value: this.resultInfo.reportDate },
        { key: '审核医生', value: this.resultInfo.checkDoctor },
        { key: '审核时间', value: this.resultInfo.checkDate }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .q-item {
  min-height: auto;
}
</style>