<template>

  <!-- 消息内容 -->
  <div class="message-body">
    <div class="ic_audio"
         @click="startPlayOrPause"
         :style="{width:audioWidth}">
      <audio @play="onPlay"
             @pause="onPause"
             ref="audio">
        <source :src="audioUrl"
                :type="audioType">
      </audio>
      <div class="wifi-symbol"
           :class="{'animation':playing,'in':flow=='in'}"
           v-if="flow=='in'">
        <div class="wifi-circle first"></div>
        <div class="wifi-circle second"></div>
        <div class="wifi-circle third"></div>
      </div>
      <span>{{ text }}</span>
      <div class="wifi-symbol"
           :class="{'animation':playing,'out':flow=='out'}"
           v-if="flow=='out'">
        <div class="wifi-circle first"></div>
        <div class="wifi-circle second"></div>
        <div class="wifi-circle third"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    /*
     * 音频资源
     */
    audioUrl: {
      type: String,
      required: true
    },

    /*
     * 音频类型
     */
    audioType: {
      type: String,
      required: true
    },
    /*
     * 内容
     */
    text: {
      type: String,
      required: true
    },
    /*
     * 宽度
     */
    audioWidth: {
      type: String,
      required: true
    },
    /*
     * in
     * out
     */
    flow: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      playing: false
    }
  },
  methods: {
    onPlay(event) {
      this.playing = true
      let target = event.target
      let audios = document.getElementsByTagName('audio')
      ;[...audios].forEach((item) => {
        if (item !== target) {
          item.pause()
        }
      })
    },
    startPlayOrPause() {
      return this.playing ? this.pausePlay() : this.startPlay()
    },
    // 开始播放
    startPlay() {
      this.$refs.audio.play()
    },
    // 暂停
    pausePlay() {
      this.$refs.audio.pause()
      //暂停后重头开始播放
      this.$refs.audio.currentTime = 0
    },
    onPause() {
      this.playing = false
    }
  }
}
</script>
<style lang="scss" scoped>
.ic_audio {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}
.wifi-symbol {
  width: 25px;
  height: 25px;
  overflow: hidden;
  position: relative;

  &.in {
    margin-left: 5px;
    transform: rotate(135deg);
    .wifi-circle {
      border-color: #000;
    }
  }
  &.out {
    margin-right: 5px;
    transform: rotate(-45deg);
    .wifi-circle {
      border-color: #fff;
    }
  }
  &.animation {
    .second {
      animation: fadeInOut 1s infinite 0.2s;
    }
    .third {
      animation: fadeInOut 1s infinite 0.4s;
    }
  }
  .wifi-circle {
    border: 2px solid #999;
    border-radius: 50%;
    position: absolute;
    opacity: 1;
    &.first {
      width: 3px;
      height: 3px;
      top: 22px;
      left: 22px;
    }
    &.second {
      width: 13px;
      height: 13px;
      top: 18px;
      left: 18px;
    }
    &.third {
      width: 25px;
      height: 25px;
      top: 12.5px;
      left: 12.5px;
    }
  }
}
@keyframes fadeInOut {
  0% {
    opacity: 0; /*初始状态 透明度0*/
  }
  100% {
    opacity: 1; /*结尾状态 透明度1*/
  }
}
</style>

