<template>
  <div class="file-all">
    <div class="time-line"
         v-if="data">
      <van-list v-model="isLoading"
                :finished="finished"
                @load="allHealthList">
        <div class="item"
             v-for="(value, key) in data"
             :key="key">
          <div class="time">
            <div class="m">{{ key.toDate().formatDate('MM-dd') }}</div>
            <div class="y">{{ key.toDate().formatDate('yyyy') }}</div>
          </div>
          <div class="text">
            <div v-for="item in value"
                 :key="item.healthType + item.id">
              <!-- 检查 -->
              <template v-if="item.checkType === 'inspection'">
                <div class="note card case"
                     @click="util.goDetail('检验检查', item)">
                  <div class="case-left">
                    <van-image class="case-left-logo"
                               :src="require('@src/assets/images/ic_jianyan.png')" />
                    <div class="small-dot"
                         v-if="item.isExistRedDot==1"></div>
                  </div>
                  <div class="case-right">
                    <p class="case-right-title ellipsis">
                      {{item.itemName}}
                    </p>
                    <p class="case-right-message ellipsis">
                      {{ item.netHospitalName }} | {{ item.netDeptName }}
                    </p>
                  </div>
                </div>
              </template>
              <!-- 影像 -->
              <template v-if="item.checkType === 'pacs'">
                <div class="note card case"
                     @click="util.goDetail('检验检查', item)">
                  <div class="case-left">
                    <van-image class="case-left-logo"
                               :src="require('@src/assets/images/ic_yinxiang.png')" />
                    <div class="small-dot"
                         v-if="item.isExistRedDot==1"></div>
                  </div>
                  <div class="case-right">
                    <p class="case-right-title ellipsis">
                      {{item.itemName}}
                    </p>
                    <p class="case-right-message ellipsis">
                      {{ item.netHospitalName }} | {{ item.netDeptName }}
                    </p>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </van-list>
    </div>

    <div v-if="loaded&&!data"
         class="none-page">
      <div class="icon icon_none_source"></div>
      <div class="none-text">暂无数据</div>
    </div>
  </div>
</template>

<script>
import peace from '@src/library'
import util from './util'

export default {
  props: {
    familyId: String
  },

  data() {
    return {
      util,
      data: undefined,
      p: 0,
      size: 10,
      finished: false,
      isLoading: false,
      loaded: false
    }
  },

  watch: {
    familyId: {
      handler() {
        if (this.familyId) {
          this.allHealthList()
        }
      },
      immediate: true
    }
  },
  activated() {
    this.p = 0
    this.data = undefined
    this.loaded = false
    this.finished = false
    if (this.familyId) {
      this.allHealthList()
    }
  },
  methods: {
    allHealthList() {
      this.p++
      let param = {
        familyId: this.familyId,
        type: '7',
        p: this.p,
        size: this.size
      }
      peace.service.health.allHealthList(param).then((res) => {
        const temp = {}

        // 遍历时间
        const timeList = new Set(res.data.list.map((item) => item.measureTime))
        //拼接familyId
        res.data.list.map((item) => {
          item.familyId = item.familyId || this.familyId
        })
        if (timeList.size) {
          timeList.forEach((time) => {
            temp[time] = res.data.list.filter((item) => item.measureTime === time)
          })

          if (typeof this.data == 'undefined') {
            this.data = temp
          } else {
            for (let key in temp) {
              if (this.data[key]) {
                this.data[key] = this.data[key].concat(temp[key])
              } else {
                this.data[key] = temp[key]
              }
            }
          }
        }
        this.isLoading = false
        this.loaded = true
        if (this.p * this.size >= res.data.total) {
          this.finished = true
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.file-all {
  height: 100%;
  background: #fff;
}

.time-line {
  padding: 15px 5px 0 5px;

  .item {
    &:last-child {
      .text {
        border-left: 2px solid transparent;
      }
    }
  }

  .item {
    display: flex;

    color: #999999;
    font-size: 16px;
    margin: 0 0 10px 0;
  }

  .time {
    padding: 8px 0 0 0;
    min-width: 60px;
    position: relative;
    text-align: right;

    .y {
      font-size: 12px;
      color: #999999;
    }
    .m {
      font-size: 17px;
      font-weight: 600;
      color: #333333;
    }
  }
  .text {
    padding: 0 10px 0 10px;
    flex: 1;
    min-height: 60px;
  }
}

.card {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 8px 0px 8px 16px;
  margin: 0 0 10px 0;
  // height: 65px;
  .card-value {
    font-size: 20px;
    color: #333333;
  }
  .card-unit {
    font-size: 12px;
    color: #333333;
    margin: 0 5px 0 2px;
  }
  .card-tag {
    padding: 0 8px;
    border-radius: 15px;
    max-width: 38%;
    .card-tag-span {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      width: 100%;
    }
    .card-tag-value {
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 80px;
      white-space: nowrap;
    }

    &.normal {
      background-color: #f2fffd;
      border: 1px solid $-color--primary;
      color: $-color--primary;
    }
    &.unnormal {
      background-color: #fff7e6;
      border: 1px solid #fa8c16;
      color: #fa8c16;
    }
  }

  &.case {
    display: flex;
    align-items: center;

    .case-left {
      width: 50px;
      text-align: left;
      position: relative;
      .case-left-logo {
        width: 35px;
        height: 35px;
      }
      .small-dot {
        width: 8px;
        height: 8px;
        display: block;
        border-radius: 50%;
        background: #f2223b;
        position: absolute;
        top: -2px;
        left: 31px;
      }
    }
    .case-right {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
      .case-right-title {
        font-size: 16px;
        color: #333333;
        line-height: 32px;
        &.ellipsis {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          width: 215px;
        }
      }
      .case-right-message {
        font-size: 12px;
        color: #999999;
        line-height: 24px;
        &.ellipsis {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          width: 215px;
        }
      }
    }
  }

  &.health-item {
    display: flex;
    align-items: center;

    .health-item-left {
      display: flex;
      width: 50px;
    }
    .health-item-right {
      flex: 1;
    }
  }
}
</style>