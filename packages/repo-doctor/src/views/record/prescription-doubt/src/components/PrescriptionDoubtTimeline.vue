<template>
  <div>
    <div class="q-mb-lg">
      <el-button plain>审方记录</el-button>
    </div>

    <el-card class="q-px-md q-py-lg">
      <ul class="el-timeline">
        <li class="el-timeline-item"
            v-for="item in timelineList"
            v-bind:key="item.createdTime">
          <div class="tl-timeline-time">
            <div class="text-grey-5">{{ Peace.dayjs(item.createdTime).format('YYYY-MM-DD') }}</div>
            <div class="text-grey-5">{{ Peace.dayjs(item.createdTime).format('HH:mm:ss') }}</div>
          </div>
          <div class="el-timeline-item__tail">
          </div>
          <div class="el-timeline-item__node el-timeline-item__node--normal el-timeline-item__node--primary">
          </div>
          <div class="el-timeline-item__wrapper">
            <div class="el-timeline-item__content">
              <div class="flex">
                <!-- 系统审方 -->
                <template v-if="item.auditCode">
                  <div>
                    <i class="el-icon-warning text-subtitle1 text-warning q-mr-sm"></i>
                    <span class="text-subtitle1">{{ item.auditCode }}</span>
                    <p class="q-px-md text-grey-999">系统</p>
                  </div>
                </template>

                <!-- 药师提醒 -->
                <template v-else>
                  <div>
                    <el-tag style="border-radius: 8px; padding: 0 16px; font-size: 14px;"
                            class="q-mb-xs"
                            type="warning">{{ prescripInfo.Prescription | filterDictionary(prescription_state) }}</el-tag>
                    <p class="q-px-md text-grey-999">{{ item.auditName }}</p>
                  </div>
                </template>

                <div class="col q-ml-lg">
                  {{ item.queryReason }}
                </div>
              </div>
            </div>
            <!---->
          </div>
        </li>
      </ul>
    </el-card>
  </div>
</template>

<script>
import Service from './../service'

export default {
  props: {
    prescriptionId: String
  },

  data() {
    return {
      prescription_state: [],

      timelineList: [],

      prescripInfo: {}
    }
  },

  created() {
    Peace.identity.dictionary.getList('prescription_state').then((res) => {
      this.prescription_state = res
    })

    Service.getPrescripInfo({ prescriptionId: this.prescriptionId }).then((res) => {
      this.prescripInfo = res.data
    })

    Service.getRecordPrescription({ prescriptionId: this.prescriptionId }).then((res) => {
      this.timelineList = res.data.recordList
    })
  }
}
</script>

<style scoped>
.el-timeline {
  padding: 0 0 0 72px;
}

.el-timeline-item {
  padding-bottom: 32px;
}

.el-timeline-item__node {
  width: 8px;
  height: 8px;
  left: 1px;
}

.tl-timeline-time {
  position: absolute;
  top: -4px;
  left: -80px;
  text-align: right;
}
</style>