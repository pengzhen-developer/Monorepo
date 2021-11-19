<template>
  <div class="row  full-width">
    <div class="col bg-white">
      <PrescriptionDetailView v-bind:jztClaimNo="jztClaimNo"
                              v-bind:notCheckedCount="notCheckedCount"></PrescriptionDetailView>
    </div>
    <div class="col bg-white q-ml-sm">
      <PrescriptionCheckReslutView v-bind:jztClaimNo="jztClaimNo"></PrescriptionCheckReslutView>
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
  props: {
    jztClaimNo: String,
    notCheckedCount: Number
  },
  data() {
    return {}
  },
  created() {}
}
</script>

<style>
</style>