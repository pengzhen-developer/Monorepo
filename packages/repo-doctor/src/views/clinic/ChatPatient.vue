<template>
  <div v-if="internalSession && internalSession.id">
    <div class="header">
      <img src="./../../assets/images/icons/clinic/electronicmedical_icon.png">
      <span>电子病历</span>
    </div>

    <el-tabs class="chat-patient-tab">
      <el-tab-pane class="health" label="健康档单">
        <div class="health-item">
          <div class="health-item-title">
            <img src="../../assets/images/icons/clinic/archives_icon_marry.png">
            <h4>婚育史：</h4>
          </div>
          <div class="health-item-description">
            <span>暂无</span>
          </div>
        </div>
        <div class="health-item">
          <div class="health-item-title">
            <img src="../../assets/images/icons/clinic/archives_icon_marry copy.png">
            <h4>手术和外伤：</h4>
          </div>
          <div class="health-item-description">
            <span>暂无</span>
          </div>
        </div>
        <div class="health-item">
          <div class="health-item-title">
            <img src="../../assets/images/icons/clinic/archives_icon_medical.png">
            <h4>家族病史：</h4>
          </div>
          <div class="health-item-description">
            <span>暂无</span>
          </div>
        </div>
        <div class="health-item">
          <div class="health-item-title">
            <img src="../../assets/images/icons/clinic/archives_icon_allergy.png">
            <h4>过敏史：</h4>
          </div>
          <div class="health-item-description">
            <span>暂无</span>
          </div>
        </div>
        <div class="health-item">
          <div class="health-item-title">
            <img src="../../assets/images/icons/clinic/archives_icon_habit.png">
            <h4>个人习惯：</h4>
          </div>
          <div class="health-item-description">
            <span>暂无</span>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="就诊记录">
        <div class="record">
          <span>暂无</span>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  props: {
    session: {
      type: Object,
      default() {
        return undefined
      }
    }
  },

  computed: {
    internalSession() {
      return this.session
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  height: 50px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-bottom: 1px solid #f2f2f2;
  background: rgba(255, 255, 255, 1);

  img {
    margin: 0 10px 0 0;
  }
}

.content {
  height: calc(100% - 50px);

  .scrollbar {
    height: 100%;
  }
}

.chat-patient-tab {
  /deep/ .el-tabs__active-bar {
    top: 0;
    width: 50%;
  }

  /deep/ .el-tabs__nav {
    width: 100%;
  }

  /deep/ .el-tabs__item {
    width: 50%;
    padding: 0;
    text-align: center;
  }

  /deep/ {
    .el-tabs__nav-wrap::after {
      display: none;
    }
  }

  .health {
    padding: 10px;

    .health-item {
      margin: 0 0 20px 0;

      .health-item-title {
        display: inline-flex;
        justify-content: center;

        img {
          display: inline-block;
          width: 20px;
          margin-right: 10px;
        }

        h4 {
          display: inline-block;
          margin: 0;
          color: rgba(51, 51, 51, 1);
        }
      }

      .health-item-description {
        span {
          margin: 0 0 0 30px;
          color: rgba(153, 153, 153, 1);
        }
      }
    }
  }

  .record {
    span {
      margin: 0 0 0 30px;
      color: rgba(153, 153, 153, 1);
    }
  }
}
</style>
