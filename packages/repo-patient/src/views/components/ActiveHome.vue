<template>

  <div>
    <div class="assistive-shadow"
         v-if="showTxt"
         @click="onClickShadow"></div>
    <div id="assistive-block"
         class="assistive-wrap"
         :class="{'showTxt':showTxt}"
         @click="home('click')">

      <div class="assistive-touch"
           :class="contentClass">
        <span v-if="position=='left'&&showTxt">首页</span>
        <van-image id="assistive-touch-image"
                   :src="require('@src/assets/images/activeHome.png')">
        </van-image>
        <span v-if="position=='right'&&showTxt">首页</span>

      </div>
    </div>
  </div>

</template>

<script>
import peace from '@src/library'

export default {
  data() {
    return {
      showTxt: false,
      eventType: 'click',
      position: 'right'
    }
  },
  mounted() {
    this.drag()
  },

  computed: {
    contentClass() {
      return this.position
    }
  },
  methods: {
    onClickShadow() {
      var block = document.getElementById('assistive-block')
      this.position = block.offsetLeft == 0 ? 'left' : 'right'
      if (block.offsetLeft != 0) {
        block.style.left = block.offsetLeft + 34 + 'px'
      }
      this.showTxt = false
    },
    home(eventType = '') {
      var block = document.getElementById('assistive-block')
      this.position = block.offsetLeft == 0 ? 'left' : 'right'
      this.eventType = eventType
      if (!this.showTxt) {
        if (block.offsetLeft != 0) {
          block.style.left = block.offsetLeft - 34 + 'px'
        }
        if (this.eventType == 'click') {
          this.showTxt = true
        }
      } else {
        if (this.eventType == 'click') {
          if (block.offsetLeft != 0) {
            block.style.left = block.offsetLeft + 34 + 'px'
          }
          this.$router.push({ path: peace.config.system.homePage })
        }
        this.showTxt = false
      }
    },

    drag() {
      var block = document.getElementById('assistive-block')
      var oW, oH
      // 绑定touchstart事件
      block.addEventListener(
        'touchstart',
        (e) => {
          var touches = e.touches[0]
          if (this.showTxt) {
            oW = touches.clientX - block.offsetLeft
            oH = touches.clientY - block.offsetTop
          }
        },
        false
      )
      block.addEventListener(
        'touchmove',
        (e) => {
          e.preventDefault()
          this.eventType = 'touch'
          var touches = e.touches[0]
          var oLeft = touches.clientX - oW
          var oTop = touches.clientY - oH

          if (this.showTxt) {
            if (oLeft < 0) {
              oLeft = 0
            } else if (oLeft > document.documentElement.clientWidth - block.clientWidth) {
              oLeft = document.documentElement.clientWidth - block.clientWidth
            }

            if (oTop < block.clientHeight / 2) {
              oTop = block.clientHeight / 2
            } else if (oTop > document.documentElement.clientHeight - block.clientHeight) {
              oTop = document.documentElement.clientHeight - block.clientHeight / 2
            }
            block.style.left = oLeft + 'px'
            block.style.top = oTop + 'px'
          }
        },
        false
      )

      block.addEventListener(
        'touchend',
        (e) => {
          if (this.showTxt && this.eventType != 'click') {
            var endLeft = e.changedTouches[0].pageX
            var endTop = e.changedTouches[0].pageY
            if (endLeft > document.documentElement.clientWidth / 2) {
              block.style.left = document.documentElement.clientWidth - block.offsetWidth + 34 + 'px'
            } else if (endLeft < document.documentElement.clientWidth / 2) {
              block.style.left = '0px'
            }
            if (endTop < block.clientHeight / 2) {
              block.style.top = block.clientHeight / 2 + 5 + 'px'
            } else if (endTop > document.documentElement.clientHeight - block.clientHeight / 2) {
              block.style.top = document.documentElement.clientHeight - block.clientHeight / 2 - 5 + 'px'
            }
            this.home('touch')
          }
        },
        false
      )
    }
  }
}
</script>


<style lang="scss" scoped>
.assistive-wrap {
  width: 28px;
  height: 24px;
  position: fixed;
  top: 50%;
  margin-top: -14px;
  right: 1px;
  z-index: 500;

  &.showTxt {
    width: 60px;
    height: 24px;
  }
  &::before {
    position: absolute;
    width: 200%;
    height: 200%;
    content: '';
    right: -50%;
    top: -50%;
  }
}
.assistive-shadow {
  position: fixed;
  z-index: 499;
  background: transparent;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}
.assistive-touch {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  padding: 0 8px;
  &.other {
    background: #ebfbf9;
    &.right {
      border-radius: 12px 0 0 12px;
      span {
        margin-left: 4px;
      }
    }
    &.left {
      border-radius: 0 12px 12px 0;
      span {
        margin-right: 4px;
      }
    }
    .van-image {
      width: 12px;
      height: 12px;
    }
    span {
      font-size: 12px;
      line-height: normal;
      color: $-color--primary;
    }
  }
}

.assistive-touch-icon {
  width: 58px;
  height: 58px;
  font-size: 58px;
  font-weight: bold;
  color: $-color--primary;
  position: relative;
  z-index: 1;
}
</style>