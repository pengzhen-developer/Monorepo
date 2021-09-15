<template>
  <div>
    <q-list>

      <div class="bg-grey-2 q-mb-sm"
           style="height: 10px; width: 100%;"></div>

      <q-item class="row flex justify-between items-center">
        <div class="col-3">项目名称</div>
        <div class="text-justify text-grey-7 row-value">{{ data.itemName }}</div>
      </q-item>
      <q-separator class="q-my-sm bg-grey-2"></q-separator>

      <q-item class="row flex justify-between items-center">
        <div class="col-3">就诊医院</div>
        <div class="text-justify text-grey-7 row-value">{{ data.hospitalName }}</div>
      </q-item>
      <q-separator class="q-my-sm bg-grey-2"></q-separator>

      <q-item class="row flex justify-between items-center">
        <div class="col-3">就诊人</div>
        <div class="text-justify text-grey-7 row-value">{{ data.patientName }}</div>
      </q-item>
      <q-separator class="q-my-sm bg-grey-2"></q-separator>

      <q-item class="row flex justify-between items-center">
        <div class="col-3">性别</div>
        <div class="text-justify text-grey-7 row-value">{{ data.patientSex }}</div>
      </q-item>
      <q-separator class="q-my-sm bg-grey-2"></q-separator>

      <q-item class="row flex justify-between items-center">
        <div class="col-3">年龄</div>
        <div class="text-justify text-grey-7 row-value">{{ data.age }}</div>
      </q-item>
      <q-separator class="q-my-sm bg-grey-2"></q-separator>

      <q-item class="row flex justify-between items-center">
        <div class="col-3">报告时间</div>
        <div class="text-justify text-grey-7 row-value">{{ data.inspectionDate }}</div>
      </q-item>
      <q-separator class="q-my-sm bg-grey-2"></q-separator>

      <q-item class="row flex justify-between items-center">
        <div class="col-3">申请科室</div>
        <div class="text-justify text-grey-7 row-value">{{ data.applyDept }}</div>
      </q-item>
      <q-separator class="q-my-sm bg-grey-2"></q-separator>

      <q-item class="row flex justify-between items-center">
        <div class="col-3">申请医师</div>
        <div class="text-justify text-grey-7 row-value">{{ data.applyDoctor }}</div>
      </q-item>
      <q-separator class="q-my-sm bg-grey-2"></q-separator>

      <q-item class="row flex justify-between items-center">
        <div class="col-3">影像ID</div>
        <div class="text-justify text-grey-7 row-value">{{ data.pacsId }}</div>
      </q-item>

    </q-list>
  </div>
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