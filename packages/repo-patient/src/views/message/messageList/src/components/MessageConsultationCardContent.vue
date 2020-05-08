<template>
  <div>
    <MessageConsultationCard :familyName="familyName"
                             :familySex="familySex"
                             :familyAge="familyAge"
                             :diagnose="diagnose"
                             :doctorName="doctorName"
                             :doctorDeptName="doctorDeptName"
                             :doctorHospitalName="doctorHospitalName"
                             @onClickDetail="onClickDetail"></MessageConsultationCard>
  </div>
</template>

<script>
import peace from '@src/library'
import MessageConsultationCard from './MessageConsultationCard'

export default {
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  components: {
    MessageConsultationCard
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
    diagnose() {
      return this.message.content.data.consultInfo && this.message.content.data.consultInfo.diagnose
    },
    doctorName() {
      return (
        this.message.content.data.consultInfo.toDoctorInfo && this.message.content.data.consultInfo.toDoctorInfo.name
      )
    },
    doctorDeptName() {
      return (
        this.message.content.data.consultInfo.toDoctorInfo &&
        this.message.content.data.consultInfo.toDoctorInfo.deptName
      )
    },
    doctorHospitalName() {
      return (
        this.message.content.data.consultInfo.toDoctorInfo &&
        this.message.content.data.consultInfo.toDoctorInfo.hospitalName
      )
    }
  },
  methods: {
    onClickDetail() {
      let json = peace.util.encode({
        consultNo: this.message.content.data.consultInfo.consultNo
      })
      this.$router.push(`/components/theConsultation/${json}`)
    }
  }
}
</script>

<style>
</style>