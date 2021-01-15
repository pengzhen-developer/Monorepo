<template>
  <div>
    <div class="row flex q-mb-lg"
         v-if="data.cloudDrugStores.length > 0">
      <div style="width: 80px"
           class="text-right">云药房:</div>
      <div class="col">
        <PharmacyCloudView v-bind:data="data.cloudDrugStores"></PharmacyCloudView>
      </div>
    </div>

    <div class="row flex q-mb-lg"
         v-if="data.confDrugStores.length > 0">
      <div style="width: 80px"
           class="text-right">药店:</div>
      <div class="col">
        <PharmacyView v-bind:data="data.confDrugStores"></PharmacyView>
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
    data: Object
  },

  computed: {}
}
</script>

<style>
</style>