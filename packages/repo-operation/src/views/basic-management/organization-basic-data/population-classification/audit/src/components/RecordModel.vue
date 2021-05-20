<template>
  <div>
    <el-timeline>
      <time-line-item v-for="(activity, index) in activities"
                      :key="index"
                      type="primary"
                      placement="left"
                      v-bind:timestamp="activity.timestamp"
                      v-bind:timestampSpan="activity.timestampSpan">
        <div style="font-weight: 500">{{ activity.refundStatusTxt }}</div>
        <span class="remark_style">{{activity.remark}}</span>
      </time-line-item>
    </el-timeline>
  </div>
</template>

<script>
import TimeLineItem from './timelie/TimeLineItem'
export default {
  name: 'RecordModel',
  components: { TimeLineItem },
  props: {
    info: Object
  },
  data() {
    return {
      activities: [
        { timestamp: '04-13', timestampSpan: '12:00:00', refundStatusTxt: '审核驳回', remark: '配码错误' },
        { timestamp: '04-12', timestampSpan: '12:01:00', refundStatusTxt: '审核通过', remark: '' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.remark_style {
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(51, 51, 51, 0.4);
  line-height: 18px;
}
</style>
