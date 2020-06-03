<template>
  <el-container class="layout">
    <el-aside class="layout-aside"
              width="240px">
      <LayoutAside></LayoutAside>
    </el-aside>
    <el-container class="layout-container">
      <el-header height="auto">
        <LayoutHeader></LayoutHeader>
      </el-header>
      <el-main class="layout-main">
        <router-view />
      </el-main>
      <el-footer class="layout-footer">
        <span>全息云通健康科技（武汉）有限公司 </span>
        <span style="margin:0 5px;"> | </span>
        <span> 鄂ICP备19008514</span>
      </el-footer>
    </el-container>
  </el-container>
</template>

<script>
import LayoutAside from './components/LayoutAside'
import LayoutHeader from './components/LayoutHeader'

export default {
  components: {
    LayoutAside,
    LayoutHeader
  }
}
</script>

<style lang="scss" scoped>
.layout {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(#fafafa, #fcf9fc);

  overflow: hidden;

  .layout-aside {
    box-shadow: 0 0 0.5rem 0 rgba(0, 0, 0, 0.1);
  }

  .layout-main {
    padding: 24px;
  }

  .layout-footer {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>