<template>
  <div>
    <div class="tips"
         v-if="!info.current&&info.total > 1">
      <span>共{{ info.total }}张，当前第{{ info.prescribeIndex+1 }}张（{{ info.prescribeIndex+1 }}/{{ info.total }}）</span>
      <div @click="goToNext()"
           class="next">
        <span>下一张</span>
        <i class="arrow"></i>
      </div>
    </div>
    <div class="pres">
      <div class="pres-no">No.{{ info.prescriptionNo }} <span @click="showDialog"
              v-if="dialog.data.pngUrl">查看原始处方</span></div>
      <div class="pres-title">
        <span>{{ info.medicalInstitutionName }}</span>
        <br />
        <span>处方笺</span>
      </div>
      <div class="pres-info">
        <div class="info-row two-cols">
          <div class="info-row-label">
            <span>姓名</span>
          </div>
          <div class="info-row-content">{{ info.patientName }}</div>
          <div class="info-row-label">
            <span>性别</span>
          </div>
          <div class="info-row-content">{{ info.patientGender }}</div>
        </div>
        <div class="info-row two-cols">
          <div class="info-row-label">
            <span>年龄</span>
          </div>
          <div class="info-row-content">{{ info.age }}</div>
          <div class="info-row-label">
            <span>科别</span>
          </div>
          <div class="info-row-content">{{ info.medicalDepartmentName }}</div>
        </div>
        <div class="info-row two-cols">
          <div class="info-row-label">
            <span>体重</span>
          </div>
          <div class="info-row-content">{{ info.weight ?  info.weight + 'kg':'无'}}</div>
          <div class="info-row-label">
            <span>过敏史</span>
          </div>
          <div class="info-row-content">{{ info.anaphylaxis || '无' }}</div>
        </div>
        <div class="info-row two-cols">
          <div class="info-row-label">
            <span>开具时间</span>
          </div>
          <div class="info-row-content">{{ info.prescriptionTime }}</div>
          <div class="info-row-label">
            <span>病历号</span>
          </div>
          <div class="info-row-content">{{ info.caseNo }}</div>
        </div>
        <div class="info-row">
          <div class="info-row-label">
            <span>处方诊断</span>
          </div>
          <div class="info-row-content">
            <span :key="d.DiagnosisName"
                  v-for="d in info.diagnosisInfos">{{ d.DiagnosisName }}</span>
          </div>
        </div>
      </div>
      <div class="rp-title">Rp</div>
      <div class="pres-rp">
        <div>
          <div :key="drug.drugCode"
               class="rp-item"
               v-for="drug in drugs">
            <div>
              <strong>
                <span>{{ drug.drugName }}</span>
                <span>{{ drug.drugSpecifications }}</span>
                <span class="ft">x{{ drug.drugQty }}</span>
              </strong>
            </div>
            <div>
              <span>{{ drug.drugUse }}</span>
            </div>
          </div>
        </div>
        <div class="info-row two-cols">
          <div class="info-row-label">
            <span>医师</span>
          </div>
          <div class="info-row-content">
            <span>{{ info.doctorName}}</span>
          </div>
          <div class="info-row-label">
            <span>审方药师</span>
          </div>
          <div class="info-row-content">
            <span>{{ info.prescriptionPharmacistName}}</span>
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
        <div class="info-row-content">{{ info.prescriptionExamMemo }}</div>
        <div class="info-row-label t-6">
          <span>系统审方结果</span>
        </div>
        <div class="info-row-content"></div>
      </div>
    </div>
    <!-- 原始处方 -->
    <template>
      <peace-dialog :visible.sync="dialog.visible"
                    append-to-body
                    v-show="dialog.visible&&dialog.data.show">
        <el-image :src="dialog.data.pngUrl"
                  @load="onLoad"></el-image>
      </peace-dialog>
    </template>
  </div>
</template>
<script>
import Service from '../service'
export default {
  name: 'prescription-order-detail',
  props: {
    info: {
      type: Object
    },
    data: {
      type: Object
    }
  },
  data() {
    return {
      imgSrc: '',
      dialog: {
        visible: false,
        data: {
          pngUrl: '',
          show: false
        }
      }
    }
  },

  computed: {
    drugs() {
      if (this.info.drugCode) {
        return this.info.drugCode.filter((drug) => drug.drugName)
      }
      return []
    },
    ImgSrc() {
      return require(`../assets/images/presStatus/${this.info.prescriptionStatus}.jpg`)
    }
  },

  watch: {
    info: {
      handler(val) {
        if (val && val.prescriptionId) {
          this.getPrescriptionImage(val.prescriptionId)
        }
      },
      immediate: true
    }
  },

  methods: {
    goToNext() {
      if (this.info.prescribeIndex == this.info.total - 1) {
        this.info.prescribeIndex = 0
      } else {
        this.info.prescribeIndex++
      }
      const param = {
        ids: this.info.presIds,
        idx: this.info.prescribeIndex
      }
      this.$emit('viewPres', param)
    },
    getPrescriptionImage(prescriptionId) {
      const param = { prescriptionId }
      Service.getPrescriptionImage(param).then((res) => {
        this.dialog.data.pngUrl = res.data.pngUrl
      })
    },
    showDialog() {
      this.dialog.visible = !this.dialog.visible
    },
    onLoad() {
      this.dialog.data.show = true
    }
  }
}
</script>
<style lang="scss" scoped>
.tips {
  width: 530px;
  height: 37px;
  font-size: 14px;
  line-height: 37px;
  margin: 0 auto 15px;
  color: #333333;
  // padding: 0 40px;
  padding-left: 40px;
  padding-right: 13px;
  background: rgba(249, 249, 249, 1) url('../assets/images/ic_tixing.png') no-repeat;
  background-position: 13px 11px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .next {
    cursor: pointer;
    i.arrow {
      width: 4px;
      height: 8px;
      display: inline-block;
      background: rgba(249, 249, 249, 1) url('../assets/images/systen-Triangle.png') no-repeat;
      margin-left: 10px;
    }
  }
}
.pres {
  position: relative;
  padding: 7px 0px;
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
    color: #999;
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
      color: var(--q-color-primary);
      cursor: pointer;
    }
  }
  .pres-title {
    margin-top: 2px;
    padding-bottom: 25px;
    border-bottom: 1px dashed #bfbfbf;
    font-size: 22px;
    line-height: 25px;
    font-weight: bold;
    text-align: center;
    color: #333;
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
    color: #999;
    font-size: 14px;
    line-height: 22px;
    border-bottom: 1px dashed #c4c4c4;
    &:last-of-type {
      border-bottom: 0;
    }
    strong {
      color: #333;
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

.info-row {
  font-size: 0;
  display: flex;
  .info-row-label,
  .info-row-content {
    font-size: 14px;
    line-height: 28px;
    display: inline-block;
    vertical-align: middle;
  }
  .info-row-label {
    color: #778899;
    white-space: nowrap;
    & > span {
      width: 4.3em;
      text-align: right;
      text-align-last: justify;
      text-align: justify;
      text-justify: distribute-all-lines;
      display: inline-block;
    }
    &.t-6 > span {
      width: 6em;
    }
    &.t-6 + .info-row-content {
      width: calc(100% - 7em);
    }
    &.t-7 > span {
      width: 7em;
    }
    &.t-7 + .info-row-content {
      width: calc(100% - 8em);
    }
    &:after {
      content: '：';
    }
  }
  .info-row-content {
    padding-left: 2px;
    width: calc(100% - 1em - 4.3em);
    font-weight: bold;
    word-break: break-all;
    color: #23313f;
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
      width: calc(50% - 1em - 4.3em);
    }
  }
}
</style>
