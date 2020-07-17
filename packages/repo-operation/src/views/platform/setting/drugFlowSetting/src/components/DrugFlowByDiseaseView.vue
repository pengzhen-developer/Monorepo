/** 按病种 */

<template>
  <div>
    <div class="flex q-mb-md">
      <div class="em-6 text-justify">已选流向药店</div>
      <div class="q-mr-md">：</div>
      <div class="col bg-grey-2 q-py-md"
           v-if="normal.length || severe.length || other.length">
        <!-- 普通订单 -->
        <div v-if="normal.length > 0">
          <div class="inline-block bg-primary text-white q-px-md q-py-sm q-mb-lg"
               style="border-radius: 0 16px 16px 0">普通订单</div>

          <PharmacySelectView v-bind:data="normal"></PharmacySelectView>
        </div>

        <!-- 慢病重症订单 -->
        <div v-if="severe.length > 0">
          <div class="inline-block bg-primary text-white q-px-md q-py-sm q-mb-lg"
               style="border-radius: 0 16px 16px 0">慢病重症订单</div>

          <PharmacySelectView v-bind:data="severe"></PharmacySelectView>
        </div>

        <!-- 其它订单 -->
        <div v-if="other.length > 0">
          <div class="inline-block bg-primary text-white q-px-md q-py-sm q-mb-lg"
               style="border-radius: 0 16px 16px 0">其它订单</div>

          <PharmacySelectView v-bind:data="other"></PharmacySelectView>
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
    normal() {
      const confType = CONSTANT.CONF_TYPE_MAP.find((item) => item.label === '普通')

      return this.data.filter((item) => item.ConfType === confType.value)
    },

    severe() {
      const confType = CONSTANT.CONF_TYPE_MAP.find((item) => item.label === '重症')

      return this.data.filter((item) => item.ConfType === confType.value)
    },

    other() {
      const confType = CONSTANT.CONF_TYPE_MAP.find((item) => item.label === '其它')

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