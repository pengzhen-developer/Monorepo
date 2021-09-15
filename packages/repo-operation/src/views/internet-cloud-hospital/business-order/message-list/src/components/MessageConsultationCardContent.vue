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
    <peace-dialog :close-on-click-modal="false"
                  :close-on-press-escape="false"
                  :visible.sync="consult.visible"
                  append-to-body
                  title="会诊详情"
                  v-if="consult.visible"
                  width="580px">
      <ConsultationInfo :info="consult.data"></ConsultationInfo>
    </peace-dialog>
  </div>
</template>

<script>
import MessageConsultationCard from './MessageConsultationCard'
import ConsultationInfo from './ConsultationInfo'
import Service from '../service'
export default {
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  components: {
    MessageConsultationCard,
    ConsultationInfo
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
      consult: {
        visible: false,
        data: {}
      }
    }
  },
  methods: {
    onClickDetail() {
      const params = { consultNo: this.message.content.data.consultInfo.consultNo }
      Service.getInfo(params).then((res) => {
        this.consult.data = res.data.info
        this.consult.visible = true
      })
    }
  }
}
</script>

<style>
</style>