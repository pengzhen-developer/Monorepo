<template>
  <div>
    <div class="row flex q-mb-lg"
         v-if="PharmacyCloudData.length > 0">
      <div style="width: 80px"
           class="text-right">云药房:</div>
      <div class="col">
        <PharmacyCloudView v-bind:data="PharmacyCloudData"></PharmacyCloudView>
      </div>
    </div>

    <div class="row flex q-mb-lg"
         v-if="PharmacyData.length > 0">
      <div style="width: 80px"
           class="text-right">药店:</div>
      <div class="col">
        <PharmacyView v-bind:data="PharmacyData"></PharmacyView>
      </div>
    </div>
  </div>
</template>

<script>
import PharmacyCloudView from './PharmacyCloudView'
import PharmacyView from './PharmacyView'

export default {
  components: {
    PharmacyCloudView,
    PharmacyView
  },

  props: {
    data: Array
  },

  computed: {
    PharmacyCloudData() {
      return this.data?.filter((item) => item.CustomerType === 50)
    },

    PharmacyData() {
      return this.data?.filter((item) => item.CustomerType !== 50)
    }
  }
}
</script>

<style>
</style>