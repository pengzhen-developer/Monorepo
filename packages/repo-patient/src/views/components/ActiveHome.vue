<template>

  <div id="assistive-block"
       class="assistive-wrap"
       @click="home">
    <div class="assistive-touch">
      <van-icon class="assistive-touch-icon icon"
                :name="require('@src/assets/images/ic_back_home.png')"></van-icon>
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
            // block.style.left = document.documentElement.clientWidth - block.offsetWidth + 8 + 'px'
            block.style.left = document.documentElement.clientWidth - block.offsetWidth + 'px'
          } else if (endLeft < document.documentElement.clientWidth / 2) {
            // block.style.left = -8 + 'px'
            block.style.left = '0px'
          }

          if (endTop < block.clientHeight / 2) {
            block.style.top = block.clientHeight / 2 + 5 + 'px'
          } else if (endTop > document.documentElement.clientHeight - block.clientHeight / 2) {
            block.style.top = document.documentElement.clientHeight - block.clientHeight / 2 - 5 + 'px'
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
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  // box-shadow: 0 0 2px rgba(1, 198, 174, 0.5);
  border-radius: 50%;
}

.assistive-touch-icon {
  width: 58px;
  height: 58px;
  font-size: 58px;
  font-weight: bold;
  color: $-color--primary;

  z-index: 1;
}
</style>