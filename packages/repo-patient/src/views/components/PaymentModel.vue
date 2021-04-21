<template>

  <van-popup v-model="show"
             @click-overlay="cancel"
             round
             position="bottom">
    <div class="header">支付方式</div>
    <div class="content">
      <van-radio-group v-model="paymentId">
        <van-cell-group>
          <van-cell :title="item.label"
                    :icon="item.icon"
                    clickable
                    v-for="item in list"
                    :key="item.vlaue"
                    @click="paymentId=item.value">
            <template #right-icon>
              <van-radio :name="item.value">
                <template #icon="props">
                  <van-image style="width:24px;"
                             :src="props.checked?activeIcon:inactiveIcon"></van-image>
                </template>
              </van-radio>

            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>

    </div>
    <div class="footer">
      <van-button round
                  @click="submit">确定</van-button>
    </div>
  </van-popup>
</template>

<script>
export default {
  name: 'PaymentModel',
  model: {
    prop: 'showModel',
    event: 'changePaymentModelDialog'
  },
  props: {
    showModel: {
      type: Boolean,
      required: true
    },
    list: {
      type: Array,
      required: true
    },
    info: {
      type: Object,
      required: true
    }
  },
  watch: {
    showModel: {
      handler(val) {
        if (val) {
          this.show = val
        }
      },
      immediate: true
    },
    'info.value': {
      handler(val) {
        if (val) {
          this.paymentId = this.info.value
        }
      },
      immediate: true
    }
  },
  data() {
    return {
      show: false,
      paymentId: '',
      activeIcon: require('@src/assets/images/ic_choose.png'),
      inactiveIcon: require('@src/assets/images/ic_choose_not.png')
    }
  },

  methods: {
    cancel() {
      this.show = false
      this.$emit('changePaymentModelDialog', false)
      this.$emit('onCancel')
    },
    submit() {
      this.show = false
      this.$emit('changePaymentModelDialog', false)
      const model = this.list.find((item) => item.value === this.paymentId)
      this.$emit('onSuccess', model)
    }
  }
}
</script>

<style lang="scss" scoped>
.van-hairline--top-bottom::after,
.van-hairline-unset--top-bottom::after {
  border: 0;
}
.van-popup {
  width: 100%;
  padding: 20px 16px 24px 16px;
  background: #fff;
  border-radius: 16px 16px 0px 0px;
  .header {
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: bold;
    color: #333333;
    line-height: 1;
    margin-bottom: 20px;
    text-align: center;
  }
  .content {
    min-height: 180px;
    max-height: 400px;
    overflow: auto;
    .van-cell {
      padding-left: 0;
      padding-right: 0;
      font-size: 16px;
      line-height: 24px;
      &::after {
        left: 0;
        right: 0;
      }
      /deep/.van-cell__left-icon {
        margin-right: 8px;
        font-size: 24px;
      }
      /deep/.van-radio__icon {
        font-size: 24px;
      }
    }
  }
  .footer {
    padding-top: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .van-button {
      width: 100%;
      height: 48px;
      background: rgba(51, 51, 51, 0.05);
      border-radius: 26px;
      border: none;
      font-size: 18px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #00c6ae;
      line-height: 24px;
    }
  }
}
</style>