<template>
  <div>
    <MessageReferralCard :familyName="familyName"
                         :familySex="familySex"
                         :familyAge="familyAge"
                         :doctorName="doctorName"
                         :doctorDeptName="doctorDeptName"
                         :doctorHospitalName="doctorHospitalName"
                         @onClickDetail="onClickDetail"></MessageReferralCard>
    <peace-dialog :visible.sync="transfer.visible"
                  v-if="transfer.visible"
                  append-to-body
                  title="转诊详情">
      <InquiryTransferDetail :data="transfer.data"
                             :type="transfer.referral_type"
                             @close="() => transfer.visible = false"></InquiryTransferDetail>
    </peace-dialog>
  </div>
</template>

<script>
import peace from '@src/library'
import MessageReferralCard from './MessageReferralCard'
import InquiryTransferDetail from '@src/views/components/inquiry/InquiryTransferDetail'
export default {
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  components: {
    MessageReferralCard,
    InquiryTransferDetail
  },
  computed: {
    familyName() {
      return this.message.content.data.patientInfo.familyName
    },
    familySex() {
      return this.message.content.data.patientInfo.familySex
    },
    familyAge() {
      return this.message.content.data.patientInfo.familyAge
    },

    doctorName() {
      return this.message.content.data.referralInfo.toDoctorInfo && this.message.content.data.referralInfo.toDoctorInfo.name
    },
    doctorDeptName() {
      return this.message.content.data.referralInfo.toDoctorInfo && this.message.content.data.referralInfo.toDoctorInfo.deptName
    },
    doctorHospitalName() {
      return this.message.content.data.referralInfo.toDoctorInfo && this.message.content.data.referralInfo.toDoctorInfo.hospitalName
    }
  },
  data() {
    return {
      transfer: {
        visible: false,
        data: {}
      }
    }
  },
  methods: {
    onClickDetail() {
      this.transfer.data = undefined
      this.transfer.visible = true

      const params = {
        referral_no: this.message.content.data.referralInfo.referralNo,
        referral_type: 'out'
      }

      peace.service.inquiry.referralDocPc(params).then((res) => {
        this.transfer.data = res.data
      })
    }
  }
}
</script>

<style>
</style>