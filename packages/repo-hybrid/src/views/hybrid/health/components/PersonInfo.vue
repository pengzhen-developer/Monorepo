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
          { key: '项目名称', value: this.data.itemName },
          { key: '就诊医院', value: this.data.hospitalName },
          { key: '就诊人', value: this.data.patientName },
          { key: '性别', value: this.data.patientSex },
          { key: '年龄', value: this.data.age },
          { key: '报告时间', value: this.data.inspectionDate },
          { key: '申请科室', value: this.data.applyDept },
          { key: '申请医师', value: this.data.applyDoctor },
          { key: '影像ID', value: this.data.pacsId }
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