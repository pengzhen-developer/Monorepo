<template>
  <div class="file">
    <template v-if="myFamilyList && myFamilyList.length === 0">
      <div class="no-family">
        <van-image style="max-width:80%;max-height:90%;"
                   :src="require('@src/assets/images/file/bg_img_none.png')">
        </van-image>
        <van-button @click="goFamily"
                    :class="{ isX: Long }">添加家人信息</van-button>
      </div>
    </template>
    <template v-else>
      <div class="file-bg"></div>

      <div class="file-famliy">
        <van-swipe :loop="true"
                   :width="swipeWidth"
                   @change="onSwipeChange"
                   :initial-swipe="index"
                   ref="swipe"
                   indicator-color="white"
                   class="file-famliy-swiper">
          <van-swipe-item v-for="item in myFamilyList"
                          :key="item.id">
            <div class="file-famliy-swiper-item">
              <div class="header flex between">
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
                <div class="flex column flex-1 start between"
                     style="padding-left:12px;height: 50px;">
                  <div class="flex "
                       style="height: 50%;">
                    <span style="font-size: 20px;line-height:1; margin-right: 10px;color:#0E302D;font-family: PingFangSC-Medium, PingFang SC;font-weight: 500;">{{
                    item.name
                  }}</span>
                    <van-tag color="#F2F2F2"
                             text-color="#999999"
                             style="font-size: 12px;border-radius: 4px;">{{ item.relation }}</van-tag>
                  </div>
                  <div class="flex "
                       style="margin-top:4px;">
                    <van-icon v-if="item.sex === '男'"
                              :name="require('@src/assets/images/file/ic_boys.png')"></van-icon>
                    <van-icon v-if="item.sex === '女'"
                              :name="require('@src/assets/images/file/ic_girls.png')"></van-icon>
                    <span style="font-size: 14px; margin-left: 10px;color:#999;">{{ item.age }}</span>
                  </div>
                </div>

              </div>
              <div class="content"
                   @click="util.goHealthDetail(item)">
                <h4>健康信息</h4>
                <div class="flex between">
                  <van-progress style="display: inline-block; flex:1;"
                                color="#5B9EFF"
                                track-color="#D7E9FF"
                                pivot-color="#D7E9FF"
                                :percentage="Number(item.percentage)"
                                :show-pivot="false"
                                stroke-width="8" />
                  <van-tag color="rgba(244,248,255,1)"
                           text-color="rgba(74,131,247,1)"
                           style="border:1px solid #4A83F7;width:3em;justify-content: center;margin-left:5px;">
                    {{ item.percentage }}%</van-tag>
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
          <van-tab title="检验检查">
            <FileRecord v-if="active === 5"
                        :key="familyId"
                        :familyId="familyId"></FileRecord>
          </van-tab>
          <van-tab title="其    他">
            <!-- <div class="none-page">
              <div class="icon icon_none_source"></div>
              <div class="none-text">暂无数据</div>
            </div> -->
            <FileOther v-if="active === 6"
                       :key="familyId"
                       :familyId="familyId"></FileOther>
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
import FileOther from './FileOther'
import FileRecord from './FileRecord'
export default {
  components: {
    FileAll,
    FileDay,
    FileOther,
    FileCase,
    FileRecord
  },

  data() {
    return {
      util,

      swipeWidth: document.body.clientWidth - 80,
      active: 0,
      index: 0,
      myFamilyList: undefined,

      familyId: '',
      idCard: '',

      Long: false,
      enter_time: ''
    }
  },
  activated() {
    this.getFamilyList()
  },
  created() {
    // this.getFamilyList()
    this.Long = this.isLong()
    this.enter_time = new Date().getTime()
  },

  mounted() {
    this.$nextTick(function() {
      this.changeSwipeTrack(0)
    })
  },
  beforeRouteLeave(to, from, next) {
    this.$destroy()
    next()
  },
  destroyed() {
    this.trackByLeave()
  },
  methods: {
    trackByLeave() {
      const params = {
        page_name: '健康档案',
        event_duration: (new Date().getTime() - this.enter_time) / 1000
      }
      peace.service.sensors.globalPageStop(params)
    },
    goFamily() {
      this.$router.push('/setting/myFamilyMembers')
    },

    getFamilyList() {
      if (peace.cache.get('familyId')) {
        this.familyId = peace.cache.get('familyId')
      } else {
        this.familyId = ''
      }
      peace.service.health.familyLists().then((res) => {
        this.myFamilyList = res.data.list
        res.data.list.map((item, index) => {
          if (item.sex === '1') {
            item.sex = '男'
          } else if (item.sex === '0') {
            item.sex = '女'
          }

          if (item.id == this.familyId) {
            this.index = index
          }
        })
        this.$nextTick(function() {
          this.changeSwipeTrack(this.index)
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
      this.index = index
      if (this.$refs.swipe) {
        if (this.myFamilyList) {
          this.familyId = this.myFamilyList[index].familyId
          this.idCard = this.myFamilyList[index].idCard
        }
      }
    },
    isLong() {
      return screen.height / screen.width > 2 ? true : false
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
  &.flex-1 {
    flex: 1;
  }
  &.start {
    align-items: flex-start;
  }
  &.end {
    align-items: flex-end;
  }
}

.file {
  display: flex;
  flex-direction: column;

  height: 100%;

  .no-family {
    height: 100%;
    background: linear-gradient(180deg, #0fd3bc, #68d0e1);
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding-bottom: 50px;
    .van-button {
      position: absolute;
      bottom: 25%;
      width: 220px;
      left: calc(50% - 110px);
      background: linear-gradient(90deg, rgba(15, 211, 188, 1) 0%, rgba(98, 209, 223, 1) 100%);
      box-shadow: 0px 4px 20px 0px rgba(0, 198, 174, 0.5);
      border-radius: 49px;
      color: #fff;
      &.isX {
        bottom: 30%;
      }
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

    .van-swipe {
      padding: 0 40px;
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
          padding: 13.5px 15px;

          h4 {
            font-size: 13px;
            color: #5b9eff;
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

      // .van-tab {
      // flex-basis: 20% !important;
      // }
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
