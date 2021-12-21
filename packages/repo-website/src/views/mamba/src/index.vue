<template>
  <div style="background: rgba(242,242,242,1);"
       id="container">
    <!-- ======= Top Bar ======= -->
    <TopBar></TopBar>

    <!-- ======= Header ======= -->
    <Header></Header>

    <!-- ======= Hero Section ======= -->

    <!-- End Hero -->

    <!-- ======= Main ======= -->
    <main id="main">
      <!-- ======= 平台数据开始 ======= -->
      <!-- <PlatformData></PlatformData> -->
      <!-- ======= 平台数据结束 ======= -->
      <Banner></Banner>

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

      <Footer></Footer>

    </main><!-- End Main -->

    <!-- ======= Footer ======= -->

    <!-- End Footer -->

    <a href="#"
       class="back-to-top"><i class="icofont-simple-up"></i></a>

    <div id="open-service"
         class="html-style"
         style="width: 1202px !important; margin: 10px auto; background: rgba(242,242,242,1); display: none;"
         ref="frame"
         frameborder="0">
      <iframe class="full-width full-height"
              ref="frame"
              style="padding: 24px; background: white;"
              frameborder="0"
              :src="html">
      </iframe>

    </div>

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

  data() {
    return {
      html: 'static/open.html'
    }
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

<style lang='scss' scoped>
#openService {
  display: none;
  position: absolute;
}

.html-style {
  height: calc(100vh - 141px);
}
</style>