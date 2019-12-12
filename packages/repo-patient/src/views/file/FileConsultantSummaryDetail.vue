<template>
  <div class="file-examination-detail">
    <div class="outline"
         v-if="data.consultStatus==7">
      <div class="outline-body bdstyle">
        <div class="dl-packet">
          <div class="dt">会诊医生</div>
          <div class="dd">{{data.toDoctorName}} {{data.toDoctorTitle}}</div>
        </div>
        <div class="dl-packet">
          <div class="dt">会诊机构</div>
          <div class="dd">{{data.toHospitalName}} {{data.toDeptName}}</div>
        </div>
        <div class="dl-packet">
          <div class="dt">会诊所见</div>
          <div class="dd">{{data.consultFind}}</div>
        </div>
        <div class="dl-packet">
          <div class="dt ">目前诊断</div>
          <div class="dd">{{data.consultDiagnose}}</div>
        </div>
        <div class="dl-packet">
          <div class="dt justify">建议</div>
          <div class="dd suggest">{{data.consultSuggest}}</div>
        </div>
        <div class="dl-packet">
          <div class="dt">会诊医师签名</div>
          <div class="dd">
            <img :src="data.doctorSignImg"
                 v-if="data.doctorSignImg"
                 style="width:44px;height: 16.5px;background-size: cover" />
          </div>
        </div>
        <div class="dl-packet">
          <div class="dt">开始时间</div>
          <div class="dd">{{data.createdTime}}</div>
        </div>
        <div class="dl-packet noborder">
          <div class="dt">结束时间</div>
          <div class="dd">{{data.endTime}}</div>
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
  &.justify {
    width: 4em;
    height: 24px;
    line-height: 24px;
    padding: 0;
    text-align: justify;
    text-align-last: justify;
    &::after {
      content: '';
      display: inline-block;
      width: 100%;
      height: 0;
    }
  }
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
