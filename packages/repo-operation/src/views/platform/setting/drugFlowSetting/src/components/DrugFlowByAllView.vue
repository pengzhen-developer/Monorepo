/** 不限 */

<template>
  <div class="flex q-mb-md">
    <div class="em-6 text-justify">已选流向药店</div>
    <div class="q-mr-md">：</div>
    <div class="col bg-grey-2 q-py-md"
         v-if="unlimited.length">
      <PharmacySelectView v-bind:data="unlimited"></PharmacySelectView>
    </div>
  </div>
</template>

<script>
import CONSTANT from './../../constant'

import PharmacySelectView from './../components/PharmacySelectView'

export default {
  props: {
    data: Array
  },

  components: {
    PharmacySelectView
  },

  computed: {
    unlimited() {
      const confType = CONSTANT.CONF_TYPE_MAP.find((item) => item.label === '不限')

      return this.data.filter((item) => item.ConfType === confType.value)
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