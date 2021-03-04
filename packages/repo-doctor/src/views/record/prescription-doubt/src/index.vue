<template>
  <div class="bg-grey-2">
    <div class="row q-col-gutter-x-md">
      <div class="col">
        <div class="full-height bg-white"
             style="border-radius: 4px;">
          <PrescriptionDoubtReply v-bind:prescriptionId="$route.params.id"></PrescriptionDoubtReply>
        </div>
      </div>
      <div class="col">
        <div class="full-height q-pa-lg bg-white"
             style="border-radius: 4px;">
          <PrescriptionDoubtTimeline v-bind:prescriptionId="$route.params.id"></PrescriptionDoubtTimeline>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PrescriptionDoubtReply from './components/PrescriptionDoubtReply'
import PrescriptionDoubtTimeline from './components/PrescriptionDoubtTimeline'

export default {
  components: {
    PrescriptionDoubtReply,
    PrescriptionDoubtTimeline
  },

  data() {
    return {
      data: {}
    }
  },

  created() {}
}
</script>

<style>
</style>