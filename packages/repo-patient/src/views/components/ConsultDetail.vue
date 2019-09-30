<template>
  <div class="consult-detatil" v-if="internalData && internalData.inquiryInfo && internalData.doctorInfo && internalData.familyInfo && internalData.illInfo">
    <!--TOP-->
    <div class="module nmg">
      <div class="strong">{{ internalData.inquiryInfo.statusTxt }}</div>
      <div class="brief">{{ getInquiryText(internalData.inquiryInfo.inquiryStatus) }}</div>
      <div class="module-body">
        <div @click="gouserPrescripCasePage(internalData)" class="label blue" v-if="internalData.inquiryInfo.isCase">咨询小结</div>
        <div @click="gouserPrescripListPage(internalData)" class="label blue" v-if="internalData.inquiryInfo.isPrescrip">用药建议</div>
        <div
          @click="goChatingPage(internalData)"
          class="label blue"
          v-if="internalData.inquiryInfo.inquiryStatus != '1' && internalData.inquiryInfo.inquiryStatus != '6'"
        >咨询记录</div>
        <div
          @click="showCancellPop(internalData)"
          class="label blue"
          v-if="internalData.inquiryInfo.inquiryStatus == '1' || internalData.inquiryInfo.inquiryStatus == '2'"
        >取消订单</div>
        <div
                @click="goToPay(internalData)"
                class="label blue-full"
                v-if="internalData.inquiryInfo.inquiryStatus == '1'"
        >支付订单</div>
      </div>
    </div>
    <!--医生名片-->
    <div class="module card">
      <div class="card-avatar avatar-circular">
        <img :src="internalData.doctorInfo.avartor" class />
      </div>
      <div class="card-body">
        <div class="card-name">
          {{ internalData.doctorInfo.name }}
          <div class="card-small">
            {{ internalData.doctorInfo.doctorTitle }}
            {{ internalData.doctorInfo.deptName }}
            <div class="label label-private" v-if="internalData.doctorInfo.isPrivateDoctor">私人医生</div>
          </div>
        </div>
        <div class="card-small">{{ internalData.doctorInfo.hospitalName }}</div>
      </div>
    </div>
    <!--订单内容-->
    <div class="module">
      <div class="form-dl">
        <div class="form-dt">就/复诊人</div>
        <div class="form-dd">
          {{ internalData.familyInfo.familyName }}
          {{ internalData.familyInfo.familySex }}
          {{ internalData.familyInfo.familyAge }}
        </div>
      </div>
      <!--病情描述-->
      <div class>
        <div class="b">病情现状描述</div>
        <div class="span">{{ internalData.inquiryInfo.inquiryDescribe }}</div>
        <!--图片列表-->
        <div class="ul">
          <template v-if="internalData.inquiryInfo.inquiryImages">
            <div :key="index" class="li" v-for="(item,index) in internalData.inquiryInfo.inquiryImages">
              <img :internalData-index="index" :src="item.image_path" @click="viewImage(item.image_path)" bindtap="divImgs" />
            </div>
          </template>
        </div>
        <!--列表-->
        <div v-if="internalData.inquiryInfo.isAgain">
          <div class="form-dl">
            <div class="form-dt">确认疾病</div>
            <div class="form-dd">{{ internalData.illInfo.confirmIllness }}</div>
          </div>
          <div class="form-dl">
            <div class="form-dt">确认时间</div>
            <div class="form-dd">{{ internalData.illInfo.confirmTime }}</div>
          </div>
          <div class="form-dl">
            <div class="form-dt">既往用药</div>
            <div class="form-dd">{{ internalData.illInfo.pastDrug }}</div>
          </div>
          <div class="form-dl">
            <div class="form-dt">过敏史</div>
            <div class="form-dd">{{ internalData.illInfo.allergicHistory }}</div>
          </div>
          <div class="form-dl">
            <div class="form-dt">备注</div>
            <div class="form-dd">{{ internalData.illInfo.illnessDescribe }}</div>
          </div>
        </div>
      </div>
    </div>
    <!--订单报文-->
    <div class="module pdtb">
      <div class="dl-packet">
        <div class="dt">订单号码</div>
        <div class="dd">{{ internalData.orderInfo.orderNo }}</div>
      </div>
      <div class="dl-packet">
        <div class="dt">订单金额</div>
        <div class="dd">{{ internalData.orderInfo.orderMoney }}元</div>
      </div>
      <div class="dl-packet">
        <div class="dt">订单时间</div>
        <div class="dd">{{ internalData.orderInfo.orderTime }}</div>
      </div>
    </div>
    <div class="module pdtb">
      <div class="brief right">
        实付金额：
        <div class="money">{{ internalData.orderInfo.payMoney }}</div>
      </div>
    </div>

    <peace-dialog :visible.sync="caseDetail.visible" title="咨询小结">
      <TheCase :data="caseDetail.data"></TheCase>
    </peace-dialog>

    <peace-dialog :visible.sync="recipeList.visible" title="用药建议">
      <TheRecipeList :data="recipeList.data"></TheRecipeList>
    </peace-dialog>

    <peace-dialog :visible.sync="chatingPage.visible" title="咨询记录">
      <MessageList :data="chatingPage.data"></MessageList>
    </peace-dialog>
  </div>
</template>

<script>
import peace from '@src/library'

import Vue from 'vue'
import { Dialog, ImagePreview } from 'vant'
Vue.use(ImagePreview)

import TheCase from '@src/views/components/TheCase'
import TheRecipeList from '@src/views/components/TheRecipeList'
import MessageList from '@src/views/components/MessageList'

export default {
  components: {
    TheCase,
    TheRecipeList,
    MessageList,

    [Dialog.Component.name]: Dialog.Component
  },

  props: {
    data: {
      type: Object,
      default() {
        return undefined
      }
    }
  },

  data() {
    return {
      internalData: {},

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
        data: []
      }
    }
  },

  watch: {
    data: {
      handler() {
        this.internalData = this.data
      },
      immediate: true
    }
  },
  mounted() {
    this.get();
  },
  methods: {
    get() {
      this.getConsultDetail()
    },
    goToPay(data) {
      let doctorId = data.doctorInfo.doctorId;
      let order = data.orderInfo;
      let money = order.orderMoney;
      let typeName = order.inquiryType == 'image' ? '图文问诊' : '';
      let doctorName = data.doctorInfo.name;
      let orderNo = order.orderNo;
      let json = {money, typeName, doctorName, orderNo, doctorId};
      json = peace.util.encode(json);
      this.$router.push(`/components/doctorInquiryPay/${json}`);
    },
    getConsultDetail() {
      let params = peace.util.decode(this.$route.params.json)
      peace.service.patient.inquiryDetail(params).then(res => {
        this.internalData = res.data
      })
    },

    getInquiryText(status) {
      const dic = {
        // '1': '15分钟之后未支付系统将自动关闭订单',
        '1': '请您尽快支付',
        '2': '已通知医生尽快接诊，请等候',
        '3': '请及时与医生沟通',
        '4': '欢迎再次咨询。如有紧急问题请及时就医~',
        '5': '祝您身体健康',
        '6': '欢迎再次咨询。如有紧急问题请及时就医~'
      }

      return dic[status]
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
        })
      }
    },

    showCancellPop(item) {
      Dialog.confirm({
        title: '温馨提示',
        message: '是否确认取消咨询？'
      })
        .then(() => {
          const params = {
            orderNo: item.orderInfo.orderNo
          }
          peace.service.patient.cancel(params).then(res => {
            peace.util.alert(res.msg)

            this.get()
          })
        })
        .catch(() => {
          // on cancel
        })
    },

    viewImage(path) {
      ImagePreview([path])
    }
  }
}
</script>

<style lang="scss" scoped>
.consult-detatil {
  background-color: #f5f5f5;
  color: #333;

  .module {
    background: #fff;
    margin-bottom: 10px;
  }

  .nmg {
    margin-top: 0;
  }
  .module .strong {
    font-weight: 600;
    font-size: 16px;
    line-height: 18px;
    padding: 10px 15px;
    color: #333;
  }
  .module .brief {
    font-size: 13px;
    padding: 0 15px;
    /*color: #888;*/
  }
  .module .small {
    font-size: 15px;
    padding: 10px 15px;
  }

  .module .module-body {
    display: flex;
    justify-content: space-between;
    padding: 10px;
  }
  .module-body .label {
    flex: 1;
    text-align: center;
    font-size: 13px;
    padding: 4px 6px;
    margin: 5px;
    border-radius: 20px;
  }
  .module-body .blue-full {
    background: #00c6ae;
    color: #fff;
  }
  .card {
    background: #fff;
    padding: 10px 15px;
  }
  .b {
    display: block;
    font-weight: 600;
    color: #333;
  }
  .b,
  .span,
  .ul {
    padding: 10px 15px 0 15px;
  }

  .dl-packet {
    display: flex;
    justify-content: space-between;
    align-content: center;
    color: #999;
    font-size: 13px;
  }
  .dl-packet .dt {
    flex: 0 0 auto;
    width: 115px;
    padding: 5px 15px;
  }
  .dl-packet .dd {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: right;
    padding: 5px 15px;
  }
  .pdtb {
    padding: 10px 0;
  }
  .right {
    text-align: right;
  }
  .money {
    color: #f2223b;
    font-size: 18px;
    display: inline;
    padding-left: 8px;
  }
  .ul {
    display: flex;
    padding-bottom: 15px;
  }
  .ul .li {
    flex: 0 0 auto;
    width: 45px;
    height: 45px;
    margin-right: 13px;
    border: 1px solid #e5e5e5;
    padding: 5px;
  }
  .label.label-private {
    font-size: 8px;
    padding: 1px 2px;
    border-radius: 2px;
    color: #f7e9b3;
    background: #504c4f;
    border-color: #504c4f;
    vertical-align: text-top;
    margin-top: 2px;
  }
}
</style>
