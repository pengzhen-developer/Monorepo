<template>
  <div id="assistive-block"
       class="assistive-wrap"
       @click="home">
    <div class="assistive-touch">
      <van-icon class="assistive-touch-icon"
                name="like-o"></van-icon>
    </div>
  </div>
</template>

<script>
import peace from '@src/library'

export default {
  mounted: function() {
    this.drag()
  },

  methods: {
    home: function() {
      this.$router.push({ path: peace.config.system.homePage })
    },

    drag: function() {
      var block = document.getElementById('assistive-block')
      var oW, oH
      // 绑定touchstart事件
      block.addEventListener(
        'touchstart',
        function(e) {
          var touches = e.touches[0]
          oW = touches.clientX - block.offsetLeft
          oH = touches.clientY - block.offsetTop
        },
        false
      )
      block.addEventListener(
        'touchmove',
        function(e) {
          e.preventDefault()
          var touches = e.touches[0]
          var oLeft = touches.clientX - oW
          var oTop = touches.clientY - oH
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
        },
        false
      )

      block.addEventListener(
        'touchend',
        function(e) {
          var endLeft = e.changedTouches[0].pageX
          var endTop = e.changedTouches[0].pageY

          if (endLeft > document.documentElement.clientWidth / 2) {
            block.style.left = document.documentElement.clientWidth - block.offsetWidth - 5 + 'px'
          } else if (endLeft < document.documentElement.clientWidth / 2) {
            block.style.left = 5 + 'px'
          }

          if (endTop < block.clientHeight / 2) {
            block.style.top = block.clientHeight / 2 + 5 + 'px'
          } else if (endTop > document.documentElement.clientHeight - block.clientHeight / 2) {
            block.style.top =
              document.documentElement.clientHeight - block.clientHeight / 2 - 5 + 'px'
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
  width: 58px;
  height: 58px;
  position: fixed;
  top: 50%;
  margin-top: -29px;
  right: 1px;
  z-index: 500;
}

.assistive-touch {
  width: 100%;
  height: 100%;
  background: #b1b1b1;
  border-radius: 10px;
  opacity: 0.3;
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
}

.assistive-touch:before,
.assistive-touch:after,
.assistive-touch span {
  content: '';
  position: absolute;
  border-radius: 100%;
  box-shadow: 0 0 2px rgba(30, 30, 30, 0.5);
  display: block;
  background: rgba(255, 255, 255, 0.6);
}

.assistive-touch:before {
  width: 42px;
  height: 42px;
  left: 8px;
  top: 8px;
  opacity: 0.5;
}

.assistive-touch span {
  width: 34px;
  height: 34px;
  left: 12px;
  top: 12px;
}

.assistive-touch:after {
  width: 26px;
  height: 26px;
  left: 16px;
  top: 16px;
  background: #fff;
}

.assistive-touch-icon {
  font-size: 16px;
  font-weight: bold;
  color: $-color--primary;

  z-index: 1;
}
</style>