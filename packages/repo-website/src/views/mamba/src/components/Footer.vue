<template>
  <section id="myfooter"
           class="team">
    <div class="container"
         data-aos="fade-up"
         data-aos-delay="100">

      <div class="section-title">
        <h2>关于我们</h2>
      </div>
      <div class="footer-bottom row">

        <div class="bottom-item col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
          <p>扫码体验</p>
          <div class="qr-code-list row">
            <div class="qr-code-content col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
              <img src="../assets/img/my/iOS.png" />
              医生工作台iOS
            </div>
            <div class="qr-code-content col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
              <img src="../assets/img/my/android.png" />
              医生工作台安卓
            </div>
            <div class="qr-code-content col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
              <img src="../assets/img/my/web.png" />
              患者应用小程序
            </div>
          </div>
        </div>

        <div class="line d-none d-lg-block"></div>

        <div class="bottom-item col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
          <p>联系我们</p>
          <!-- <div class="information">
            <i class=" zyy-icon zyy-icon_dianhua"
               style="color: #707070;"></i>
            电话：072-4592888
          </div> -->
          <div class="information">
            <i class=" zyy-icon zyy-icon_youxiang2"
               style="color: #707070;"></i>
            邮箱：xiej@jk.com
          </div>
        </div>
      </div>
    </div>

    <div class="bottom">
      <div class="bottom-line "></div>
      Copyright &copy; 全息云通健康科技（武汉）有限公司
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

.section-title h2 {
  color: #012e33;
}

.footer-bottom {
  width: 100%;
  display: flex;
  justify-content: center;
}
.line {
  margin: 0px 120px;
  height: 210px;
  border: #d9d9d9 1px dashed;
}
.bottom-item {
  font-size: 24px;
  color: var(--q-color-grey-333);
  display: flex;
  margin-bottom: 20px;
  flex-direction: column;
}
.qr-code-list {
  display: flex;
}
.qr-code-content {
  display: flex;
  color: var(--q-color-grey-666);
  font-size: 13px;
  align-items: center;
  flex-direction: column;
}

.qr-code-content img {
  width: 100%;
}

.information {
  color: var(--q-color-grey-333);
  font-size: 20px;
  margin-top: 20px;
}
.information i {
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
  margin-top: 60px;
  margin-bottom: 30px;
  background: #cccccc;
}
</style>