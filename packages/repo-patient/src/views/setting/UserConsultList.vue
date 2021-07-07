<template>
  <div class="userConsultList">
    <!-- h5 v0.1 版本暂不开放   v-if="false"-->
    <div class="box"
         v-if="false">
      <div class="box-tab">
        <div @click="goReferrListPage"
             class="tab-item"
             data-index="0">
          <div :class="{ red: unred_ZZ}"
               class="span icon-referral">转诊申请</div>
        </div>
        <div @click="goConsultGroupPage"
             class="tab-item"
             data-index="1"
             style="flex:1.15">
          <div :class="{ red: unred_HZ}"
               class="span icon-consultGroup">会诊申请</div>
        </div>
      </div>
    </div>
    <!-- :finished-text="consultList.length>0?'客服电话：400-902-0365':''" -->
    <van-list :loading="loading"
              v-model="loading"
              :finished="finished"
              @load="get"
              class="content"
              style="height: 100%">
      <template v-if="consultList.length">
        <div :data-index="index"
             :Key="index"
             class="panel"
             v-for="(item,index) in consultList">
          <div class="panel-head">
            <div class="card-strip">
              <div class="avatar">
                <img :src="item.doctorInfo.avartor"
                     class="avatar-cicular" />
              </div>
              <div class="strip-info">
                {{item.doctorInfo.name}} {{item.doctorInfo.deptName}}
                <!-- <div class="label label-private" v-if="item.inquiryInfo.isPrivateDoctor">私人医生</div> -->
              </div>
              <div :class="{ [`color-i${item.inquiryInfo.inquiryStatus}`]: true }"
                   class="strip-eye">
                {{item.inquiryInfo.statusTxt}}</div>
            </div>
          </div>
          <div :data-index="index"
               @click="goChatingPage(item)"
               class="panel-body"
               style="padding-top: 0">
            <div class="code">{{item.inquiryInfo.describe}}</div>
            <div class="small">
              <div class="small-time">{{item.inquiryInfo.inquiryTime}}</div>
              <div class="small-type">{{item.inquiryInfo.inquiryType}}</div>
              <!-- <div class="small-price item.inquiryInfo.isFree? 'default' : 'money'">
                {{item.inquiryInfo.isFree ? '免费' : '￥' + item.inquiryInfo.orderMoney }}</div> -->
            </div>
          </div>
          <div class="panel-bottom"
               style="padding-left: 0"
               v-if="item.inquiryInfo.inquiryStatus === 1 || item.inquiryInfo.inquiryStatus === 2">
            <div class="count-down">
              <span>{{item.inquiryInfo.inquiryStatus ==1 ? '订单关闭倒计时：': '医生接诊倒计时：'}}</span>
              <van-count-down millisecond
                              :time="item.time"
                              format="HH:mm:ss" />
            </div>
            <div class="btn-wrap">
              <div :data-index="index"
                   @click="goChatingPage(item)"
                   class="label blue"
                   v-if="item.inquiryInfo.inquiryStatus === 2">问诊记录</div>
              <div :data-index="index"
                   @click="showCancellPop(item)"
                   class="label gary">取消订单</div>
              <div :data-index="index"
                   v-if="item.inquiryInfo.inquiryStatus === 1"
                   @click="goToPay(item)"
                   class="label blue-full">继续支付</div>
            </div>
          </div>
          <div class="panel-bottom"
               v-if="canShowPanelBottom(item)"
               style="justify-content: flex-end;">
            <div :data-index="index"
                 @click="gouserConsultationPage(item)"
                 class="label gary"
                 data-tip="会诊"
                 v-if="item.inquiryInfo.consultNo">会诊单</div>
            <div :data-index="index"
                 @click="gouserTranforPage(item)"
                 class="label gary"
                 data-tip="转诊"
                 v-if="item.inquiryInfo.referralNo">转诊单</div>
            <div :data-index="index"
                 @click="gouserPrescripCasePage(item)"
                 class="label gary"
                 data-tip="病历"
                 v-if="item.inquiryInfo.isCase">病历</div>
            <div :data-index="index"
                 @click="gouserPrescripListPage(item)"
                 class="label gary"
                 data-tip="处方"
                 v-if="item.inquiryInfo.isPrescrip">处方</div>
            <div :data-index="index"
                 @click="gouserInspectionPage(item)"
                 class="label gary"
                 data-tip="检查单"
                 v-if="item.inquiryInfo.checkOrderNo">检查单
            </div>
          </div>

        </div>
      </template>

      <template v-if="loaded && consultList.length == 0">
        <div class="none-page">
          <div class="icon icon_none_consult"></div>
          <div class="none-text">暂无问诊记录</div>
        </div>
      </template>
    </van-list>

    <peace-dialog :visible.sync="caseDetail.visible"
                  title="问诊小结">
      <TheCase :data="caseDetail.data"></TheCase>
    </peace-dialog>

    <peace-dialog :visible.sync="recipeList.visible"
                  title="用药建议">
      <TheRecipeList :data="recipeList.data"></TheRecipeList>
    </peace-dialog>

    <peace-dialog :visible.sync="chatingPage.visible"
                  title="问诊记录">
      <MessageList :data="chatingPage.data"
                   :doctorInfo="chatingPage.doctorInfo"
                   :navBar="false">
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
      },
      p: 0,
      size: 10,
      finished: false,
      loading: false,
      timer: null
    }
  },
  activated() {
    this.p = 0
    this.loaded = false
    this.finished = false
    this.consultList = []
    this.get()
  },
  created() {
    // this.get()
    // 重复订单跳转进来
    // let inquiryId = this.$route.query.inquiryId
    // if (inquiryId && inquiryId != '') {
    //   this.goUserConsultDetailPage(inquiryId)
    // }
  },

  methods: {
    canShowPanelBottom(item) {
      return (
        item.inquiryInfo &&
        !(
          !item.inquiryInfo.consultNo &&
          !item.inquiryInfo.referralNo &&
          !item.inquiryInfo.isCase &&
          !item.inquiryInfo.isPrescrip &&
          !item.inquiryInfo.checkOrderNo
        )
      )
    },
    get() {
      if (!this.timer) {
        this.timer = setTimeout(() => {
          this.getConsultList()
          this.timer = null
        }, 500)
      }
    },
    goReferrListPage() {},
    goConsultGroupPage() {},
    goToPay(data) {
      let doctorId = data.doctorInfo.doctorId
      let order = data.inquiryInfo
      let money = order.orderMoney
      let typeName = order.inquiryType
      let doctorName = data.doctorInfo.name
      let orderNo = order.orderNo
      let inquiryId = order.inquiryId
      let orderType = 'inquiry'
      let json = { money, typeName, doctorName, orderNo, doctorId, inquiryId, orderType }
      json = peace.util.encode(json)
      this.$router.push(`/components/ExpenseDetail/${json}`)
    },
    getConsultList() {
      this.p++
      peace.service.patient.inquiryList({ p: this.p, size: this.size }).then((res) => {
        this.loaded = true
        res.data.list.map((item) => {
          // item.time =  15 * 60 * 1000;
          let inquiryInfo = item.inquiryInfo
          let expireTime = inquiryInfo.inquiryStatus == 1 ? inquiryInfo.orderExpireTime : inquiryInfo.orderReceptTime
          if (expireTime > inquiryInfo.currentTime) {
            item.time = (expireTime - inquiryInfo.currentTime) * 1000
          }
          // item.inquiryType =
          //   (inquiryInfo.inquiryType == '图文问诊' ? '图文' : '视频') + (inquiryInfo.isAgain == 1 ? '复诊' : '问诊')

          item.inquiryType = inquiryInfo.isAgain == 1 ? '复诊开药' : inquiryInfo.inquiryType
        })
        this.consultList = this.consultList.concat(res.data.list)
        this.loading = false
        if (this.p * this.size >= res.data.count) {
          this.finished = true
        }
      })
    },
    //会诊
    gouserConsultationPage(item) {
      const params = peace.util.encode({
        inquiryNo: item.inquiryInfo.inquiryNo
      })

      this.$router.push(`/components/theConsultation/${params}`)
    },
    //转诊
    gouserTranforPage(item) {
      const params = peace.util.encode({
        inquiryNo: item.inquiryInfo.inquiryNo
      })

      this.$router.push(`/components/theTransfer/${params}`)
    },
    //病历
    gouserPrescripCasePage(item) {
      const params = peace.util.encode({
        familyId: item.inquiryInfo.familyId,
        inquiryNo: item.inquiryInfo.inquiryNo
      })

      this.$router.push(`/components/theCase/${params}`)
    },
    //检验单
    gouserInspectionPage(item) {
      const params = peace.util.encode({
        inquiryNo: item.inquiryInfo.inquiryNo
      })

      this.$router.push(`/components/theInspection/${params}`)
    },
    //处方
    gouserPrescripListPage(item) {
      const params = peace.util.encode({
        familyId: item.inquiryInfo.familyId,
        inquiryNo: item.inquiryInfo.inquiryNo
      })

      this.$router.push(`/components/theRecipeList/${params}`)
    },

    goChatingPage(item) {
      let params = ''
      // 问诊中时, 问诊记录跳转聊天页
      if (item.inquiryInfo.inquiryStatus === peace.type.INQUIRY.INQUIRY_STATUS.问诊中) {
        params = peace.util.encode({
          id: 'p2p-' + item.doctorInfo.doctorId,
          scene: 'p2p',
          beginTime: item.inquiryInfo.inquiryTime.toDate().getTime(),
          to: item.doctorInfo.doctorId,
          familyId: item.inquiryInfo.familyInfo.id
        })
      }
      // 非问诊中,显示历史记录
      else {
        params = peace.util.encode({
          inquiryNo: item.inquiryInfo.inquiryNo,
          familyId: item.inquiryInfo.familyInfo.id
        })
      }
      // 清除聊天记录
      peace.service.IM.resetInquirySessionMessages()
      this.$router.push(`/components/messageList/${params}`)
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
        message: '是否确认取消问诊？'
      })
        .then(() => {
          const params = {
            orderNo: item.inquiryInfo.orderNo
          }
          peace.service.patient.cancel(params).then((res) => {
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
  border-left: 2rpx solid $-color--line;
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
/* color-x: 问诊单状态，
 * color-iX:问诊单状态新；i5 已完成 i4 已退诊 i3问诊中
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
.strip-eye.color-i3,
.strip-eye.color-i5,
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
  // padding: 2px 12px;
  // margin-left: 10px;
  border-radius: 20px;
  width: 18%;
  margin-left: 2.5%;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: normal;
  &:first-child {
    margin-left: 0;
  }
}
.gary {
  color: #999;
  border-color: #ccc;
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
