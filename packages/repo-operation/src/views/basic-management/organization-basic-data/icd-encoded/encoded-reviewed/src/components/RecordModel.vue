<template>
  <div>
    <el-timeline>
      <time-line-item v-for="(activity, index) in activities"
                      :key="index"
                      type="primary"
                      placement="left"
                      v-bind:timestamp="activity.timestamp"
                      v-bind:timestampSpan="activity.timestampSpan">
        <div style="font-weight: 500">{{ activity.serviceStates==='reject' ?'审核驳回':'审核通过' }}</div>
        <span class="remark_style">{{activity.notes}}</span>
      </time-line-item>
    </el-timeline>
  </div>
</template>

<script>
import TimeLineItem from './timeline/TimeLineItem'
export default {
  name: 'RecordModel',
  components: { TimeLineItem },
  props: {
    info: Array,
    default: () => {
      return []
    }
  },

  computed: {
    activities() {
      const list = []
      this.info.forEach((item) => {
        list.push({ ...item, timestamp: item.createTime.substring(0, 10), timestampSpan: item.createTime.substring(11, 19) })
      })
      return list
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
