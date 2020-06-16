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
import Service from './../service'

export default {
  components: {
    ReportDetailsItem: () => import('./ReportDetailsItem.vue')
  },
  data() {
    return {
      items: [
        { key: '诊断', value: '急性会厌炎症' },
        { key: '症状', value: '脑实质各叶未见明显异常' },
        { key: '结论', value: '左侧刮骨骨折' },
        { key: '部位', value: '头颅' },
        { key: '阴性阳性', value: '阴性' },
        { key: '检查医生', value: '欧阳霸' },
        { key: '接收时间', value: '2020-04-15 08:12:10' },
        { key: '审核医生', value: '欧阳霸' },
        { key: '审核时间', value: '2020-04-15 08:12:10' }
      ]
    }
  },

  created() {
    // this.fetch()
  },

  methods: {
    fetch() {
      this.getUserInfo()
      this.getUserInfo2()
    },

    getUserInfo() {
      Service.fetch().then((res) => {
        console.log('获取到了第 1 个', res)
      })
    },

    getUserInfo2() {
      Service.fetch().then((res) => {
        console.log('获取到了第 2 个', res)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .q-item {
  min-height: auto;
}
</style>