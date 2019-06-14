<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'app',

  computed: {
    ...mapState(['chat'])
  },

  created() {
    $peace.serverDateDiff = 0

    // restore info
    if ($peace.cache.get('USER')) {
      this.restoreUserInfo()
    }
  },

  mounted() {
    this.$nextTick(function() {
      if ($peace.cache.get('USER')) {
        // 更新本地于服务器时间差
        $peace.util.getServerDateDiff()
      }
    })
  },

  methods: {
    ...mapActions('user', ['restoreUserInfo'])
  }
}
</script>


<style lang="scss">
#app {
  width: 100vw;
  height: 100vh;
  margin: 0 auto;

  min-height: 700px;
  overflow: auto;
}
</style>

<style lang="scss" scoped>
.video-dialog {
  position: fixed;
  top: auto;
  right: auto;
  bottom: auto;
  left: auto;
  overflow: unset;

  margin: 0;

  /deep/ .el-dialog.is-fullscreen {
    width: 100vw;
    height: 100vh;
    min-height: 100vh;
    overflow: auto;
    margin: 0 !important;
    left: 0 !important;
    top: 0 !important;
  }

  /deep/ .el-dialog__body {
    height: calc(100% - 30px);
    padding: 0;
  }
}

.video {
  position: relative;
  height: 100%;
  width: 100%;
  min-height: 680px;

  background-color: #3b3b3b;
  color: #ffffff;
  z-index: 1000;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;

  .video-localContainer,
  .video-remoteContainer {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 0;
  }

  .video-top {
    flex: 1;
    z-index: 5;

    .video-top-title {
      position: absolute;
      width: 100%;
      z-index: 10;
      text-align: right;
      padding: 10px;
      background: rgba(40, 40, 40, 0.5);

      i {
        margin: 0 0 0 10px;
      }
    }

    .video-top-info {
      padding: 80px 0 0 0;

      img,
      p {
        margin: 0 0 10px 0;
      }

      .video-top-info-nick {
        font-size: 20px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 28px;
      }

      .video-top-info-status {
        font-size: 14px;
        font-weight: 400;
        color: rgba(179, 179, 179, 1);
        line-height: 20px;
      }

      img {
        width: 60px;
      }
    }
  }

  .video-bottom {
    padding: 0 0 70px 0;
    z-index: 5;

    .el-button {
      width: 56px;
      height: 56px;
      background-size: 56px auto;
      background-repeat: no-repeat;
      background-position: center;
      background-color: transparent;
      border: 0;
      display: inline-flex;
      justify-content: center;

      &.hang_up {
        background-image: url('./assets/images/icons/clinic/btn_hang_up@2x.png');
      }
      &.answer {
        background-image: url('./assets/images/icons/clinic/btn_answer@2x.png');
      }
      &.mute {
        background-image: url('./assets/images/icons/clinic/btn_mute_click@2x.png');
      }
      &.mute-not {
        background-image: url('./assets/images/icons/clinic/btn_mute_not clickable@2x.png');
      }

      & + .el-button {
        margin-left: 95px;
      }

      .el-button {
        /deep/ i {
          font-size: 28px;
        }
      }

      .video-bottom-text {
        line-height: 1;
        font-size: 12px;
        position: relative;
        top: 55px;
        color: rgba(255, 255, 255, 1);
      }
    }
  }
}
</style>

