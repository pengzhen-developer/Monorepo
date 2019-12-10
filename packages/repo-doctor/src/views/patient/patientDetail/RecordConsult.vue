<template>
  <div class="record-consult" @click="onClickConsultDetail">
    <div class="record-consult__left">
      <img :src="require('@src/assets/images/ic_会诊.png')" />
    </div>
    <div class="record-consult__right">
      <div class="title">会诊单</div>
      <div class="content">
        <span>{{ netHospitalName }}</span>
        <span v-if="netHospitalName !== '' && netDeptName !== ''"> | </span>
        <span>{{ netDeptName }}</span>
      </div>
    </div>
    <peace-dialog :visible.sync="consultVisible"
                  v-if="consultVisible"
                  append-to-body
                  title="会诊详情">
      <ConsultDetail :data="consultData"
                     @close="() => consultVisible = false"></ConsultDetail>
    </peace-dialog>
  </div>
</template>

<script>
  import get from 'lodash/get'
  // import peace from '@src/library'
  import ConsultDetail from './ConsultDetail'
  const fakeData = {"patientInfo":{"familyName":"胡彪","sex":"男","age":26,"createTime":"2019-12-08","doctorName":"刘熠","deptName":"普通外科","hospitalName":"武汉九州通医院"},"caseInfo":{"caseNo":"BL2019120817832032","visitDate":"2019-12-08 00:00:00","baseIllness":"sadsdasdda","presentHistory":"","allergyHistory":"","pastHistory":"","InspectionIndex":{"blood_pressure":"","temperature":"","weight":"","heart_rate":"","More":""},"diagnose":"消化不良","summary":"","ALT":"","AST":"","HBV":""},"prescribeInfos":{"list":[{"prescriptionNo":"2019120845395896","diagnosisInfos":"消化不良","drugCode":[{"drugCode":"ayjnpxtplw","drugName":"阿莫西林克拉维酸钾(14:1)干混悬剂(今利辰)","drugQty":1,"drugSpecifications":"0.643g*12袋","drugUse":"用法用量：吞服。每次1,一日3次,1天"}],"prescription":1,"prescriptionExamMemo":"处方正在审核中，请耐心等待！","psychiatric":null,"doctorSignImage":"https://devdoctor.hp.aijiayi.com/","prescriptionPharmacistName":"","prescriptionSign":"","disPharmacist":"","sendPharmacist":"","claimNo":"3O0HDB-201912081630540878-2019120845395896","PrescriptionExamMemo":"处方正在审核中，请耐心等待！","prescriptionExamTime":null}],"total":1}}

  export default {
    name: 'RecordConsult',
    components: {
      ConsultDetail
    },
    props: {
      data: {
        type: Object,
        default() {
          return {
            noData: true
          }
        }
      },
      type: String
    },
    data() {
      return {
        consultData: null,
        consultVisible: false
      }
    },
    computed: {
      netHospitalName() {
        return get(this, 'data.netHospitalName', '')
      },
      netDeptName() {
        return get(this, 'data.netDeptName', '')
      }
    },
    methods: {
      onClickConsultDetail() {
        this.consultData = fakeData
        this.consultVisible = true
        // this.getConsultDetail(this.referralNo)
      },
      // getConsultDetail(referralNo) {
      //   const params = {
      //     referral_no: referralNo,
      //     referral_type: 'out'
      //   }
      //
      //   peace.service.inquiry.referralDocPc(params).then(res => {
      //     this.consultData = res.data
      //   })
      // },
    }
  }
</script>

<style scoped lang="scss" type="text/scss">
  .record-consult {
    width: 100%;
    height: 80px;
    padding: 16px;
    cursor: pointer;

    display: flex;
    justify-content: start;
    align-items: center;

    &__left {
      margin: 0 18px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &__right {
      display: flex;
      justify-content: center;
      align-items: start;
      flex-direction: column;

      .title {
        font-size: 16px;
        color: #333333;
      }

      .content {
        font-size: 12px;
        color: #999999;
      }
    }
  }
</style>

