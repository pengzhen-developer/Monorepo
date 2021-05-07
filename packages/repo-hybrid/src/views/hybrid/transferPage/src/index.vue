<template>
  <div class="page">
    <img src=".//assets/img/logo.png"
         class="logo">
    <img src=".//assets/img/top_bg.png"
         class="top-bg">
    <img src=".//assets/img/bottom_bg.png"
         class="bottom-bg">
    <img src=".//assets/img/tip_bg.png"
         class="tip-bg">
    <img src=".//assets/img/action_bg.png"
         @click="downloadApp"
         class="action-btn">
  </div>
</template>
<script>
export default {
  created() {
    this.$nextTick().then(() => {
      this.openApp()
    })
  },
  data() {
    return {
      constants: {}
    }
  },
  methods: {
    openApp() {
      if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
        // iOS
        try {
          window.location = 'zyycloud://' //schema链接或者universal link
        } catch (e) {
          console.log(e)
        }
      } else if (navigator.userAgent.match(/android/i)) {
        // android
        try {
          window.location = 'zyycloud://home' //schema链接或者universal link
        } catch (e) {
          console.log(e)
        }
      } else {
        // PC
      }
    },
    downloadApp() {
      if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
        try {
          window.location = process.env.VUE_APP_DOWNLOAD_IOS //ios下载地址
        } catch (e) {
          console.log(e)
        }
      } else if (navigator.userAgent.match(/android/i)) {
        try {
          window.location = process.env.VUE_APP_DOWNLOAD_ANDROID //android下载地址
        } catch (e) {
          console.log(e)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.page {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.logo {
  position: absolute;
  top: 33px;
  left: 0;
  width: 200px;
  height: 49px;
  z-index: 2;
}

.top-bg {
  position: absolute;
  top: 0;
  width: 100%;
  height: 61.77vh;
  z-index: 1;
}

.bottom-bg {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 47.68vh;
  z-index: 3;
}

.tip-bg {
  position: absolute;
  bottom: 132px;
  left: 30px;
  right: 30px;
  height: 122px;
  z-index: 4;
}

.action-btn {
  z-index: 5;
  cursor: pointer;
  position: absolute;
  left: 16px;
  right: 16px;
  bottom: 24px;
  height: 48px;
  transition: all 0.6s;
}

.action-btn:hover {
  opacity: 0.6;
}
</style>