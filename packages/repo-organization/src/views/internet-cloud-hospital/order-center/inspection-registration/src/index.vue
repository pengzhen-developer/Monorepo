<template>
  <div class="layout-route full-width flex">
    <RegistrationList v-show="showList"
                      v-on:onOrderClick="onOrderClick"></RegistrationList>
    <RegistrationDetail v-if="!showList"
                        v-bind:data="data"
                        v-on:onBack="onBack"></RegistrationDetail>
  </div>
</template>

<script>
import RegistrationList from './components/RegistrationList'
import RegistrationDetail from './components/RegistrationDetail'
export default {
  name: 'InspectionRegistration',
  components: { RegistrationList, RegistrationDetail },
  data() {
    return {
      showList: true,
      data: ''
    }
  },
  methods: {
    onOrderClick(data) {
      this.showList = false
      this.data = data
    },
    onBack() {
      this.showList = true
    }
  },
  beforeRouteLeave(to, from, next) {
    this.showList = true
    next()
  }
}
</script>

<style>
</style>