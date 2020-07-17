<template>
  <div>
    <PharmacyCloud v-bind:pharmacyRule="pharmacyRule"
                   v-bind:pharmacyConf="pharmacyConf"
                   v-bind:data.sync="data"></PharmacyCloud>

    <q-separator class="q-my-md"
                 color="grey-2" />

    <Pharmacy v-bind:pharmacyRule="pharmacyRule"
              v-bind:pharmacyConf="pharmacyConf"
              v-bind:data.sync="data"></Pharmacy>
  </div>
</template>

<script>
import PharmacyCloud from './PharmacyCloud'
import Pharmacy from './Pharmacy'

export default {
  components: {
    PharmacyCloud,
    Pharmacy
  },

  props: {
    pharmacyRule: Object,
    pharmacyConf: Object,
    data: Array
  },

  data() {
    return {
      pharmacyCloudChecked: false,
      pharmacyChecked: false
    }
  }
}
</script>

<style>
</style>