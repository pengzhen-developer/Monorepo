<template>
  <q-list>
    <div class="bg-grey-2 q-mb-sm"
         style="height: 10px; width: 100%;"></div>

    <q-item class="row flex justify-between items-center">
      <div class="col-3">诊断</div>
      <div class="text-justify text-grey-7 row-value">{{ data.diagnosis }}</div>
    </q-item>
    <q-separator class="q-my-sm bg-grey-2"></q-separator>

    <q-item class="row flex justify-between items-center">
      <div class="col-3">症状</div>
      <div class="text-justify text-grey-7 row-value">{{ data.symptom }}</div>
    </q-item>
    <q-separator class="q-my-sm bg-grey-2"></q-separator>

    <q-item class="row flex justify-between items-center">
      <div class="col-3">结论</div>
      <div class="text-justify text-grey-7 row-value">{{ data.conclusion }}</div>
    </q-item>
    <q-separator class="q-my-sm bg-grey-2"></q-separator>

    <q-item class="row flex justify-between items-center">
      <div class="col-3">印象</div>
      <div class="text-justify text-grey-7 row-value">{{ data.impression }}</div>
    </q-item>
    <q-separator class="q-my-sm bg-grey-2"></q-separator>

    <q-item class="row flex justify-between items-center">
      <div class="col-3">部位</div>
      <div class="text-justify text-grey-7 row-value">{{ data.bodyPart }}</div>
    </q-item>
    <q-separator class="q-my-sm bg-grey-2"></q-separator>

    <q-item class="row flex justify-between items-center">
      <div class="col-3">阴性阳性</div>
      <div class="text-justify text-grey-7 row-value">{{ data.yinYang }}</div>
    </q-item>

    <div class="bg-grey-2 q-mb-sm"
         style="height: 10px; width: 100%;"></div>

    <q-item class="row flex justify-between items-center">
      <div class="col-3">检查医生</div>
      <div class="text-justify text-grey-7 row-value">{{ data.reportDoctor }}</div>
    </q-item>
    <q-separator class="q-my-sm bg-grey-2"></q-separator>

    <q-item class="row flex justify-between items-center">
      <div class="col-3">接收时间</div>
      <div class="text-justify text-grey-7 row-value">{{ data.reportDate }}</div>
    </q-item>
    <q-separator class="q-my-sm bg-grey-2"></q-separator>

    <q-item class="row flex justify-between items-center">
      <div class="col-3">审核医生</div>
      <div class="text-justify text-grey-7 row-value">{{ data.checkDoctor }}</div>
    </q-item>
    <q-separator class="q-my-sm bg-grey-2"></q-separator>

    <q-item class="row flex justify-between items-center">
      <div class="col-3">审核时间</div>
      <div class="text-justify text-grey-7 row-value">{{ data.checkDate }}</div>
    </q-item>

  </q-list>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .q-item {
  min-height: auto;
}
</style>