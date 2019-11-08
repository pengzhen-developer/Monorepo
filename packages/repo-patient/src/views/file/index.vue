<template>
  <div class="file">
    <template v-if="myFamilyList && myFamilyList.length === 0">
      <div class="no-family">
        <van-image style="height: 100%;"
                   :src="require('@src/assets/images/file/bg_img_no_family.png')"></van-image>
        <van-button @click="goFamily">添加家人信息</van-button>
      </div>
    </template>
    <template v-else>
      <div class="file-bg"></div>

      <div class="file-famliy">
        <van-swipe :loop="false"
                   :width="swipeWidth"
                   @change="onSwipeChange"
                   ref="swipe"
                   indicator-color="white"
                   class="file-famliy-swiper">
          <van-swipe-item v-for="item in myFamilyList"
                          :key="item.id">
            <div class="file-famliy-swiper-item">
              <div class="header flex between">
                <div class="flex center">
                  <span style="font-size: 20px; margin: 0 10px 0 0;">{{ item.name }}</span>
                  <van-icon v-if="item.sex === '男'"
                            :name="require('@src/assets/images/file/ic_boys.png')"></van-icon>
                  <van-icon v-if="item.sex === '女'"
                            :name="require('@src/assets/images/file/ic_girls.png')"></van-icon>
                  <span style="font-size: 14px; margin: 0 10px;">{{ item.age + '岁' }}</span>
                  <van-tag color="#F2F2F2"
                           text-color="#999999">{{ item.relation }}</van-tag>
                </div>
                <van-image round
                           v-if="item.sex === '男'"
                           width="50px"
                           height="50px"
                           :src="require('@src/assets/images/ic_head portrait.png')" />
                <van-image round
                           v-if="item.sex === '女'"
                           width="50px"
                           height="50px"
                           :src="require('@src/assets/images/img_head girl.png')" />
              </div>
              <div class="content"
                   @click="util.goHealthDetail(item)">
                <h4>健康信息</h4>
                <div class="flex between">
                  <van-progress style="display: inline-block; width: 190px; margin: 0 10px 0 0;background: #eee;"
                                color="#5B9EFF"
                                :percentage="item.percentage"
                                :show-pivot="false"
                                stroke-width="8" />
                  <van-tag color="rgba(244,248,255,1)"
                           text-color="rgba(74,131,247,1)"> {{ item.percentage }}%</van-tag>
                </div>
              </div>
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>

      <div class="file-famliy-detail">
        <van-tabs v-model="active"
                  swipeable>
          <van-tab title="全    部">
            <FileAll v-if="active === 0"
                     :key="familyId"
                     :familyId="familyId"></FileAll>
          </van-tab>
          <van-tab title="日常检测">
            <FileDay v-if="active === 1"
                     :key="familyId"
                     :familyId="familyId"
                     :idCard="idCard"></FileDay>
          </van-tab>
          <van-tab title="就诊病历">
            <FileCase v-if="active === 2"
                      :key="familyId"
                      :familyId="familyId"></FileCase>
          </van-tab>
          <van-tab title="住院病历">
            <div class="none-page">
              <div class="icon icon_none_source"></div>
              <div class="none-text">暂无数据</div>
            </div>
          </van-tab>
          <van-tab title="体检报告">
            <div class="none-page">
              <div class="icon icon_none_source"></div>
              <div class="none-text">暂无数据</div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </template>
  </div>
</template>

<script>
import peace from '@src/library'
import util from './util'

import FileAll from './FileAll'
import FileDay from './FileDay'
import FileCase from './FileCase'

export default {
  components: {
    FileAll,
    FileDay,
    FileCase
  },

  data() {
    return {
      util,

      swipeWidth: document.body.clientWidth - 80,
      active: 0,

      myFamilyList: undefined,

      familyId: '',
      idCard: ''
    }
  },

  created() {
    this.getFamilyList()
  },

  mounted() {
    this.$nextTick(function() {
      this.changeSwipeTrack(0)
    })
  },

  methods: {
    goFamily() {
      this.$router.push('/setting/myFamilyMembers')
    },

    getFamilyList() {
      peace.service.health.familyLists().then(res => {
        this.myFamilyList = res.data.list

        this.$nextTick(function() {
          this.changeSwipeTrack(0)
        })
      })
    },

    showDetail() {
      this.dialog.visible = true
    },

    onSwipeChange(index) {
      setTimeout(() => {
        this.changeSwipeTrack(index)
      }, 10)
    },

    changeSwipeTrack(index) {
      if (this.$refs.swipe) {
        if (this.myFamilyList) {
          this.familyId = this.myFamilyList[index].familyId
          this.idCard = this.myFamilyList[index].idCard
        }

        const tempWidth = (document.body.clientWidth - this.swipeWidth) / 2
        const $swipe__track = this.$refs.swipe.$el.querySelector('.van-swipe__track')
        $swipe__track.style.transform = `translateX(${-this.swipeWidth * index + tempWidth}px)`
      }
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

  .no-family {
    height: 100%;

    .van-button {
      position: absolute;
      bottom: 20%;
      width: 220px;
      left: calc(50% - 110px);
      background: linear-gradient(90deg, rgba(15, 211, 188, 1) 0%, rgba(98, 209, 223, 1) 100%);
      box-shadow: 0px 4px 20px 0px rgba(0, 198, 174, 0.5);
      border-radius: 49px;
    }
  }

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
        border-radius: 5px;

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

      .van-tab {
        flex-basis: 20% !important;
      }
      .van-tab--active {
        color: $-color--primary;
      }
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
      .van-tabs__line {
        width: 20px !important;
        background-color: #00c6ae;
      }
    }

    /deep/ [class*='van-hairline']::after {
      display: none;
    }
  }
}
</style>