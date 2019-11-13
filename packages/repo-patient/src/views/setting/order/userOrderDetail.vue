<template>
  <div v-if="info.orderInfo">
    <!--TOP-->
    <div class="module nmg">
      <div class="strong">
        {{page.statusDic[info.orderInfo.orderType][info.orderInfo.orderStatus].text}} <span
              class="money"
              v-if="info.orderInfo.orderStatus == '1'">¥{{info.orderInfo.orderMoney}}</span></div>

      <div class="brief"
           v-if="info.orderInfo.orderStatus != '2'">
        {{page.statusDic[info.orderInfo.orderType][info.orderInfo.orderStatus].small}}{{info.orderInfo.orderStatus == '3' ? '，' + page.cfgDic[info.orderInfo.cancelType] : ''}}
      </div>
      <div class="brief"
           v-else>{{info.orderInfo.cancelReason}}</div>
      <div class="cancelText"
           v-if="(info.orderInfo.orderStatus == '6' || info.orderInfo.orderStatus == '4') && info.orderInfo.payMoney != '0.00'">
        订单取消后退款将在1-3个工作日内原路返回，请注意查收</div>
      <div class="module-body">
        <div :class="['label', info.orderInfo.cancelState ? '' : 'disabled']"
             @click="canselOrder"
             v-if="info.orderInfo.orderStatus == '3'">
          {{info.orderInfo.cancelState ? '申请退号' : page.cfgDic[info.orderInfo.cancelType]}}</div>
      </div>
    </div>
    <!--医生名片-->
    <div class="card pd">
      <div class="card-avatar avatar-circular">
        <img :src="info.doctorInfo.avartor || info.doctorInfo.doctorAvartor"
             class />
      </div>
      <div class="card-body">
        <div class="card-name">
          {{info.doctorInfo.name || info.doctorInfo.doctorName}}
          <div class="card-small">
            {{info.doctorInfo.doctorTitle}}
            {{info.doctorInfo.deptName}}
            <!--                        <div class="label label-private" wx:if="{{info.doctorInfo.isPrivateDoctor}}">私人医生</div>-->
          </div>
        </div>
        <div class="card-small">{{info.doctorInfo.hospitalName}}</div>
      </div>
    </div>
    <!--订单内容-->
    <!--            -->
    <div class="order">
      <div class="dl-addr">
        <div class="dt">就诊医院</div>
        <div class="dd">{{info.doctorInfo.hospitalName}}</div>
      </div>
      <div class="dl-addr">
        <div class="dt">就诊科室</div>
        <div class="dd">{{info.doctorInfo.deptName}}</div>
      </div>
      <div class="dl-addr">
        <div class="dt">门诊时间</div>
        <div class="dd blue">{{info.doctorInfo.outpatientDate}}</div>
      </div>
      <div class="dl-addr">
        <div class="dt">门诊类型</div>
        <div class="dd">{{info.doctorInfo.outpatientType}}</div>
      </div>
      <div class="dl-addr">
        <div class="dt">费 用</div>
        <div class="dd">￥{{info.doctorInfo.fee}}(挂号费)</div>
      </div>
    </div>
    <!--        就诊人-->
    <div class="form-dl">
      <div class="form-dt">就诊人</div>
      <div class="form-dd">{{info.doctorInfo.familyName}}/{{info.doctorInfo.diagnoseType}}</div>
    </div>
    <!--订单报文-->
    <div class="module pdtb"
         :style="{ paddingBottom :info.orderInfo.orderStatus == 1 ? '60px' : 0 }">
      <div class="dl-packet">
        <div class="dt">订单号码</div>
        <div class="dd">{{info.orderInfo.orderNo}}</div>
      </div>
      <div class="dl-packet">
        <div class="dt">订单金额</div>
        <div class="dd">{{info.orderInfo.orderMoney}}元</div>
      </div>
      <div class="dl-packet">
        <div class="dt">订单时间</div>
        <div class="dd">{{info.orderInfo.orderDate}}</div>
      </div>
    </div>
    <!-- 待支付 -->
    <div class='bottom'
         v-if="info.orderInfo.orderStatus == '1' ">
      <div class="left">应付金额：<span class="money">¥{{info.orderInfo.orderMoney}}</span></div>
      <div class="right">
        <div class="pay cancel"
             @click="canselOrder">
          取消订单
        </div>
        <div class="pay"
             @click="goToPay(info)">继续支付</div>
      </div>
    </div>
    <div class="module pdtb"
         v-else>
      <!-- 订单取消的情况 -->
      <template v-if="info.orderInfo.orderStatus == '2'">
        <!--- 支付过 -->
        <div class="brief right" v-if="info.orderInfo.payMoney != 0 ">
          实付金额 ：
          <div class="money">{{info.orderInfo.payMoney}}</div>
        </div>
         <!-- 没有支付, 显示应付金额 -->
        <div class="brief right" v-else>
          <template v-if="info.orderInfo.orderMoney == 0">
            实付金额：
          </template>
          <template v-else>
            应付金额：
          </template>
          <div class="money">{{info.orderInfo.orderMoney}}</div>
        </div>
      </template>
      <!-- 其它情况 -->
      <template v-else>
        <div class="brief right">
          实付金额 ：
          <div class="money">{{info.orderInfo.payMoney}}</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import peace from '@src/library'
import { Dialog } from 'vant'

export default {
  props: {},
  data() {
    return {
      orderStatus: [
        {
          code: 1
        }
      ],
      sending: false,
      page: {
        statusDic: {
          register: {
            1: {
              text: '待支付',
              small: '15分钟内未付款，订单将自动取消'
            },
            2: {
              text: '已取消',
              small: '已通知医生尽快接诊，12小时未接诊将自动'
            },
            3: {
              text: '预约成功',
              small: '请按时入院就诊，过号无效'
            },
            4: {
              text: '已完成',
              small: '若未到院就诊，请到医院办理退号退款手续'
            },
            5: {
              text: '已退号',
              small: '退号成功，如需就诊请重新预约'
            },
            6: {
              text: '退款中',
              small: '已为您发起退款，到账时间以微信为准'
            },
            7: {
              text: '已退款',
              small: '退款已完成。祝您健康！'
            }
          }
        },
        cfgDic: {
          1: '已生效号源不可退',
          2: '1天内号源不可退',
          3: '3天内号源不可退'
        }
      },
      info: {},
      data: {},
      params: {}
    }
  },
  created() {
    this.params = peace.util.decode(this.$route.params.json)
    this.getData()
  },
  methods: {
    goToPay(data) {
      //debugger;
      let doctorId = data.doctorInfo.doctorId
      let order = data.orderInfo
      let money = order.orderMoney
      let typeName = '预约挂号'
      let doctorName = data.doctorInfo.doctorName
      let orderNo = order.orderNo
      let json = { money, typeName, doctorName, orderNo, doctorId }
      json = peace.util.encode(json)
      this.$router.push(`/components/doctorInquiryPay/${json}`)
    },
    getData() {
      peace.service.patient
        .getOrderDetail({
          orderNo: this.params.orderInfo.orderNo,
          orderType: this.params.orderInfo.orderType
        })
        .then(res => {
          this.info = res.data || {}
        })
    },
    canselOrder() {
      if (!this.info.orderInfo.cancelState && this.info.orderInfo.orderStatus !=1) {
        return
      }
      let type, alertMsg
      if (this.info.orderInfo.orderStatus == 1) {
        type = 'cancel'
        alertMsg = '是否确认取消'
      } else {
        type = 'quit'
        alertMsg = '是否确认退号'
      }
      Dialog.confirm({
        message: alertMsg
      })
        .then(() => {
          peace.service.appoint
            .orderCancel({
              orderNo: this.info.orderInfo.orderNo,
              type
            })
            .then(res => {
              peace.util.alert(res.msg || '退号成功')
              this.getData()
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
.van-button--normal {
  border-radius: 20px;
}
.bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(238, 238, 238, 1);
  display: flex;
  align-items: center;
  padding: 0 15px;
  justify-content: space-between;
  .money {
    font-size: 20px;
    color: rgba(255, 52, 77, 1);
  }
  .right {
    display: flex;
  }
  .pay {
    width: 75px;
    height: 30px;
    background: rgba(0, 198, 174, 1);
    border-radius: 2px;
    font-size: 13px;
    color: rgba(255, 255, 255, 1);
    line-height: 30px;
    text-align: center;
    margin-left: 10px;
    &.cancel {
      border: 1px solid rgba(204, 204, 204, 1);
      background: #fff;
      color: rgba(153, 153, 153, 1);
    }
  }
}
.dl-addr {
  font-size: 14px;
  .dd {
    color: #666;
    text-align: right;
    flex: 1;
    &.blue {
      color: #00c6ae;
    }
  }
}
.form-dl {
  border-bottom: 1px solid #f5f5f5;
  .form-dt {
    font-size: 14px;
  }
  .form-dd {
    flex: 1;
    text-align: right;
    font-size: 14px;
  }
}
.order {
  padding: 10px 15px;
  border-bottom: 10px solid #f5f5f5;
}
.nmg {
  margin-top: 0;
  border-bottom: 10px solid #f5f5f5;
}
.card.pd {
  margin: 0;
  padding: 5px;
  border-bottom: 1px solid #f5f5f5;
}
.module .strong {
  font-weight: 600;
  font-size: (36px/2);
  line-height: (36px/2);
  padding: (20px/2) (30px/2);
}
.module .cancelText {
  height: 45px;
  background: rgba(240, 252, 250, 1);
  border-radius: 2px;
  margin: 10px 15px 0 15px;
  font-size: 12px;
  color: rgba(0, 198, 174, 1);
  line-height: 16px;
  padding: 6px 10px 0px 50px;
  background: rgba(240, 252, 250, 1) url('../../../assets/images/icons/ic_notice.png') no-repeat;
  background-size: 17px 17px;
  background-position: 20px 13px;
}
.module .brief {
  font-size: (26px/2);
  padding: 0 (30px/2);
}
.module .small {
  font-size: (30px/2);
  padding: (20px/2) (30px/2);
}

.module .module-body {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  justify-content: space-between;
  padding: (20px/2);
}
.module-body .label {
  flex: 1;
  text-align: center;
  font-size: (26px/2);
  padding: (16px/2) (24px/2);
  margin: (10px/2);
  border-radius: (40px/2);
  &.disabled {
    background: #eeeeee;
    border-color: #eeeeee;
    color: #999;
  }
}
.card {
  background: #fff;
  padding: (20px/2) (30px/2);
}
.b {
  display: block;
  font-weight: 600;
}
.b,
.span,
.ul {
  padding: (20px/2) (30px/2) 0 (30px/2);
}

.dl-packet {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  justify-content: space-between;
  align-content: center;
  color: #999;
  font-size: (26px/2);
}
.dl-packet .dt {
  flex: 0 0 auto;
  width: 130px;
  padding: (10px/2) (30px/2);
}
.dl-packet .dd {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: right;
  padding: (10px/2) (30px/2);
}
.pdtb {
  padding: (20px/2) 0;
  border-top: 10px solid #f5f5f5;
}
.right {
  text-align: right;
}
.money {
  color: #f2223b;
  font-size: (36px/2);
  display: inline;
  padding-left: (15px/2);
}
.ul {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  padding-bottom: 15px;
}
.ul .li {
  flex: 0 0 auto;
  width: (90px/2);
  height: (90px/2);
  margin-right: (25px/2);
  border: (2px/2) solid #e5e5e5;
  padding: (10px/2);
}
.label.label-private {
  font-size: (16px/2);
  padding: (2px/2) (4px/2);
  border-radius: (5px/2);
  color: #f7e9b3;
  background: #504c4f;
  border-color: #504c4f;
  vertical-align: text-top;
  margin-top: (5px/2);
}
</style>
