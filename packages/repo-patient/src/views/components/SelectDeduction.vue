<template>
  <van-popup v-model="showModel"
             @click-overlay="cancel"
             round
             position="bottom">
    <div class="header">抵扣方式</div>
    <div class="content">
      <van-radio-group v-model="payType">
        <van-cell-group>
          <template v-for="item in deduction">
            <van-cell v-if="item.status"
                      :key="item.type"
                      v-bind:title="item.name"
                      clickable
                      @click="payType = item.type">
              <template #right-icon>
                <van-radio :name="item.type">
                  <template #icon="props">
                    <van-image style="width:24px;"
                               :src="props.checked ? activeIcon : inactiveIcon"></van-image>
                  </template>
                </van-radio>
              </template>
            </van-cell>
          </template>
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
  name: 'PayType',
  model: {
    prop: 'showModel',
    event: 'changePayTypeDialog'
  },
  props: {
    showModel: {
      type: Boolean,
      required: true
    },
    deduction: {
      type: Array,
      required: true,
      default() {
        return []
      }
    },
    type: {
      type: String,
      required: true,
      default() {
        return ''
      }
    }
  },
  watch: {
    type: {
      handler(val) {
        if (val) {
          this.payType = this.type
        }
      },
      immediate: true
    }
  },
  data() {
    return {
      payType: '',
      activeIcon: require('@src/assets/images/ic_choose.png'),
      inactiveIcon: require('@src/assets/images/ic_choose_not.png')
    }
  },

  methods: {
    cancel() {
      this.$emit('changePayTypeDialog', false)
      this.$emit('cancel')
    },
    submit() {
      this.$emit('changePayTypeDialog', false)
      this.$emit('success', this.payType)
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
  ::v-deep .content {
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
      .van-cell__left-icon {
        margin-right: 8px;
        font-size: 24px;
      }
      .van-radio__icon {
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