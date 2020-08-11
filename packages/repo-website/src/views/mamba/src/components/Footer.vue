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

        <div class="bottom-item col-12 col-sm-12 col-md col-lg col-xl">
          <p>扫码体验</p>
          <div class="qr-code-list row">
            <div class="qr-code-content col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
              <img src="../assets/img/my/iOS.png" />
              <span>医生工作台iOS</span>
            </div>
            <div class="qr-code-content col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
              <img src="../assets/img/my/android.png" />
              <span>医生工作台安卓</span>
            </div>
            <div class="qr-code-content col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
              <img src="../assets/img/my/web.png" />
              <span>患者应用小程序</span>
            </div>
          </div>
        </div>

        <div class="line d-none d-lg-block "></div>

        <div class="bottom-item col-12 col-sm-12 col-md col-lg col-xl">
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

    <div class="bottom container">
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
  width: calc(100% + 30px);
}
.line {
  margin: 0px 12%;
  height: inherit;
  border: 1px dashed #d9d9d9;
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
  font-size: 13px;
  align-items: center;
  flex-direction: column;
  padding: 0 11px;
}

.qr-code-content img {
  width: 100%;
}
.qr-code-content span {
  margin-top: 12px;
}

.information {
  color: var(--q-color-grey-333);
  font-size: 20px;
  margin-bottom: 20px;
}
.information i {
  width: 24px;
  margin-right: 20px;
}
.bottom {
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--q-color-grey-999);
  font-size: 12px;
  border-top: 1px solid #d9d9d9;
  padding-top: 30px;
  margin-top: 63px;
}

@media (max-width: 1024px) {
  .qr-code-content span {
    margin-bottom: 16px;
  }
}
@media (max-width: 425px) {
  .footer-bottom {
    width: calc(100% + 30px);
  }
}
</style>