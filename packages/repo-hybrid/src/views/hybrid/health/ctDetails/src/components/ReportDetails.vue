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
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      items: []
    }
  },
  watch: {
    data: {
      handler() {
        this.items = [
          { key: '诊断', value: this.data.diagnosis },
          { key: '症状', value: this.data.symptom },
          { key: '结论', value: this.data.conclusion },
          { key: '部位', value: this.data.bodyPart },
          { key: '阴性阳性', value: this.data.yinYang },
          { key: '检查医生', value: this.data.reportDoctor },
          { key: '接收时间', value: this.data.reportDate },
          { key: '审核医生', value: this.data.checkDoctor },
          { key: '审核时间', value: this.data.checkDate }
        ]
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .q-item {
  min-height: auto;
}
</style>