<!--
 * @Description: IM 聊天消息 - 问诊卡片
-->

<template>
  <div class="peace-im-message-inquriy">
    <PeaceIMMessageCard v-on:click.native="showDetail"
                        class="relative-position cursor-pointer">
      <template v-slot:header>
        <div class="flex justify-between items-center full-width">
          <div class="flex items-center">
            <el-image style="width:17px; height:17px;"
                      class="q-mr-10"
                      v-bind:src="require('./../assets/img/ic_message.png')" />

            <div class="text-white">
              <span class="q-mr-xs">{{ data.content.data.inquiryOrderInfo.patientsName }}</span>
              <span class="q-mr-xs">|</span>
              <span class="q-mr-xs">{{ data.content.data.inquiryOrderInfo.sex }}</span>
              <span class="q-mr-xs">|</span>
              <span class="q-mr-xs">{{ data.content.data.inquiryOrderInfo.age }}</span>
            </div>
          </div>

          <el-tag v-if="showPayType"
                  class="q-mr-32"
                  style="transform: scale(0.8);"
                  type="warning">{{ payTypeText }} 1</el-tag>

          <el-image fit="fill"
                    class="inquriy-type-tag"
                    v-if="data.content.data.inquiryOrderInfo.isAgain"
                    v-bind:src="require('./../assets/img/ic_fz.png')"></el-image>

          <el-image fit="fill"
                    class="inquriy-type-tag"
                    v-if="!data.content.data.inquiryOrderInfo.isAgain"
                    v-bind:src="require('./../assets/img/ic_cz.png')"></el-image>
        </div>
      </template>

      <template v-slot:content>
        <div class="text-grey-333 q-mb-xs text-bold">{{ data.content.data.inquiryOrderInfo.confirmIllness }}</div>
        <div class="q-mb-sm">
          <span class="text-grey-999">病情描述：</span>
          <span class="text-grey-333">{{ data.content.data.inquiryOrderInfo.describe }}</span>
        </div>
      </template>
    </PeaceIMMessageCard>

    <PeaceDialog append-to-body
                 title="问诊单详情"
                 v-if="dialog.visible"
                 v-bind:visible.sync="dialog.visible">
      <PeaceIMMessageInquiryDetail v-on="$listeners"
                                   v-bind="$attrs"
                                   v-bind:data="dialog.data"></PeaceIMMessageInquiryDetail>
    </PeaceDialog>
  </div>
</template>

<script>
import PeaceIMMessageCard from './IMMessageCard.vue'
import PeaceIMMessageInquiryDetail from './IMMessageInquiryDetail.vue'

export default {
  components: {
    PeaceIMMessageCard,
    PeaceIMMessageInquiryDetail
  },

  props: {
    data: Object
  },

  data() {
    return {
      dialog: {
        visible: false,
        data: undefined
      },

      INQUIRY_PAY_TYPE: {
        自费: 1,
        医保: 2,
        商保: 3,
        门特: 4
      }
    }
  },

  computed: {
    showPayType() {
      return this.data.content.data.inquiryOrderInfo.paymentType && this.data.content.data.inquiryOrderInfo.paymentType != this.INQUIRY_PAY_TYPE.自费
    },

    payTypeText() {
      return Object.keys(this.INQUIRY_PAY_TYPE).find((key) => this.INQUIRY_PAY_TYPE[key] === this.data.content.data.inquiryOrderInfo.paymentType)
    }
  },

  methods: {
    showDetail() {
      this.dialog.visible = true
      this.dialog.data = this.data
    }
  }
}
</script>

<style lang="scss" scoped>
.inquriy-type-tag {
  width: 50px;
  height: 35px;
  position: absolute;
  right: 0;
  top: 0;
}
</style>