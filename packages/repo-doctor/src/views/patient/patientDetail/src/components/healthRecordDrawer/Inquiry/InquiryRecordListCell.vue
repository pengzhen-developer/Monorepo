<template>
  <div v-on:click="showDetail">
    <div class="header row items-center q-mb-sm">
      <span class="time-line-time q-mr-sm">{{ item.updatedTime }}</span>
      <span>{{ item.inquiryWay }}</span>
    </div>

    <div class="column q-px-md q-pt-md q-mb-md rounded-borders no-wrap"
         style="background: #F9F9F9">
      <div class="row items-baseline">
        <div class="col-2.5"
             style="color: #666666">病情描述：</div>
        <div class="col-9 q-mb-md"
             style="color: #333333">
          {{ item.describe }}
        </div>
      </div>

      <div class="row">

        <div v-for="(image, index) in item.imageList"
             v-bind:key="index.toString()"
             class="q-pr-sm q-pb-sm">
          <el-image style="width: 64px; "
                    v-bind:src="image"
                    v-bind:preview-src-list="item.imageList" />
        </div>
      </div>

      <div class="row items-center q-mb-md"
           v-if="(item.caseNo && item.caseNo.length > 0) || item.prescribePrescripCount > 0 || item.referralCount > 0">
        <div class="tag row items-center q-mr-sm"
             v-if="item.caseNo && item.caseNo.length > 0">
          <el-image v-bind:src="tipsInfo.caseHistory.icon"
                    class="icon"></el-image>
          <span class="title">{{ tipsInfo.caseHistory.title }}</span>
        </div>

        <div class="tag row items-center q-mr-sm"
             v-if="item.prescribePrescripCount && item.prescribePrescripCount > 0">
          <el-image v-bind:src="tipsInfo.prescription.icon"
                    class="icon"></el-image>
          <span class="title">{{ tipsInfo.prescription.title }}</span>
        </div>
      </div>
    </div>

    <PeaceDialog append-to-body
                 title="问诊记录"
                 v-if="dialog.visible"
                 v-bind:visible.sync="dialog.visible">
      <PeaceIMMessageHistory v-bind:data="dialog.data"
                             v-bind:messageFlowIn="dialog.messageFlowIn"
                             v-bind:messageFlowOut="dialog.messageFlowOut">
        <template v-slot:prescription-operation="{ data, refetch }">
          <PrescriptionDetailOperation v-bind:data="data"
                                       v-on:accept="refetch"
                                       v-on:reject="refetch"></PrescriptionDetailOperation>
        </template>
      </PeaceIMMessageHistory>
    </PeaceDialog>
  </div>
</template>

<script>
import PrescriptionDetailOperation from '@src/views/components/prescription/prescription-detail-operation/src/index.vue'
import Service from './../../../service/index.js'
import { PeaceIMMessageHistory } from 'peace-components'

export default {
  name: 'InquiryRecordListCell',

  components: {
    PeaceIMMessageHistory,
    PrescriptionDetailOperation
  },

  props: {
    item: {
      type: Object,
      require: true,
      default: function() {
        return {
          updatedTime: '',
          inquiryWay: '',
          describe: '',
          imageList: [],
          caseNo: undefined,
          referralCount: undefined,
          prescribePrescripCount: undefined
        }
      }
    }
  },

  data() {
    return {
      tipsInfo: {
        caseHistory: {
          title: '病例',
          icon: require('@src/assets/images/health-record/health_Record_Inquiry_case.png')
        },
        prescription: {
          title: '处方',
          icon: require('@src/assets/images/health-record/health_Record_Inquiry_rp.png')
        }
      },
      dialog: {
        visible: false,
        data: []
      }
    }
  },

  methods: {
    stopEvent(e) {
      e.stopPropagation()
    },

    showDetail() {
      const params = {
        inquiryNo: this.item.inquiryNo
      }
      Service.getOneInquiry(params).then((res) => {
        this.dialog.data = res.data.msgInfo
        this.dialog.messageFlowIn = res.data.patientInfo
        this.dialog.messageFlowOut = res.data.doctorInfo
        this.dialog.visible = true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  color: rgba(153, 153, 153, 1);
  &:before {
    display: inline-block;
    content: '';
    width: 5px;
    height: 5px;
    background: $--color-primary;
    border-radius: 50%;
    margin: 0 8px 0 0;
    vertical-align: middle;
  }
}
.tag {
  height: 30px;
  background: #ebfbf9;
  border-radius: 3px;

  .icon {
    margin-left: 5px;
    margin-right: 10px;
    width: 14px;
    height: 16px;
  }
  .title {
    font-size: 14px;
    font-weight: 300;
    color: #333333;
    margin-right: 10px;
  }
}
</style>
