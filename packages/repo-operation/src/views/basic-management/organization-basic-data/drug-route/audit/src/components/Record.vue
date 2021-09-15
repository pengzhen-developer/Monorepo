<template>
  <div v-loading="loading">
    <el-timeline>
      <time-line-item v-for="(activity, index) in activities"
                      :key="index"
                      type="primary"
                      placement="left"
                      v-bind:timestamp="activity.timestamp"
                      v-bind:timestampSpan="activity.timestampSpan">
        <div style="font-weight: 500">{{ activity.serviceStates === 'reject' ? '审核驳回':'审核通过' }}</div>
        <span class="remark_style">{{activity.notes}}</span>
      </time-line-item>
    </el-timeline>
  </div>
</template>

<script>
import TimeLineItem from './timeline/TimeLineItem'
import Service from '../service'

export default {
  name: 'Record',
  components: { TimeLineItem },
  props: {
    data: Object
  },

  data() {
    return {
      loading: true,
      record: []
    }
  },

  computed: {
    activities() {
      const list = []
      this.record.forEach((item) => {
        list.push({ ...item, timestamp: item.createTime.substring(0, 10), timestampSpan: item.createTime.substring(11, 19) })
      })
      return list
    }
  },

  created() {
    this.getRecord()
  },

  methods: {
    getRecord() {
      let params = {
        operaModule: '40',
        parentId: this.data.code
      }
      Service.record(params)
        .then((res) => {
          this.record = res.data || []
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>