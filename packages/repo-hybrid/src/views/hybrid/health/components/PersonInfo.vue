<template>
  <div>
    <q-list>
      <div class="bg-grey-2 q-mb-sm"
           style="height: 10px; width: 100%;"></div>
      <div v-for="(item,index) in items"
           :key="index">
        <PersonInfoItem v-bind:item='item'></PersonInfoItem>
        <q-separator class="q-my-sm bg-grey-2"></q-separator>
      </div>

    </q-list>
  </div>
</template>
<script>
export default {
  components: {
    PersonInfoItem: () => import('./PersonInfoItem.vue')
  },
  props: {
    baseInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },

  data() {
    return {
      items: [
        { key: '项目名称', value: this.baseInfo.itemName },
        { key: '就诊医院', value: this.baseInfo.hospitalName },
        { key: '就诊人', value: this.baseInfo.patientName },
        { key: '性别', value: this.baseInfo.patientSex },
        { key: '年龄', value: this.baseInfo.age },
        { key: '报告时间', value: this.baseInfo.inspectionDate },
        { key: '申请科室', value: this.baseInfo.applyDept },
        { key: '申请医师', value: this.baseInfo.applyDoctor },
        { key: '影像ID', value: this.baseInfo.pacsId }
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