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
      <consult-detail :data="consultData"
                     @close="() => consultVisible = false"></consult-detail>
    </peace-dialog>
  </div>
</template>

<script>
  import get from 'lodash/get'
  import peace from '@src/library'
  import ConsultDetail from './ConsultDetail'
  const fake = {
    "code": 200,
    "success": true,
    "msg": "获取成功",
    "data": {
      "patientInfo": {
        "familyName": "赵刚",
        "sex": "男",
        "age": 41,
        "createTime": "2019-12-11",
        "doctorName": "余运芳",
        "deptName": "妇产科",
        "hospitalName": "武汉市第一医院"
      },
      "consultSummary": {
        "consultFind": "aaa",
        "consultDiagnose": "感染性腹泻",
        "consultSuggest": "bbb",
        "doctorSignImg": "",
        "consultStatus": 7,
        "endTime": "2019-12-11 19:20:07",
        "createdTime": "2019-12-11 17:28:08",
        "toDoctorName": "刘熠",
        "toHospitalName": "武汉九州通医院",
        "toDeptName": "普通外科",
        "toDoctorTitle": "医师"
      },
      "caseInfo": {
        "caseNo": "BL2019121102485640",
        "visitDate": "2019-12-11 19:19:02",
        "baseIllness": "太久了伦理剧",
        "presentHistory": "伦理剧",
        "allergyHistory": "灭吐灵过敏  ,抗生素制剂过敏,碘剂过敏",
        "pastHistory": "胃炎,原发性高血压,脑梗死",
        "InspectionIndex": {
          "More": "",
          "temperature": "1",
          "weight": "2",
          "heart_rate": "3",
          "blood_pressure": "4/5"
        },
        "diagnose": "急性上呼吸道感染 | 原发性高血压",
        "summary": "图",
        "ALT": "",
        "AST": "",
        "HBV": ""
      },
      "prescribeInfos": {
        "list": [
          {
            "prescriptionNo": "2019121155525550",
            "diagnosisInfos": "急性上呼吸道感染 | 原发性高血压",
            "drugCode": [
              {
                "drugCode": "djskqyrhqe",
                "drugName": "艾司奥美拉唑镁肠溶片(耐信)",
                "drugQty": 1,
                "drugSpecifications": "40mg*7s",
                "drugUse": "用法用量：腹腔化疗。每次1mg,每周 星期1,6"
              }
            ],
            "prescription": 1,
            "prescriptionExamMemo": "处方正在审核中，请耐心等待！",
            "psychiatric": null,
            "doctorSignImage": "https://devdoctor.hp.aijiayi.com/data/20191211ywq/20191211191935_3642088.jpg",
            "prescriptionPharmacistName": "",
            "prescriptionSign": "",
            "disPharmacist": "",
            "sendPharmacist": "",
            "claimNo": "3O5NM0-201912111919550984-2019121155525550",
            "PrescriptionExamMemo": "处方正在审核中，请耐心等待！",
            "prescriptionExamTime": null
          },
          {
            "prescriptionNo": "2019121139528682",
            "diagnosisInfos": "急性上呼吸道感染 | 原发性高血压",
            "drugCode": [
              {
                "drugCode": "ahhyzvkmib",
                "drugName": "兰索拉唑肠溶片",
                "drugQty": 1,
                "drugSpecifications": "15mg*7s",
                "drugUse": "用法用量：腹腔化疗。每次1mg,每周 星期1,6"
              }
            ],
            "prescription": 1,
            "prescriptionExamMemo": "处方正在审核中，请耐心等待！",
            "psychiatric": null,
            "doctorSignImage": "https://devdoctor.hp.aijiayi.com/data/20191211ywq/20191211191935_3642088.jpg",
            "prescriptionPharmacistName": "",
            "prescriptionSign": "",
            "disPharmacist": "",
            "sendPharmacist": "",
            "claimNo": "3O5NM0-201912111919400340-2019121139528682",
            "PrescriptionExamMemo": "处方正在审核中，请耐心等待！",
            "prescriptionExamTime": null
          }
        ],
        "total": 2
      }
    },
    "param": null
  }

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
        const consultNo = get(this, 'data.consultNo', null)
        if (consultNo === null) {
          console.log('缺少会诊ID')
          return;
        }
        this.consultVisible = true
        this.getConsultDetail(consultNo)
      },
      getConsultDetail(consultNo) {
        const params = {
          dataNo: consultNo,
        }

        peace.service.health.consultDetail(params).then(res => {
          // this.consultData = res.data
          this.consultData = fake.data
          console.log(this.consultData)
        })
      },
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

