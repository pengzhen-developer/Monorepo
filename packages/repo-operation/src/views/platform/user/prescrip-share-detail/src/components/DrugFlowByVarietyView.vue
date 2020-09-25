/** 按品种 */

<template>
  <div>
    <div class="flex q-mb-md">
      <div class="em-6 text-justify">已选择药房</div>
      <div class="q-mr-md">：</div>
      <div class="col">
        <!-- 院内品种 -->
        <div class=" bg-grey-2 q-pt-20"
             v-for="item in data"
             v-bind:key="item.Varieties">
          <div class="inline-block bg-primary text-white q-px-md q-py-sm q-mb-lg"
               style="border-radius: 3px 16px 16px 0">{{item.Varieties}}</div>

          <PharmacySelectView v-bind:data="item"></PharmacySelectView>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PharmacySelectView from './../components/PharmacySelectView'

export default {
  props: {
    data: Array
  },

  components: {
    PharmacySelectView
  },

  computed: {}
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
.bg-grey-2 {
  background: #f9f9f9 !important;
}
</style>