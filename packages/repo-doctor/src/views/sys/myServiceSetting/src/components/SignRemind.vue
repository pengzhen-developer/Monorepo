// 签名提醒

<template>
  <div>
    <div class="q-mb-lg">
      <el-alert show-icon
                type="error"
                title="互联网医院管理办法规定"
                v-bind:closable="false">
        <p class="text-caption">所有在线诊断、处方必须有医师电子签名。</p>
        <p class="text-caption">您尚未设置签名，医院将无法给您排班，请登录互联网医院 App 设置数字签名。</p>
      </el-alert>
    </div>

    <div class="flex column items-center">
      <p class="text-subtitle1 q-mb-md text-weight-medium">您尚未设置数字签名，请登录 App 进行设置</p>

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
  </div>
</template>

<script>
export default {
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

<style lang="scss" scoped>
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
    transform: scale(3.5);
    background: transparent;
    background: #fff;
    box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.1);

    z-index: 1;
  }
}
</style>