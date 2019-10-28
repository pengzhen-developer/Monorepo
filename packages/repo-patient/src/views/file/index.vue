<template>
  <div class="file">
    <div class="file-bg"></div>

    <div class="file-famliy">
      <van-swipe :loop="false"
                 :width="swipeWidth"
                 @change="onSwipeChange"
                 ref="swipe"
                 indicator-color="white"
                 class="file-famliy-swiper">
        <van-swipe-item>
          <div class="file-famliy-swiper-item">
            <div class="header flex between">
              <div class="flex center">
                <span
                      style="font-size: 20px; font-weight: 500; color: #0E302D; margin: 0 10px 0 0;">王勇了</span>
                <span>男</span>
                <span
                      style="font-size: 14px; font-weight: 500; color: #999999; margin: 0 10px 0 0;">18岁</span>
                <van-tag color="#F2F2F2"
                         text-color="#999999">本人</van-tag>
              </div>
              <van-image round
                         width="50px"
                         height="50px"
                         src="https://img.yzcdn.cn/vant/cat.jpeg" />
            </div>
            <div class="content">
              <h4>健康信息</h4>
              <div class="flex between">
                <van-progress style="display: inline-block; width: 190px; margin: 0 10px 0 0;"
                              color="#5B9EFF"
                              :percentage="50"
                              :show-pivot="false"
                              stroke-width="8" />
                <van-tag color="rgba(244,248,255,1)"
                         text-color="rgba(74,131,247,1)">80%</van-tag>
              </div>
            </div>
          </div>
        </van-swipe-item>
        <van-swipe-item>
          <div class="file-famliy-swiper-item">2
          </div>
        </van-swipe-item>
        <van-swipe-item>
          <div class="file-famliy-swiper-item">3</div>
        </van-swipe-item>
        <van-swipe-item>
          <div class="file-famliy-swiper-item">4</div>
        </van-swipe-item>
      </van-swipe>
    </div>

    <div class="file-famliy-detail">
      <van-tabs v-model="active"
                swipeable>
        <van-tab title="全部">
          <FileAll></FileAll>
        </van-tab>
        <van-tab title="日常监测">
          <FileDay></FileDay>
        </van-tab>
        <van-tab title="就诊病历">内容 3</van-tab>
        <van-tab title="住院病历">内容 4</van-tab>
        <van-tab title="体检报告">内容 5</van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import FileAll from './FileAll'
import FileDay from './FileDay'

export default {
  components: {
    FileAll,
    FileDay
  },

  data() {
    return {
      swipeWidth: document.body.clientWidth - 100,
      active: 0
    }
  },

  mounted() {
    this.$nextTick(function() {
      const tempWidth = (document.body.clientWidth - this.swipeWidth) / 2
      const $swipe__track = this.$refs.swipe.$el.querySelector('.van-swipe__track')
      $swipe__track.style.transform = `translateX(${-this.swipeWidth * 0 + tempWidth}px)`
    })
  },

  methods: {
    onSwipeChange(index) {
      setTimeout(() => {
        const tempWidth = (document.body.clientWidth - this.swipeWidth) / 2
        const $swipe__track = this.$refs.swipe.$el.querySelector('.van-swipe__track')
        $swipe__track.style.transform = `translateX(${-this.swipeWidth * index + tempWidth}px)`
      }, 10)
    }
  }
}
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  align-items: center;

  &.column {
    flex-direction: column;
  }
  &.between {
    justify-content: space-between;
  }
  &.center {
    justify-content: center;
  }
}

.file {
  display: flex;
  flex-direction: column;

  height: 100%;

  .file-bg {
    min-height: 100px;
    height: 100px;
    background: linear-gradient(229deg, rgba(11, 213, 199, 1) 0%, rgba(0, 195, 185, 1) 100%);
  }

  .file-famliy {
    min-height: 145px;
    height: 145px;
    margin-top: -70px;
    margin-bottom: 10px;

    .van-swipe__track {
      transform: translateX(40px);
    }

    .van-swipe-item {
      padding: 10px;

      .file-famliy-swiper-item {
        width: 100%;
        height: 125px;

        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 1px 10px 0px rgba(187, 187, 187, 0.5);
        border-radius: 10px;

        .header {
          padding: 15px 15px 0 15px;
        }

        .content {
          padding: 10px 15px 0 15px;

          h4 {
            font-size: 13px;
            color: rgba(91, 158, 255, 1);
          }
        }
      }
    }
  }

  .file-famliy-detail {
    flex: 1;
    overflow: auto;

    /deep/ .van-tabs {
      display: flex;
      flex-direction: column;

      height: 100%;

      .van-tabs__wrap {
        height: 44px;
      }
      .van-tabs__content {
        flex: 1;
        overflow: auto;

        .van-tab__pane {
          height: 100%;
        }
      }
    }

    /deep/ [class*='van-hairline']::after {
      display: none;
    }
  }
}
</style>