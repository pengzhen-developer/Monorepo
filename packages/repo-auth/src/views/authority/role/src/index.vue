<template>
  <div class="layout-route ">
    <div class="full-width flex no-wrap bg-white">
      <Aside class="aside"></Aside>
      <Main class="main "></Main>
    </div>
  </div>
</template>

<script>
import Main from './components/Main'
import Aside from './components/Aside'
export default {
  name: 'Role',
  components: { Main, Aside }
}
</script>

<style lang="scss" scoped>
.aside {
  min-width: 200px;
  margin-top: 20px;
}
.main {
  flex: 1;
}
</style>