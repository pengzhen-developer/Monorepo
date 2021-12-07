<template>
  <div class="layout-route ">
    <div class="full-width flex no-wrap bg-white">
      <MenuAside class="aside"></MenuAside>
      <MenuMain class="main"></MenuMain>
    </div>
  </div>
</template>

<script>
import MenuMain from './components/MenuMain.vue'
import MenuAside from './components/MenuAside.vue'
export default {
  name: 'Menu',
  components: { MenuMain, MenuAside }
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