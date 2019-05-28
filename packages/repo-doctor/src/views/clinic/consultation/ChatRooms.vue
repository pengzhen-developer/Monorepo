<template>
  <div class="chat-rooms">
    <div class="header">
      <img src="~@/assets/images/icons/clinic/inquirylist_icon.png">
      <span>会诊列表</span>
    </div>

    <div class="body">
      <el-scrollbar class="scrollbar">
        <div :key="item" class="consultation-item" v-for="item in 4">
          <div class="title">
            <div class="status">
              <i class="el-icon-alarm-clock"></i>
              <span>会诊中</span>
            </div>
            <div class="time">
              <span>10:12</span>
            </div>
          </div>
          <div class="doctor">
            <span>申请医生：</span>
            <span class="name">黄仙童</span>
            <el-tag type="parmary">我发起的</el-tag>
          </div>
          <div class="patient">
            <span>患者信息：</span>
            <span>长大山</span>
            <span>男</span>
            <span>27岁</span>
          </div>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.chat-rooms {
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

  .body {
    height: calc(100% - 50px);

    .scrollbar {
      height: 100%;
      overflow: hidden;
    }

    .consultation-item {
      cursor: pointer;
      border-bottom: 1px solid #efefef;
      padding: 0 10px;

      .title {
        display: flex;
        justify-content: space-between;
        padding: 14px 0 12px 0;
        color: #00c6ae;

        .status {
          font-weight: 400;
          i {
            margin: 0 6px 0 0;
          }
        }

        .time {
          font-size: 12px;
          color: rgba(153, 153, 153, 1);
        }
      }

      .doctor {
        padding: 0 0 8px 0;
        font-size: 12px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);

        .name {
          font-weight: 800;
          color: rgba(51, 51, 51, 1);
        }

        .el-tag {
          margin: 0 0 0 6px;
          font-size: 12px;
          background: #fff;

          height: 16px;
          padding: 0 5px;
          line-height: 14px;
        }
      }

      .patient {
        padding: 0 0 12px 0;
        font-size: 12px;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);

        span {
          margin: 0 6px 0 0;

          &:first-child {
            margin: 0;
          }
        }
      }
    }
  }
}
</style>

