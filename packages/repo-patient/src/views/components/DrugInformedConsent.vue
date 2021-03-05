<template>
  <van-popup v-model="show"
             round
             @click-overlay="onCancel"
             position="center">
    <div class="header">
      <span>取药知情同意书</span>
    </div>
    <div class="content"
         :style="{'padding-bottom':!canOperate&&'10px'}">
      <div class="message"
           v-html="informedConsent"> </div>
      <div class="tip"
           v-if="canOperate">
        <van-image v-bind:src="require(`@src/assets/images/ic_select_true.png`)"
                   v-on:click.stop="changeSelect"
                   v-show="select"></van-image>
        <van-image v-bind:src="require(`@src/assets/images/ic_select_false.png`)"
                   v-on:click.stop="changeSelect"
                   v-show="!select"></van-image>
        <span v-on:click.stop="changeSelect">已阅读并同意取药知情同意书</span>
      </div>
    </div>

    <div class="footer"
         v-if="canOperate">
      <div class="footer-btn"
           v-on:click="onCancel">
        取消
      </div>
      <div class="footer-btn"
           v-on:click="onSubmit">
        确认
      </div>
    </div>
  </van-popup>
</template>

<script>
import peace from '@src/library'
export default {
  name: 'DrugInformedConsent',
  model: {
    prop: 'showModel',
    event: 'input'
  },
  props: {
    canOperate: {
      type: Boolean,
      required: false,
      default: () => {
        return true
      }
    },
    showModel: {
      type: Boolean,
      required: true
    },
    informedConsent: {
      type: String,
      required: true
    }
  },
  watch: {
    showModel: {
      handler(val) {
        if (val) {
          this.show = val
          if (val == true) {
            //初始化勾选状态
            this.select = false
          }
        }
      },
      immediate: true
    }
  },
  data() {
    return {
      show: false,
      select: false
    }
  },

  methods: {
    changeSelect() {
      this.select = !this.select
    },
    onCancel() {
      this.show = false
      this.$emit('onCancel', false)
      this.$emit('input', false)
    },
    onSubmit() {
      if (!this.select) {
        peace.util.alert('请勾选【已阅读并同意取药知情同意书 】')
      } else {
        this.show = false
        this.$emit('onSubmit', true)
        this.$emit('input', false)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.van-popup {
  width: 87%;
  padding: 16px 0 0 0 !important;
  .header {
    text-align: center;
    font-size: 20px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
    line-height: 28px;
    margin-bottom: 12px;
  }
  .content {
    padding: 0 16px;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.85);
    line-height: 24px;
    .message {
      white-space: pre-wrap;
      margin-bottom: 9px;
    }
    .tip {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
      line-height: 24px;
      display: flex;
      align-items: center;
      margin-bottom: 26px;
      .van-image {
        margin-right: 8px;
      }
    }
  }
  .footer {
    border-top: 1px solid rgba(51, 51, 51, 0.05);
    display: flex;

    .footer-btn {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      line-height: 25px;
      padding: 10px 0 12px 0;
      &:first-child {
        color: rgba(51, 51, 51, 0.45);
        border-right: 1px solid rgba(51, 51, 51, 0.05);
      }
      &:last-child {
        color: #00c6ae;
      }
    }
  }
}
</style>