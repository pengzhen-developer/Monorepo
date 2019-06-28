<template>
  <div class="info">
    <div class="info-row">
      <div class="info-row-label">
        <span>婚姻状况</span>
      </div>
      <div class="info-row-content">
        <strong>已婚</strong>
      </div>
    </div>
    <div class="info-row">
      <div class="info-row-label">
        <span>生育状态</span>
      </div>
      <div class="info-row-content">
        <strong>已生育</strong>
      </div>
    </div>
    <div class="info-row">
      <div class="info-row-label">
        <span>手术或外伤</span>
      </div>
      <div class="info-row-content">
        <strong>暂无</strong>
      </div>
    </div>
    <div class="info-row">
      <div class="info-row-label">
        <span>家族病史</span>
      </div>
      <div class="info-row-content">
        <strong>暂无</strong>
      </div>
    </div>
    <div class="info-row">
      <div class="info-row-label">
        <span>药物过敏</span>
      </div>
      <div class="info-row-content">
        <strong>暂无</strong>
      </div>
    </div>
    <div class="info-row">
      <div class="info-row-label">
        <span>食物/接触物过敏</span>
      </div>
      <div class="info-row-content">
        <strong>芒果</strong>
      </div>
    </div>
    <div class="info-row">
      <div class="info-row-label">
        <span>个人习惯</span>
      </div>
      <div class="info-row-content">
        <strong>久坐、不喜喝水</strong>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PatientHealthInfoDetails',
  data() {
    return {
      info: {}
    }
  }
}
</script>
<style lang="scss" scoped>
.info {
  padding: 10px 20px;
}
.info-row {
  margin-bottom: 4px;
  display: flex;
  justify-content: space-between;
  &-label {
    width: 120px;
    text-align: right;
    line-height: 22px;
    &:after {
      content: '：';
    }
  }
  &-content {
    width: calc(100% - 140px);
    color: #333;
  }
}
</style>
