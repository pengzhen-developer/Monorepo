/** 不限 */

<template>
  <div>
    <div class="flex q-mb-md">
      <div class="em-6 text-justify">选择流向药店</div>
      <div class="q-mr-md">：</div>
      <div class="col">
        <PharmacySelect v-bind:pharmacyRule="setRule('不限')"
                        v-bind:pharmacyConf="setConf('不限')"
                        v-bind:data.sync="data"></PharmacySelect>
      </div>
    </div>
  </div>
</template>

<script>
import CONSTANT from './../../constant'

import PharmacySelect from './../components/PharmacySelect'

export default {
  components: {
    PharmacySelect
  },

  props: {
    data: Array
  },

  methods: {
    setRule(type) {
      return CONSTANT.RULE_FLAG_MAP.find((item) => item.label === type)
    },

    setConf(type) {
      return CONSTANT.CONF_TYPE_MAP.find((item) => item.label === type)
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