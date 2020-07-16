<template>
  <section id="team"
           class="team team-bgd">
    <div class="container">

      <div class="section-title">
        <div>
          <p class="title-right">查看更多>></p>
          <h2>新闻动态</h2>
        </div>
        <p>智药云持续为互联网医疗行业输出有价值的服务，引起社会热烈反响</p>
      </div>

      <div class="row">

        <div class="col-xl-3 col-lg-4 col-md-6 row-item"
             data-aos="fade-up">
          <div class="member">
            <div class="pic"><img src="../assets/img/my/pic01.png"
                   class="img-fluid"
                   alt=""></div>
            <div class="member-info my-member-info">
              <h4>待更新</h4>
              <span>2020/07/17 08:00</span>
            </div>
          </div>
        </div>

        <div class="col-xl-3 col-lg-4 col-md-6 row-item"
             data-aos="fade-up"
             data-aos-delay="100">
          <div class="member">
            <div class="pic"><img src="../assets/img/my/pic02.png"
                   class="img-fluid"
                   alt=""></div>
            <div class="member-info my-member-info">
              <h4>待更新</h4>
              <span>2020/07/17 08:00</span>
            </div>
          </div>
        </div>

        <div class="col-xl-3 col-lg-4 col-md-6 row-item"
             data-aos="fade-up"
             data-aos-delay="200">
          <div class="member">
            <div class="pic"><img src="../assets/img/my/pic03.png"
                   class="img-fluid"
                   alt=""></div>
            <div class="member-info my-member-info">
              <h4>待更新</h4>
              <span>2020/07/17 08:00</span>
            </div>
          </div>
        </div>

        <div class="col-xl-3 col-lg-4 col-md-6 row-item"
             data-aos="fade-up"
             data-aos-delay="300">
          <div class="member">
            <div class="pic"><img src="../assets/img/my/pic04.png"
                   class="img-fluid"
                   alt=""></div>
            <div class="member-info my-member-info">
              <h4>待更新</h4>
              <span>2020/07/17 08:00</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  </section>
</template>

<script>
export default {}
</script>

<style  scoped>
section {
  padding: 60px 0px;
}
.team-bgd {
  background: #f5f9fc;
}
.row-item {
  width: 25%;
}
.my-member-info {
  padding: 15px !important;
  margin-bottom: -40px;
  background: var(--q-color-primary-light-7) !important;
}

.title-right {
  float: right;
  height: 60px;
  line-height: 60px;
  font-size: 14px;
  color: var(--q-color-primary);
}
</style>