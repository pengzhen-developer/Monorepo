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
    <peace-dialog :visible.sync="consultation.visible"
                  v-if="consultation.visible"
                  append-to-body
                  title="会诊详情">
      <InquiryConsultationDetail :data="consultation.data"
                                 @close="() => consultation.visible = false">
      </InquiryConsultationDetail>
    </peace-dialog>
  </div>
</template>

<script>
import MessageConsultationCard from './MessageConsultationCard'
import InquiryConsultationDetail from '@src/views/components/inquiry/InquiryConsultationDetail'

export default {
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  components: {
    MessageConsultationCard,
    InquiryConsultationDetail
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
      return this.message.content.data.consultInfo.toDoctorInfo && this.message.content.data.consultInfo.toDoctorInfo.name
    },
    doctorDeptName() {
      return this.message.content.data.consultInfo.toDoctorInfo && this.message.content.data.consultInfo.toDoctorInfo.deptName
    },
    doctorHospitalName() {
      return this.message.content.data.consultInfo.toDoctorInfo && this.message.content.data.consultInfo.toDoctorInfo.hospitalName
    }
  },
  data() {
    return {
      consultation: {
        visible: false,
        data: {}
      }
    }
  },
  methods: {
    onClickDetail() {
      this.consultation.visible = true
      this.consultation.data = {}

      const params = {
        consultNo: this.message.content.data.consultInfo.consultNo
      }

      peace.service.consult.getConsultInfo(params).then((res) => {
        this.consultation.data = res.data.info
      })
    }
  }
}
</script>

<style>
</style>