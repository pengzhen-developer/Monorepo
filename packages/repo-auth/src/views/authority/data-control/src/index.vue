<template>
  <div class="layout-route ">
    <div class="full-width flex no-wrap bg-white">
      <DataControlAside class="aside"></DataControlAside>
      <DataControlMain class="main"></DataControlMain>
    </div>
  </div>
</template>

<script>
import DataControlAside from './components/DataControlAside'
import DataControlMain from './components/DataControlMain'

export default {
  name: 'DataControl',

  components: {
    DataControlAside,
    DataControlMain
  }
}
</script>

<style lang="scss" scoped>
.aside {
  min-width: 200px;
}
.main {
  flex: 1;
}
</style>