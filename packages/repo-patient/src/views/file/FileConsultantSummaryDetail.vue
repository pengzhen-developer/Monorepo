<template>
  <div class="file-examination-detail">
    <div class="outline"
         v-if="data.consultSummary.consultFind">
      <div class="outline-body bdstyle">
        <div class="dl-packet">
          <div class="dt">会诊医生</div>
          <div class="dd">{{data.doctorInfo.toDoctorName}} {{data.doctorInfo.toDoctorTitle}}</div>
        </div>
        <div class="dl-packet">
          <div class="dt">会诊机构</div>
          <div class="dd">{{data.doctorInfo.toHospitalName}} {{data.doctorInfo.toDeptName}}</div>
        </div>
        <div class="dl-packet">
          <div class="dt">会诊所见</div>
          <div class="dd">{{data.consultSummary.consultFind}}</div>
        </div>
        <div class="dl-packet">
          <div class="dt">目前诊断</div>
          <div class="dd">{{data.consultSummary.consultDiagnose}}</div>
        </div>
        <div class="dl-packet">
          <div class="dt">建议</div>
          <div class="dd suggest">{{data.consultSummary.consultSuggest}}</div>
        </div>
        <div class="dl-packet">
          <div class="dt">会诊医师签名</div>
          <div class="dd">
            <img :src="data.consultSummary.doctorSignImg"
                 style="width:44px;height: 16.5px;background-size: cover" />
          </div>
        </div>
        <div class="dl-packet">
          <div class="dt">开始时间</div>
          <div class="dd">{{data.consultSummary.createdTime}}</div>
        </div>
        <div class="dl-packet noborder">
          <div class="dt">结束时间</div>
          <div class="dd">{{data.consultSummary.endTime}}</div>
        </div>
      </div>
    </div>
    <div class="none-page"
         v-else>
      <div class="icon icon_none_source t20"></div>
      <div class="none-text">暂无会诊小结</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {}
  }
}
</script>

<style lang="scss" scoped>
.file-examination-detail {
  height: 100%;
}
.outline {
  padding-left: 15px;
  margin: 0;
}
.outline .outline-header {
  margin: 10px 0;
}
.outline .outline-body {
  padding-left: 15px;
  overflow: hidden;
  margin: 0;
}

.bdstyle .dl-packet {
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  &.noborder {
    border: 0;
  }
}
.bdstyle .dt {
  width: 6em;
  padding-left: 0;
  padding-right: 0;
  color: #333;
  font-size: 14px;
}
.bdstyle .dd {
  color: #666;
  &.suggest {
    overflow: auto;
    text-overflow: unset;
    white-space: normal;
    word-break: break-all;
  }
}
</style>
