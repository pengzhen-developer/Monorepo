<!--
 * @Description: IM 聊天消息 - 语音消息
-->

<template>
  <div class="peace-im-message-voice flex items-center q-px-md q-py-sm">
    <div class="ic_audio"
         v-on:click="startPlayOrPause">
      <audio ref="audio"
             v-on:play="onPlay"
             v-on:pause="onPause">
        <source v-bind:src="audioSrc"
                v-bind:type="audioType">
      </audio>

      <div class="wifi-symbol"
           v-bind:class="{'animation': playing }"
           v-bind:flow="$attrs.flow">
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
    data: Object
  },

  data() {
    return {
      playing: false
    }
  },

  computed: {
    audioSrc() {
      return this.data?.file?.url
    },

    audioType() {
      const ext = this.data?.file?.ext
      return 'audio/' + (ext === 'mp3' ? 'mpeg' : ext)
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
.peace-im-message-voice {
  &[flow='in'] {
    background: #f3f3f3;
    color: #333333;
    border-radius: 4px;
  }
  &[flow='out'] {
    background: var(--q-color-primary);
    color: #ffffff;
    border-radius: 4px;
  }
  &[flow='system'] {
    background: #f2f2f2;
    color: #ffffff;
    border-radius: 4px;
  }

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

    &[flow='in'] {
      margin-left: 5px;
      transform: rotate(135deg);
      .wifi-circle {
        border-color: #000;
      }
    }
    &[flow='out'] {
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