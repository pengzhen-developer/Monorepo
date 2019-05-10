<template>
  <div id="app">
    <!-- 视频元素 -->
    <transition name="el-fade-in-linear">
      <div class="video" v-drag v-show="chat.beCall === '邀请' || chat.beCall === '收到' || chat.beCall === '接听'">
        <div class="video-top">
          <div class="video-remoteContainer" id="remoteContainer"></div>
          <div class="video-localContainer" id="localContainer"></div>

          <div class="video-top-title drag-title drag-header">
            <i class="el-icon-minus"></i>
            <i class="el-icon-full-screen"></i>
            <i class="el-icon-close"></i>
          </div>

          <template v-if="chat.beCall === '邀请' || chat.beCall === '收到'">
            <div class="video-top-info">
              <img src="./assets/images/doctor-pic.png">
              <br>
              <p class="video-top-info-nick">阿贝贝</p>
              <p class="video-top-info-status">等待对方接受邀请</p>
            </div>
          </template>
        </div>

        <div class="video-bottom">
          <!-- 发起视频邀请时 -->
          <template v-if="chat.beCall === '邀请'">
            <el-button @click="rejectVideo" circle class="hang_up">
              <span class="video-bottom-text">挂断</span>
            </el-button>
            <el-button @click="acceptVideo" circle class="mute-not">
              <span class="video-bottom-text">静音</span>
            </el-button>
          </template>

          <!-- 发起视频邀请时 -->
          <template v-if="chat.beCall === '收到'">
            <el-button @click="rejectVideo" circle class="hang_up">
              <span class="video-bottom-text">挂断</span>
            </el-button>
            <el-button @click="acceptVideo" circle class="answer">
              <span class="video-bottom-text">接听</span>
            </el-button>
          </template>

          <!-- 接听视频邀请时 -->
          <template v-if="chat.beCall === '接听'">
            <el-button @click="rejectVideo" circle class="hang_up">
              <span class="video-bottom-text">挂断</span>
            </el-button>
            <el-button @click="muteVideo" circle class="mute">
              <span class="video-bottom-text">静音</span>
            </el-button>
          </template>
        </div>
      </div>
    </transition>

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
    // restore info
    if ($peace.cache.get('USER')) {
      this.restoreUserInfo()

      document.title = $peace.cache.get('USER').list.docInfo.netHospital_name

      // 初始化 IM
      this.initNIM()
    }
  },

  methods: {
    ...mapActions('user', ['restoreUserInfo']),

    ...mapActions('chat', ['initNIM', 'acceptVideo', 'rejectVideo', 'muteVideo', 'hangUpVideo'])
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
.video {
  height: 640px;
  width: 360px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

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

  .video-localContainer {
    top: 40px;
    left: 40px;
    width: 81px;
    height: 125px;
  }

  .video-remoteContainer {
    top: 40px;
    width: 100%;
    height: 100%;
  }

  .video-top {
    flex: 1;
    z-index: 1;

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
    z-index: 1;

    .el-button {
      width: 40px;
      height: 40px;
      background-size: 40px auto;
      background-repeat: no-repeat;
      background-position: center;
      background-color: transparent;
      border: 0;

      &.hang_up {
        background-image: url('./assets/images/icons/clinic/btn_hang_up@2x.png');
      }
      &.answer {
        background-image: url('./assets/images/icons/clinic/btn_answer@2x.png');
      }
      &.mute {
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
        font-size: 12px;
        position: relative;
        top: 35px;
        color: rgba(255, 255, 255, 1);
      }
    }
  }
}
</style>

