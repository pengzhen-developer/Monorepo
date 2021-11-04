<template>

  <van-popup v-model="show"
             @click-overlay="cancel"
             round
             position="bottom">

    <div class="header">请选择取消原因</div>
    <div class="content">
      <van-radio-group v-model="model.label">
        <van-cell-group>
          <van-cell v-for="item in list"
                    :key="item.label"
                    :title="item.value"
                    clickable
                    @click="selectType(item)">
            <template #icon>
              <van-radio :name="item.label">
                <template #icon="props">
                  <van-image :src="props.checked ? activeIcon : inactiveIcon"></van-image>
                </template>
              </van-radio>
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </div>
    <div class="footWrap">
      <van-button round
                  @click="cancel">取消</van-button>
      <van-button round
                  class="is__dialog is__dialog--primary"
                  type="primary"
                  @click="submit">提交</van-button>
    </div>

  </van-popup>
</template>

<script>
import peace from '@src/library'
export default {
  name: 'CancelCauseSelect',
  model: {
    prop: 'showModel',
    event: 'changeCancelCauseSelectDialog'
  },
  props: {
    showModel: {
      type: Boolean,
      required: true
    },
    list: {
      type: Array,
      required: true
    }
  },
  watch: {
    showModel: {
      handler(val) {
        this.show = val
        if (val) {
          if (val && this.list.length > 0) {
            this.model.label = this.list[0].label
            this.model.value = this.list[0].value
          }
        }
        this.isSend = val == false && false
      },
      immediate: true
    }
  },
  data() {
    return {
      show: false,
      isSend: false,
      model: {
        label: '',
        value: ''
      },
      activeIcon: require('@src/assets/images/ic_choose.png'),
      inactiveIcon: require('@src/assets/images/ic_choose_not.png')
    }
  },
  methods: {
    selectType(item) {
      this.model.label = item.label
      this.model.value = item.value
    },
    cancel() {
      if (this.isSend) {
        return false
      }
      this.show = false
      this.$emit('changeCancelCauseSelectDialog', false)
      this.$emit('onCancel')
    },
    submit() {
      if (this.isSend) {
        return false
      }
      this.isSend = true
      const cancelCause = peace.util.deepClone(this.model)
      //提交的时候 弹框关闭由父组件控制
      this.$emit('onSuccess', { cancelCause: cancelCause })
    }
  }
}
</script>

<style lang="scss" scoped>
.van-popup {
  width: 100%;
  padding: 20px 16px 80px 16px;
  background: #fff;
  border-radius: 16px 16px 0px 0px;
  .header {
    font-size: 18px;
    font-family: PingFangSC-Medium;
    font-weight: bold;
    color: #333333;
    line-height: 24px;
    margin-bottom: 20px;
    text-align: center;
  }
  .content {
    min-height: 180px;
    max-height: 400px;
    overflow: auto;
    .van-hairline--top-bottom {
      &::after {
        border-width: 0;
      }
    }
    ::v-deep .van-cell {
      padding-left: 0;
      padding-right: 0;
      font-size: 16px;
      line-height: 24px;
      &::after {
        left: 0;
        right: 0;
      }

      .van-radio__icon {
        margin-right: 8px;
        font-size: 16px;
        .van-image {
          width: 16px;
          height: 16px;
        }
      }
    }
  }
  .footWrap {
    width: 100%;
    padding: 0 12px;
    box-shadow: 0 -1px 0 0 rgba(51, 51, 51, 0.16);
    height: 80px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    left: 0;
    bottom: 0;
    .van-button {
      flex: 1;
      border: none;
      background: rgba(51, 51, 51, 0.05);
      font-size: 16px;
      font-family: PingFangSC-Regular;
      color: rgba(0, 0, 0, 0.8);
      height: 48px;
      border-radius: 24px;
      & + .van-button {
        background: $primary;
        color: #fff;
        font-size: 18px;
        margin-left: 6.13%;
      }
    }
  }
}
</style>