<template>
  <div>
    <van-action-sheet title="请输入交易密码"
                      class="acSheet"
                      v-model="payShow">
      <div class="black">
        <div>{{payType.name}}</div>
        <div class="l">
          {{payType.key == 'cash' || payType.key == 'recharge'  ? '￥' : ''}}{{money}}{{payType.key != 'cash' && payType.key != 'recharge' ? 'DC' : ''}}
        </div>
      </div>
      <van-password-input :value="password"
                          :mask="false"
                          :length="6"
                          :gutter="5" />
      <div class="green"
           @click="goPasswordSubmitPage">忘记密码？点我找回并完成支付</div>
      <van-number-keyboard :show="payShow"
                           @input="onInput"
                           @delete="onDelete"
                           class="keyboard" />
    </van-action-sheet>
  </div>
</template>

<script>
import peace from '@src/library'

export default {
  props: {
    type: {
      type: [Number, String],
      default() {
        return 0
      }
    },
    show: {
      type: Boolean,
      default() {
        return false
      }
    },
    money: {
      type: Number,
      default() {
        return 0
      }
    },
    params: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      data: {},
      // params: {},
      payTypeDic: {
        0: {
          name: '订单金额',
          key: 'consult'
        }, // 咨询支付
        1: {
          name: '服务充值',
          key: 'recharge'
        }, // 充值
        2: {
          name: '服务提现',
          key: 'cash'
        }, // 提现
        3: {
          name: '转出通证',
          key: 'rechange'
        }, // 转账
        4: {
          name: '金额',
          key: ''
        }
      },
      payType: undefined,
      password: '',
      payShow: false,
      // payTotal: undefined,
      loading: false,
      isSetPwd: false
    }
  },
  created() {
    this.payType = this.payTypeDic[this.type]
  },
  methods: {
    getIsSetPwd() {
      peace.service.dc.isSetPwd().then(res => {
        if (!res.data.isWallet) {
          peace.util.alert('您尚未开通钱包支付')
          this.goWalletCreatPage()
          return
        }
        if (!res.data.authStatus) {
          peace.util.alert('请先通过实名认证')
          this.goAddFamilyPage()
          return
        }
        if (!res.data.isSetPwd) {
          peace.util.alert('请先设置交易密码')
          this.goPasswordSubmitPage()
          return
        }
      })
    },
    goWalletCreatPage() {
      this.$router.replace({
        name: '/blockchains/blockchainsIndex',
        params: {
          link: 'PasswordPay'
        }
      })
    },
    goAddFamilyPage() {
      this.$router.replace({
        name: peace.config.system.identityVerificationPage,
        params: {
          link: 'PasswordPay'
        }
      })
    },
    goPasswordSubmitPage() {
      debugger
      let bool = this.isSetPwd,
        order = this.setOrder(this.type)
      this.$router.push({
        name: '/blockchains/password/blockchainsPasswordSubmit',
        params: {
          link: 'PasswordPay',
          title: !bool ? '设置交易密码' : '重置交易密码',
          order
        }
      })
    },
    setOrder(type) {
      switch ('_' + type) {
        case '_3':
          return {
            type: 3,
            transferDc: this.money,
            receiverWalletAddress: this.params.address,
            payPwd: '',
            remark: this.params.remark
          }
        case '_2':
          return {
            type: 2,
            payeeName: this.params.payeeName,
            bankName: this.params.bankName,
            cardNo: this.params.cardNo,
            money: this.money,
            payPwd: ''
          }
        case '_0':
          return {
            type: 0,
            orderNo: this.params.orderNo,
            payPwd: ''
          }
        default:
          return {}
      }
    },
    onInput(key) {
      if (this.loading) {
        return
      }
      this.password = (this.password + key).slice(0, 6)
    },
    onDelete() {
      if (this.loading) {
        return
      }
      this.password = this.password.slice(0, this.password.length - 1)
    },
    goPay() {
      if (this.type == 1) {
        // 充值 [充值不需要输入密码]
        this.createOrder()
      }
      if (this.type == 2) {
        // 提现
        this.apply()
      }
      if (this.type == 3) {
        // 转账
        this.toUsere()
      }
      if (this.type == 0) {
        // 订单支付
        this.payment()
      }
    },
    apply() {
      peace.service.dc
        .apply({
          payeeName: this.params.payeeName,
          bankName: this.params.bankName,
          cardNo: this.params.cardNo,
          money: this.money,
          payPwd: this.password
        })
        .then(res => {
          peace.util.alert(res.msg)
          this.loading = false
          this.$emit('onCallback', { success: true, data: res.data })
        })
        .finally(() => {
          this.password = ''
          this.loading = false
        })
    },
    payment() {
      peace.service.dc
        .payment({
          orderNo: this.params.orderNo,
          payPwd: this.password
        })
        .then(res => {
          peace.util.alert(res.msg)
          this.loading = false
          this.$emit('onCallback', { success: true, data: res.data })
        })
        .finally(() => {
          this.password = ''
          this.loading = false
        })
    },
    createOrder() {
      peace.service.dc
        .createOrder({
          orderMoney: this.money,
          paymentType: 'wxpay'
        })
        .then(res => {
          peace.util.alert(res.msg)
          this.loading = false
          this.$emit('onCallback', { success: true })
        })
        .finally(() => {
          this.password = ''
          this.loading = false
        })
    },
    toUsere() {
      peace.service.dc
        .toUsere({
          transferDc: this.money,
          receiverWalletAddress: this.params.address,
          payPwd: this.password,
          remark: this.params.remark
        })
        .then(res => {
          peace.util.alert(res.msg)
          this.loading = false
          this.$emit('onCallback', { success: true, data: res.data })
        })
        .finally(() => {
          this.password = ''
          this.loading = false
        })
    }
  },
  watch: {
    password(val) {
      // console.log(this.params, this.payType)
      if (val && val.length == 6) {
        this.loading = true
        this.goPay()
      }
    },
    payShow(val) {
      if (!val) {
        this.password = ''
        this.$emit('onCallback', { payShow: val })
      }
    },
    show(val) {
      this.payShow = val
      val && this.getIsSetPwd()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@src/views/style/style.css';
.acSheet {
  min-height: 500px;
  .black {
    padding-top: 20px;
    text-align: center;
    font-size: 13px;
    .l {
      margin: 10px;
      font-weight: bold;
      font-size: 20px;
    }
  }
  .van-password-input {
    width: 80%;
    margin: 0 auto;
    padding: 20px 10px 0;
    .van-password-input__security {
      height: 40px;
    }
    li {
      border: 1px solid #d8d8d8;
      width: 40px;
      line-height: 40px;
      /*height: 40px;*/
    }
  }
  .green {
    margin: 10px;
    font-size: 13px;
    color: #00c6ae;
    text-align: center;
  }
  .keyboard {
    max-height: 216px;
  }
}
</style>