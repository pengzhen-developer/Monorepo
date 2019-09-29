<template>
  <div class="userConsultList">
    <!-- h5 v0.1 版本暂不开放 -->
    <div class="box"
         v-if="false">
      <div class="box-tab">
        <div bindtap="goReferrListPage"
             class="tab-item"
             data-index="0">
          <div :class="{ red: unred_ZZ}"
               class="span icon-referral">转诊申请</div>
        </div>
        <div bindtap="goConsultGroupPage"
             class="tab-item"
             data-index="1"
             style="flex:1.15">
          <div :class="{ red: unred_HZ}"
               class="span icon-consultGroup">会诊申请</div>
        </div>
      </div>
    </div>

    <div class="content">
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
              <div :class="{ [`color-${item.inquiryInfo.inquiryStatus}`]: true }"
                   class="strip-eye">{{item.inquiryInfo.statusTxt}}</div>
            </div>
          </div>
          <div :data-index="index"
               @click="goUserConsultDetailPage(item)"
               class="panel-body"
               style="padding-top: 0">
            <div class="code">{{item.inquiryInfo.describe}}</div>
            <div class="small">
              <div class="small-time">{{item.inquiryInfo.inquiryTime}}</div>
              <div class="small-type">{{item.inquiryInfo.inquiryType}}</div>
              <div class="small-price item.inquiryInfo.isFree? 'default' : 'money'">
                {{item.inquiryInfo.isFree ? '免费' : item.inquiryInfo.orderMoney }}</div>
            </div>
          </div>
          <div class="panel-bottom"
               style="padding-left: 0"
               v-if="item.inquiryInfo.inquiryStatus === 1 || item.inquiryInfo.inquiryStatus === 2">
            <div :data-index="index"
                 @click="goChatingPage(item)"
                 class="label blue"
                 v-if="item.inquiryInfo.inquiryStatus === 2">咨询记录</div>
            <div :data-index="index"
                 @click="showCancellPop(item)"
                 class="label blue">取消订单</div>
            <div :data-index="index"
                 @click="goToPay(item)"
                 class="label blue-full">继续支付</div>
          </div>
          <div class="panel-bottom"
               style="padding-left: 0"
               v-if="item.inquiryInfo.inquiryStatus === 3 || item.inquiryInfo.inquiryStatus === 5">
            <div :data-index="index"
                 @click="gouserPrescripCasePage(item)"
                 class="label blue"
                 data-tip="病历"
                 v-if="item.inquiryInfo.isCase">咨询小结</div>
            <div :data-index="index"
                 @click="gouserPrescripListPage(item)"
                 class="label blue"
                 data-tip="处方"
                 v-if="item.inquiryInfo.isPrescrip">用药建议</div>
            <div :data-index="index"
                 @click="goChatingPage(item)"
                 class="label blue">咨询记录</div>
          </div>
        </div>
        <div class="bottom">客服电话：400-902-0365</div>
      </template>

      <template v-else>
        <div class="none-page">
          <div class="icon icon_none_consult"></div>
          <div class="none-text">暂无咨询记录</div>
        </div>
      </template>
    </div>

    <peace-dialog :visible.sync="caseDetail.visible"
                  title="咨询小结">
      <TheCase :data="caseDetail.data"></TheCase>
    </peace-dialog>

    <peace-dialog :visible.sync="recipeList.visible"
                  title="用药建议">
      <TheRecipeList :data="recipeList.data"></TheRecipeList>
    </peace-dialog>

    <peace-dialog :visible.sync="chatingPage.visible"
                  title="咨询记录">
      <MessageList :data="chatingPage.data"
                   :doctorInfo="chatingPage.doctorInfo"
                   :navBar="false"></MessageList>
    </peace-dialog>

    <peace-dialog :visible.sync="consultDetail.visible"
                  title="咨询详情">
      <ConsultDetail :data="consultDetail.data"></ConsultDetail>
    </peace-dialog>
  </div>
</template>

<script>
import peace from '@src/library'

import { Dialog } from 'vant'

import TheCase from '@src/views/components/TheCase'
import TheRecipeList from '@src/views/components/TheRecipeList'
import MessageList from '@src/views/components/MessageList'
import ConsultDetail from '@src/views/components/ConsultDetail'

export default {
  components: {
    TheCase,
    TheRecipeList,
    MessageList,
    ConsultDetail,

    [Dialog.Component.name]: Dialog.Component
  },

  data() {
    return {
      page: {
        json: {},
        tabIndex: 0
      },

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

      consultDetail: {
        visible: false,
        data: {}
      }
    }
  },

  created() {
    this.get()
  },

  methods: {
    get() {
      this.getConsultList()
    },
    goToPay(data) {
      //console.log(data);
      let doctorId = data.doctorInfo.doctorId;
      let order = data.inquiryInfo;
      let money = order.orderMoney;
      let typeName = order.inquiryType == 'image' ? '图文问诊' : '';
      let doctorName = data.doctorInfo.name;
      let orderNo = order.orderNo;
      let json = {money, typeName, doctorName, orderNo, doctorId};
      json = peace.util.encode(json);
      this.$router.push(`/components/doctorInquiryPay/${json}`);
    },
    getConsultList() {
      peace.service.patient.inquiryList().then(res => {
        this.consultList = res.data.list
      })
    },

    gouserPrescripCasePage(item) {
      this.caseDetail.visible = true

      const params = {
        inquiryNo: item.inquiryInfo.inquiryNo
      }

      peace.service.patient.getCaseInfo(params).then(res => {
        this.caseDetail.data = res.data
      })
    },

    gouserPrescripListPage(item) {
      this.recipeList.visible = true

      const params = {
        familyId: item.inquiryInfo.familyId,
        inquiryNo: item.inquiryInfo.inquiryNo
      }

      peace.service.patient.getMyPrescripList(params).then(res => {
        this.recipeList.data = res.data
      })
    },

    goChatingPage(item) {
      // 问诊中时, 咨询记录跳转聊天页
      if (item.inquiryInfo.inquiryStatus === 2 || item.inquiryInfo.inquiryStatus === 3) {
        this.$router.push({
          name: '/message/index',
          params: {
            sessionId: 'p2p-' + item.doctorInfo.doctorId
          }
        })
      }
      // 非问诊中,显示历史记录
      else {
        this.chatingPage.visible = true

        const params = {
          inquiryNo: item.inquiryInfo.inquiryNo
        }

        peace.service.patient.chatDetail(params).then(res => {
          const historyMessageFormatHandler = messages => {
            if (messages && Array.isArray(messages)) {
              messages.forEach(message => {
                const messageTypeMap = { 0: 'text', 1: 'image', 100: 'custom' }

                message.time = message.sendtime
                message.flow = item.doctorInfo.doctorId === message.from ? 'in' : 'out'
                message.type = messageTypeMap[message.type]
                message.text = message.body.msg
                message.content = message.body
                message.file = message.body
              })
            }
          }

          historyMessageFormatHandler(res.data.msgList)

          this.chatingPage.data = res.data.msgList
          this.chatingPage.doctorInfo = res.data.doctorInfo
        })
      }
    },

    goUserConsultDetailPage(item) {
      this.consultDetail.visible = true

      const params = {
        inquiryId: item.inquiryInfo.inquiryId
      }

      peace.service.patient.inquiryDetail(params).then(res => {
        this.consultDetail.data = res.data
      })
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
  min-height: 100%;
  /*background: #f5f5f5;*/
  color: #999;
}
.blue-full {
  background: #00c6ae;
  color: #fff;
  border: none;
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
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAeFBMVEVHcExnZ2dmZmZnZ2dmZmZmZmZmZmZnZ2dmZmZmZmZx2LtmZmZmZmZnZ2e18+JmZmZm6cg037Vqamoz37U04LY037Wz9OKy8+FB4blnZ2e29OK18+I04LYz37Y037W19ONmZmYz3rS08uGS7dZQ476l8Nxm5saB6s8k8yC4AAAAIHRSTlMAmeg5eKP99viBDc1rVuS0IdMatD7uO8iX/HmkVYJwYLpAgFoAAARcSURBVGjezZrtlrIgEIBNNzVc08zMj6z8vv87fFUUUDQQY887+6ezIU8zwwwDo6L8J6LZPyJia9wEcDJ0Q0x09QT4tFDNt7iYKo82mqm/90hksimeuo/xfuuqx4IczPdeMQ8sp0M9DPUoIoM3TYbz7X6Y+SO49E/wcZtjlG4JB5jVQ06fBx15BjF/5IEDYvwKQ36MboLj50HO1yGeRokD16D2QbwNEO1ovHVKYDh9lLfpaHwQ4OiReEzrjscB8ax9gW2upQ4SspPR6mIBFuT3CwnqhwVR4bg2RQnIG/5CA3yGaP0iMh1PKBQ850OCwhD4SQUSEhSGHCKOBMPMtUcGZGcW/O1ncv4OAoB0CLhmWSgZAi5ZK08pEK1zfNQ+f+0Y2UUKpMtKkekpYSYT4h2sNt0/IaNzCoiTGHwZ0os/MLKHAu55nt/FIeCZ+otfuLcR4iodI89fohC/mypdgl9Gxk1JekYeC0Ie42+lBDGyawwZopqkwzy0wa6IkYUDIwciEBBmBMQFy4ysGBhnEccDPJOvBK1vE0B/08qoSCIAcbHVMz84j56lGHVOuGQjxL9llNnvFL2VZoS4myGPyUQFYfU0m0pFumQTZDYThvhIjQv8VE5csgGCl1V4mUAe2BuXx8xar20Q7NjnsFZ7SNWUWLfrOCifuIQbghx7e4yBXVRFXZL2e47pESly35Tq0bK6tSH4KrMFufgoPSJF4i0QtKwurf5JvgC5pQDE9UyRwVp8kBQbXQFtdqUhoRskeZNNl9ZoLS4Icnm727ndLlHOtQji9t/NLG3lecANwXtEW4DATNJMMkgCd6dinlGQImzIZFkFw+OD8cu6GUMbgbGxkCJMyGRZxej5qqiqKieknicUQhEWBO3ZcFmtSVXSjNzlhaTTZbWCqLMFxou77gqRz937GqLJlhgJf3GHyqjwvIwosBZZSTDOYEMF+aT2ulGBqpilLnLEOdhU1T+W5mgWEkuzyuAIxseNskZBI+pqncGTVnyKUn9EUAyu3IWLhGGumbHqYuKtOxA6M2JKQUFmBLSHbD/O4b23ISA1kbqQGsGO029IUspZSsfeeCm7jtgpsZRXICuILSUREZZLkHMScNzcMYs7FJblHHJO4p7g7YdMK2Fc3AVg7H6w77s4amH3tlYLd2oYOvsqiqeqn9TuM4htrN4ybTyfkKeQGeSLt0QERR6ECEuZEBQwUiFjwFRSITBg6lwuRHHTEN0GSIN08voLyFB8o2pU0m3q5LJA2pWtm+TnmONeGDfOJF4+q2hqaRBwxL2C70AMixJz6HooX4N0PbTp3yDG6XuQ1YY87JlIhYw9NZkQ0xpqjC/5hH4PI9IttPN/B2LZlJAtW4nB+NeQaB+kz4K6w9NdE39HwdE5unvwbYtItLVv6zxvBgDYJY+sk4hYEUwgrH7r+AZMZAoIRJgOs11kRLu72OzGsRbtpEQ2TxfP2PV+lWlzLRHvEJmGLiKtV45MW/0DNvDTjYn1wpgAAAAASUVORK5CYII=);
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
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAh1BMVEVHcExnZ2dnZ2e08+FmZmZnZ2dnZ2dmZmZmZmZoaGi49eg037VnZ2dn2Lkz37U14La29OK09+VB07A14bc037WF5s629OMz37Ww9OM037U037Y84Li18+JmZmY04LVO4r608+G18+JnZ2e08+K18+JpaWm29OO18+JmZmYz3rS08uFg5cSG69HhhlNBAAAAKHRSTlMAzK6xf5C59vxTGLPSD5E+byAaKs8GW/YtdlfdweZo/up/bJjeL0NRsuxZXAAAA8BJREFUaN7tmut2ojAURlMQiWECCsYbYhW1ldj3f77JhUtAAnQkXbO6/H5YRHBz2ElAUgBe+YdcZ5PRM7uqBDxJoGsgtyQlBWPG3hoKTPJqUngzF+jORB0mGRzDasHuzTAkIcCREBcmbyMnucmvhinIFxw8frfAljSRAPHXdcz0PkuWICtxiRlIKFXISt5MDSSJhAiWZQry5wV5Qb4DCQ4/ANn5LyffOl1ovzAEKYfQ7RKfkFxFxoVgL4t3eSVesWq93o0K8bIsWwePq6IRIYeMp2i7iG7YpUKsivFokGgtvlGep8AXkECsWntjQXCcKRAm/owKSJYdRoKIsy8gvDkd8oLyleuIjAERQvjL8kKrHsIh/pK9vNP58xAhxMfi6yi9sONGl0UOEZ/d6cezECFkSQoI/Qy2pXgf7HiVX0f0JCTvDlgcMsucibdRAVncBWVPnoIIIaxjl5UwSOUELOi7+OD0DEQKYQuLEqKKZxCadWkZAsmFsCWbQ04SIkbhEvLVpWUIpByf5vyAlysOCQ6KeAahoqvSdi0DIIUQsBFnxVtJJ/VKqL3Ua+mHlELQpQapO6F2R2/phShCqAIhuAnp6C29EEWICmGF2fXTBYAvtXwfogqh9FxCol1DPINgnZYeSCkEMyF0H6riL81KgE5LN6Qu5LjAHeLFlb9dSzekLuQTVBActkFIu5ZOSEMIUCBs+YweIBotXZCGEKJCouBRPNBp6YCIo1KEABXCxB8XLZBWLR2QppAGpM2JRose8iCkBgkjDaRNixbyKAQ0xJ9QK6RFixbCjyeOwjAUQjahSKRUUokPea12WGbb1KKD4EyXUnx1B9mWu6JFW0ms23urisdr3WZftNKihew0u8c47yfqTXjLZry1fPS2rsj3PC++3+/vnpItBoX4OZJ33mwt2ypWt/IOZM9VoiFjV9VDlORjl3AiU29d+S+LI2+UAyCIM2zUyFwRr0Cam/Fjoat+yCfVhYtHpHYwrbH7IRvtzpuo9kPxotvuNMDJWbMvH2TICveWfMFDLr+rs/2YMzvTBCtOWM1t29lz/NzDgpp4U08kwohsiGnIDz3AIR/YPOQHnPy3z7vEY/Sp4cfockLAEANDFZKagcgZIChP1w3OTDDSYpImn62BieWMHCvJZ7IccM0n5+DoKWbOXNZ1J6anAIUJyygFTqSfCTQ3LQvLdnud3lwD5bgutNSJ7DB1rOnIsZwUg1deeWVorlPXbBIrBGw8MT0MJ8D0/2FUdyu/AAL5xcRw+CUlnBnObxrv/wKX0vRYNNKmOgAAAABJRU5ErkJggg==);
}
.bottom {
  color: #999;
  text-align: center;
  font-size: 13px;
  box-sizing: border-box;
  padding-bottom: 15px;
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
