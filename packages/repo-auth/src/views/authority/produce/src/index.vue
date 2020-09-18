<template>
  <div class="layout-route ">
    <div class="full-width flex no-wrap bg-white">
      <ProduceAside class="aside"></ProduceAside>
      <ProduceMain class="main "></ProduceMain>
    </div>
  </div>
</template>

<script>
import ProduceMain from './components/ProduceMain'
import ProduceAside from './components/ProduceAside'
export default {
  name: 'Produce',
  components: { ProduceMain, ProduceAside }
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