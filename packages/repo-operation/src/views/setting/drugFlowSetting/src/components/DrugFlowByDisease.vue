/** 按病种 */

<template>
  <div>
    <div class="flex items-center q-mb-lg">
      <div class="em-6 text-justify">选择病种</div>
      <div class="q-mr-md">：</div>
      <div class="col">
        <el-radio-group v-model="active">
          <el-radio-button v-for="rule in list"
                           v-bind:key="rule"
                           v-bind:label="rule">{{ rule }}</el-radio-button>
        </el-radio-group>

      </div>
    </div>

    <div class="flex q-mb-md">
      <div class="em-6 text-justify">选择流向药店</div>
      <div class="q-mr-md">：</div>
      <div class="col"
           v-for="rule in list"
           v-bind:key="rule"
           v-bind:label="rule"
           v-show="rule === active">
        <div class="q-mb-md">
          <div class="q-mb-md">
            <el-checkbox class="q-md-md inline-block"
                         v-model="model[active].pharmacyCloudChecked"
                         label="云药房"></el-checkbox>
          </div>

          <div class="q-mb-md"
               v-if="model[active].pharmacyCloudChecked">
            <PharmacyCloud v-bind:data.sync="model[active].pharmacyCloudData"></PharmacyCloud>
          </div>
        </div>

        <q-separator class="q-mb-md"
                     color="grey-2" />

        <div>
          <el-checkbox v-model="model[active].pharmacyChecked"
                       label="药店"></el-checkbox>

          <div v-if="model[active].pharmacyChecked">
            <Pharmacy v-bind:data.sync="model[active].pharmacyData"></Pharmacy>
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
      list: CONSTANT.DISEASE_LIST,
      active: CONSTANT.DISEASE_LIST.普通订单,

      model: {
        [CONSTANT.DISEASE_LIST.普通订单]: {
          ...new IPharmacyViewModel(),
          ...new IPharmacyCloudViewModel()
        },

        [CONSTANT.DISEASE_LIST.慢病重症订单]: {
          ...new IPharmacyViewModel(),
          ...new IPharmacyCloudViewModel()
        },

        [CONSTANT.DISEASE_LIST.其它订单]: {
          ...new IPharmacyViewModel(),
          ...new IPharmacyCloudViewModel()
        }
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
        this.preview(this.model, CONSTANT.RULE_LIST.按病种)
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