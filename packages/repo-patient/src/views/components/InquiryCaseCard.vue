<template>
  <div class="select">
    <div class="select-header"
         v-if="!show">请选择您本次复诊的病历</div>
    <div class="select-body">
      <div class="case-card"
           v-for="(value, key) in caseData"
           :key="key">
        <div class="case-card-time"
             :class="{'show':show}">
          <div class="m">{{ key.toDate().formatDate('MM-dd') }}</div>
          <div class="y">{{ key.toDate().formatDate('yyyy') }}</div>
        </div>
        <div class="case-box">
          <div class="case-card-note"
               :class="{'active':item.dataNo==recordNo&&!hasAnswer}"
               @click="select(item)"
               v-for="(item,index) in value"
               :key="index">
            <div class="case-card-note-content">
              <div class="case-left">
                <van-image class="case-left-logo"
                           :src="require('@src/assets/images/file/ic_medical record.png')" />
              </div>
              <div class="case-right">
                <p class="title">
                  <span class="elps">{{item.title}}</span>
                  <span @click.stop="gotoCaseDetail(item.dataNo)"
                        v-if="!hasAnswer">查看详情</span>
                </p>
                <p class="name">
                  {{ item.hospitalName }} | {{ item.deptName }}
                </p>
              </div>
            </div>
            <div class="case-diagnosis"
                 v-if="item.diagnosis">{{item.diagnosis}}</div>
          </div>
        </div>

      </div>
    </div>
    <div class="select-footer"
         v-if="showMore&&!show">
      <div @click="changeShowMoreBtn">
        <span>查看更多</span>
        <van-icon name="arrow-down"
                  color="858585" />
      </div>
    </div>
  </div>
</template>

<script>
import peace from '@src/library'
import { Dialog } from 'vant'

export default {
  name: 'SelectCaseCard',
  model: {
    prop: 'hasAnswer',
    event: 'change'
  },
  props: {
    data: Array,
    show: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    hasAnswer: {
      type: Boolean,
      default: () => {
        return false
      }
    },

    limit: {
      type: Number,
      default: () => {
        return 0
      }
    }
  },
  components: {
    [Dialog.Component.name]: Dialog.Component
  },
  data() {
    return {
      recordNo: '',
      caseInfo: null,
      caseData: {},
      showMore: false
    }
  },
  mounted() {
    this.showMore = !this.limit ? false : this.data.length > this.limit ? true : false
    this.getCaseList()
  },

  methods: {
    changeShowMoreBtn() {
      this.showMore = false
      this.getCaseList()
    },
    getCaseList() {
      const list = this.showMore ? this.data.slice(0, this.limit) : this.data
      const temp = {}
      // 遍历时间
      const timeList = new Set(list.map((item) => item.createdTime.toDate().formatDate('yyyy-MM-dd')))
      if (timeList.size) {
        timeList.forEach((time) => {
          temp[time] = list.filter((item) => item.createdTime.toDate().formatDate('yyyy-MM-dd') === time)
        })
      }
      this.caseData = temp
    },

    select(data) {
      if (this.hasAnswer || this.show) {
        return
      }
      this.recordNo = data.dataNo
      this.caseInfo = [data]
      this.$emit('selectCase', { caseInfo: this.caseInfo, recordNo: this.recordNo })
    },
    gotoCaseDetail(dataNo) {
      if (this.hasAnswer) {
        return
      }
      const token = $peace.cache.get($peace.type.USER.INFO).loginInfo.accessToken
      const url = `health/firstOption/${process.env.VUE_APP_IFRAME_BASE_PLATFORM}/${token}/${dataNo}`
      const json = peace.util.encode({
        url
      })
      this.$router.push(`/components/mainIframe/${json}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.select {
  padding: 12px 16px 0;
  .van-button {
    font-size: 13px;
    padding: 8px 25px;
    height: auto;
  }
  .van-button + .van-button {
    margin-left: 15px;
  }
}
.select-header {
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  padding-bottom: 10px;
}
.select-body {
  padding-top: 2px;
  margin-bottom: -13px;
  .case-card {
    display: flex;
    min-height: 65px;
    &:last-child {
      margin-bottom: 0;
    }
    .case-card-time {
      padding: 8px 15px 0 0;
      min-width: 70px;
      position: relative;
      text-align: right;
      font-family: PingFangSC-Regular, PingFang SC;
      &.show {
        .m,
        .y {
          color: #fff;
        }
      }
      .y {
        font-size: 12px;
        color: #999999;
      }
      .m {
        font-size: 15px;
        font-weight: 400;
        color: #333333;
      }
    }
    .case-box {
      flex: 1;
      width: 0;
    }
    .case-card-note {
      width: 100%;
      min-height: 50px;
      background: rgba(255, 255, 255, 1);
      // box-shadow: 0px 1px 5px 0px rgba(221, 221, 221, 0.5);
      border-radius: 1px;
      margin: 0 0 15px 0;
      border: 1px solid #e8e8e8;
      &.active {
        background: #f0fcfa;
        border: 1px solid $primary;
      }

      .case-card-note-content {
        display: flex;
        align-items: center;
      }
      .case-left {
        width: 35px;
        height: 35px;
        margin: 15px 16px 15px 14px;
        text-align: left;
        position: relative;
        .case-left-logo {
          width: 35px;
          height: 35px;
        }
      }
      .case-right {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1;
        width: 0;
        .title {
          color: #333;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .elps {
            width: 6em;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          span + span {
            font-size: 12px;
            line-height: normal;
            color: #999;
            padding: 4px 8px;
          }
        }
        .name {
          font-size: 13px;
          color: #999;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 98%;
        }
      }
      .case-diagnosis {
        padding-left: 16px;
        height: 25px;
        line-height: 25px;
        border-top: 1px solid #e8e8e8;
        color: $primary;
        font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
.select-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 12px 0;
  margin-top: 20px;
  border-top: 1px solid rgba(51, 51, 51, 0.1);

  div {
    color: #858585;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      margin-right: 4px;
    }
  }
}
</style>