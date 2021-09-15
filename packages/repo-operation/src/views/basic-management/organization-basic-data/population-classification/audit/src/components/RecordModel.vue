<template>
  <div>
    <el-timeline>
      <time-line-item v-for="(activity, index) in activities"
                      :key="index"
                      type="primary"
                      placement="left"
                      v-bind:timestamp="Peace.util.formatDate(activity.updateTime,'YYYY-MM-DD')"
                      v-bind:timestampSpan="Peace.util.formatDate(activity.updateTime,'HH:mm:ss')">
        <div style="font-weight: 500">{{ activity.serviceStates| filterDictionary(source.MapperAuditStatus,'--') }}</div>
        <span class="remark_style">{{activity.notes}}</span>
      </time-line-item>
    </el-timeline>
  </div>
</template>

<script>
import Service from '../service'
import TimeLineItem from './timelie/TimeLineItem'
export default {
  name: 'RecordModel',
  components: { TimeLineItem },
  props: {
    info: Object
  },
  data() {
    return {
      activities: [],
      source: {
        MapperAuditStatus: []
      }
    }
  },
  async mounted() {
    this.source.MapperAuditStatus = await Peace.identity.dictionary.getList('mapper_audit_status')
    this.$nextTick().then(() => {
      this.fetch()
    })
  },
  methods: {
    fetch() {
      const params = { operaModule: '20', parentId: this.info.code }
      Service.humanClassReviewLog(params).then((res) => {
        this.activities = res.data
      })
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
