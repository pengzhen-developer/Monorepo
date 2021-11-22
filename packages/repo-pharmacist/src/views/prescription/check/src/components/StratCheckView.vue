<template>
  <div class="row  full-width">
    <div class="col bg-white">
      <PrescriptionDetailView v-on:onFreshGetPre="freshGetPre"></PrescriptionDetailView>
    </div>
    <div class="col bg-white q-ml-sm">
      <PrescriptionCheckReslutView></PrescriptionCheckReslutView>
    </div>
  </div>

</template>

<script>
import PrescriptionDetailView from './PrescriptionDetailView'
import PrescriptionCheckReslutView from './PrescriptionCheckReslutView'
export default {
  components: {
    PrescriptionDetailView,
    PrescriptionCheckReslutView
  },
  data() {
    return {}
  },
  created() {},
  methods: {
    freshGetPre() {
      this.$emit('onGetNotCheckPre')
    }
  }
}
</script>

<style>
</style>