<template>
  <div class="layout-route ">
    <div class="full-width flex no-wrap bg-white">
      <UserAside class="aside"></UserAside>
      <UserMain class="main "></UserMain>
    </div>
  </div>
</template>

<script>
import UserMain from './components/UserMain'
import UserAside from './components/UserAside'
export default {
  name: 'User',
  components: { UserMain, UserAside }
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