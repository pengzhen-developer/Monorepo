<template>
  <div class="file-recipe-detail">
    <div class="tip">
      <div class="tip-left">
        <van-icon name="location-o"
                  style="margin: 0 5px 0 0;"></van-icon>
        <span>共 3 张，当前为第 1 张（1 / 3）</span>
      </div>
      <div class="tip-right">
        <span>下一张</span>
        <van-icon name="arrow"></van-icon>
      </div>
    </div>

    <div class="row">
      <div class="row-header">
        <div class="row-header-title">
          <span style=" font-size: 15px; color: #333333;">处方编号</span>
        </div>
      </div>
      <div class="row-body">
        <span>201806299905441</span>
      </div>
    </div>

    <div class="row">
      <div class="row-header">
        <div class="row-header-title">
          <span style=" font-size: 15px; color: #333333;">临床诊断</span>
        </div>
      </div>
      <div class="row-body">
        <span>急性上呼吸道感染</span>
      </div>
    </div>

    <div class="row">
      <div class="row-header">
        <div class="row-header-title">
          <span style=" font-size: 15px; color: #333333;">RP</span>
        </div>
      </div>
      <div class="row-body"
           style="border-bottom: 1px dashed #BFBFBF;">
        <div class="flex between"
             style="margin: 0 0 5px 0;">
          <div>
            <span
                  style="font-size: 15px; color: #000; font-weight: bold; margin: 0 10px 0 0;">阿莫西林胶囊</span>
            <span style="font-size: 15px; color: #000; font-weight: bold;">0.5g*12粒</span>
          </div>
          <div>
            <span style="font-size: 15px; color: #000;">X1</span>
          </div>
        </div>
        <div>
          <span style="font-size: 13px; color: #999;">用法用量：口服。成人一次2-3粒，一天三次，三天</span>
        </div>
      </div>
      <div class="row-body">
        <div class="flex between"
             style="margin: 0 0 5px 0;">
          <div>
            <span
                  style="font-size: 15px; color: #000; font-weight: bold; margin: 0 10px 0 0;">阿莫西林胶囊</span>
            <span style="font-size: 15px; color: #000; font-weight: bold;">0.5g*12粒</span>
          </div>
          <div>
            <span style="font-size: 15px; color: #000;">X1</span>
          </div>
        </div>
        <div>
          <span style="font-size: 13px; color: #999;">用法用量：口服。成人一次2-3粒，一天三次，三天</span>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="row-header">
        <div class="row-header-title">
          <span style=" font-size: 15px; color: #333333;">处方审核</span>
        </div>
      </div>
      <div class="row-body">
        <span>药师审核已通过，请放心用药！</span>
      </div>
    </div>

    <div class="row"
         style="padding: 10px 20px;">
      <div class="flex between"
           style="margin: 0 0 10px 0;">
        <div style="flex: 1;">
          <span style="font-size: 13px; color: #999;">医 师：</span>
          <span>贾春艳</span>
        </div>
        <div style="flex: 1;">
          <span style="font-size: 13px; color: #999;">审核药师：</span>
          <span>贾春艳</span>
        </div>
      </div>
      <div class="flex between">
        <div style="flex: 1;">
          <span style="font-size: 13px; color: #999;">调配药师：</span>
          <span>贾春艳</span>
        </div>
        <div style="flex: 1;">
          <span style="font-size: 13px; color: #999;">发药药师：</span>
          <span>贾春艳</span>
        </div>
      </div>
    </div>

    <div class="footer">
      <span>注意：仅限通过平台认证的药店配送，自行下载处方购药不具有效力，为确保用药安全，3日内处方有效。</span>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  align-items: center;

  &.column {
    flex-direction: column;
  }
  &.between {
    justify-content: space-between;
  }
  &.center {
    justify-content: center;
  }
}

.file-recipe-detail {
  background: #f5f5f5;

  .tip {
    display: flex;
    justify-content: space-between;
    align-items: center;

    background: #ebfbf9;
    padding: 10px 20px;
    color: #00c6ae;
    font-size: 12px;

    .tip-left,
    .tip-right {
      display: flex;
      align-items: center;
    }
  }

  .row {
    background: #fff;
    margin: 0 0 10px 0;
    padding: 0 15px;

    .row-header {
      .row-header-title {
        display: flex;
        align-items: center;
        padding: 10px 0;
        border-bottom: 1px solid #dedede;

        &::before {
          content: '';
          margin: 0 10px 0 0;
          height: 20px;
          width: 4px;
          background-color: #00c6ae;
        }
      }
    }

    .row-body {
      padding: 10px 0;
      font-size: 15px;
      font-weight: 400;
      color: #000000;
      line-height: 20px;
    }
  }

  .footer {
    padding: 0 20px 10px 20px;
    font-size: 11px;
    color: #999999;
    text-align: left;
  }
}
</style>