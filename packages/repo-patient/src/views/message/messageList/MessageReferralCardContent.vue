<template>
  <div>
    <MessageReferralCard :familyName="familyName"
                         :familySex="familySex"
                         :familyAge="familyAge"
                         :doctorName="doctorName"
                         :doctorDeptName="doctorDeptName"
                         :doctorHospitalName="doctorHospitalName"
                         @onClickDetail="onClickDetail"></MessageReferralCard>
  </div>
</template>

<script>
import peace from '@src/library'
import MessageReferralCard from './MessageReferralCard'

export default {
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  components: {
    MessageReferralCard
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
      return (
        this.message.content.data.referralInfo.toDoctorInfo && this.message.content.data.referralInfo.toDoctorInfo.name
      )
    },
    doctorDeptName() {
      return (
        this.message.content.data.referralInfo.toDoctorInfo &&
        this.message.content.data.referralInfo.toDoctorInfo.deptName
      )
    },
    doctorHospitalName() {
      return (
        this.message.content.data.referralInfo.toDoctorInfo &&
        this.message.content.data.referralInfo.toDoctorInfo.hospitalName
      )
    }
  },
  methods: {
    onClickDetail() {
      let json = peace.util.encode({
        referralNo: this.message.content.data.referralInfo.referralNo
      })

      this.$router.push(`/components/theTransfer/${json}`)
    }
  }
}
</script>

<style>
</style>