<template>
  <div>
    <!-- ======= Top Bar ======= -->
    <TopBar></TopBar>

    <!-- ======= Header ======= -->
    <Header></Header>

    <!-- ======= Hero Section ======= -->
    <Banner></Banner>
    <!-- End Hero -->

    <!-- ======= Main ======= -->
    <main id="main">
      <!-- ======= 平台数据开始 ======= -->
      <!-- <PlatformData></PlatformData> -->
      <!-- ======= 平台数据结束 ======= -->

      <!-- ======= 平台服务开始  ======= -->
      <PlatformService></PlatformService>
      <!-- ======= 平台服务结束 ======= -->

      <!-- ======= 解决方案开始 ======= -->
      <Solution></Solution>
      <!-- ======= 解决方案结束 ======= -->

      <!-- ======= 合作案例开始 ======= -->
      <CooperationCase></CooperationCase>
      <!-- ======= 合作案例结束 ======= -->

      <!-- ======= 新闻动态开始 ======= -->
      <News></News>
      <!-- ======= 新闻动态结束 ======= -->

    </main><!-- End Main -->

    <!-- ======= Footer ======= -->
    <Footer></Footer>
    <!-- End Footer -->

    <a href="#"
       class="back-to-top"><i class="icofont-simple-up"></i></a>

  </div>
</template>

<script>
import TopBar from './components/TopBar'
import Header from './components/Header'
import Banner from './components/Banner'
import Footer from './components/Footer'
// import PlatformData from './components/PlatformData'
import PlatformService from './components/PlatformService'
import Solution from './components/Solution'
import CooperationCase from './components/CooperationCase'
import News from './components/News'

export default {
  components: {
    TopBar,
    Header,
    Banner,
    Footer,
    // PlatformData,
    PlatformService,
    Solution,
    News,
    CooperationCase
  },

  created() {},

  mounted() {
    this.$nextTick(function() {
      require('./assets/css/style.css')
      require('./assets/js/main.js')
    })
  },

  methods: {}
}
</script>

<style>
</style>