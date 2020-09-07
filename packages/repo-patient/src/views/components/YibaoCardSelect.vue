<template>

  <van-popup v-model="show"
             :class="{'selected':selected}"
             @click-overlay="changeFlag"
             round
             :position="position">
    <van-image class="close"
               @click="changeFlag"
               :src="require('@src/assets/images/ic_close@2x.png')"></van-image>
    <div class="header">请选择本单是否使用医保卡</div>
    <van-cell center
              class="switch-out"
              :class="{'disabled':selected}"
              title="是否使用医保卡">
      <template #right-icon
                v-if="!selected">
        <van-switch v-model="checked"
                    active-color="#00C6AE"
                    inactive-color="#cccccc"
                    size="20" />
      </template>
      <template v-else>
        <!-- :class="{'disabled':!checked}" class="text" -->
        <div>{{checked?'使用':'不使用'}}</div>
      </template>
    </van-cell>
    <template v-if="!selected">
      <div class="tip"
           :class="{'selected':checked}">*当前仅支持北辰医院天津市医保卡结算</div>
      <div class="banner-bg">
        <div class="banner-title"
             :class="{'selected':checked}">天津市人力资源和社会保障局</div>
        <van-image v-show="this.checked"
                   :src="require('@src/assets/images/ic_yibaoka.png')"></van-image>
        <van-image v-show="!this.checked"
                   :src="require('@src/assets/images/ic_yibaoka_gary.png')"></van-image>
        <div class="tip-gary">(当前仅支持北辰医院天津医保卡结算）</div>
      </div>
      <div class="title"
           :class="{'selected':checked}">
        请输入19位医保卡号
        <span>(上图红框位置数字)</span>
      </div>
      <van-field v-model.trim="cardInfo.medCardNo"
                 :disabled="!checked"
                 pattern="\d*"
                 type="digit"
                 maxlength="19"
                 minlength="19"
                 @input="formateNumber"
                 @blur="formateNumber"
                 class="input" />

    </template>
    <template v-else>
      <div class="info"
           v-if="selected&&checked">
        <div class="name">{{name}}(就诊人姓名)</div>
        <div class="card">医保卡号：{{cardInfo.medCardNo}}</div>
        <!-- <div class="price ">
          <div class="price-item"><span>统筹基金支付金额</span><span>-￥{{yibaoInfo.poolingFundAmount}}</span></div>
          <div class="price-item"><span>个人账号支付金额</span><span>-￥{{yibaoInfo.personalAccountAmount}}</span></div>
        </div> -->
        <div class="price-total"><span>本单划扣</span><span>-￥{{yibaoInfo.totalAmount}}</span></div>
      </div>
      <div class="line"></div>
    </template>

    <div class="tip submit"
         :class="{'mb14':!selected}">*确认后不可更改</div>
    <van-button type="primary"
                v-show="!selected"
                @click="submit"
                :disabled="loading"
                :loading="loading"
                size="large">保存</van-button>
  </van-popup>
</template>

<script>
import peace from '@src/library'
export default {
  name: 'YiBaoCardSelect',
  model: {
    prop: 'showCard',
    event: 'changeFlag'
  },
  props: {
    showCard: {
      type: Boolean,
      required: true
    },
    info: {
      type: Object,
      required: true
    }
  },
  computed: {
    familyId() {
      return this.info?.familyId
    },
    name() {
      return this.info?.familyName
    },
    position() {
      return this.selected == true ? 'center' : 'bottom'
    }
  },
  data() {
    return {
      show: false,
      loading: false,
      checked: false,
      selected: false,
      cardInfo: {
        medCardNo: '',
        id: ''
      },
      yibaoInfo: {
        totalAmount: '0',
        poolingFundAmount: '0',
        personalAccountAmount: '0'
      }
    }
  },
  watch: {
    showCard: {
      handler(val) {
        if (val) {
          this.show = val
        }
      },
      immediate: true
    }
  },
  methods: {
    formateNumber() {
      this.cardInfo.medCardNo = this.cardInfo.medCardNo.replace(/[^\d]/g, '')
    },
    assemblyCard(str) {
      //1234567-->1234 567
      return str
        .toString()
        .replace(/(\s)/g, '')
        .replace(/(\d{4})/g, '$1 ')
        .replace(/\s*$/, '')
    },
    changeFlag() {
      this.show = false
      this.$emit('changeFlag', false)
    },
    async submit() {
      if (!this.checked) {
        this.$emit('onSuccess', { checked: this.checked })
        setTimeout(() => {
          this.selected = true
        }, 500)
        this.changeFlag()
        return
      }
      if (this.cardInfo.medCardNo.length !== 19) {
        return peace.util.warning('请输入19位医保卡号')
      }
      this.loading = true
      if (this.cardInfo.id) {
        await this.updateCard()
      } else {
        await this.addCard()
      }

      try {
        let priceData = null
        //咨询-医保划扣
        if (this.info.serviceType == 'inquiry') {
          priceData = await this.getPriceByRegistration()
        }
        //购药-医药划扣
        else {
          priceData = await this.getPriceByPayDrug()
        }
        this.yibaoInfo = {
          medCardNo: this.cardInfo.medCardNo,
          totalAmount: this.toFixed2(priceData?.data?.feeResult?.insurePay),
          poolingFundAmount: '',
          personalAccountAmount: '',
          divisionId: priceData?.data?.feeResult?.divisionId
        }
        this.$emit('onSuccess', { checked: this.checked, yibaoInfo: this.yibaoInfo })
        this.changeFlag()
        setTimeout(() => {
          this.selected = true
        }, 500)
      } catch (error) {
        console.log(error)
      }
      this.loading = false
    },
    toFixed2(num) {
      if (num == 0) {
        return '0.00'
      } else {
        return num.toString().toFixed(2)
      }
    },
    addCard() {
      const params = {
        region: '天津',
        medCardNo: this.cardInfo.medCardNo,
        familyId: this.familyId
      }
      peace.service.yibao.AddMedicareCard(params).finally(() => {
        this.loading = false
        this.getMedicareCardList()
      })
    },
    updateCard() {
      const params = {
        medCardNo: this.cardInfo.medCardNo,
        id: this.cardInfo.id
      }
      peace.service.yibao.UpdateMedicareCard(params).finally(() => {
        this.loading = false
        this.getMedicareCardList()
      })
    },
    getMedicareCardList() {
      const params = {
        familyId: this.familyId,
        region: '天津'
      }
      peace.service.yibao.GetMedicareCardList(params).then((res) => {
        if (res.data.list.length > 0) {
          this.cardInfo = res.data.list[0]
        }
      })
    },
    getPriceByRegistration() {
      const params = { medCardNo: this.cardInfo.medCardNo, ...this.info }
      return peace.service.yibao.GetPriceByRegistration(params)
    },
    getPriceByPayDrug() {
      const params = { medCardNo: this.cardInfo.medCardNo, ...this.info }
      return peace.service.yibao.GetPriceByPayDrug(params)
    }
  },
  created() {
    this.getMedicareCardList()
  }
}
</script>

<style lang="scss" scoped>
.van-popup {
  width: 100%;
  padding: 15px 16px 20px 16px;
  background: #fff;
  &.selected {
    width: calc(100% - 56px);
    padding: 15px 20px 17px 13px;
    background: #fff;
    border-radius: 7px;
  }
  .header {
    font-size: 16px;
    color: #333;
    font-weight: bold;
    font-family: PingFangSC-Medium, PingFang SC;
    span {
      color: $primary;
    }
  }
  .switch-out {
    padding-left: 0;
    padding-right: 0;
    > div {
      color: #333;
    }
    &.disabled {
      &::after {
        border-width: 0;
      }
    }
    &::after {
      left: 0;
    }
    .text {
      color: $primary;
      &.disabled {
        color: #999;
      }
    }
  }

  .tip {
    color: #ccc;
    font-size: 11px;
    line-height: 16px;
    margin-top: 13px;
    &.selected {
      color: $primary;
    }
    &.submit {
      color: $primary;
    }
    &.mb14 {
      margin-bottom: 14px;
    }
  }
  .banner-bg {
    margin: 10px 0;
    background: #eeeeee;
    position: relative;
    .banner-title {
      position: absolute;
      top: 16px;
      left: 0;
      width: 100%;
      text-align: center;
      font-size: 16px;
      font-family: STSongti-SC-Black, STSongti-SC;
      font-weight: 900;
      color: #cccccc;
      line-height: 1;
      z-index: 10;
      &.selected {
        color: #333;
      }
    }
    .van-image {
      height: 190px;
      width: 100%;
    }
    .tip-gary {
      color: #999;
      background: #eeeeee;
      font-size: 12px;
      text-align: center;
      padding-bottom: 4px;
    }
  }

  .close {
    margin: 0;
    position: absolute;
    top: 11px;
    right: 16px;
    width: 20px;
    height: 20px;
  }

  .title {
    padding-top: 5px;
    color: #ccc;
    span {
      font-size: 12px;
    }
    &.selected {
      color: #000;
      span {
        color: #999;
      }
    }
  }
  .input {
    margin: 10px 0 15px 0;
    border: 1px solid rgba(0, 0, 0, 0.15);
    height: 44px;
    border-radius: 2px;
    background-color: transparent;
  }
}
.info {
  padding: 15px 9px 15px 8px;
  border-radius: 2px;
  border: 1px solid #e8e8e8;
  margin: 6px 0 10px 0;
  .name {
    color: #333;
    font-weight: 600;
    padding: 0 10px;
  }
  .card {
    color: #333;
    font-weight: 400;
    padding: 0 10px;
  }
  .price {
    margin: 8px 0;
    padding: 10px;
    background: #f9f9f9;
    border-radius: 5px;
    .price-item {
      font-size: 13px;
      color: #999;
      display: flex;
      align-items: center;
      justify-content: space-between;
      &:first-child {
        margin-bottom: 10px;
      }
    }
  }
  .price-total {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 10px;
    span {
      font-size: 14px;
      color: #333;
      &:last-child {
        color: #f2223b;
        font-weight: 600;
      }
    }
  }
}
.line {
  width: 100%;
  height: 1px;
  position: relative;
  padding-top: 10px;
  &::after {
    width: 100%;
    position: absolute;
    box-sizing: border-box;
    content: ' ';
    pointer-events: none;
    right: 0;
    bottom: 0;
    left: 0;
    border-bottom: 1px solid #e8e8e8;
    transform: scaleY(0.5);
  }
}
</style>