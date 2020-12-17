<template>
  <div class="remind-page">
    <van-pull-refresh v-model="refreshing"
                      @refresh="onRefresh">
      <van-list v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad">
        <div class="remind-list">
          <div v-for="item in list"
               :key="item.sysId"
               class="remind-item">
            <div :class="{'remind-icon': true, 'remind-red': item.isRead ? false:true}">
              <img v-if="item.tag == 'yz'"
                   src="@src/assets/images/message/ic_message_copy.png" />
              <img v-else
                   src="@src/assets/images/message/ic_service_message.png" />
            </div>
            <div class="remind-content"
                 @click="goPage(item)">
              <div class="remind-info">
                <div class="remind-title">{{item.title}}</div>
                <div class="remind-time">{{item.time.toDate().calcTimeHeader()}}</div>
              </div>
              <div class="remind-des">{{item.describe}}</div>
            </div>
          </div>
        </div>
        <div class="no-remind"
             v-if="list.length === 0 && !loading">
          <img class="no-remind-img"
               src="@src/assets/images/ic_no consultation copy@2x.png" />
          <div class="no-remind-text">暂无提醒</div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import peace from '@src/library'

export default {
  data() {
    return {
      // 跳转页面链接集合
      pageLink: {
        yz: '/message/service-remind/detail/',
        hz: '/components/theConsultation/',
        zz: '/components/theTransfer/',
        tz: '/setting/userConsultDetail/',
        wz: '/setting/userConsultDetail/'
      },
      loading: false,
      refreshing: false,
      query: {
        p: 0,
        size: 10,
        total: 0
      },
      finished: false,
      list: []
    }
  },
  activated() {
    this.query.p = 0
    this.query.total = 0
    this.list = []
    this.onLoad()
  },
  methods: {
    getList() {
      let params = {
        tag: 'yz',
        p: this.query.p + 1,
        size: this.query.size
      }
      peace.service.remind
        .getServiceRemindList(params)
        .then((res) => {
          this.list = this.list.concat(res.data.list)
          this.query.p = this.query.p + 1
          this.query.total = res.data.total
          this.finished = this.query.total > this.list.length ? false : true
        })
        .finally(() => {
          this.loading = false
        })
    },
    onLoad() {
      if (this.refreshing) {
        this.query.p = 0
        this.query.total = 0
        this.list = []
        this.refreshing = false
      }
      this.getList()
    },
    onRefresh() {
      this.finished = false
      this.onLoad()
    },
    goPage(item) {
      let json = {
        sysId: item.sysId,
        referralNo: item.referralNo,
        consultNo: item.consultNo,
        inquiryId: item.inquiryId,
        tag: item.tag
      }
      const params = peace.util.encode(json)
      this.$router.push(`${this.pageLink[item.tag]}${params}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.remind-page {
  min-height: 100%;
  background-color: #fff;
}

.van-pull-refresh {
  min-height: 100vh;
}

.remind-item {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 10px 10px 10px 0;
  margin-left: 15px;
  border-bottom: 0.5px solid #dedede;
}

.remind-item:last-child {
  border-bottom: 0.5px solid #ffffff;
}

.remind-icon {
  flex: none;
  position: relative;
  width: 23px;
  height: 23px;
  border-radius: 50%;
  background-color: #fff;
}

.remind-red.remind-icon::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #f2223b;
}

.remind-content {
  flex: 1;
  padding-left: 12px;
}

.remind-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.remind-title {
  flex: 1;
  max-width: 210px;
  font-size: 16px;
  font-weight: 400;
  color: #000000;
  line-height: 23px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.remind-time {
  width: 85px;
  font-size: 11px;
  font-weight: 400;
  color: #969a99;
  line-height: 15px;
  text-align: right;
}

.remind-des {
  font-size: 13px;
  font-weight: 400;
  color: #999999;
  line-height: 18px;
  word-break: break-all;
  word-wrap: normal;
  white-space: normal;
}

.no-remind {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
}

.no-remind-img {
  width: 160px;
  height: 100px;
}

.no-remind-text {
  font-size: 15px;
  color: #999999;
  text-align: center;
}
</style>
