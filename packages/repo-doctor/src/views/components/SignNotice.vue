<template>
  <div class="signNotice">
    <div class="top">
      互联网医院诊疗办法规定：在互联网医院开具的处方必须由医生签名后才能生效
    </div>
    <h1>您当前有<span>{{num}}</span>张处方未签名</h1>
    <div style="display: flex; justify-content: center; align-items: center; margin: 20px 0 0 0;">
      <div
           style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <span>安卓请扫码：</span>
        <img src="https://devdoctor.hp.aijiayi.com/android.png"
             class="code" />
      </div>
      <div
           style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <span>苹果请扫码：</span>
        <img src="https://devdoctor.hp.aijiayi.com/ios.png"
             class="code" />
      </div>
    </div>
    <h3>请使用手机打开【万家云医】APP对未签名处方签名，方便患者快捷购药</h3>
    <p>未安装【万家云医】APP的用户</p>
    <p>使用手机扫描上面二维码可快捷安装APP</p>
  </div>
</template>

<script>
export default {
  name: 'SignNotice',
  props: {
    num: {
      type: String,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped lang="scss">
.signNotice {
  .top {
    height: 32px;
    padding-left: 26px;
    background: rgba(235, 251, 249, 1);
    border-radius: 4px;
    font-size: 12px;
    color: #666;
    line-height: 32px;
    background: #ebfbf9 url('../../assets/images/Shape.png') no-repeat;
    background-size: 12px 12px;
    background-position: 10px 10px;
  }
  h1 {
    font-size: 24px;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    text-align: center;
    margin-top: 15px;
    span {
      color: #00c6ae;
    }
  }
  .code {
    width: 120px;
    height: 120px;
    margin: 5px 15px 20px;
    background: #fff;
  }
  h3 {
    margin-top: 10px;
    text-align: center;
    font-size: 14px;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
  }
  p {
    font-size: 14px;
    text-align: center;
    color: #666;
    line-height: 24px;
  }
}
</style>
