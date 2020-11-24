<template>
  <div class="layout-route">
    <div class="tabs">
      <el-button v-bind:type="tab.checked?'primary':'default'"
                 v-for="(tab,index) in tabs"
                 v-on:click="changeTab(tab.value,index)"
                 :key="tab.value">{{tab.label}}</el-button>
    </div>
    <!-- 审方记录 -->
    <div class="card"
         v-show="active===0">
      <div class="timeline">
        <div class="timeline-item"
             v-for="(log,index) in innerPrescriptionLog"
             v-bind:key="index">
          <div class="time text-color-grey-999">{{log.CreateTime}}</div>
          <div class="flex row justify-betwee">
            <div class="col-2"
                 style="min-width: 6em;">
              <div class="title"
                   v-bind:class="{'other':getImageStyle(log.code)}">
                <el-image v-bind:src="getImage(log.action,log.code)"></el-image>
                <span class="text-color-grey-333 "
                      v-html="getText(log.action,log.code)"></span>
              </div>
              <div class="subtitle text-color-grey-999"
                   v-html="getLogNameText(log.name,log.code)"></div>
            </div>
            <div class="col q-pl-sm"
                 v-html="getLogNoteText(log.note,log.code)">
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 系统审方结果 -->
    <div class="card result"
         v-show="active===1">
      <PrescriptionAudit v-bind:data="actionDetail"></PrescriptionAudit>
    </div>
  </div>
</template>

<script>
import CONSTANT from '../constant'
import PrescriptionAudit from './prescription-audit.vue'
export default {
  name: 'PrescriptionReviewReslut',
  props: {
    actionDetail: Object,
    prescriptionLog: Object
  },
  components: {
    PrescriptionAudit
  },
  data() {
    return {
      innerActionDetail: {},
      innerPrescriptionLog: {},
      source: {
        // 系统审核结果类型
        SYSTEM_AUDIT_RESULTS_DETAIL_TYPE_MAP: CONSTANT.SYSTEM_AUDIT_RESULTS_DETAIL_TYPE_MAP,
        //药师审核结果
        RESULTS_AUDIT_PHARMACIST_DETAIL_TYPE_MAP: CONSTANT.RESULTS_AUDIT_PHARMACIST_DETAIL_TYPE_MAP
      },
      tabs: [
        { label: '审方记录', value: 0, checked: true },
        { label: '系统审方结果', value: 1, checked: false }
      ],
      active: 0
    }
  },
  watch: {
    actionDetail: {
      handler(val) {
        this.innerActionDetail = Object.assign({}, val)
      },
      immediate: true
    },
    prescriptionLog: {
      handler(val) {
        this.innerPrescriptionLog = Object.assign({}, val)
      },
      immediate: true
    }
  },
  computed: {
    //系统审方结果
    actionCode() {
      return this.innerActionDetail?.actionCode
    }
  },
  methods: {
    getImageStyle(code) {
      //系统审方 code == 'HDY' || code == 'DST' || code == 'YFZL' || code == 'WSF'
      const systemCodes = ['HDY', 'DST', 'YFZL', 'WSF']
      if (systemCodes.includes(code)) {
        return false
      } else {
        return true
      }
    },
    getImage(action, code) {
      //系统审方 code == 'HDY' || code == 'DST' || code == 'YFZL' || code == 'WSF'
      const systemCodes = ['HDY', 'DST', 'YFZL', 'WSF']
      if (systemCodes.includes(code)) {
        return this.getSystemAuditResultsImage(action)
      } else {
        return this.getPharmacistAuditResultsImage(action)
      }
    },
    getText(action, code) {
      //系统审方 code == 'HDY' || code == 'DST' || code == 'YFZL' || code == 'WSF'
      const systemCodes = ['HDY', 'DST', 'YFZL', 'WSF']
      if (systemCodes.includes(code)) {
        return this.getSystemAuditResultsText(action)
      } else {
        return this.getPharmacistAuditResultsText(action)
      }
    },
    getLogNameText(name, code) {
      //系统审方 code == 'HDY' || code == 'DST' || code == 'YFZL' || code == 'WSF'
      const systemCodes = ['HDY', 'DST', 'YFZL', 'WSF']
      if (systemCodes.includes(code)) {
        return '系统'
      } else {
        return name
      }
    },
    getLogNoteText(note, code) {
      //系统审方 code == 'HDY' || code == 'DST' || code == 'YFZL' || code == 'WSF'
      const systemCodes = ['HDY', 'DST', 'YFZL', 'WSF']
      if (systemCodes.includes(code)) {
        return '系统审方结果'
      } else {
        return note
      }
    },
    //药师审方icon
    getPharmacistAuditResultsImage(status) {
      return require(`../assets/img/pharmacist_review_status_${status}.png`)
    },
    //药师审方text
    getPharmacistAuditResultsText(status) {
      return this.source.RESULTS_AUDIT_PHARMACIST_DETAIL_TYPE_MAP.find((item) => item.value === status)?.label
    },
    //系统审方icon
    getSystemAuditResultsImage(status) {
      return require(`../assets/img/system_audit_status_${status}.png`)
    },
    //系统审方text
    getSystemAuditResultsText(status) {
      return this.source.SYSTEM_AUDIT_RESULTS_DETAIL_TYPE_MAP.find((item) => item.value === status)?.label
    },

    changeTab(value, index) {
      if (this.active !== value) {
        this.active = value
        this.tabs.map((item) => (item.checked = false))
        this.tabs[index].checked = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.layout-route {
  min-height: 374px;
  position: relative;
}
.card {
  margin-top: 16px;
  padding: 24px;

  box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  min-height: 374px;
  &.result {
    padding: 0 0 10px 0;
  }
  .header {
    background-color: #eaf4f6;
    height: 50px;
    line-height: 50px;
    font-size: 20px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
  }
  .contenter {
    .el-image {
      width: 30px;
      height: 30px;
      margin-right: 16px;
    }
    span {
      font-size: 28px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      line-height: 1;
    }
  }
}
.timeline {
  font-size: 12px;
  .timeline-item {
    position: relative;
    padding: 20px 0 30px 10px;
    &:last-child {
      padding-bottom: 0;
      &::after {
        height: 90%;
      }
    }
    &::after {
      content: ' ';
      width: 1px;
      height: 100%;
      background-color: var(--q-color-primary);
      position: absolute;
      left: 0;
      top: 0;
    }
    &::before {
      content: ' ';
      width: 7px;
      height: 7px;
      border-radius: 7px;
      background-color: var(--q-color-primary);
      left: -3px;
      top: 0;
      position: absolute;
    }
    .time {
      position: absolute;
      left: 10px;
      top: -5px;
    }
    .title {
      display: flex;
      align-items: center;
      margin-bottom: 5px;
      line-height: 1;
      &.other {
        .el-image {
          width: 44px;
          height: 15px;
        }
      }
      .el-image {
        width: 13px;
        height: 13px;
        margin-right: 5px;
      }
    }
  }
}
.text-color-grey-999 {
  color: var(--q-color-grey-999);
}
</style>