<template>
  <div>
    <div class="patient">
      <div class="patient-detail">
        <span>黄相同</span>
        <span>男</span>
        <span>27岁</span>
      </div>
      <hr>
      <div class="patient-narrate">
        <span>病情描述：</span>
        <span>经医院门诊观察说脑部有点异常，经医院门诊观察说脑部有点异常，经医院门诊观察说脑部有点异常，经医院门诊观察说脑部有点异常，经医院门诊观察说脑部有点异常，</span>
      </div>
      <div class="patient-file-list">
        <img src="./../../../assets/images/not-status.png">
        <img src="./../../../assets/images/not-status.png">
        <img src="./../../../assets/images/not-status.png">
      </div>
    </div>
    <div class="chat"></div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.patient {
  width: 506px;
  background: rgba(243, 243, 243, 1);
  border-radius: 4px;

  .patient-detail {
    span {
      margin: 0 20px 0 0;
    }
  }

  .patient-narrate {
    span:first-child {
      font-size: 12px;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
    }
  }

  .patient-file-list {
    img {
      width: 58px;
      height: 58px;
      margin: 0 12px 0 0;
    }
  }

  hr {
    display: block;
    height: 1px;
    border: 0;
    border-top: 1px solid #e1e1e1;
    padding: 0;
  }
}
</style>
