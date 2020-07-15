<template>
  <section id="myfooter"
           class="portfolio section-bg">
    <div class="container"
         data-aos="fade-up"
         data-aos-delay="100">

      <div class="section-title">
        <h2>关于我们</h2>
      </div>
      <div class="footer-bottom">
        <div class="bottom-item">
          <p>扫码体验</p>
          <div class="qr-code-list">
            <div class="qr-code-content">
              <img src="../assets/img/my/iOS.png"
                   class="qr-code-img" />
              医生工作台iOS
            </div>
            <div class="qr-code-content">
              <img src="../assets/img/my/android.png"
                   class="qr-code-img" />
              医生工作台安卓
            </div>
            <div class="qr-code-content">
              <img src="../assets/img/my/web.png"
                   class="qr-code-img" />
              患者应用小程序
            </div>
          </div>
        </div>

        <div class="line"></div>

        <div class="bottom-item">
          <p>联系我们</p>
          <!-- <div class="information">
            <img src="../assets/img/my/icon_phone.png"
                 alt="">
            电话：072-4592888
          </div> -->
          <div class="information">
            <img src="../assets/img/my/icon_email.png"
                 alt="">
            邮箱：xiej@jk.com
          </div>
        </div>
      </div>
    </div>

    <div class="bottom">
      <div class="bottom-line"></div>
      Copyright © 2020 jk998
    </div>

  </section>
</template>

<script>
export default {}
</script>

<style scoped>
section {
  padding-top: 60px;
  padding-bottom: 30px;
}

.footer-bottom {
  width: 100%;
  display: flex;
  justify-content: center;
}
.line {
  width: 1px;
  margin: 0px 126px;
  height: 210px;
  background: #d9d9d9;
}
.bottom-item {
  font-size: 24px;
  color: var(--q-color-grey-333);
  display: flex;
  flex-direction: column;
}
.qr-code-list {
  display: flex;
}
.qr-code-content {
  display: flex;
  color: var(--q-color-grey-666);
  font-size: 14px;
  margin-right: 20px;
  align-items: center;
  flex-direction: column;
}
.qr-code-img {
  width: 138px;
  height: 138px;
}
.information {
  color: var(--q-color-grey-333);
  font-size: 20px;
  margin-top: 20px;
}
.information img {
  width: 24px;
  margin-right: 20px;
}
.bottom {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--q-color-grey-999);
  font-size: 12px;
}
.bottom-line {
  height: 1px;
  width: 1200px;
  margin-top: 60px;
  margin-bottom: 30px;
  background: #cccccc;
}
</style>