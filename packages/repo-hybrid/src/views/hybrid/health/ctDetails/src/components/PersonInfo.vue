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
  data() {
    return {
      items: [
        { key: '项目名称', value: '静脉血清' },
        { key: '就诊医院', value: '五莲县中心医院' },
        { key: '就诊人', value: '王大二' },
        { key: '性别', value: '男' },
        { key: '年龄', value: '30' },
        { key: '报告时间', value: '2020-04-15 08:12:10' },
        { key: '申请科室', value: '神经外科' },
        { key: '申请医师', value: '欧阳霸' },
        { key: '影像ID', value: '3019392' }
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