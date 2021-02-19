<template>

  <el-timeline class="q-mt-30 q-ml-46">
    <el-timeline-item placement="top"
                      color="rgba(0,198,174,1)"
                      v-for="item in data"
                      v-bind:timestamp="item.createdTime.substring(5, 10)"
                      v-bind:hide-timestamp="!item.showTimeLabel"
                      v-bind:key="item.dataNo"
                      v-on:click.native="showDetail(item.dataNo)">
      <div v-if="item.showTimeLabel"
           class="year-label">{{ item.createdTime.substring(0, 4) }}</div>
      <div class="case-bg cursor-pointer">

        <div class="row q-mb-14">

          <img src="@src/assets/images/inquiry/ic_option_record.png"
               style="width: 40px; height:40px" />
          <div class="q-ml-10">
            <p class="case-title">{{ item.title }}</p>
            <p class="case-subtitle">{{ item.hospitalName }} | {{ item.deptName }}</p>
          </div>
        </div>

        <div class="q-mb-2"
             v-if="item.diagnosis">
          <q-separator />
          <p class="text-primary q-mt-8"
             style="line-height:18px; font-size:13px;">{{ item.diagnosis || '' }}</p>
        </div>
      </div>

    </el-timeline-item>

    <PeaceDialog v-if="optionDialog.visible"
                 :visible.sync="optionDialog.visible"
                 append-to-body
                 title="处方详情">
      <FirstOptionDetail :prescriptionCode="optionDialog.data"></FirstOptionDetail>
    </PeaceDialog>

  </el-timeline>
</template>

<script>
import FirstOptionDetail from '@src/views/patient/patientDetail/src/components/FirtstOptionDetail.vue'
export default {
  props: {
    /*
     * 诊疗记录列表
     */
    data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      optionDialog: {
        visible: false,
        data: undefined
      }
    }
  },
  components: {
    FirstOptionDetail
  },

  methods: {
    showDetail(info) {
      this.optionDialog.visible = true
      this.optionDialog.data = info
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-timeline-item__content {
  position: relative;
}

/deep/ .el-timeline-item__timestamp {
  font-size: 14px;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
  line-height: 10px;
}

.year-label {
  position: absolute;
  top: -22px;
  left: -80px;
  font-size: 12px;

  font-weight: 500;
  color: rgba(153, 153, 153, 1);
  line-height: 17px;
}

.case-bg {
  position: relative;
  left: 90px;
  top: -26px;
  padding: 10px 14px;
  border-radius: 4px;
  background-color: white;
  max-width: 307px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 1px 5px 0px rgba(221, 221, 221, 0.5);
  border-radius: 4px;

  .case-title {
    font-size: 16px;
    color: #333 !important;
    line-height: 22px;
  }

  .case-subtitle {
    font-size: 13px;
    color: #999 !important;
    line-height: 18px;
  }
}
</style>