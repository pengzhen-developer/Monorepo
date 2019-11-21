<template>
  <div>
    <div class="consult-detatil"
         v-if="internalData &&
               internalData.inquiryInfo &&
               internalData.doctorInfo &&
               internalData.familyInfo &&
               internalData.illInfo">
      <!--TOP-->
      <div class="module nmg">
        <div class="strong">
          {{ internalData.inquiryInfo.statusTxt }}
          <span class="money"
                v-if="internalData.inquiryInfo.inquiryStatus == '1'">¥{{ internalData.orderInfo.orderMoney }}</span>
        </div>
        <div class="brief">
          {{ getInquiryText(internalData.inquiryInfo.inquiryStatus) }}
        </div>
        <div class="cancelText"
             v-if="
          (internalData.inquiryInfo.inquiryStatus == '6' ||
            internalData.inquiryInfo.inquiryStatus == '4') &&
            internalData.orderInfo.payMoney != '0.00'
        ">
          订单取消后退款将在1-3个工作日内原路返回，请注意查收
        </div>
        <!-- <div class="module-body">
          <div @click="gouserPrescripCasePage(internalData)" class="label blue"
            v-if="internalData.inquiryInfo.isCase">
            咨询小结
          </div>
          <div @click="gouserPrescripListPage(internalData)" class="label blue"
            v-if="internalData.inquiryInfo.isPrescrip">
            用药建议
          </div>
          <div @click="goChatingPage(internalData)" class="label blue" v-if="
            internalData.inquiryInfo.inquiryStatus != '1' &&
              internalData.inquiryInfo.inquiryStatus != '6'
          ">
            咨询记录
          </div>
          <div @click="showCancellPop(internalData)" class="label blue" v-if="
            internalData.inquiryInfo.inquiryStatus == '1' ||
              internalData.inquiryInfo.inquiryStatus == '2'
          ">
            取消订单
          </div>
          <div @click="goToPay(internalData)" class="label blue-full"
            v-if="internalData.inquiryInfo.inquiryStatus == '1'">
            支付订单
          </div>
        </div> -->
      </div>
      <!--医生名片-->
      <div class="module card">
        <div class="card-avatar avatar-circular">
          <img :src="internalData.doctorInfo.avartor"
               style="height:100%;" />
        </div>
        <div class="card-body">
          <div class="card-name">
            {{ internalData.doctorInfo.name }}
            <div class="card-small">
              {{ internalData.doctorInfo.doctorTitle }}
              {{ internalData.doctorInfo.deptName }}
              <div class="label label-private"
                   v-if="internalData.doctorInfo.isPrivateDoctor">
                私人医生
              </div>
            </div>
          </div>
          <div class="card-small">{{ internalData.doctorInfo.hospitalName }}</div>
        </div>
      </div>
      <!--订单内容-->
      <div class="module order">
        <div class="module-item">
          <div class="b">个人信息</div>
          <div class="form-dl">
            <!-- <div class="form-dt">就/复诊人</div>
        <div class="form-dd">
          <span style="font-size: 14px; margin:0 8px 0 0;">{{
            internalData.familyInfo.familyName
          }}</span>
          <span style="font-size: 12px; margin:0 8px 0 0;">{{
            internalData.familyInfo.familySex
          }}</span>
          <span style="font-size: 12px;">{{
            internalData.familyInfo.familyAge + "岁"
          }}</span>
        </div> -->
            <div class="form-dt"><span>姓名</span> :</div>
            <div class="form-dd">{{internalData.familyInfo.familyName}}</div>
          </div>
          <div class="form-dl">
            <div class="form-dt"><span>年龄</span> :</div>
            <div class="form-dd">{{internalData.familyInfo.familyAge + "岁"}}</div>
          </div>
          <div class="form-dl">
            <div class="form-dt"><span>性别</span> :</div>
            <div class="form-dd">{{internalData.familyInfo.familySex}}
            </div>
          </div>
          <!-- <div class="form-dl">
            <div class="form-dt">监 护 人 :</div>
            <div class="form-dd">王炸 | 男 | 23岁
            </div>
          </div> -->
        </div>
        <!--病情描述-->
        <div class="module-item">
          <div class="b">病情现状描述</div>
          <div class="span">{{ internalData.inquiryInfo.inquiryDescribe }}</div>
          <!--图片列表-->
          <div class="ul">
            <template v-if="internalData.inquiryInfo.inquiryImages">
              <div :key="index"
                   class="li"
                   v-for="(item, index) in internalData.inquiryInfo.inquiryImages">
                <img :internalData-index="index"
                     :src="item.image_path"
                     @click="viewImage(item.image_path)"
                     bindtap="divImgs" />
              </div>
            </template>
          </div>

          <!-- <div v-if="internalData.inquiryInfo.isAgain">
            <div class="b">复诊信息</div>
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
              <div class="form-dd">
                {{ internalData.illInfo.allergicHistory }}
              </div>
            </div>
            <div class="form-dl">
              <div class="form-dt">备注</div>
              <div class="form-dd">
                {{ internalData.illInfo.illnessDescribe }}
              </div>
            </div>
          </div> -->
        </div>
        <!--复诊信息 <img src="/src/assets/images/ic_video_open.png">-->
        <div class="module-item"
             v-if="internalData.inquiryInfo&&internalData.inquiryInfo.isAgain">
          <div>
            <div class="b">复诊信息</div>
            <div class="form-dl img">
              <div class="form-dt ">复诊诊凭 :</div>
              <div class="form-img">
                <img src="../../assets/images/bg-img.png"
                     v-for="(item,index) in 4"
                     :key="index"
                     @click="viewImage(item.image_path)"
                     bindtap="divImgs" />
              </div>
            </div>
            <div class="form-dl">
              <div class="form-dt">初诊诊断 :</div>
              <div class="form-dd">上呼吸道感染
              </div>
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
        <!-- <div class="dl-packet">
        <div class="dt">优惠金额</div>
        <div class="dd">{{ 0.00}}元</div>
      </div> -->
        <div class="dl-packet">
          <div class="dt">订单时间</div>
          <div class="dd">{{ internalData.orderInfo.orderTime }}</div>
        </div>
      </div>

      <div class="module pdtb"
           v-if="internalData.inquiryInfo.inquiryStatus == '1'">
        <div class="brief right">
          应付金额：
          <div class="money">{{ "¥" + internalData.orderInfo.orderMoney }}</div>
        </div>
      </div>
      <div class="module pdtb"
           v-else>
        <!-- 取消订单的状态 -->
        <template v-if="internalData.inquiryInfo.inquiryStatus == '6'">
          <div class="brief right"
               v-if="internalData.orderInfo.payMoney == 0">
            <template v-if="internalData.orderInfo.orderMoney == 0">
              实付金额：
            </template>
            <template v-else>
              应付金额：
            </template>
            <div class="money">{{ "¥" + internalData.orderInfo.orderMoney }}</div>
          </div>
          <div class="brief right"
               v-else>
            实付金额：
            <div class="money">{{ "¥" + internalData.orderInfo.payMoney }}</div>
          </div>
        </template>

        <template v-else>
          <div class="brief right">
            实付金额：
            <div class="money">{{ "¥" + internalData.orderInfo.payMoney }}</div>
          </div>
        </template>
      </div>
    </div>
    <div class="footer"
         v-if="internalData &&internalData.inquiryInfo&&internalData.inquiryInfo.inquiryStatus == '3'||internalData.inquiryInfo.inquiryStatus == '4'||internalData.inquiryInfo.inquiryStatus == '5'">
      <div class="chatBtn"
           @click="goChatingPage(internalData)"
           v-if="
            internalData.inquiryInfo.inquiryStatus == '4' ||
              internalData.inquiryInfo.inquiryStatus == '5'">咨询记录</div>
      <div class="chatBtn"
           @click="goChatingPage(internalData)"
           v-if="
            internalData.inquiryInfo.inquiryStatus == '3'">进入咨询</div>
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
    this.get()
  },
  methods: {
    get() {
      this.getConsultDetail()
    },
    goToPay(data) {
      let doctorId = data.doctorInfo.doctorId
      let order = data.orderInfo
      let money = order.orderMoney
      let typeName = order.inquiryType == 'image' ? '图文问诊' : ''
      let doctorName = data.doctorInfo.name
      let orderNo = order.orderNo
      let json = { money, typeName, doctorName, orderNo, doctorId }
      json = peace.util.encode(json)
      this.$router.push(`/components/doctorInquiryPay/${json}`)
    },
    getConsultDetail() {
      let orderInfo = peace.util.decode(this.$route.params.json)
      console.log(orderInfo)

      peace.service.patient
        .inquiryDetail({
          inquiryId: orderInfo.orderInfo.inquiryInfo.inquiryId
        })
        .then(res => {
          this.internalData = res.data
        })
    },

    getInquiryText(status) {
      const dic = {
        // '1': '15分钟之后未支付系统将自动关闭订单',
        '1': '订单创建15分钟后未支付将自动关闭',
        '2': '已通知医生尽快接诊，请等候',
        '3': '请及时与医生沟通',
        '4': '医生已退诊',
        '5': '祝您身体健康',
        '6':
          this.internalData.orderInfo.payMoney == '0.00'
            ? '咨询订单已取消，如遇紧急情况请及时就医'
            : '咨询订单已取消'
      }

      return dic[status]
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
          beginTime: item.orderInfo.orderTime.toDate().getTime(),
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
.footer {
  width: 100%;
  background-color: #fff;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  .chatBtn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 343px;
    height: 45px;
    color: #fff;
    background: rgba(0, 202, 173, 1);
    border-radius: 40px;
    border: 1px solid rgba(0, 198, 174, 1);
  }
}
.module-item {
  border-bottom: 1px solid #e8e8e8;
  &:last-child {
    border-bottom: 0;
  }
}
.order {
  padding: 0 15px;
  .b {
    padding-left: 0 !important;
  }
  .form-dl {
    padding: 3px 0;
    border-bottom: 0;
    &:last-child {
      padding-bottom: 10px;
    }
  }

  .form-dt {
    color: #999;
    min-width: 70px;
    display: flex;
    padding-right: 10px;
    span {
      flex: 1;
      text-align-last: justify;
      margin-right: 3px;
    }
  }
  .form-dd {
    color: #333;
    text-align: left;
    padding-left: 2px;
  }
}
.bb {
  height: 1px;
  background: #e8e8e8;
}
.consult-detatil {
  background-color: #f5f5f5;
  color: #333;
  min-height: 100%;
  padding: 5px 10px;
  box-sizing: border-box;
  .module,
  .brief {
    border-radius: 5px;
  }
  .module {
    background: #fff;
    margin-bottom: 10px;
    .cancelText {
      height: 45px;
      background: rgba(240, 252, 250, 1);
      border-radius: 2px;
      margin: 10px 15px 0 15px;
      font-size: 12px;
      color: rgba(0, 198, 174, 1);
      line-height: 16px;
      padding: 6px 22px 0px 55px;
      background: rgba(240, 252, 250, 1) url('../../assets/images/icons/ic_notice.png') no-repeat;
      background-size: 17px 17px;
      background-position: 15px 14px;
    }
  }
  .form-dl {
    font-size: 14px;
  }
  .form-dl.img {
    display: block;
    .form-dt {
      padding-top: 5px;
      padding-bottom: 5px;
    }
    .form-img {
      padding: 5px 0;
      display: flex;
      align-items: center;
      img {
        width: 57px;
        height: 57px;
        display: block;
        margin-right: 10px;
      }
    }
  }
  .nmg {
    margin-top: 0;
    padding-bottom: 10px;
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

    display: flex;
    justify-content: center;
    align-items: center;
  }
  .module-body .blue-full {
    background: #00c6ae;
    color: #fff;
    border-color: transparent;
  }

  .card {
    background: #fff;
    padding: 10px 15px;
  }
  .b {
    display: block;
    font-weight: 600;
    color: #000;

    &::before {
      display: inline-block;
      content: '';
      width: 4px;
      height: 15px;
      background: #00c6ae;
      margin-right: 8px;
      margin-bottom: -2px;
    }
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
    // text-align: right;
    display: flex;
    align-items: center;
    justify-content: space-between;
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
