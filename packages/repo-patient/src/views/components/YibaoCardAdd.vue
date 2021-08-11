<template>

  <van-popup v-model="show"
             @click-overlay="changeFlag"
             round
             position="bottom">
    <van-image class="close"
               @click="changeFlag"
               :src="require('@src/assets/images/ic_close@2x.png')"></van-image>
    <div class="header">请绑定<span>{{name}}</span>的医保卡号</div>
    <div class="line"></div>
    <div class="tip">*当前仅支持北辰医院天津市医保卡结算</div>
    <div class="img-bg">
      <div class="img-title">天津市人力资源和社会保障局</div>
      <van-image :src="require('@src/assets/images/ic_yibaoka.png')"></van-image>
    </div>

    <div class="title">
      请输入医保卡号
      <span>(上图红框位置数字)</span>
    </div>
    <van-field v-model.trim="medCardNo"
               pattern="\d*"
               type="digit"
               @input="formateNumber"
               @blur="formateNumber"
               class="input" />
    <van-button type="primary"
                round
                @click="submit"
                :disabled="loading"
                :loading="loading"
                size="large">保存</van-button>

    <!-- 电话弹框 -->
    <template>
      <CallPhone v-model="phoneDialog.visible"
                 :phone="phoneDialog.data.phone"></CallPhone>
    </template>

  </van-popup>
</template>

<script>
import peace from '@src/library'
import CallPhone from '@src/views/components/CallPhone'

import { Dialog } from 'vant'
export default {
  name: 'AddYiBaoCard',
  components: { [Dialog.Component.name]: Dialog.Component, CallPhone },
  model: {
    prop: 'showCard',
    event: 'changeFlag'
  },
  props: {
    showCard: {
      type: Boolean,
      required: true
    },
    familyInfo: {
      type: Object,
      required: true
    },
    cardInfo: {
      type: Object,
      required: false
    },
    serviceTel: {
      type: String,
      required: false
    }
  },
  computed: {
    name() {
      return this.familyInfo?.name
    },
    familyId() {
      return this.familyInfo?.id
    },
    id() {
      return this.cardInfo?.id
    }
  },
  data() {
    return {
      medCardNo: '',
      show: false,
      loading: false,
      phoneDialog: {
        visible: false,
        data: {
          phone: ''
        }
      }
    }
  },
  watch: {
    showCard: {
      handler(val) {
        if (val) {
          this.show = val
          this.medCardNo = this.cardInfo.medCardNo
        }
      },
      immediate: true
    }
  },
  methods: {
    formateNumber() {
      this.medCardNo = this.medCardNo.replace(/[^\d]/g, '')
    },
    changeFlag() {
      this.show = false
      this.$emit('changeFlag', false)
    },
    async submit() {
      if (!this.medCardNo) {
        return peace.util.warning('请输入医保卡号')
      } else if (!/^[0-9]*$/.test(this.medCardNo)) {
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
        if (error.data.code === 205) {
          Dialog.confirm({
            title: '提示',
            message: error.data.msg,
            confirmButtonText: '确定',
            cancelButtonText: '联系客服'
          })
            .then(() => {})
            .catch(() => {
              //医保卡不可用 请联系客服
              this.callPhone()
            })
        }
        return
      }
      this.$emit('onSuccess', true)
      this.changeFlag()
      this.loading = false
    },
    callPhone() {
      this.phoneDialog.visible = true
      this.phoneDialog.data.phone = this.serviceTel
    },
    addCard() {
      const params = {
        region: '天津',
        medCardNo: this.medCardNo,
        familyId: this.familyId
      }
      return peace.service.yibao
        .AddMedicareCard(params)
        .then((res) => {
          peace.util.alert(res.msg)
        })
        .finally(() => {
          this.loading = false
        })
    },
    updateCard() {
      const params = {
        medCardNo: this.medCardNo,
        id: this.id
      }
      return peace.service.yibao
        .UpdateMedicareCard(params)
        .then((res) => {
          peace.util.alert(res.msg)
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.van-popup {
  width: 100%;
  padding: 15px 16px 20px 16px;
  background: #fff;

  .header {
    font-size: 16px;
    color: #333;
    font-weight: bold;
    font-family: PingFangSC-Medium, PingFang SC;
    span {
      color: $primary;
    }
  }
  .line {
    width: calc(100% + 32px);
    height: 1px;
    background: #e8e8e8;
    margin: 14px 0 10px -15px;
  }
  .tip {
    color: $primary;
    font-size: 11px;
    line-height: 16px;
  }
  .img-bg {
    margin: 10px 0;
    position: relative;
    .img-title {
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
  }
  .van-image {
    height: 190px;
    width: 100%;
    &.close {
      margin: 0;
      position: absolute;
      top: 11px;
      right: 16px;
      width: 20px;
      height: 20px;
    }
  }
  .title {
    color: #000;
    span {
      color: #999;
      font-size: 12px;
    }
  }
  .input {
    margin: 15px 0 25px 0;
    border: 1px solid rgba(0, 0, 0, 0.15);
    height: 44px;
    border-radius: 2px;
    background-color: transparent;
  }
}
</style>