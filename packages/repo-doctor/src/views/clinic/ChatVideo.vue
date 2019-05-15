<template>
  <div>
    <transition name="el-fade-in-linear">
      <el-dialog
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :fullscreen="full"
        :modal="true"
        :show-close="false"
        :visible="chat.beCall === '邀请' || chat.beCall === '收到' || chat.beCall === '接听'"
        class="video-dialog"
        top="0"
        v-drag
        width="360px"
      >
        <div class="el-dialog__title" slot="title">
          <span>视频中...</span>
          <button @click="toggleFull" class="el-dialog__headerbtn" style="margin-right: 0;" type="button">
            <i class="el-dialog__close el-icon el-icon-copy-document"></i>
          </button>
        </div>

        <div class="video">
          <div class="video-top">
            <template v-if="chat.beCall === '邀请' || chat.beCall === '收到'">
              <div class="video-top-info">
                <img src="./../../assets/images/doctor-pic.png">
                <br>
                <p class="video-top-info-nick">{{ chat.session.lastMsg.custom.patients.familyName }}</p>
                <p class="video-top-info-status">等待对方接受邀请</p>
              </div>
            </template>
          </div>

          <div class="video-bottom">
            <!-- 发起视频邀请时 -->
            <template v-if="chat.beCall === '邀请'">
              <el-button @click="hangUpVideo" circle class="hang_up">
                <span class="video-bottom-text">挂断</span>
              </el-button>
            </template>

            <!-- 收到视频邀请时 -->
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
              <el-button @click="hangUpVideo" circle class="hang_up">
                <span class="video-bottom-text">挂断</span>
              </el-button>
              <el-button @click="muteVideo" circle class="mute" v-if="chat.mute === false">
                <span class="video-bottom-text">静音</span>
              </el-button>
              <el-button @click="noMuteVideo" circle class="mute-not" v-if="chat.mute === true">
                <span class="video-bottom-text">取消静音</span>
              </el-button>
            </template>
          </div>

          <div class="video-remoteContainer" id="remoteContainer"></div>
          <div class="video-localContainer" id="localContainer"></div>
        </div>
      </el-dialog>
    </transition>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState(['chat'])
  },

  data() {
    return {
      full: false
    }
  },

  methods: {
    ...mapActions('chat', ['initNIM', 'acceptVideo', 'rejectVideo', 'muteVideo', 'noMuteVideo', 'toggleFullVideo', 'hangUpVideo']),

    toggleFull() {
      const dom = document.body.querySelector('.video-dialog .el-dialog')
      this.full = !this.full

      if (this.full) {
        // 记录当前位置
        this.position = {
          left: dom.style.left,
          top: dom.style.top
        }
      }

      this.$nextTick(function() {
        if (!this.full) {
          dom.style.left = this.position.left
          dom.style.top = this.position.top
        }

        this.toggleFullVideo()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.video-dialog {
  position: fixed;
  top: 0;
  right: auto;
  bottom: auto;
  left: 0;
  overflow: unset;
  height: 0;
  width: 0;

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
    max-height: 100vh;
    padding: 0;
    overflow: hidden;
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
        background-image: url('./../../assets/images/icons/clinic/btn_hang_up@2x.png');
      }
      &.answer {
        background-image: url('./../../assets/images/icons/clinic/btn_answer@2x.png');
      }
      &.mute {
        background-image: url('./../../assets/images/icons/clinic/btn_mute_click@2x.png');
      }
      &.mute-not {
        background-image: url('./../../assets/images/icons/clinic/btn_mute_not clickable@2x.png');
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

