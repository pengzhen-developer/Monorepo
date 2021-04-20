<template>
  <div class="q-my-20">
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
import TimeLineItem from './timeline/TimeLineItem'
import Service from '../service'

export default {
  name: 'RefundDetail',

  props: {
    orderNo: {
      type: String,
      required: true
    }
  },

  components: {
    TimeLineItem
  },

  mounted() {
    this.$nextTick().then(() => {
      this.fetch()
    })
  },

  data() {
    return {
      activities: []
    }
  },

  methods: {
    fetch() {
      Service.refundDetail(this.orderNo).then((res) => {
        const list = res.data.list.map((item) => {
          let tmp = item
          let time = tmp.createdTime
          item.timestamp = time.substring(5, 10)
          item.timestampSpan = time.substring(11, 19)
          return tmp
        })
        this.activities = list
      })
    }
  }
}
</script>

<style lang="scss">
.remark_style {
  width: 100px;
  margin-top: 4px;
  font-size: 12px;
  color: var(--q-color-grey-999);
  word-break: break-all;
}
</style>