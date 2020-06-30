/** 不限 */

<template>
  <div>
    <div class="flex q-mb-md">
      <div class="em-6 text-justify">选择流向药店</div>
      <div class="q-mr-md">：</div>
      <div class="col">
        <div class="q-mb-md">
          <div class="q-mb-md">
            <el-checkbox class="q-md-md inline-block"
                         v-model="model.pharmacyCloudChecked"
                         label="云药房"></el-checkbox>
          </div>

          <div class="q-mb-md"
               v-if="model.pharmacyCloudChecked">
            <PharmacyCloud v-bind:data.sync="model.pharmacyCloudData"></PharmacyCloud>
          </div>
        </div>

        <q-separator class="q-mb-md"
                     color="grey-2" />

        <div>
          <el-checkbox v-model="model.pharmacyChecked"
                       label="药店"></el-checkbox>

          <div v-if="model.pharmacyChecked">
            <Pharmacy v-bind:data.sync="model.pharmacyData"></Pharmacy>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CONSTANT from './../../constant'

import IPharmacyViewModel from './../model/IPharmacy'
import IPharmacyCloudViewModel from './../model/IPharmacyCloud'

import Pharmacy from './../components/Pharmacy'
import PharmacyCloud from './../components/PharmacyCloud'

export default {
  inject: ['providePreview'],

  components: {
    Pharmacy,
    PharmacyCloud
  },

  data() {
    return {
      model: {
        ...new IPharmacyViewModel(),
        ...new IPharmacyCloudViewModel()
      }
    }
  },

  computed: {
    setDispalyView() {
      return this.provideSetDispalyView
    },

    preview() {
      return this.providePreview
    }
  },

  watch: {
    model: {
      handler() {
        this.preview(this.model, CONSTANT.RULE_LIST.不限)
      },
      deep: true,
      immediate: true
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