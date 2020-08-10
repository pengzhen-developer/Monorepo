<template>
  <div class="container">
    <el-image :src="require('../assets/images/ic_shibai.png')"></el-image>
    <div class="title">{{title}}</div>
    <div class="msg">
      <template>因<span>{{message}}</span>,</template>
      您的资料审核未通过。如有疑问，请联系客服人员 15827147188
    </div>
    <el-button v-on:click='reSubmit'>重新提交</el-button>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      title: '审核未通过'
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
  padding-top: 140px;
  align-items: center;
  width: 100%;
  height: 100%;
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
    height: 32px;
  }
}
</style>