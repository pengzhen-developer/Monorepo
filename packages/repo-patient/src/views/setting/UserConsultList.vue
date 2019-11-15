<template>
  <div class="userConsultList">
    <!-- h5 v0.1 版本暂不开放 -->
    <div class="box" v-if="false">
      <div class="box-tab">
        <div bindtap="goReferrListPage" class="tab-item" data-index="0">
          <div :class="{ red: unred_ZZ}" class="span icon-referral">转诊申请</div>
        </div>
        <div bindtap="goConsultGroupPage" class="tab-item" data-index="1" style="flex:1.15">
          <div :class="{ red: unred_HZ}" class="span icon-consultGroup">会诊申请</div>
        </div>
      </div>
    </div>

    <div class="content" style="height: 100%">
      <template v-if="consultList.length">
        <div :data-index="index" :Key="index" class="panel" v-for="(item,index) in consultList">
          <div class="panel-head">
            <div class="card-strip">
              <div class="avatar">
                <img :src="item.doctorInfo.avartor" class="avatar-cicular" />
              </div>
              <div class="strip-info">
                {{item.doctorInfo.name}} {{item.doctorInfo.deptName}}
                <!-- <div class="label label-private" v-if="item.inquiryInfo.isPrivateDoctor">私人医生</div> -->
              </div>
              <div :class="{ [`color-${item.inquiryInfo.inquiryStatus}`]: true }" class="strip-eye">
                {{item.inquiryInfo.statusTxt}}</div>
            </div>
          </div>
          <div :data-index="index" @click="goUserConsultDetailPage(item.inquiryInfo.inquiryId)"
            class="panel-body" style="padding-top: 0">
            <div class="code">{{item.inquiryInfo.describe}}</div>
            <div class="small">
              <div class="small-time">{{item.inquiryInfo.inquiryTime}}</div>
              <div class="small-type">{{item.inquiryInfo.inquiryType}}</div>
              <div class="small-price item.inquiryInfo.isFree? 'default' : 'money'">
                {{item.inquiryInfo.isFree ? '免费' : '￥' + item.inquiryInfo.orderMoney }}</div>
            </div>
          </div>
          <div class="panel-bottom" style="padding-left: 0"
            v-if="item.inquiryInfo.inquiryStatus === 1 || item.inquiryInfo.inquiryStatus === 2">
            <div class="count-down">
              <span>{{item.inquiryInfo.inquiryStatus ==1 ? '订单关闭倒计时：': '医生接诊倒计时：'}}</span>
              <van-count-down millisecond :time="item.time" format="HH:mm:ss" />
            </div>
            <div class="btn-wrap">
              <div :data-index="index" @click="goChatingPage(item)" class="label blue"
                v-if="item.inquiryInfo.inquiryStatus === 2">咨询记录</div>
              <div :data-index="index" @click="showCancellPop(item)" class="label gary">取消订单</div>
              <div :data-index="index" v-if="item.inquiryInfo.inquiryStatus === 1"
                @click="goToPay(item)" class="label blue-full">继续支付</div>
            </div>

          </div>
          <div class="panel-bottom" style="padding-left: 0; justify-content: flex-end;"
            v-if="item.inquiryInfo.inquiryStatus === 3 || item.inquiryInfo.inquiryStatus === 5">
            <div :data-index="index" @click="gouserPrescripCasePage(item)" class="label blue"
              data-tip="病历" v-if="item.inquiryInfo.isCase">咨询小结</div>
            <div :data-index="index" @click="gouserPrescripListPage(item)" class="label blue"
              data-tip="处方" v-if="item.inquiryInfo.isPrescrip">用药建议</div>
            <div :data-index="index" @click="goChatingPage(item)" class="label blue">咨询记录</div>
          </div>
        </div>
        <div class="bottom">客服电话：400-902-0365</div>
      </template>

      <template v-if="loaded && consultList.length == 0">
        <div class="none-page">
          <div class="icon icon_none_consult"></div>
          <div class="none-text">暂无咨询记录</div>
        </div>
      </template>
    </div>

    <peace-dialog :visible.sync="caseDetail.visible" title="咨询小结">
      <TheCase :data="caseDetail.data"></TheCase>
    </peace-dialog>

    <peace-dialog :visible.sync="recipeList.visible" title="用药建议">
      <TheRecipeList :data="recipeList.data"></TheRecipeList>
    </peace-dialog>

    <peace-dialog :visible.sync="chatingPage.visible" title="咨询记录">
      <MessageList :data="chatingPage.data" :doctorInfo="chatingPage.doctorInfo" :navBar="false">
      </MessageList>
    </peace-dialog>

  </div>
</template>

<script>
import peace from '@src/library'

import { Dialog } from 'vant'

import TheCase from '@src/views/components/TheCase'
import TheRecipeList from '@src/views/components/TheRecipeList'
import MessageList from '@src/views/components/MessageList'
import Vue from 'vue'
import { CountDown } from 'vant'
Vue.use(CountDown)

export default {
  components: {
    TheCase,
    TheRecipeList,
    MessageList,
    [Dialog.Component.name]: Dialog.Component
  },

  data() {
    return {
      time: [],
      page: {
        json: {},
        tabIndex: 0
      },
      loaded: false,
      consultList: [],
      referralLists: [],

      unred_HZ: true,
      unred_ZZ: true,

      caseDetail: {
        visible: false,
        data: {}
      },

      recipeList: {
        visible: false,
        data: []
      },

      chatingPage: {
        visible: false,
        data: [],
        doctorInfo: {}
      }
    }
  },

  created() {
    this.get()
    // 重复订单跳转进来
    // let inquiryId = this.$route.query.inquiryId
    // if (inquiryId && inquiryId != '') {
    //   this.goUserConsultDetailPage(inquiryId)
    // }
  },

  methods: {
    get() {
      this.getConsultList()
    },
    goToPay(data) {
      //console.log(data);

      let doctorId = data.doctorInfo.doctorId
      let order = data.inquiryInfo
      let money = order.orderMoney
      let typeName = order.inquiryType
      let doctorName = data.doctorInfo.name
      let orderNo = order.orderNo
      let json = { money, typeName, doctorName, orderNo, doctorId }
      json = peace.util.encode(json)
      this.$router.push(`/components/doctorInquiryPay/${json}`)
    },
    getConsultList() {
      peace.service.patient.inquiryList().then(res => {
        this.loaded = true
        this.consultList = res.data.list
        this.consultList.map(item => {
          // item.time =  15 * 60 * 1000;
          let inquiryInfo = item.inquiryInfo
          let expireTime =
            inquiryInfo.inquiryStatus == 1
              ? inquiryInfo.orderExpireTime
              : inquiryInfo.orderReceptTime
          if (expireTime > inquiryInfo.currentTime) {
            item.time = (expireTime - inquiryInfo.currentTime) * 1000
          }
        })
      })
    },

    gouserPrescripCasePage(item) {
      const params = peace.util.encode({
        familyId: item.inquiryInfo.familyId,
        inquiryNo: item.inquiryInfo.inquiryNo
      })

      this.$router.push(`/components/theCase/${params}`)
    },

    gouserPrescripListPage(item) {
      const params = peace.util.encode({
        familyId: item.inquiryInfo.familyId,
        inquiryNo: item.inquiryInfo.inquiryNo
      })

      this.$router.push(`/components/theRecipeList/${params}`)
    },

    goChatingPage(item) {
      // 问诊中时, 咨询记录跳转聊天页
      if (item.inquiryInfo.inquiryStatus === 2 || item.inquiryInfo.inquiryStatus === 3) {
        const params = peace.util.encode({
          id: 'p2p-' + item.doctorInfo.doctorId,
          scene: 'p2p',
          beginTime: item.inquiryInfo.inquiryTime.toDate().getTime(),
          to: item.doctorInfo.doctorId
        })

        // 跳转聊天详情
        this.$router.push(`/components/messageList/${params}`)
      }
      // 非问诊中,显示历史记录
      else {
        const params = peace.util.encode({
          inquiryNo: item.inquiryInfo.inquiryNo
        })

        this.$router.push(`/components/messageList/${params}`)
      }
    },

    goUserConsultDetailPage(inquiryId) {
      // this.consultDetail.visible = true

      const params = {
        inquiryId
      }

      let json = peace.util.encode(params)
      this.$router.push(`/setting/userConsultDetail/${json}`)
    },

    showCancellPop(item) {
      Dialog.confirm({
        title: '温馨提示',
        message: '是否确认取消咨询？'
      })
        .then(() => {
          const params = {
            orderNo: item.inquiryInfo.orderNo
          }
          peace.service.patient.cancel(params).then(res => {
            peace.util.alert(res.msg)

            this.get()
          })
        })
        .catch(() => {
          // on cancel
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.userConsultList {
  height: 100%;
  color: #999;
}
.van-count-down {
  display: inline;
}
.blue-full {
  background: #00c6ae;
  color: #fff;
  border: none;
}
.gary {
  color: #999;
  border-color: #ddd;
}
.box {
  margin: 0;
  padding: 10px 15px;
}

.box-tab {
  display: flex;
  justify-content: space-between;

  background: #fff;
  box-shadow: 0 0 5px rgba(204, 204, 204, 0.5);
  padding: 15px 10px;
  box-sizing: border-box;
  border-radius: 15px;
}
.box-tab .tab-item {
  flex: 1;
  text-align: center;
  position: relative;
  border-left: 2rpx solid #f5f5f5;
}
.box-tab .tab-item:first-child {
  border-left: none;
}
.box-tab .tab-item .span {
  text-align: center;
  color: #333;
  font-size: 15px;
  padding-left: 25px;
}
.box-tab .tab-item .span.red::after {
  content: '';
  width: 7px;
  height: 7px;
  position: absolute;
  background: #f2223b;
  border-radius: 50%;
  top: -4px;
  left: 0;
}
.icon-referral::before {
  content: '';
  position: absolute;
  width: 25px;
  height: 25px;
  background-size: cover;
  display: block;
  left: -20px;
  top: -2px;
  background-image: url('../../assets/images/icon-referral.jpg');
}
.icon-consultGroup::before {
  content: '';
  position: absolute;
  width: 25px;
  height: 25px;
  background-size: cover;
  display: block;
  left: -20px;
  top: -2px;
  background-image: url('../../assets/images/icon-consultGroup.jpg');
}
.bottom {
  color: #999;
  text-align: center;
  font-size: 13px;
  box-sizing: border-box;
  padding: 15px 0;
}
.panel {
  padding: 0;
  box-shadow: none;
}
.content .panel:first-child {
  margin-top: 0;
}
.panel .panel-head,
.panel .panel-body,
.panel .panel-bottom {
  padding: 10px 15px;
}
.panel .panel-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .count-down {
    padding-left: 13px;
    font-size: 13px;
  }
}
.panel .panel-bottom .time {
  flex: 1 0 auto;
  width: 280rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.card-strip {
  display: flex;
  font-size: 15px;
  align-items: center;
}
.card-strip .avatar {
  box-sizing: border-box;
  flex: 0 0 30px;
  height: 30px;
  margin-right: 10px;
  border: 0;
  background: #fff;
}
.card-strip .avatar img {
  padding: 2px;
  border-radius: 50%;
  width: 30px;
  height: 30px;
}

.strip-info {
  flex: 1;
  color: #000;
}
.strip-eye {
  flex: 0 0 auto;
  color: #999;
  text-align: right;
}
/* color-x: 咨询单状态，
 * color-0x 转诊单状态 ↓
 *  01:转出待审核  02:转出已拒绝 03:转出已通过/转入待审核 04:转入已通过 05:转入已拒绝 06:转诊完成 07:转诊已关闭
 * color-ax 购药单状态
 * 1: 待接单 2:已接单 3:已发货 4:已完成
*/
/*red*/
.strip-eye.color-1,
.strip-eye.color-2,
.strip-eye.color-02,
.strip-eye.color-05,
.strip-eye.color-a1,
.strip-eye.color-a2 {
  color: #fb2828;
}
/*blue*/
.strip-eye.color-3,
.strip-eye.color-01,
.strip-eye.color-03,
.strip-eye.color-04,
.strip-eye.color-a3 {
  color: #00c6ae;
}
/**/
.code {
  display: block;
  font-size: 14px;
  padding: 6px 9px;
  background-color: #fafafa;
  border: 1px solid #f3f3f3;
  color: #000;
}

/**/
.small {
  display: flex;
  padding-top: 10px;
  color: #999;
  font-size: 12px;
  align-items: flex-end;
}
.small .small-time {
  flex: 0 0 auto;
  width: 125px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.small .small-type {
  flex: 0 0 auto;
  width: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.small .small-price {
  flex: 1;
  width: 60px;
  text-align: right;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.label {
  font-size: 13px;
  padding: 5px 12px;
  margin-left: 10px;
  border-radius: 20px;
}
.label.label-private {
  font-size: 8px;
  padding: 1px 2px;
  border-radius: 2px;
  color: #f7e9b3;
  background: #504c4f;
  border-color: #504c4f;
  vertical-align: text-top;
}
</style>
