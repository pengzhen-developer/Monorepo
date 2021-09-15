<template>
  <div>
    <MessageReferralCard :familyName="familyName"
                         :familySex="familySex"
                         :familyAge="familyAge"
                         :doctorName="doctorName"
                         :doctorDeptName="doctorDeptName"
                         :doctorHospitalName="doctorHospitalName"
                         @onClickDetail="onClickDetail"></MessageReferralCard>
    <peace-dialog :close-on-click-modal="false"
                  :close-on-press-escape="false"
                  :visible.sync="transfer.visible"
                  append-to-body
                  title="转诊详情"
                  v-if="transfer.visible"
                  width="580px">
      <ReferInfo :info="transfer.data"></ReferInfo>
    </peace-dialog>
  </div>
</template>

<script>
import MessageReferralCard from './MessageReferralCard'
import Service from '../service'
import ReferInfo from './ReferInfo'

export default {
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  components: {
    MessageReferralCard,
    ReferInfo
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
      const params = { referral_no: this.message.content.data.referralInfo.referralNo }
      Service.getReferralInfo(params).then((res) => {
        this.transfer.data = res.data
        this.transfer.visible = true
      })
    }
  }
}
</script>

<style>
</style>