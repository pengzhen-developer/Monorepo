<template>
  <div>
    <div class="info-title">基本信息</div>
    <div class="q-pb-16">
      <div class="row q-mb-16">
        <div class="col-7 row">
          <p>流水号：</p>
          <span>{{info.waterNo}}</span>
        </div>
        <div class="col-5 row">
          <p>服务包名称：</p>
          <span>{{info.servicePackageName}}</span>
        </div>
      </div>
      <div class="row q-mb-16">
        <div class="col-7 row">
          <p>关联交易单号：</p>
          <span>{{info.businessNo}}</span>
        </div>
        <div class="col-5 row">
          <p>核销时间：</p>
          <span>{{info.createdTime}}</span>
        </div>
      </div>
      <div class="row q-mb-16">
        <div class="row">
          <p>核销操作人：</p>
          <span>{{info.operater}}</span>
        </div>
      </div>
    </div>
    <div class="info-title">核销信息</div>
    <div class="col q-pb-16">
      <div class="row q-mb-16">
        <p>核销患者：</p>
        <span>{{info.familyName}}</span>
      </div>
      <div class="row q-mb-16">
        <p>服务提供方：</p>
        <span>{{info.provider}}</span>
      </div>
      <div class="row q-mb-16">
        <p>核销内容：</p>
        <span>{{info.writeName}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Service from '../service'
export default {
  props: {
    data: String
  },
  data() {
    return {
      info: {}
    }
  },
  created() {
    this.getRecordInfo()
  },
  methods: {
    getRecordInfo() {
      Service.writeRecordInfo({ waterNo: this.data }).then((res) => {
        this.info = res.data
      })
    }
  }
}
</script>

<style  lang="scss" scoped>
p {
  margin: 0;
  padding: 0;
  color: #333;
}
span {
  color: rgba(51, 51, 51, 0.6);
  margin-left: 8px;
  flex: 1;
}
.info-title {
  position: relative;
  padding-left: 14px;
  margin-bottom: 25px;
  font-size: 16px;
  font-weight: 500;
  color: #333333;
  line-height: 22px;
  &::before {
    content: '';
    position: absolute;
    top: 4px;
    left: 0;
    width: 4px;
    height: 16px;
    background-color: var(--q-color-primary);
    border-radius: 2px;
  }
}
</style>