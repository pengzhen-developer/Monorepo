<template>

  <el-timeline class="q-mt-30 q-ml-46">
    <el-timeline-item v-for="item in items"
                      v-bind:key="item.key"
                      timestamp="07-20"
                      placement="top"
                      color="rgba(0,198,174,1)">
      <div class="year-label">2020</div>
      <div class="case-bg"
           v-on:click="showCaseInfo">
        <div class="row cursor-pointer">
          <img src="~@src/assets/images/inquiry/ic_medical record.png"
               class="q-mr-10" />
          <div class="q-ml-10">
            <p class="case-title">门诊病历</p>
            <p class="case-subtitle">上医云馆 | 呼吸科</p>
          </div>
        </div>
      </div>
    </el-timeline-item>
  </el-timeline>

  <!-- <div class="column  items-baseline">

    <div class="row q-mb-20"
         v-for="item in items"
         v-bind:key="item.key">

      <div class="time-line column q-mr-40 q-pl-20">
        <span class="time-line-title">07-20</span>
        <span class="time-line-subtitle">2020</span>
      </div>

      <div class="case-bg"
           v-on:click="showCaseInfo">
        <div class="row cursor-pointer">
          <img src="~@src/assets/images/inquiry/ic_medical record.png"
               class="q-mr-10" />
          <div class="q-ml-10">
            <p class="case-title">门诊病历</p>
            <p class="case-subtitle">上医云馆 | 呼吸科</p>
          </div>
        </div>
      </div>

    </div>

  </div> -->
</template>

<script>
export default {
  data() {
    return {
      items: [{ key: 1 }, { key: 2 }, { key: 3 }]
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-timeline-item__content {
  position: relative;
}

/deep/ .el-timeline-item__timestamp {
  font-size: 14px;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 10px;
}

.year-label {
  position: absolute;
  top: -21px;
  left: -80px;
  font-size: 12px;

  font-weight: 500;
  color: rgba(153, 153, 153, 1);
  line-height: 17px;
}

.case-bg {
  position: relative;
  left: 90px;
  top: -26px;
  padding: 14px;
  border-radius: 4px;
  background-color: white;
  max-width: 307px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 1px 5px 0px rgba(221, 221, 221, 0.5);
  border-radius: 4px;

  .case-title {
    font-size: 16px;
    color: #333 !important;
    line-height: 22px;
  }

  .case-subtitle {
    font-size: 13px;
    color: #999 !important;
    line-height: 18px;
  }
}
</style>