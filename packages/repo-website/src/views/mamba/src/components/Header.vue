<template>
  <header id="header">
    <div class="container">

      <div class="logo float-left">
        <h1 class="text-light"><a href="index.html"><span>Mamba</span></a></h1>
        <!-- Uncomment below if you prefer to use an image logo -->
        <!-- <a href="index.html"><img src="./assets/img/logo.png" alt="" class="img-fluid"></a>-->
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
              <li><a href="#">Drop Down 1</a></li>
              <li class="drop-down"><a href="#">Drop Down 2</a>
                <ul>
                  <li><a href="#">Deep Drop Down 1</a></li>
                  <li><a href="#">Deep Drop Down 2</a></li>
                  <li><a href="#">Deep Drop Down 3</a></li>
                  <li><a href="#">Deep Drop Down 4</a></li>
                  <li><a href="#">Deep Drop Down 5</a></li>
                </ul>
              </li>
              <li><a href="#">Drop Down 3</a></li>
              <li><a href="#">Drop Down 4</a></li>
              <li><a href="#">Drop Down 5</a></li>
            </ul>
          </li>
          <li><a href="#contact">关于我们</a></li>
          <li>
            <el-button>登录</el-button>
          </li>
          <li>
            <el-button type="primary">注册</el-button>
          </li>

        </ul>

      </nav><!-- .nav-menu -->

    </div>
  </header>
</template>

<script>
export default {}
</script>

<style>
</style>