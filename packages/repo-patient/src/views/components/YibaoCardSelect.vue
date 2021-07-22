<template>

  <van-popup v-model="show"
             class="popup"
             @click-overlay="changeFlag"
             round
             position="bottom">

    <div class="header">
      填写医保卡号
    </div>
    <div class="tip-header"></div>
    <div class="banner-bg">
      <div class="banner-title">天津市人力资源和社会保障局</div>
      <van-image :src="require('@src/assets/images/ic_yibaoka.png')"></van-image>
      <div class="tip-gary">(当前仅支持北辰医院天津医保卡结算）</div>
    </div>
    <div class="title">请输入医保卡号<span>(上图红框位置数字)</span></div>
    <van-field v-model.trim="cardInfo.medCardNo"
               pattern="\d*"
               type="digit"
               @input="formateNumber"
               @blur="formateNumber"
               class="input" />
    <div class="tip">*请绑定xxx的最新医保信息，否则无法使用医保卡支付，确认后不可更改</div>
    <div class="flex">
      <van-button class="is__dialog"
                  round
                  @click="changeFlag">取消</van-button>
      <van-button type="primary"
                  class="is__dialog"
                  round
                  @click="submit"
                  :disabled="loading"
                  :loading="loading">确认</van-button>
    </div>
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
    }
  },
  data() {
    return {
      show: false,
      loading: false,
      checked: false,
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
      if (!this.cardInfo.medCardNo) {
        return peace.util.warning('请输入医保卡号')
      } else if (!/^[0-9]*$/.test(this.cardInfo.medCardNo)) {
        return peace.util.warning('医保卡号只能输入数字')
      }
      this.loading = true
      try {
        if (this.cardInfo.id) {
          await this.updateCard()
        } else {
          await this.addCard()
        }
      } catch (error) {
        console.log('error', error)
        return
      }
      this.yibaoInfo = {
        medCardNo: this.cardInfo.medCardNo,
        id: this.cardInfo.id
      }
      this.$emit('onSuccess', { checked: true, yibaoInfo: this.yibaoInfo })
      this.changeFlag()
      this.loading = false
    },
    //添加医保卡
    addCard() {
      const params = {
        region: '天津',
        medCardNo: this.cardInfo.medCardNo,
        familyId: this.familyId
      }
      return peace.service.yibao
        .AddMedicareCard(params)
        .then(() => {
          this.getMedicareCardList()
        })
        .finally(() => {
          this.loading = false
        })
    },
    //更新医保卡
    updateCard() {
      const params = {
        medCardNo: this.cardInfo.medCardNo,
        id: this.cardInfo.id
      }
      return peace.service.yibao
        .UpdateMedicareCard(params)
        .then(() => {
          this.getMedicareCardList()
        })
        .finally(() => {
          this.loading = false
        })
    },
    //获取医保卡
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
    }
  },
  created() {
    this.getMedicareCardList()
  }
}
</script>

<style lang="scss" scoped>
.van-popup.popup {
  width: 100%;
  padding: 24px 16px;
  background: #fff;

  .header {
    font-size: 18px;
    color: #333;
    font-weight: bold;
    font-family: PingFangSC-Medium, PingFang SC;
    line-height: 24px;
    position: relative;
    text-align: center;
  }
  .tip-header {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffa00c;
    line-height: 16px;
    margin-top: 20px;
    margin-bottom: 14px;
  }

  .banner-bg {
    margin-bottom: 10px;
    background: rgba(51, 51, 51, 0.05);
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
      line-height: 1;
      z-index: 10;
      color: #333;
    }
    .van-image {
      height: 199px;
      width: 100%;
    }
    .tip-gary {
      color: rgba(51, 51, 51, 0.4);
      font-size: 12px;
      text-align: center;
      padding-bottom: 4px;
    }
  }

  .close {
    margin: 0;
    position: absolute;
    top: 0px;
    right: 4px;
    width: 20px;
    height: 20px;
  }
  .choose {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }
  .title {
    color: #333;
    font-size: 16px;
    span {
      font-size: 14px;
      color: rgba(51, 51, 51, 0.6);
      margin-left: 4px;
    }
  }
  .tip {
    color: rgba(51, 51, 51, 0.6);
    font-size: 14px;
    line-height: 20px;
  }
  .input {
    margin: 6px 0 4px 0;
    border: 1px solid rgba(0, 0, 0, 0.15);
    height: 44px;
    border-radius: 2px;
    background-color: transparent;
  }
}

.flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
}
</style>