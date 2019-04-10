<template>
  <div class="clinic">
    <div class="clinic-left">
      <div class="header">
        <h4>问诊列表</h4>
      </div>
    </div>
    <div class="clinic-center">center</div>
    <div class="clinic-right">
      <div class="header">
        <h4>电子病历</h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.clinic {
  display: flex;

  .clinic-left,
  .clinic-right {
    width: 214px;
    text-align: center;
    border: 1px solid #f2f2f2;
    border-top: none;
    height: calc(100vh - 100px);

    .header {
      display: flex;
      justify-content: center;
      align-items: center;

      height: 44px;
      border-bottom: 1px solid #f2f2f2;

      h4 {
        margin: 0;
        font-size: 16px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 22px;
      }
    }
  }

  .clinic-center {
    flex: 1;
  }
}
</style>
