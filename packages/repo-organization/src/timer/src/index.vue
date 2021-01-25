<template>
  <div>
    <PharmacyOrderTimer></PharmacyOrderTimer>
    <PharmacyOrderCancelTimer></PharmacyOrderCancelTimer>
  </div>
</template>

<script>
import PharmacyOrderTimer from './components/PharmacyOrderTimer'
import PharmacyOrderCancelTimer from './components/PharmacyOrderCancelTimer'

export default {
  components: {
    PharmacyOrderTimer,
    PharmacyOrderCancelTimer
  }
}
</script>

<style>
</style>