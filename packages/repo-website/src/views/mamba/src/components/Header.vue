<template>
  <header id="header">
    <div class="container">

      <div class="logo float-left">
        <h1 class="text-light"><a href="index.html"><span>Mamba</span></a></h1>
        <!-- Uncomment below if you prefer to use an image logo -->
        <!-- <a href="index.html"><img src="./assets/img/logo.png" alt="" class="img-fluid"></a>-->
      </div>
      <div class="login">
        <el-button class="button"
                   type="primary"
                   @click="login"
                   plain>登录</el-button>
        <el-button type="primary"
                   class="button">注册</el-button>
      </div>
      <nav class="nav-menu float-right d-none d-lg-block">
        <ul>
          <li class="active"><a href="/">首页</a></li>
          <li><a href="#about-lists">产品服务</a></li>
          <li><a href="#portfolio">解决方案</a></li>
          <li><a href="#services">合作案例</a></li>
          <!-- <li><a href="#team">新闻动态</a></li> -->
          <li class="drop-down"><a href="">开放赋能</a>
            <ul>
              <li><a href="https://docs.qq.com/doc/DZkp4dWZUTWV1TFZJ"
                   target="blank">处方审核服务接口</a></li>
              <li><a href="https://docs.qq.com/doc/DWG9OaVdubElGQXpj"
                   target="blank">处方共享服务接口</a></li>
              <li><a href="https://docs.qq.com/doc/DWHZod0lJWGdMY0pa"
                   target="blank">互联网医院处方共享接口</a></li>
              <li><a href="https://docs.qq.com/doc/DZnNqTmdMb2JwZHdo"
                   target="blank">药品供应服务接口</a></li>
            </ul>
          </li>
          <li><a href="#myfooter">关于我们</a></li>
        </ul>
      </nav><!-- .nav-menu -->

    </div>
  </header>
</template>

<script>
export default {
  methods: {
    login() {
      this.$router.push('/login')
    },

    goToText1() {
      window.open(process.env.VUE_APP_1)
    }
  }
}
</script>

<style scoped>
.login {
  height: 45px;
  float: right;
  margin-left: 30px;
  line-height: 45px;
}
.button {
  height: 40px;
  width: 80px;
}
button:active {
  border: none;
}
</style>