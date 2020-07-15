<template>
  <div>
    <section id="hero">
      <div class="hero-container">
        <div id="heroCarousel"
             class="carousel slide carousel-fade"
             data-ride="carousel">

          <ol class="carousel-indicators"
              id="hero-carousel-indicators"></ol>

          <div class="carousel-inner"
               role="listbox">

            <!-- Slide 1 -->
            <div class="carousel-item active"
                 v-bind:style="{ 'background-image': `url(${require('../assets/img/my/banner.png')})` }">
              <div class="carousel-container">
                <div class="carousel-content container">
                  <h2 class="animate__animated animate__fadeInDown">智药云</h2>
                  <p class="animate__animated animate__fadeInUp">互联网云医院 | 处方共享服务 | 合理用药服务 | 药品供应服务</p>
                  <a href="#about"
                     class="btn-get-started animate__animated animate__fadeInUp scrollto">查看更多</a>
                </div>
              </div>
            </div>

          </div>

          <a class="carousel-control-prev"
             href="#heroCarousel"
             role="button"
             data-slide="prev">
            <span class="carousel-control-prev-icon icofont-rounded-left"
                  aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next"
             href="#heroCarousel"
             role="button"
             data-slide="next">
            <span class="carousel-control-next-icon icofont-rounded-right"
                  aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>

        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {}
</script>
<style >
</style>