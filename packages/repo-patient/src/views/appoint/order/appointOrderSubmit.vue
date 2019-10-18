<template>
  <div>
    <!--        医生信息-->
    <div class="card">
      <div class="card-avatar avatar-circular">
        <img :src="doctorInfo.avartor" class />
      </div>
      <div class="card-body">
        <div class="card-name">
          {{doctorInfo.name}}
          <div class="card-small">{{doctorInfo.doctorTitle}} {{doctorInfo.deptName}}</div>
        </div>
      </div>
    </div>
    <div class="order">
      <div class="dl-addr">
        <div class="dt">就诊医院</div>
        <div class="dd">{{doctorInfo.hospitalName}}</div>
      </div>
      <div class="dl-addr">
        <div class="dt">就诊科室</div>
        <div class="dd">{{doctorInfo.deptName}}</div>
      </div>
      <div class="dl-addr">
        <div class="dt">门诊时间</div>
        <div
          class="dd blue"
        >{{date.year}}-{{date.date}} {{date.week}} {{source.type == 'AM' ? '上午' : source.type == 'PM' ? '下午' :''}} {{source.startTime}}-{{source.endTime}}</div>
      </div>
      <div class="dl-addr">
        <div class="dt">门诊类型</div>
        <div class="dd">{{source.sourceLevelType == 1 ? '普通门诊' : source.sourceLevelType == '2' ? '专家门诊' : ''}}</div>
      </div>
      <div class="dl-addr">
        <div class="dt">费 用</div>
        <div class="dd">￥{{source.unitPrice}}(挂号费)</div>
      </div>
    </div>
    <div class="order-check">
      <div class="form-dl">
        <div class="form-dt">就诊人</div>
        <div @click="showFmlDicFn" class="form-dd icon-next">{{ fml.name || '请选择'}}</div>
        <van-action-sheet :actions="fmlDic" @cancel="showFmlDic = false" @select="fmlConfirm" cancel-text="取消" v-model="showFmlDic" />
      </div>
      <div class="form-dl">
        <div class="form-dt">初/复诊</div>
        <div @click="showZdDic = true" class="form-dd icon-next">{{order.zdType}}</div>
        <van-popup position="bottom" v-model="showZdDic">
          <van-picker :columns="zdDic" @cancel="showZdDic = false" @confirm="zdConfirm" show-toolbar title="初/复诊" />
        </van-popup>
      </div>
      <div class="form-dl">
        <div class="form-dt">支付方式</div>
        <div class="form-dd">在线支付</div>
      </div>
    </div>

    <div class="faq">
      <p>我已了解并同意以下规则</p>
      <ul>
        <li>· 停诊将短信通知，请保持手机畅通；</li>
        <li>· 实名制预约，就诊人信息不符将无法取号；</li>
      </ul>
    </div>
    <div class="fixed-bottom">
      <div :class="['btn','btn-blue', 'block', showBtn ? '' : 'disabled']" @click="submitOrder">提交</div>
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
      params: {},
      data: {},
      doctorInfo: {},
      date: {},
      order: {
        zdType: '初诊'
      },
      fml: {
        name: ''
      },
      fmlDic: [],
      showFmlDic: false,
      zdDic: ['初诊', '复诊'],
      showZdDic: false,
      fmlList: [],
      showBtn: true
    }
  },
  created() {
    this.params = peace.util.decode(this.$route.params.json)
    this.source = this.params.source
    this.doctorInfo = this.params.doctorInfo
    this.date = this.params.date
    console.log(this.params)
    this.initFml();
  },
  methods: {
    initFml(){
      peace.service.patient.getMyFamilyList().then(res => {
        this.fmlList = res.data || []
        this.fml = this.fmlList[0] || {}
        this.fmlDic =
                this.fmlList.map(item => {
                  return {
                    name: item.name,
                    subname: '(' + item.relation + ')'
                  }
                }) || []
      })
    },
    zdConfirm(val) {
      this.order.zdType = val
      this.showZdDic = false
    },
    showFmlDicFn() {
      peace.service.patient.getMyFamilyList().then(res => {
        this.fmlList = res.data || []
        this.fmlDic =
                this.fmlList.map(item => {
                  return {
                    name: item.name,
                    subname: '(' + item.relation + ')'
                  }
                }) || [];

        if (this.fmlList.length) {
          this.showFmlDic = true
        } else {
          peace.util.alert('请先前往个人中心添加就诊人')
        }

      })
    },
    fmlConfirm(item, index) {
      this.fml = this.fmlList[index]
      this.showFmlDic = false
    },
    submitOrder() {
      let data = {
        sourceCode: this.source.sourceCode,
        doctorId: this.doctorInfo.doctorId,
        familyId: this.fml.familyId,
        familyName: this.fml.name,
        idcard: this.fml.idcard,
        sourceDate: this.date.year + '-' + this.date.date,
        week: this.date.week,
        AMPM: this.source.type,
        bookingStart: this.source.startTime,
        bookingEnd: this.source.endTime,
        unitPrice: this.source.unitPrice,
        sourceLevelType: this.source.sourceLevelType,
        diagnoseType: this.order.zdType == '初诊' ? 1 : '2',
        departmentName: this.doctorInfo.deptName
      }

      if (!data.familyId) {
        this.showFmlDicFn()
        return
      }

      if (!this.showBtn) {
        peace.util.alert('请勿重复提交')
        return;
      }
      this.getOrderSubmit(data)
    },
    getOrderSubmit(data) {
      this.showBtn = false;
      peace.service.appoint
        .orderSubmit(data)
        .then(res => {
          if(res.data.orderInfo.orderMoney == '0.00' || res.data.orderInfo.orderMoney == '0') {
            let orderType = 'register';
            let orderNo = res.data.orderInfo.orderNo
            let json = peace.util.encode({ orderInfo: { orderNo, orderType } })
            this.showBtn = true;
            this.$router.push(`/setting/order/userOrderDetail/${json}`)
          } else {
            this.goToPay(res.data);
            this.showBtn = true;
          }
        })
        .catch(res => {
          //debugger
          this.showBtn = true;
          Dialog.alert({
            title: '预约失败',
            message: res.data.msg
          }).then(() => {
            this.$router.go(-1)
          })
        })
    },
    goToPay(data) {
      this.showBtn = false
      //debugger;
      let {doctorName,doctorId} = data.doctorInfo;
      let {orderNo, orderMoney} = data.orderInfo;
      let typeName = '预约挂号';
      let money = orderMoney;
      let json = {money, typeName, doctorName, orderNo, doctorId};
      json = peace.util.encode(json);
      this.$router.push(`/components/doctorInquiryPay/${json}`);
      // let json = peace.util.encode({
      //   orderInfo: data.orderInfo
      // })
      // this.$router.push(`/setting/order/userOrderDetail/${json}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  padding: 0px 10px;
  border-bottom: 1px solid #f5f5f5;
  .card-body {
    align-self: center;
  }
}
.dl-addr {
  font-size: 14px;
  margin: 10px 15px;
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
    font-size: 14px;
  }
}
.order {
  padding-bottom: 5px;
}
.order-check {
  border-top: 10px solid #f5f5f5;
}
.faq {
  font-size: 11px;
  padding: 10px 20px;
  margin-bottom: 70px;
  p {
    color: #333;
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      color: #999;
    }
  }
}
</style>
