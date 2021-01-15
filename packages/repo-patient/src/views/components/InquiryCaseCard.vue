<template>
  <div class="select">
    <div class="select-header"
         v-if="!show">请选择您本次复诊的病历</div>
    <div class="select-body">
      <div class="case-card"
           v-for="(value, key) in data"
           :key="key">
        <div class="case-card-time"
             :class="{'show':show}">
          <div class="m">{{ key.toDate().formatDate('MM-dd') }}</div>
          <div class="y">{{ key.toDate().formatDate('yyyy') }}</div>
        </div>
        <div class="case-box">
          <div class="case-card-note"
               :class="{'active':item.dataNo==recordNo&&!hasAnswer}"
               @click="select(item,key)"
               v-for="(item,index) in value"
               :key="index">
            <div class="case-card-note-content">
              <div class="case-left">
                <van-image width="35px"
                           height="35px"
                           :src="require('@src/assets/images/file/ic_medical record.png')" />
              </div>
              <div class="case-right">
                <p class="title">
                  <span class="elps">{{item.title}}</span>
                  <span @click.stop="gotoCaseDetail(item.dataNo)">查看详情</span>
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
         v-if="!hasAnswer&&!show">
      <peace-button round
                    throttle
                    :throttleTime="1000"
                    @click="answer(false)">以上都不是</peace-button>
      <peace-button round
                    throttle
                    :throttleTime="1000"
                    type="primary"
                    @click="answer(true)">确定</peace-button>
    </div>
  </div>
</template>

<script>
import peace from '@src/library'
import { Dialog } from 'vant'

export default {
  name: 'SelectCaseCard',
  props: {
    data: Object,
    show: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  components: {
    [Dialog.Component.name]: Dialog.Component
  },
  data() {
    return {
      recordNo: '',
      hasAnswer: false,
      caseInfo: {}
    }
  },
  methods: {
    answer(flag) {
      const data = flag ? this.caseInfo : ''
      if (!flag) {
        Dialog.confirm({
          title: '温馨提示',
          message: '复诊患者必须选择本次复诊的病历，不选病历将无法进行复诊',
          confirmButtonText: '确认不选'
        })
          .then(() => {
            this.hasAnswer = true
            this.$emit('answer', data, '以上都不是')
          })
          .catch(() => {})
      } else {
        if (!this.recordNo) {
          return
        }
        this.hasAnswer = true
        this.$emit('answer', data, this.recordNo)
      }
    },
    select(data, key) {
      if (this.hasAnswer || this.show) {
        return
      }
      this.recordNo = data.dataNo
      this.caseInfo = Object.assign({}, { [key]: [data] })
    },
    gotoCaseDetail(dataNo) {
      if (this.hasAnswer) {
        return
      }
      const token = $peace.cache.get($peace.type.USER.INFO).loginInfo.accessToken
      const url = `hybrid/health/firstOption/${process.env.VUE_APP_IFRAME_BASE_PLATFORM}/${token}/${dataNo}`
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
      font-family: monospace;
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
        font-size: 17px;
        font-weight: 600;
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
      border: 2px solid #e8e8e8;
      &.active {
        background: #f0fcfa;
        border: 2px solid $primary;
      }

      .case-card-note-content {
        display: flex;
        align-items: center;
        padding: 6px 0px 6px 16px;
      }
      .case-left {
        width: 35px;
        height: 35px;
        text-align: left;
        position: relative;
      }
      .case-right {
        margin-left: 15px;
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
  justify-content: flex-end;
  padding: 0 12px 18px 12px;
}
</style>