<template>
  <div>
    <PatientList v-show="showList"
                 v-on:onBtnClick="onBtnClick"></PatientList>
    <PatientDetail v-if="!showList"
                   v-bind:data="data"
                   v-on:onBack="onBack"></PatientDetail>
  </div>
</template>

<script>
import PatientList from './components/PatientList'
import PatientDetail from './components/PatientDetail'
export default {
  name: 'Patient',
  components: {
    PatientList,
    PatientDetail
  },
  data() {
    return {
      showList: true,
      data: ''
    }
  },
  methods: {
    onBtnClick(data) {
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