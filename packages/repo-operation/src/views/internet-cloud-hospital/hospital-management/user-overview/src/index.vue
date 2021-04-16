<template>
  <div class="flex full-width">
    <HospitalList @onItemClick="onItemClick"
                  v-show="!showInfo"></HospitalList>
    <UserList :info="currentInfo"
              @goback="goback"
              v-if="showInfo"></UserList>
  </div>
</template>

<script>
import HospitalList from './components/HospitalList'
import UserList from './components/UserList'
export default {
  name: 'user-overview',
  components: { HospitalList, UserList },
  data() {
    return {
      showInfo: false,
      currentInfo: {}
    }
  },
  methods: {
    onItemClick(result) {
      if (result) {
        this.currentInfo = result

        this.showInfo = true
      }
    },
    goback() {
      this.showInfo = false
      this.currentInfo = {}
    }
  }
}
</script>

<style>
</style>