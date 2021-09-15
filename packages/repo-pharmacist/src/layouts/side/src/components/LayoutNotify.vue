<template>
  <div>
    <LayoutNotifyPrescription ref="LayoutNotifyPrescription"></LayoutNotifyPrescription>
    <slot></slot>
  </div>
</template>

<script>
import LayoutNotifyPrescription from './LayoutNotifyPrescription'

export default {
  components: {
    LayoutNotifyPrescription
  },
  data() {
    return {}
  }
}
</script>

<style>
</style>