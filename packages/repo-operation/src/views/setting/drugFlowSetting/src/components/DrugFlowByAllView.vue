/** 不限 */

<template>
  <div class="flex q-mb-md"
       v-if="visiblePharmacyCloud || visiblePharmacy">
    <div class="em-6 text-justify">已选流向药店</div>
    <div class="q-mr-md">：</div>
    <div class="col bg-grey-2 q-py-md">
      <div class="row flex q-mb-lg"
           v-if="visiblePharmacyCloud">
        <div style="width: 80px"
             class="text-right">云药房:</div>
        <div class="col">
          <PharmacyCloudView v-bind:data="data.pharmacyCloudData"></PharmacyCloudView>
        </div>
      </div>

      <div class="row flex q-mb-lg"
           v-if="visiblePharmacy">
        <div style="width: 80px"
             class="text-right">药店:</div>
        <div class="col">
          <PharmacyView v-bind:data="data.pharmacyData"></PharmacyView>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PharmacyView from './PharmacyView'
import PharmacyCloudView from './PharmacyCloudView'

export default {
  props: {
    data: Object
  },

  components: {
    PharmacyView,
    PharmacyCloudView
  },

  computed: {
    visiblePharmacyCloud() {
      return this?.data?.pharmacyCloudChecked
    },

    visiblePharmacy() {
      return this?.data?.pharmacyChecked
    }
  }
}
</script>

<style lang="scss" scoped>
.em-6 {
  width: 6em;
  display: inline-block;
  text-align: justify;
  text-align-last: justify;
}
</style>