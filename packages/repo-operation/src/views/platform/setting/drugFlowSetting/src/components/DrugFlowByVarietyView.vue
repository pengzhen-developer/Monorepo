/** 按品种 */

<template>
  <div v-if="visibleInsidePharmacyCloud || 
             visibleInsidePharmacy || 
             visibleOutsidePharmacyCloud || 
             visibleOutsidePharmacy">
    <div class="flex q-mb-md">
      <div class="em-6 text-justify">已选流向药店</div>
      <div class="q-mr-md">：</div>
      <div class="col bg-grey-2 q-py-md">
        <!-- 院内 -->
        <div v-if="visibleInsidePharmacyCloud || visibleInsidePharmacy">
          <div class="inline-block bg-primary text-white q-px-md q-py-sm q-mb-lg"
               style="border-radius: 0 16px 16px 0">院内品种</div>

          <div class="row flex q-mb-lg"
               v-if="visibleInsidePharmacyCloud">
            <div style="width: 60px"
                 class="text-right">云药房:</div>
            <div class="col">
              <PharmacyCloudView v-bind:data="insideData.pharmacyCloudData"></PharmacyCloudView>
            </div>
          </div>

          <div class="row flex q-mb-lg"
               v-if="visibleInsidePharmacy">
            <div style="width: 60px"
                 class="text-right">药店:</div>
            <div class="col">
              <PharmacyView v-bind:data="insideData.pharmacyData"></PharmacyView>
            </div>
          </div>
        </div>

        <!-- 院外 -->
        <div v-if="visibleOutsidePharmacyCloud || visibleOutsidePharmacy">
          <div class="inline-block bg-primary text-white q-px-md q-py-sm q-mb-lg"
               style="border-radius: 0 16px 16px 0">院外品种</div>

          <div class="row flex q-mb-lg"
               v-if="visibleOutsidePharmacyCloud">
            <div style="width: 60px"
                 class="text-right">云药房:</div>
            <div class="col">
              <PharmacyCloudView v-bind:data="outsideData.pharmacyCloudData"></PharmacyCloudView>
            </div>
          </div>

          <div class="row flex q-mb-lg"
               v-if="visibleOutsidePharmacy">
            <div style="width: 60px"
                 class="text-right">药店:</div>
            <div class="col">
              <PharmacyView v-bind:data="outsideData.pharmacyData"></PharmacyView>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CONSTANT from './../../constant'

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
    insideData() {
      return this.data?.[CONSTANT.VARIETY_LIST.院内品种]
    },

    outsideData() {
      return this.data?.[CONSTANT.VARIETY_LIST.院外品种]
    },

    visibleInsidePharmacyCloud() {
      return this?.insideData?.pharmacyCloudChecked
    },

    visibleInsidePharmacy() {
      return this?.insideData?.pharmacyChecked
    },

    visibleOutsidePharmacyCloud() {
      return this?.outsideData?.pharmacyCloudChecked
    },

    visibleOutsidePharmacy() {
      return this?.outsideData?.pharmacyChecked
    }
  }
}
</script>


<style lang="scss" scoped>
.em-3 {
  width: 3em;
  display: inline-block;
  text-align: justify;
  text-align-last: justify;
}

.pharmacy {
  border-radius: 4px;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  min-height: 160px;
}
</style>