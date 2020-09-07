<template>
  <div class="page">
    <div class="consult-detatil"
         v-if="canShowInfo">
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
              <van-image width=13
                         v-if="params.consultingType=='image'|| params.isAgain.toString() === '1'"
                         :src="require('@src/assets/images/ic_tuwen_open.png')"></van-image>
              <van-image width=13
                         v-if="params.consultingType=='video'"
                         :src="require('@src/assets/images/ic_video_open.png')"></van-image>
            </div>
          </div>
          <div class="card-small">{{ internalData.doctorInfo.hospitalName }}</div>
        </div>
        <!-- 咨询类别 -->
        <div class="inquriyStyle"
             :class="inquriyStyle">{{inquiryText}}</div>
      </div>
      <!--订单内容-->
      <div class="module order">
        <div class="module-item"
             v-if="retrunVisitBlock">
          <div class="b">复诊时间</div>
          <div class="span">{{appointmentTime}}</div>
        </div>
        <div class="module-item">
          <div class="b">个人信息</div>
          <div class="form-dl">
            <div class="form-dt"><span>姓名</span> :</div>
            <div class="form-dd">{{internalData.familyInfo.name}}</div>
          </div>
          <div class="form-dl">
            <div class="form-dt"><span>年龄</span> :</div>
            <div class="form-dd">{{internalData.familyInfo.age + "岁"}}</div>
          </div>
          <div class="form-dl">
            <div class="form-dt"><span>性别</span> :</div>
            <div class="form-dd">{{internalData.familyInfo.sex}}
            </div>
          </div>
          <div class="form-dl"
               v-if="internalData.familyInfo.guardianName">
            <div class="form-dt"><span>监 护 人</span> :</div>
            <div class="form-dd">{{internalData.familyInfo.guardianName}} |
              {{internalData.familyInfo.guardianSex}} |
              {{internalData.familyInfo.guardianAge+'岁'}}
            </div>
          </div>
        </div>
        <!--病情描述-->
        <div class="module-item">
          <div class="b">病情描述</div>
          <div class="span">{{ params.illnessDescribe }}</div>
        </div>
        <div class="module-item"
             v-if="hasReturnVisitInfo">
          <div>
            <div class="b">复诊信息</div>
            <div class="form-dl img"
                 v-if="params.attachment.length>0">
              <div class="form-dt ">复诊凭证 :</div>
              <div class="form-img">
                <div class="img"
                     v-for="(item,index) in params.attachment"
                     :key="index">
                  <img :src="item.path"
                       @click="viewImage(item, index,params.attachment)" />
                </div>
              </div>
            </div>
            <div class="form-dl"
                 v-else>
              <div class="form-dt">复诊凭证 :</div>
              <div class="form-dd">确认遗失
              </div>
            </div>
            <div class="form-dl">
              <div class="form-dt start">初诊诊断 :</div>
              <div class="form-dd">{{params.confirmIllness}}
              </div>
            </div>
          </div>
        </div>
        <!-- 首诊记录 -->
        <div class="module-item"
             v-if="hasFirstVisitInfo">
          <div class="module-item-title">
            <div class="b">首诊记录</div>
            <div class="module-item-more"
                 @click="seeMoreCase"
                 v-if="canSeeMoreCase">查看更多>></div>
          </div>
          <template>
            <div class="case-card"
                 v-for="(value, key) in firstVisitData"
                 :key="key">
              <div class="case-card-time">
                <div class="m">{{ key.toDate().formatDate('MM-dd') }}</div>
                <div class="y">{{ key.toDate().formatDate('yyyy') }}</div>
              </div>
              <div class="case-box">
                <!-- @click="gotoCaseDetail(item.dataNo)" -->
                <div class="case-card-note"
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
                        {{item.title}}
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
          </template>

        </div>
        <div class="module-item"
             v-if="canShowSupplementaryInfo">
          <div>
            <div class="b">补充信息</div>
            <div class="form-dl img"
                 v-if="params.affectedImages.length>0">
              <div class="form-dt ">患处图片 :</div>
              <div class="form-img">
                <div class="img"
                     v-for="(item,index) in params.affectedImages"
                     :key="index">
                  <img :src="item.path"
                       @click="viewImage(item, index,params.affectedImages)" />
                </div>
              </div>
            </div>
            <div class="form-dl"
                 v-if="params.pregnancyText">
              <div class="form-dt">特殊时期 :</div>
              <div class="form-dd">{{params.pregnancyText}}</div>
            </div>
            <div class="form-dl"
                 v-if="params.allergicHistory">
              <div class="form-dt"
                   style="height:fit-content;"><span>过敏史</span> :</div>
              <div class="form-dd">{{params.allergicHistory}}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="module info">
        <div class="brief order-money">
          <div class="brief-left">订单费用:</div>
          <div class="brief-right money">{{ "¥" + params.price.toString().toFixed(2)||'0.00' }}
          </div>
        </div>
        <div class="brief"
             v-if="canShowDiscount">
          <div class="brief-left">优惠金额:</div>
          <div class="brief-right">暂无可用
          </div>
        </div>
        <div class="brief"
             v-if="canShowYibao">
          <div class="brief-left">使用医保卡:</div>
          <div class="brief-right"
               :class="{'checked':yibaoChecked}"
               @click="chooseYibao">{{yibaoText||'暂无可用'}}
          </div>
        </div>
        <div class="brief"
             v-if="canShowShangbao">
          <div class="brief-left">商保权益抵扣:</div>
          <div class="brief-right">暂无可用
          </div>
        </div>
        <div class="brief pay-omney">
          <div class="brief-left">应付金额:</div>
          <div class="brief-right money">{{ "¥" + params.price.toString().toFixed(2)||'0.00' }}
          </div>
        </div>

      </div>
      <!-- 预售订单 - 非当日-->

      <div class="tipStyle"
           v-if="canShowTip">*请在复诊当天上线报到并支付费用</div>

    </div>

    <div class="footer ">
      <van-button @click="apply"
                  type="primary"
                  size="large">提交订单</van-button>
    </div>

    <van-image-preview v-model="imagePreview.visible"
                       :start-position="imagePreview.position"
                       :images="imagePreview.images">
      <template v-slot:cover>
        <van-button icon="cross"
                    type="primary"
                    round
                    @click="imagePreview.visible = false" />
      </template>
    </van-image-preview>
    <!-- 医保 -->
    <template v-if="canShowInfo">
      <YibaoCaedSelect v-model="showCard"
                       :info="info"
                       @onSuccess="onSuccess"></YibaoCaedSelect>

    </template>

  </div>
</template>

<script>
import YibaoCaedSelect from '@src/views/components/YibaoCardSelect'
import peace from '@src/library'

import { Dialog } from 'vant'
const ENUM = {
  // 支付类型
  // wxpay（微信）
  // alipay（支付宝）
  // yibaopay（医保支付）
  PAYMENT_TYPE: {
    微信支付: 'wxpay',
    支付宝支付: 'alipay',
    医保支付: 'yibaopay'
  },
  /** 问诊状态 */
  INQUIRY_STATUS: {
    待支付: 1,
    待接诊: 2,
    问诊中: 3,
    已退诊: 4,
    已完成: 5,
    已取消: 6
  },
  INQUIRY_TXET_MAP: {
    image: '图文咨询',
    video: '视频咨询',
    returnVisit: '复诊'
  }
}
export default {
  components: {
    [Dialog.Component.name]: Dialog.Component,
    YibaoCaedSelect
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
      ENUM: ENUM,
      internalData: {},

      imagePreview: {
        visible: false,
        position: 0,
        images: []
      },
      params: {},
      sending: false,
      firstVisitData: null,
      canSeeMoreCase: false,
      showCard: false,
      hasFirstVisitInfo: false,
      yibaoText: '',
      yibaoChecked: false,
      yibaoInfo: {}
    }
  },
  computed: {
    info() {
      return {
        familyName: this.params?.familyName,
        familyId: this.params?.familyId,
        serviceType: 'inquiry',
        doctorId: this.internalData?.doctorInfo?.doctorId,
        netdeptChildId: this.internalData?.doctorInfo?.netdeptChildId,
        appointmentDate: this.params?.appointmentDate,
        appointmentStartTime: this.params?.appointmentStartTime,
        appointmentEndTime: this.params?.appointmentEndTime,
        AMPM: this.params?.AMPM,
        sourceCode: this.params?.sourceCode,
        sourceItemCode: this.params?.sourceItemCode
      }
    },
    canShowTip() {
      //报道  复诊且预约日期大于今日
      const canReportTime = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000)
      const canReport = new Date(this.params.appointmentDate) >= canReportTime ? true : false
      if (this.params.serviceType == 'returnVisit' && canReport) {
        return true
      } else {
        return false
      }
    },
    inquiryText() {
      return ENUM.INQUIRY_TXET_MAP[this.params.consultingType]
    },
    inquriyStyle() {
      if (this.params.serviceType == 'returnVisit') {
        return 'returnVisit'
      } else {
        return 'inquiry'
      }
    },
    appointmentTime() {
      return this.params.appointmentDate.replace(/-/g, '/') + ' ' + this.params.appointmentStartTime + '-' + this.params.appointmentEndTime
    },
    retrunVisitBlock() {
      return this.params?.isAgain.toString() === '1'
    },
    hasReturnVisitInfo() {
      return this.params?.confirmIllness
    },

    canShowInfo() {
      return this.internalData && this.params && this.internalData.doctorInfo && this.internalData.familyInfo
    },
    canShowSupplementaryInfo() {
      return this.params && (this.params.affectedImages.length > 0 || this.params.pregnancyText || this.params.allergicHistory)
    },
    canShowYibao() {
      return this.params?.serviceType == 'returnVisit' && this.internalData?.insuranceConfig?.medicalInsuranceConfig != null ? true : false
    },
    canShowShangbao() {
      //H5暂无商保对接
      // return this.internalData?.insuranceConfig?.commercialInsuranceConfig!=null ? true : false
      return false
    },
    canShowDiscount() {
      //咨询暂无优惠活动
      return false
    }
  },

  activated() {
    this.getFamilyDoctorInfo()
    if (this.params?.serviceType == 'returnVisit') {
      this.getFirstOptionList()
    }
  },

  methods: {
    onSuccess(result) {
      if (result.checked == false) {
        this.yibaoText = '不使用医保卡'
      } else {
        this.yibaoText = `-￥${result.yibaoInfo.totalAmount}`
      }
      this.yibaoChecked = true
      this.yibaoInfo = result.yibaoInfo
    },
    chooseYibao() {
      this.showCard = true
    },
    gotoCaseDetail(dataNo) {
      const json = peace.util.encode({
        dataNo
      })
      this.$router.push(`/file/fileAllDetail/${json}`)
    },
    seeMoreCase() {
      // peace.cache.set('familyId', this.internalData?.familyInfo?.familyId)
      // this.$router.push(`/file/index/`)
      const json = peace.util.encode({
        familyId: this.params?.familyId
      })
      this.$router.push(`/components/FirstVisitList/${json}`)
    },
    apply() {
      this.sending = true
      const params = peace.util.deepClone(this.params)
      params.divisionId = this.yibaoInfo.divisionId
      peace.service.inquiry
        .apply(params)
        .then((res) => {
          // 订单提交成功
          if (res.data.errorState === 0) {
            // 需要支付，跳转支付
            if (res.data.inquiryStatus === 1) {
              if (res.data.inquiryType == 'returnVisit' && res.data.isCurrentDate == 2) {
                this.goToConsultDetail(res.data)
              } else {
                this.gotoExpenseDetailPage(res.data)
              }
            }
            // 不需要支付，跳转订单
            else {
              this.goToConsultDetail(res.data)
            }
          }

          // 订单提交失败
          // errorState:1 存在未支付订单， 跳转订单
          if (res.data.errorState === 1) {
            return Dialog.confirm({
              title: '提示',
              message: res.msg,
              confirmButtonText: '去看看'
            }).then(() => {
              this.goToConsultDetail(res.data)
            })
          }

          // errorState:2 存在未结束订单，跳转咨询
          if (res.data.errorState === 2) {
            return Dialog.confirm({
              title: '提示',
              message: res.msg,
              confirmButtonText: '继续咨询'
            }).then(() => {
              this.goToMessage(res.data)
            })
          }
        })
        .catch((res) => {
          //203  号源不足 或 号源过期
          if (res.data.code == '203') {
            return Dialog.confirm({
              title: '提示',
              message: res.data.msg,
              confirmButtonText: '确定'
            })
          } else {
            peace.util.alert(res.data.msg)
          }
        })
        .finally(() => {
          this.sending = false
        })
    },
    goToMessage(data) {
      const params = peace.util.encode({
        id: 'p2p-' + this.model.doctorId,
        scene: 'p2p',
        beginTime: data.startTime.toDate().getTime(),
        to: this.model.doctorId
      })

      // 跳转聊天详情
      this.$router.replace(`/components/messageList/${params}`)
    },

    goToConsultDetail(data) {
      const params = {
        inquiryId: data.inquiryId
      }

      let json = peace.util.encode(params)
      this.$router.replace(`/setting/userConsultDetail/${json}`)
    },
    gotoExpenseDetailPage(data) {
      if (data.orderMoney == 0) {
        const json = peace.util.encode({
          inquiryId: data.inquiryId
        })
        this.$router.replace(`/setting/userConsultDetail/${json}`)
        return
      }
      const json = peace.util.encode({
        money: data.orderMoney,
        typeName: this.params.serviceName,
        doctorId: data.doctorId,
        doctorName: data.doctorName,
        orderNo: data.orderNo,
        inquiryId: data.inquiryId,
        orderType: 'inquiry'
      })
      this.$router.replace(`/components/ExpenseDetail/${json}`)
    },

    getFamilyDoctorInfo() {
      this.params = peace.util.decode(this.$route.params.json)
      const params = {
        familyId: this.params.familyId,
        doctorId: this.params.doctorId,
        consultingType: this.params.consultingType, //image 图文 video 视频 returnVisit复诊续方
        orderType: this.params.consultingType == 'returnVisit' ? 2 : 1, //1.咨询 2.复诊 3.购药
        appointmentDate: this.params.appointmentDate, //预约时间
        appointmentStartTime: this.params.appointmentStartTime, //预约开始时间
        appointmentEndTime: this.params.appointmentEndTime, //预约结束时间
        sourceCode: this.params.sourceCode //预约号源编码
      }
      peace.service.inquiry.getFamilyDoctorInfo(params).then((res) => {
        this.internalData = res.data
      })
    },
    getFirstOptionList() {
      const params = {
        familyId: this.params?.familyId
      }
      peace.service.yibao.GetFirstOptionList(params).then((res) => {
        if (res.data == null || !res.data.firstOptionList) {
          return
        }
        let list = []
        if (res.data.firstOptionList.length > 2) {
          this.canSeeMoreCase = true
          list = res.data.firstOptionList.slice(0, 2)
        } else {
          this.canSeeMoreCase = false
          list = res.data.firstOptionList
        }
        const temp = {}
        // 遍历时间
        const timeList = new Set(list.map((item) => item.createdTime))
        if (timeList.size) {
          timeList.forEach((time) => {
            temp[time] = list.filter((item) => item.createdTime === time)
          })
        }
        this.firstVisitData = temp
        this.hasFirstVisitInfo = res.data.firstOptionList.length > 0 ? true : false
      })
    },
    viewImage(file, fileIndex, files) {
      this.imagePreview.visible = true
      this.imagePreview.position = fileIndex
      this.imagePreview.images = files.map((item) => item.path)
    }
  }
}
</script>

<style lang="scss" scoped>
.case-card {
  display: flex;

  .case-card-time {
    padding: 8px 15px 0 0;
    min-width: 70px;
    position: relative;
    text-align: right;
    font-family: monospace;
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
    box-shadow: 0px 1px 5px 0px rgba(221, 221, 221, 0.5);
    border-radius: 4px;
    margin: 0 0 15px 0;
    .case-card-note-content {
      display: flex;
      align-items: center;
      padding: 6px 0px 6px 16px;
    }
    .case-left {
      width: 50px;
      text-align: left;
      position: relative;
    }
    .case-right {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
      width: 0;
      .title {
        color: #333;
        font-size: 14px;
      }
      .name {
        font-size: 12px;
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
.inquriyStyle {
  position: absolute;
  top: 12px;
  right: 0;
  border-radius: 20px 20px 0px 20px;
  color: #fff;
  font-size: 12px;
  line-height: normal;
  height: 21px;
  display: flex;
  align-items: center;
  padding: 2px 9px;
  justify-content: center;
  &.returnVisit {
    background: #fa8c16;
  }
  &.inquiry {
    background: $primary;
  }
}
/deep/ .van-image-preview__index {
  top: 24px;
}

/deep/ .van-image-preview__cover {
  position: absolute;
  top: 24px;
  left: 24px;

  .van-button--round {
    border-radius: 50%;
    width: 26px;
    height: 26px;
    padding: 0;

    display: flex;
    justify-content: center;
    align-items: center;

    color: #2a2a2a;
    background-color: #999999;
    border: 1px solid #999999;

    .van-button__icon {
      line-height: 1;
    }
  }
}

.footer {
  width: 100%;
  padding: 15px 15px;
  height: 77px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  position: fixed;
  bottom: 0;
  left: 0;
}

.module-item {
  border-bottom: 1px solid #e8e8e8;
  .module-item-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    .module-item-more {
      color: #999;
      font-weight: normal;
      padding-top: 10px;
    }
  }
  &:last-child {
    border-bottom: 0;
  }
}
.brief-right.checked {
  color: #333;
}
.bb {
  height: 1px;
  background: #e8e8e8;
}
.page {
  min-height: 100%;
  background-color: #f5f5f5;
}
.consult-detatil {
  background-color: #f5f5f5;
  color: #333;
  min-height: 100%;
  padding: 5px 10px 77px;
  box-sizing: border-box;
  .module {
    border-radius: 3px;
  }
  .module {
    background: #fff;
    margin-top: 0;
    margin-bottom: 10px;
    padding: 10px;
    &:last-child {
      margin-bottom: 5px;
    }
    &.info {
      padding: 0;
    }
    &.top {
      padding-top: 12px;
      padding-bottom: 12px;
    }
    &.order {
      padding: 5px 15px;
      .b {
        padding-left: 0 !important;
      }
      .form-dl {
        padding: 4px 0;
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
        align-items: center;
        &.start {
          align-items: flex-start;
        }
        span {
          flex: 1;
          text-align: justify;
          text-align-last: justify;
          padding-right: 3px;
          height: 16px;
          line-height: 16px;
          &::after {
            content: ' ';
            display: inline-block;
            width: 100%;
            height: 0px;
          }
        }
      }
      .form-dd {
        color: #333;
        text-align: left;
        padding-left: 2px;
      }
    }
    &.message {
      .message-item {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 13px;
        height: 26px;
        .message-item-left {
          width: 30%;
          color: #999;
        }
        .message-item-right {
          width: 70%;
          text-align: right;
          color: #333;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-align: right;
        }
      }
    }
    .cancelText {
      height: 45px;
      background: rgba(240, 252, 250, 1);
      border-radius: 2px;
      margin: 10px 0 0 0;
      font-size: 12px;
      color: rgba(0, 198, 174, 1);
      line-height: 16px;
      padding: 6px 22px 0px 55px;
      background: rgba(240, 252, 250, 1) url('../../assets/images/icons/ic_notice.png') no-repeat;
      background-size: 17px 17px;
      background-position: 15px 14px;
    }
    .waitText {
      padding: 10px 15px;
      // width: 100%;
      box-sizing: border-box;
      background: rgba(240, 252, 250, 1);
      border-radius: 2px;
      margin: 10px 0 0 0;
      .cancelText {
        height: 27px;
        line-height: 27px;
        padding: 0;
        margin: 0;
        border: 0;
        padding-left: 40px;
        background-position: 0px 5px;
      }
      .wait-img {
        height: 42px;
        width: calc(100% - 2px);
        margin-left: 1px;
        margin-top: 6px;
        display: block;
      }
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
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .img {
        width: 57px;
        height: 57px;
        background: #ccc;
        margin: 5px 10px 5px 0;
        &:nth-child(5n) {
          margin-right: 0 !important;
        }
        img {
          width: 57px;
          height: 57px;
          display: block;
        }
      }
    }
  }
  .typeTag {
    width: 36px;
    height: 22px;
    border-radius: 10px 10px 10px 0;
    line-height: normal;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 12px;
    font-weight: 400;
    margin-left: 5px;
  }
  .typeTag.zx {
    background-color: #00c6ae;
  }
  .typeTag.fz {
    background-color: #fa8c16;
  }
  .module .strong {
    font-weight: 600;
    font-size: 18px;
    line-height: 21px;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
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
    position: relative;
  }
  .b {
    display: block;
    font-weight: bold;
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
  .b {
    padding: 10px 15px 0 15px;
  }
  .span {
    padding: 10px 15px 10px 0;
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
    display: flex;
    align-items: center;
    padding-left: 8px;
    font-weight: 600;
    span {
      font-weight: 400;
      color: #999;
      font-size: 12px;
    }
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
.brief {
  font-size: 13px;
  color: #999;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12.5px 0;
  margin: 0 15px;
  border-top: 1px solid #eee;
  &.order-money {
    border-top: 1px solid #fff;
    color: #000;
    padding: 12.5px 10px;
    margin: 0;
    .money {
      font-size: 14px;
      color: #000;
    }
  }
  &.pay-omney {
    color: #000;
    padding: 11px 0;
    font-size: 14px;
    .money {
      font-size: 20px;
      color: #ff344d;
    }
  }
}
.tipStyle {
  color: #ff344d;
  padding-left: 10px;
  font-size: 12px;
}
</style>
