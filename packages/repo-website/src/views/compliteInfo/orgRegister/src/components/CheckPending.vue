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
      title: '提交成功',
      msg: '您的资料已提交成功，预计1-3个工作日将完成审核。如有疑问，请联系客服人员  15827147188    '
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
    font-weight: 500;
    line-height: 32px;
  }
  .msg {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
    line-height: 22px;
  }
}
</style>