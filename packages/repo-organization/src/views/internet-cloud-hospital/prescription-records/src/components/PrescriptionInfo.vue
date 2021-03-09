<template>
  <div v-loading="loading">
    <div class="pres">
      <!-- <img :alt="presInfo.prescription"
           :src="imgSrc"
           class="status-image"
           v-if="imgSrc" /> -->
      <div class="pres-no">No.{{ presInfo.prescriptionNo }} <span @click="showDialog"
              v-if="dialog.data.pngUrl">查看原始处方</span></div>
      <div class="pres-title">
        <span>{{ presInfo.medicalInstitutionName }}</span>
        <br />
        <span>处方笺</span>
      </div>
      <div class="pres-info">
        <div class="info-row two-cols">
          <div class="info-row-label">
            <span>姓名</span>
          </div>
          <div class="info-row-content">{{ presInfo.patientName }}</div>
          <div class="info-row-label">
            <span>性别</span>
          </div>
          <div class="info-row-content">{{ presInfo.patientGender }}</div>
        </div>
        <div class="info-row two-cols">
          <div class="info-row-label">
            <span>年龄</span>
          </div>
          <div class="info-row-content">{{ presInfo.age }}</div>
          <div class="info-row-label">
            <span>科别</span>
          </div>
          <div class="info-row-content">{{ presInfo.medicalDepartmentName }}</div>
        </div>
        <div class="info-row two-cols">
          <div class="info-row-label">
            <span>体重</span>
          </div>
          <div class="info-row-content">{{ presInfo.weight ? presInfo.weight + 'kg' :'无'}}</div>
          <div class="info-row-label">
            <span>过敏史</span>
          </div>
          <div class="info-row-content">{{ presInfo.anaphylaxis || '无' }}</div>
        </div>
        <div class="info-row two-cols">
          <div class="info-row-label">
            <span>开具时间</span>
          </div>
          <div class="info-row-content">{{ presInfo.prescriptionTime }}</div>
          <div class="info-row-label">
            <span>病历号</span>
          </div>
          <div class="info-row-content">{{ presInfo.caseNo }}</div>
        </div>
      </div>
      <div class="info-row">
        <div class="info-row-label">
          <span>处方诊断</span>
        </div>
        <div class="info-row-content">
          <span :key="d.DiagnosisName"
                v-for="d in presInfo.diagnosisInfos">{{ d.DiagnosisName }}</span>
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
            <span>{{presInfo.doctorName}}</span>
          </div>
          <div class="info-row-label">
            <span>审方药师</span>
          </div>
          <div class="info-row-content">
            <span>{{presInfo.prescriptionPharmacistName}}</span>
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
        <div class="info-row-content">{{ presInfo.prescriptionExamMemo }}</div>
        <div class="info-row-label t-6">
          <span>系统审方结果</span>
        </div>
        <div class="info-row-content"></div>
      </div>
      <div class="ft info-row">
        <div class="info-row-label t-6">
          <span>药师质疑原因</span>
        </div>
        <div class="info-row-content">{{presInfo.queryReason}}</div>
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
const PRES_STATUS_IMAGE_MAP = {
  0: require('../assets/images/0@2x.png'),
  1: require('../assets/images/1@2x.png'),
  2: require('../assets/images/2@2x.png'),
  3: require('../assets/images/3@2x.png'),
  4: require('../assets/images/4@2x.png'),
  5: require('../assets/images/5@2x.png'),
  6: require('../assets/images/6@2x.png'),
  7: require('../assets/images/7@2x.png'),
  8: require('../assets/images/8@2x.png')
}

export default {
  name: 'PrescriptionInfo',
  props: ['id'],
  data() {
    return {
      loading: true,
      presInfo: {},
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
      if (this.presInfo.drugCode) {
        return this.presInfo.drugCode.filter((drug) => drug.drugName)
      }
      return []
    },
    imgSrc() {
      return PRES_STATUS_IMAGE_MAP[this.presInfo.prescription]
    }
  },
  watch: {
    id: {
      handler(val) {
        if (val) {
          this.getPrescriptionImage(val)
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.$nextTick().then(() => {
      this.getPrescriptionDetail(this.id)
    })
  },
  methods: {
    getPrescriptionDetail(id) {
      Service.getPrescriptionDetail({ prescribeId: id }).then((res) => {
        this.presInfo = res.data
        this.presInfo.prescriptionId = id
        this.loading = false
      })
    },
    getPrescriptionImage(prescriptionId) {
      const params = { prescriptionId }
      Service.getPrescriptionImage(params).then((res) => {
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
.info-row {
  font-size: 0;
  display: flex;
  &-label,
  &-content {
    font-size: 14px;
    line-height: 28px;
    display: inline-block;
    vertical-align: middle;
  }
  &-label {
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
  &-content {
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
    color: #778899;
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
</style>
