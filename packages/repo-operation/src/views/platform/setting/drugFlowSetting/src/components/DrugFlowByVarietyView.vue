/** 按品种 */

<template>
  <div>
    <div class="flex q-mb-md">
      <div class="em-6 text-justify">已选流向药店</div>
      <div class="q-mr-md">：</div>
      <div class="col bg-grey-2 q-py-md"
           v-if="inside.length || outside.length">
        <!-- 院内品种 -->
        <div v-if="inside.length > 0">
          <div class="inline-block bg-primary text-white q-px-md q-py-sm q-mb-lg"
               style="border-radius: 0 16px 16px 0">院内品种</div>

          <PharmacySelectView v-bind:data="inside"></PharmacySelectView>
        </div>

        <!-- 院外品种 -->
        <div v-if="outside.length > 0">
          <div class="inline-block bg-primary text-white q-px-md q-py-sm q-mb-lg"
               style="border-radius: 0 16px 16px 0">院外品种</div>

          <PharmacySelectView v-bind:data="outside"></PharmacySelectView>
        </div>
      </div>
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
    inside() {
      const confType = CONSTANT.CONF_TYPE_MAP.find((item) => item.label === '院内')

      return this.data.filter((item) => item.ConfType === confType.value)
    },

    outside() {
      const confType = CONSTANT.CONF_TYPE_MAP.find((item) => item.label === '院外')

      return this.data.filter((item) => item.ConfType === confType.value)
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