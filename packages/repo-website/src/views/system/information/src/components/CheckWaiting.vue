<template>
  <div class="container">
    <el-image :src="require('../assets/images/ic_compete.png')"></el-image>
    <div class="title">{{title}}</div>
    <div class="msg">{{msg}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '信息待审核',
      msg: '您的信息已提交成功，平台将尽快审核。审核结果会以短信的方式通知您，感谢您的耐心等待～'
    }
  },
  methods: {
    reSubmit() {
      this.$emit('reSubmit', true)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .el-image {
    width: 70px;
    height: 70px;
    border-radius: 50%;
  }
  .title {
    margin: 30px 0 10px 0;
    font-size: 24px;
    font-family: PingFangSC-Medium, PingFang SC;
    color: #333;
    line-height: 32px;
  }
  .msg {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666;
    line-height: 22px;
    span {
      color: #333;
    }
  }
  .el-button {
    margin-top: 25px;
    width: 120px;
    background: var(--q-color-primary);
    font-family: PingFangSC-Regular, PingFang SC;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    border-radius: 4px;
  }
}
</style>