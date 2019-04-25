<template>
  <div>
    <div class="header">
      <img class="header-img" src="./../../../assets/images/404.png">

      <div class="header-info">
        <div class="first-line">
          <span>姓名</span>
          <el-button icon="el-icon-news" type="text">发消息</el-button>
        </div>
        <div class="second-line">
          <span class="label">微信昵称</span>
          <span class="value">巴萨</span>

          <span class="label">联系方式</span>
          <span class="value">13000000000</span>
        </div>
      </div>
    </div>

    <hr>

    <div class="center">
      <span>咨询记录 (3)</span>
    </div>
    <div :key="item" class="detail" v-for="item in 3">
      <p>2019-xxx</p>
      <div>
        <div>
          <span>xx</span>
          <span>xx</span>
          <span>xx</span>
          <span>xx</span>

          <span>查看详情</span>
        </div>

        <div>病情描述</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default() {
        return undefined
      }
    }
  },

  computed: {
    internalData() {
      return this.data
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: inline-flex;
  align-items: center;

  .header-img {
    width: 50px;
    height: 50px;
    margin: 0 20px 0 0;
    border-radius: 50%;
  }

  .header-info {
    .first-line {
      margin: 0 0 10px 0;

      span {
        font-weight: bold;
        margin: 0 20px 0 0;
      }
    }

    .second-line {
      .label {
        color: #8f8f8f;
        margin: 0 10px 0 0;
      }

      .value {
        font-weight: bold;
        margin: 0 40px 0 0;
      }
    }
  }
}

.center {
  span {
    display: inline-flex;

    &::before {
      content: ' ';
      height: 20px;
      border-left: solid $--color-primary 4px;
      margin: 0 5px 0 0;
    }
  }
}
</style>
