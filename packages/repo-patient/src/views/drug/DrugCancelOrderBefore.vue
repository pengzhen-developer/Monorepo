<template>
  <div class="drugs-container">
    <div class="content">
      <!-- 药店信息 -->
      <div class="drug-store">
        <van-image :src="info.drugStoreLogo"
                   class="logo"></van-image>
        <div class="title">{{info.drugStoreName}}</div>
      </div>
      <!-- 药品信息 -->
      <DrugList v-bind:info="info"
                v-bind:totalMoney="totalMoney"
                v-bind:showMore="true"
                v-bind:showInstructions="false"
                v-bind:onlyWatch="true"></DrugList>
      <!-- 申请退款 -->
      <van-cell-group class="refund">
        <van-cell title="退款原因"
                  v-bind:value="selectMsg||'请选择'"
                  v-on:click="showRefundDialog"
                  is-link></van-cell>
        <van-field v-if="canShowLimit"
                   v-model="cancelReason"
                   v-on:input="changeLimitNum"
                   label="取消原因"
                   type="textarea"
                   class="textarea"
                   rows="3"
                   autosize
                   maxlength="50"
                   show-word-limit
                   placeholder="请输入补充说明">
        </van-field>
        <van-cell title="退款金额"
                  v-bind:value="payMoney"></van-cell>
        <div class="tip">商家同意取消订单后，系统将为您返还实付金额，医保/商保支付金额原路返还。</div>
      </van-cell-group>
    </div>
    <div class="footer">
      <peace-button class="pay-btn btn-pay"
                    v-bind:disabled="!hasSelected"
                    @click="submit"
                    round
                    size="large"
                    type="primary"
                    throttle
                    v-bind:throttleTime="3000">
        提交
      </peace-button>
    </div>
    <!-- 退款理由 -->
    <van-popup v-model="refundDialog.visible"
               @click-overlay="cancel"
               position="bottom"
               round>
      <div class="wrapper"
           @click.stop>
        <div class="header">退款原因</div>
        <van-radio-group v-model="refundDialog.selectMsg">
          <van-radio :name="item.value"
                     checked-color="#00C6AE"
                     v-for="(item,index) in info.cancelReasonList"
                     v-bind:key="index">{{item.value}}</van-radio>
        </van-radio-group>

        <van-button size="large"
                    round
                    v-on:click="save">确定</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import peace from '@src/library'

import DrugList from './components/DrugList'
export default {
  name: 'drugCancelOrderBefore',
  components: { DrugList },
  data() {
    return {
      selectMsg: '',
      refundDialog: {
        visible: false,
        selectMsg: ''
      },
      cancelReason: '',
      limitElement: null,
      info: {}
    }
  },
  computed: {
    totalMoney() {
      return this.info && this.formatMoney(this.info.payMoney)
    },
    payMoney() {
      return this.info && `￥${this.formatMoney(this.info.payMoney)}`
    },
    hasSelected() {
      return this.selectMsg && (this.selectMsg !== '其他' || (this.selectMsg === '其他' && this.cancelReason)) ? true : false
    },
    canShowLimit() {
      return this.selectMsg === '其他' ? true : false
    },
    limitNum() {
      return 50 - this.cancelReason.length
    }
  },
  watch: {
    canShowLimit: {
      handler(val) {
        if (val) {
          this.$nextTick(() => {
            const element = document.querySelector('.van-field__word-limit')
            if (element) {
              const children = element.childNodes
              element.removeChild(children[children.length - 1])
            }
            this.limitElement = document.querySelector('.van-field__word-num')
          })
        }
      },
      immediate: true
    },
    limitElement: {
      handler(val) {
        if (val) {
          val.innerHTML = this.limitNum
        }
      },
      immediate: true
    }
  },
  activated() {
    this.getDrugOrderDetail()
  },
  methods: {
    formatMoney(n) {
      return n ? (n - 0).toFixed(2) : '0.00'
    },
    changeLimitNum() {
      this.limitElement.innerHTML = this.limitNum
    },
    showRefundDialog() {
      this.refundDialog.visible = true
    },
    colseRefundDialog() {
      this.refundDialog.visible = false
    },
    submit() {
      if (!this.refundDialog.selectMsg) {
        return peace.util.alert('请输入或填写取消原因')
      }
      if (this.selectMsg == '其他' && !this.cancelReason.trim()) {
        return peace.util.alert('请填写取消原因')
      }
      const reason = this.selectMsg !== '其他' ? this.selectMsg : this.cancelReason
      //canceType   1手动取消2自动取消
      const params = {
        orderNo: this.info.orderNo,
        reason: reason,
        canceType: 1
      }
      peace.service.purchasedrug
        .CancelOrder(params)
        .then((res) => {
          peace.util.alert(res.msg)
        })
        .finally(() => {
          const json = peace.util.encode({ orderNo: this.info.orderNo })
          this.$router.replace(`/drug/drugCancelOrder/${json}`)
        })
    },
    save() {
      this.refundDialog.visible = false
      this.selectMsg = this.refundDialog.selectMsg
    },
    cancel() {
      this.refundDialog.visible = false
    },
    getDrugOrderDetail() {
      const params = peace.util.decode(this.$route.params.json)
      peace.service.purchasedrug.SelectOrderDetApi(params).then((res) => {
        this.info = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
// 安卓手机 fixed定位会被软键盘顶起导致布局紊乱
//2021-02-01
//解决方案  container min-height 100% + flex布局  conent flex:1  footer不用绝对定位
.drugs-container {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  .content {
    flex: 1;
    margin-bottom: 2px;
  }
}
.drug-store {
  width: calc(100% - 16px);
  margin-left: 16px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(51, 51, 51, 0.05);
  > .van-image {
    width: 32px;
    height: 32px;
    border-radius: 4px;
    margin: 8px 8px 8px 0;
  }
  > .title {
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    width: calc(100% - 50px);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
.refund {
  border-top: 8px solid rgba(51, 51, 51, 0.05);
  &::after {
    border-bottom: 0;
  }
  .tip {
    padding: 4px 16px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(76, 76, 76, 0.4);
    line-height: 20px;
  }
}
.footer {
  width: 100%;
  background: #fff;
  box-shadow: 0px -1px 1px 0px rgba(51, 51, 51, 0.16);
  padding: 8px 16px 24px;
  .van-button--disabled {
    opacity: 0.6;
  }
}
.van-popup--bottom.van-popup--round {
  border-radius: 16px 16px 0px 0px;
  box-shadow: 0px 0px 8px 0px rgba(51, 51, 51, 0.16);
  height: 299px;
}
.wrapper {
  padding: 0 16px;
  .header {
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
    line-height: 24px;
    width: 100%;
    text-align: center;
    padding: 20px 0;
  }
  .van-radio-group {
    padding: 15px 0 16px 0;
    .van-radio {
      padding: 12px 0 11px 0;
      border-bottom: 1px solid rgba(51, 51, 51, 0.05);
      .van-radio__label {
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        line-height: 24px;
      }
    }
  }
  > .van-button {
    color: $primary;
    background: rgba(51, 51, 51, 0.05);
  }
}

/deep/.van-field {
  &.textarea {
    flex-wrap: wrap;
    &::after {
      border-bottom: 0;
    }
    .van-field__label {
      width: 100%;
      margin: 0 0 11px 0;
    }
    .van-field__value {
      width: 100%;
      background: rgba(51, 51, 51, 0.05);
      border-radius: 8px;
      padding: 8px;
      line-height: 24px;
      font-size: 16px;
      /deep/textarea {
        word-break: break-all;
        position: relative;
        z-index: 20;
      }
      /deep/.van-field__word-limit {
        position: relative;
        .van-field__word-num {
          position: absolute;
          z-index: 10;
          right: -2px;
          bottom: 0px;
          font-size: 100px;
          font-weight: bold;
          color: #333333;
          opacity: 0.05;
          line-height: 74px;
          font-family: DINAlternate-Bold, DINAlternate;
        }
      }
    }
  }
}
</style>