<template>
  <!-- 消息内容 -->
  <div class="message-body message-card cursor-pointer"
       @click="onClickContent()">
    <div class="message-header">
      <el-image style="width:20px;height:17px;"
                :src="require('../assets/images/ic_message.png')" />
      <span v-text="familyName"></span>
      <span>|</span>
      <span v-text="familySex"></span>
      <span>|</span>
      <span v-text="familyAge"></span>

      <span v-if="paymentType != 1"
            class="tag-style">{{ payTypeText }}</span>
      <!-- <span>
        {{ familyName }} |
        {{ familySex }} |
        {{ familyAge }}
      </span> -->
      <img v-if="isAgain"
           src="../assets/images/ic_fz.png"
           class="fz" />
      <img v-else
           src="../assets/images/ic_cz.png"
           class="fz" />
    </div>
    <div class="message-content">
      <div class="message-content-content top">
        {{ confirmIllness }}</div>
      <div class="message-content-content"><span class="t">病情描述
          :</span>{{ describe }}
      </div>
    </div>
    <!-- <div class="message-line"></div>
    <div class="message-footer"
         @click.stop="onClickMore()">
      <el-image style="width:16px;height:18px;"
                :src="require('../assets/images/ic_ck.png')" />
      查看订单
    </div> -->
  </div>
</template>

<script>
import Type from '@src/type'
export default {
  props: {
    /*
     * 就诊人姓名
     */
    familyName: {
      type: String,
      required: true
    },
    /*
     * 就诊人性别
     */
    familySex: {
      type: String,
      required: true
    },
    /*
     * 就诊人年龄
     */
    familyAge: {
      type: String,
      required: true
    },
    /*
     * 是否复诊
     */
    isAgain: {
      type: [String, Boolean, Number],
      required: true
    },
    /*
     * 初诊诊断
     */
    confirmIllness: {
      type: String,
      required: true
    },
    /*
     * 病情描述
     */
    describe: {
      type: String,
      required: true
    },
    /*
     * 支付方式
     */
    paymentType: {
      type: Number,
      required: true
    }
  },

  computed: {
    payTypeText() {
      return Object.keys(Type.INQUIRY.INQUIRY_PAY_TYPE).find((key) => Type.INQUIRY.INQUIRY_PAY_TYPE[key] === this.paymentType)
    }
  },

  methods: {
    onClickContent() {
      this.$emit('onClickContent')
    },
    onClickMore() {
      this.$emit('onClickMore')
    }
  }
}
</script>

<style lang="scss" scoped>
.tag-style {
  background: rgba(2, 167, 240, 1);
  border-radius: 19px;
  font-size: 11px;
  color: white;
  padding: 0 10px;
  line-height: 16px;
  height: 16px;
}
</style>