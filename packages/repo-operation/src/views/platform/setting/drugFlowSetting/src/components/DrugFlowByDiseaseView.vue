/** 按病种 */

<template>
  <div v-if="visibleNormalPharmacyCloud || 
             visibleNormalPharmacy || 
             visibleSeverePharmacyCloud || 
             visibleSeverePharmacy || 
             visibleOtherPharmacyCloud || 
             visibleOtherPharmacy">
    <div class="flex q-mb-md">
      <div class="em-6 text-justify">已选流向药店</div>
      <div class="q-mr-md">：</div>
      <div class="col bg-grey-2 q-py-md">
        <!-- 普通订单 -->
        <div v-if="visibleNormalPharmacyCloud || visibleNormalPharmacy">
          <div class="inline-block bg-primary text-white q-px-md q-py-sm q-mb-lg"
               style="border-radius: 0 16px 16px 0">普通订单</div>

          <div class="row flex q-mb-lg"
               v-if="visibleNormalPharmacyCloud">
            <div style="width: 60px"
                 class="text-right">云药房:</div>
            <div class="col">
              <PharmacyCloudView v-bind:data="normalData.pharmacyCloudData"></PharmacyCloudView>
            </div>
          </div>

          <div class="row flex q-mb-lg"
               v-if="visibleNormalPharmacy">
            <div style="width: 60px"
                 class="text-right">药店:</div>
            <div class="col">
              <PharmacyView v-bind:data="normalData.pharmacyData"></PharmacyView>
            </div>
          </div>
        </div>

        <!-- 慢病重症订单 -->
        <div v-if="visibleSeverePharmacyCloud || visibleSeverePharmacy">
          <div class="inline-block bg-primary text-white q-px-md q-py-sm q-mb-lg"
               style="border-radius: 0 16px 16px 0">慢病重症订单</div>

          <div class="row flex q-mb-lg"
               v-if="visibleSeverePharmacyCloud">
            <div style="width: 60px"
                 class="text-right">云药房:</div>
            <div class="col">
              <PharmacyCloudView v-bind:data="severeData.pharmacyCloudData"></PharmacyCloudView>
            </div>
          </div>

          <div class="row flex q-mb-lg"
               v-if="visibleSeverePharmacy">
            <div style="width: 60px"
                 class="text-right">药店:</div>
            <div class="col">
              <PharmacyView v-bind:data="severeData.pharmacyData"></PharmacyView>
            </div>
          </div>
        </div>

        <!-- 其它订单 -->
        <div v-if="visibleOtherPharmacyCloud || visibleOtherPharmacy">
          <div class="inline-block bg-primary text-white q-px-md q-py-sm q-mb-lg"
               style="border-radius: 0 16px 16px 0">其它订单</div>

          <div class="row flex q-mb-lg"
               v-if="visibleOtherPharmacyCloud">
            <div style="width: 60px"
                 class="text-right">云药房:</div>
            <div class="col">
              <PharmacyCloudView v-bind:data="otherData.pharmacyCloudData"></PharmacyCloudView>
            </div>
          </div>

          <div class="row flex q-mb-lg"
               v-if="visibleOtherPharmacy">
            <div style="width: 60px"
                 class="text-right">药店:</div>
            <div class="col">
              <PharmacyView v-bind:data="otherData.pharmacyData"></PharmacyView>
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
    normalData() {
      return this.data?.[CONSTANT.DISEASE_LIST.普通订单]
    },

    severeData() {
      return this.data?.[CONSTANT.DISEASE_LIST.慢病重症订单]
    },

    otherData() {
      return this.data?.[CONSTANT.DISEASE_LIST.其它订单]
    },

    visibleNormalPharmacyCloud() {
      return this?.normalData?.pharmacyCloudChecked
    },

    visibleNormalPharmacy() {
      return this?.normalData?.pharmacyChecked
    },

    visibleSeverePharmacyCloud() {
      return this?.severeData?.pharmacyCloudChecked
    },

    visibleSeverePharmacy() {
      return this?.severeData?.pharmacyChecked
    },

    visibleOtherPharmacyCloud() {
      return this?.otherData?.pharmacyCloudChecked
    },

    visibleOtherPharmacy() {
      return this?.otherData?.pharmacyChecked
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