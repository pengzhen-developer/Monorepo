<template>
  <div class="pres">
    <img
      :alt="getPrescriptionState(internalData.Prescription)"
      :src="`./static/images/inquiry/${ getPrescriptionState(internalData.Prescription) }.png`"
      class="status-image"
      v-show="getPrescriptionState(internalData.Prescription)"
    />
    <div class="pres-no">No.{{ internalData.PrescriptionNo }}</div>
    <div class="pres-title">
      <span>{{ internalData.MedicalInstitutionName }}</span>
      <br />
      <span>处方笺</span>
    </div>
    <div class="pres-info">
      <div class="info-row two-cols">
        <div class="info-row-label">
          <span>姓名</span>
        </div>
        <div class="info-row-content">{{ internalData.PatientName }}</div>
        <div class="info-row-label">
          <span>性别</span>
        </div>
        <div class="info-row-content">{{ internalData.PatientGender }}</div>
      </div>
      <div class="info-row two-cols">
        <div class="info-row-label">
          <span>年龄</span>
        </div>
        <div class="info-row-content">{{ internalData.Age }}岁</div>
        <div class="info-row-label">
          <span>科别</span>
        </div>
        <div class="info-row-content">{{ internalData.MedicalDepartmentName }}</div>
      </div>
      <div class="info-row two-cols">
        <div class="info-row-label">
          <span>开具时间</span>
        </div>
        <div class="info-row-content small-text">{{ internalData.PrescriptionTime }}</div>
        <div class="info-row-label">
          <span>病历号</span>
        </div>
        <div class="info-row-content small-text">{{ internalData.caseNo }}</div>
      </div>
      <div class="info-row two-cols">
        <div class="info-row-label">
          <span>处方诊断</span>
        </div>
        <div class="info-row-content">
          <span :key="d.DiagnosisName" v-for="d in internalData.DiagnosisInfos">{{ d.DiagnosisName }}</span>
        </div>
      </div>
    </div>
    <div class="rp-title">Rp</div>
    <div class="pres-rp">
      <div>
        <div :key="drug.drugCode" class="rp-item" v-for="drug in internalData.DrugCode">
          <div>
            <strong>
              <span style="margin-right: 10px;">{{ drug.drugName }}</span>
              <span>{{ drug.drugSpecifications }}</span>
              <span class="ft">x {{ drug.drugQty }}</span>
            </strong>
          </div>
          <div>
            <span>用法用量: {{ drug.drugRoute }}。 每次{{ drug.OnceDose }}{{ drug.OnceUnit }}， {{ drug.medicationFrequency }} {{ drug.medication_days ? '，' + drug.medication_days + '天' : '' }}</span>
          </div>
        </div>
      </div>
      <div class="info-row two-cols">
        <div class="info-row-label">
          <span>医师</span>
        </div>
        <div class="info-row-content">
          <img :src="internalData.DoctorSignImage" alt="医师签名" v-if="internalData.DoctorSignImage" />
        </div>
        <div class="info-row-label">
          <span>审方药师</span>
        </div>
        <div class="info-row-content">
          <img :src="internalData.PrescriptionSign" alt="审方药师签名" v-if="internalData.PrescriptionSign" />
        </div>
      </div>
      <div class="info-row two-cols">
        <div class="info-row-label">
          <span>调配药师</span>
        </div>
        <div class="info-row-content"></div>
        <div class="info-row-label">
          <span>核对发药</span>
        </div>
        <div class="info-row-content"></div>
      </div>
    </div>
    <div class="ft info-row two-cols">
      <div class="info-row-label t-6">
        <span>药师审方结果</span>
      </div>
      <div class="info-row-content"></div>
      <div class="info-row-label t-6">
        <span>系统审方结果</span>
      </div>
      <div class="info-row-content">{{ internalData.PrescriptionExamMemo }}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  },

  data() {
    return {
      prescriptionState: {
        未审方: '1',
        申诉中: '2',
        已通过: '3',
        已分配: '4',
        已发药: '5',
        已拒绝: '6',
        已作废: '7'
      }
    }
  },

  computed: {
    internalData() {
      return $peace.util.deepClone(this.data)
    },

    drugs() {
      return this.internalData.drugCodedrugCode && this.internalData.drugCodedrugCode.filter(drug => drug.drugName)
    }
  },

  methods: {
    getPrescriptionState(prescriptionState) {
      return Object.keys(this.prescriptionState).find(key => this.prescriptionState[key] === prescriptionState)
    }
  }
}
</script>
<style lang="scss" scoped>
.small-text {
  font-size: 12px;
}
.info-row {
  margin-top: 4px;
  font-size: 0;
  display: flex;
  &-label,
  &-content {
    font-size: 14px;
    line-height: 20px;
    display: inline-block;
    vertical-align: middle;
  }
  &-label {
    & > span {
      width: 4em;
      display: inline-block;
      text-align-last: justify;
      text-align: justify;
      text-justify: distribute-all-lines;
    }
    &.t-6 > span {
      width: 6em;
    }
    &.t-6 + .info-row-content {
      width: calc(100% - 7em);
    }
    &:after {
      content: '：';
    }
  }
  &-content {
    padding-left: 2px;
    width: calc(100% - 5em);
    font-weight: bold;
    word-break: break-all;
    & > img {
      height: 20px;
      display: block;
    }
  }
  &.two-cols {
    .info-row-label.t-6 + .info-row-content {
      width: calc(50% - 7em);
    }
    .info-row-content {
      width: calc(50% - 5em);
    }
  }
}

.pres {
  position: relative;
  padding: 7px 30px;
  & > div {
    padding: 0 11px;
  }
  .status-image {
    position: absolute;
    top: 50px;
    right: 60px;
    width: 72px;
    height: 72px;
    display: block;
  }
  .pres-no {
    font-size: 14px;
    line-height: 22px;
  }
  .pres-title {
    margin-top: 2px;
    padding-bottom: 25px;
    border-bottom: 1px dashed #bfbfbf;
    font-size: 22px;
    line-height: 25px;
    font-weight: bold;
    text-align: center;
  }
  .rp-title {
    margin-top: 8px;
    padding-bottom: 4px;
    font-size: 18px;
    line-height: 25px;
    border-bottom: 1px solid #f3f3f3;
  }
  .pres-info {
    padding-top: 2px;
  }
  .pres-rp {
    padding-bottom: 13px;
    border-bottom: 1px solid #f3f3f3;
  }
  .rp-item {
    padding: 9px 0;
    font-size: 14px;
    line-height: 22px;
    border-bottom: 1px dashed #c4c4c4;
    &:last-of-type {
      border-bottom: 0;
    }
    strong {
      font-size: 16px;
      line-height: 25px;
      span + span {
        margin-left: 10px;
      }
      .ft {
        float: right;
      }
    }
  }
}
</style>
