<template>
  <div class="signNotice">
    <div class="top">
      <template v-if="$slots.title">
        <slot name="title"></slot>
      </template>
      <template v-else>
        互联网医院诊疗办法规定：在互联网医院开具的处方必须由医生签名后才能生效
      </template>
    </div>

    <template v-if="$slots.notify">
      <slot name="notify"></slot>
    </template>
    <template v-else>
      <h1>您当前有<span>{{num}}</span>张处方未签名</h1>
    </template>
    <div style="display: flex; justify-content: center; align-items: center; margin: 20px 0 0 0;">
      <div class="q-mb-md flex justify-around">
        <div class="flex column items-center q-mr-lg">
          <span class="q-mb-sm text-subtitle2">安卓用户请扫码</span>
          <el-image class="qrcode q-mb-sm"
                    v-bind:src="androidQRCode" />
        </div>

        <div class="flex column items-center">
          <span class="q-mb-sm text-subtitle2">苹果用户请扫码</span>
          <el-image class="qrcode q-mb-sm"
                    v-bind:src="iOSQRCode" />
        </div>
      </div>
    </div>

    <template v-if="$slots.footer">
      <slot name="footer"></slot>
    </template>
    <template v-else>
      <h3>请使用手机打开【万家云医】APP对未签名处方签名，方便患者快捷购药</h3>
      <p>未安装【万家云医】APP的用户</p>
      <p>使用手机扫描上面二维码可快捷安装APP</p>
    </template>
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
  },

  data() {
    return {
      iOSQRCode: '',
      androidQRCode: ''
    }
  },

  created() {
    const version = Peace.cache.sessionStorage.get('version')

    this.androidQRCode = version.data.androidQRCode
    this.iOSQRCode = version.data.iOSQRCode
  }
}
</script>

<style scoped lang="scss">
.qrcode {
  width: 120px;
  height: 120px;
  padding: 10px;
  cursor: pointer;
  transition: all 1000ms cubic-bezier(0.175, 0.885, 0.32, 1) 0s;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background: #ffffff7a;

  &:hover {
    padding: 5px;
    transform: scale(2.5);
    background: transparent;
    background: #fff;
    box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.1);

    z-index: 1;
  }
}

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
