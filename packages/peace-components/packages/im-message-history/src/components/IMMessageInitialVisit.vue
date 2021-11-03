<!--
 * @Description: IM 聊天消息 - 诊疗记录(首诊记录)卡片
-->

<template>
  <div class="peace-im-message-initial-visit">
    <PeaceIMMessageCard v-on:click.native="showDetail">
      <template v-slot:content>
        <div class="flex cursor-pointer">
          <el-image class="q-mr-16"
                    style="width:35px;height:35px;"
                    v-bind:src="require('./../assets/img/ic_option_record.png')"></el-image>
          <div class="flex column">
            <span class="text-grey-333">诊疗记录</span>
            <span class="text-grey-999"
                  style="font-size:12px;">{{ data.content.data.firstInfo.hospitalName }}</span>
          </div>
        </div>
      </template>
    </PeaceIMMessageCard>

    <PeaceDialog append-to-body
                 title="诊疗记录"
                 v-if="dialog.visible"
                 v-bind:visible.sync="dialog.visible">
      <PeacePrescriptionDetailHIS v-bind:data="dialog.data"></PeacePrescriptionDetailHIS>
    </PeaceDialog>
  </div>
</template>

<script>
import PeaceIMMessageCard from './IMMessageCard.vue'
import PeacePrescriptionDetailHIS from './../../../prescription-detail-his/src/index.vue'
import Service from './../service'

export default {
  components: {
    PeaceIMMessageCard,
    PeacePrescriptionDetailHIS
  },

  props: {
    data: Object
  },

  data() {
    return {
      dialog: {
        visible: false,
        data: undefined
      }
    }
  },

  methods: {
    showDetail() {
      this.dialog.visible = true
      this.dialog.data = this.fetch.bind(this)
    },

    async fetch() {
      const resFirstOptionList = await Service.getFirstOptionList({ inquiryNo: this.data.content.data.inquiryInfo.inquiryNo })
      const resFirstOptionDetail = await Service.getFirstOptionDetail({ prescriptionCode: resFirstOptionList.data?.[0]?.dataNo })

      return resFirstOptionDetail.data
    }
  }
}
</script>

<style>
</style>