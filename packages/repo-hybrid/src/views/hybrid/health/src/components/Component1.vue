<template>
  <q-list>
    <div class="bg-grey-2 q-mb-sm"
         style="height: 10px; width: 100%;"></div>

    <q-item class="row flex justify-between">
      <div class="col-3">症状</div>
      <div class="text-justify text-grey-7">脑实质各叶未见明显异常密度灶，幕上下脑室、脑池形态如常，两侧对称，中线结构居中，左侧颧弓骨折伴皮下血肿。</div>
    </q-item>

    <q-separator class="q-my-sm bg-grey-2"></q-separator>

    <q-item class="row flex justify-between">
      <div class="col-3">主治医生</div>
      <div class="text-justify text-grey-7">欧阳</div>
    </q-item>

    <q-separator class="q-my-sm bg-grey-2"></q-separator>

    <q-item class="row flex justify-between">
      <div class="col-3">结论</div>
      <div class="text-justify text-grey-7">欧阳</div>
    </q-item>

    <q-separator class="q-my-sm bg-grey-2"></q-separator>

    <q-item class="row flex justify-between">
      <div class="col-3">部位</div>
      <div class="text-justify text-grey-7">欧阳</div>
    </q-item>

    <div class="bg-grey-2 q-my-sm"
         style="height: 10px; width: 100%;"></div>

    <q-item class="row flex justify-between">
      <div class="col-3">检查医生</div>
      <div class="text-justify text-grey-7">欧阳</div>
    </q-item>

    <q-separator class="q-my-sm bg-grey-2"></q-separator>

    <q-item class="row flex justify-between">
      <div class="col-3">接收时间</div>
      <div class="text-justify text-grey-7">欧阳</div>
    </q-item>
  </q-list>
</template>

<script>
import Service from './../service'

export default {
  created() {
    this.fetch()
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