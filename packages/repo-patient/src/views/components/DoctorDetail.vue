<template>
  <div class="doctor-detail">
    <div class="title">
      <div class="title-description">
        <div class="title-description-avatar">
          <img />
        </div>

        <div class="title-description-info">
          <div class="title-doctor">
            <span class="title-doctor-name">张逗豆</span>
            <span>副主任医生</span>
            <span>妇产科</span>
          </div>
          <div class="title-hospital">
            <span>郑州大学第一附属医院</span>
          </div>
        </div>
      </div>
    </div>

    <div class="description">
      <div class="description-service">
        <div @click="redirect" class="description-service-item">
          <img src="@src/assets/images/ic_tuwen.png" />
          <p>图文咨询</p>
          <p>
            <span class="money">￥10</span>
            <span>/次</span>
          </p>
        </div>
        <div class="description-service-item">
          <img src="@src/assets/images/ic_video_open.png" />
          <p>视频咨询</p>
          <p>
            <span class="money">￥100</span>
            <span>/次</span>
          </p>
        </div>
      </div>

      <div class="description-item">
        <van-collapse v-model="activeCollapseNames">
          <van-collapse-item name="1" title="擅长">儿童过敏性疾病，如:过敏性哮喘，过敏性鼻炎，过敏性咳嗽。儿童慢性咳嗽、婴幼儿喘息、儿童喘…</van-collapse-item>
          <van-collapse-item name="2" title="简介">儿研所呼吸科主治医师、北京大医学部硕士学位哈哈，2002年开始执业北京大医学部硕士学位的刚…</van-collapse-item>
        </van-collapse>
      </div>
    </div>

    <div class="divider"></div>

    <div class="time">
      <van-tabs v-model="activeTabs">
        <van-tab title="线上咨询时间">
          <table class="time-table">
            <thead>
              <tr>
                <th class="time-table-col border"></th>
                <th class="time-table-col border">周一</th>
                <th class="time-table-col border">周二</th>
                <th class="time-table-col border">周三</th>
                <th class="time-table-col border">周四</th>
                <th class="time-table-col border">周五</th>
                <th class="time-table-col border">周六</th>
                <th class="time-table-col border">周日</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="time-table-col border">上午</td>
                <td :key="item" class="time-table-col border primary" v-for="item in 7">
                  <span v-if="item % 2 === 0 ">√</span>
                </td>
              </tr>
              <tr>
                <td class="time-table-col border">下午</td>
                <td :key="item" class="time-table-col border primary" v-for="item in 7">
                  <span v-if="item % 2 === 1">√</span>
                </td>
              </tr>
              <tr>
                <td class="time-table-col border">晚上</td>
                <td :key="item" class="time-table-col border primary" v-for="item in 7">
                  <span v-if="item % 2 === 0">√</span>
                </td>
              </tr>
            </tbody>
          </table>
        </van-tab>
        <van-tab title="线下咨询时间"></van-tab>
      </van-tabs>
    </div>

    <div class="estimated">
      <van-tag class="tag" plain round>响应及时</van-tag>
      <van-tag class="tag" plain round>态度友善</van-tag>
      <van-tag class="tag" plain round>有问必答</van-tag>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeCollapseNames: ['1', '2'],
      activeTabs: ''
    }
  },

  methods: {
    redirect() {
      this.$router.push('/components/doctorInquiryApply')
    }
  }
}
</script>

<style lang="scss" scoped>
.doctor-detail {
  height: 100%;

  .title {
    width: 100%;
    height: 138px;

    background-size: auto 138px;
    background-repeat: no-repeat;
    background-position: center;
    background-color: transparent;
    background-image: url('~@/assets/images/bg_doctor homepage.png');

    .title-description {
      display: flex;
      align-items: center;
      height: 100px;
      padding: 0 20px;

      .title-description-avatar {
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: rgba(241, 248, 255, 1);
          border: 1px solid rgba(221, 225, 234, 1);
        }
      }

      .title-description-info {
        margin: 0 0 0 20px;

        .title-doctor {
          color: #ffffff;
          margin: 0 0 5px 0;

          .title-doctor-name {
            font-size: 18px;
            font-weight: 600;
          }

          span {
            margin: 0 10px 0 0;
          }
        }

        .title-hospital {
          margin: 0 0 5px 0;
          color: #ffffff;
        }
      }
    }
  }

  .description {
    margin: -55px 0 0 0;

    .description-service {
      height: 110px;
      display: flex;
      justify-content: space-around;
      align-items: center;

      margin: 0 40px;
      background: #fff;
      border-radius: 10px;
      box-shadow: 0 8px 12px #ebedf0;

      .description-service-item {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        img {
          width: 30px;
          height: 30px;
        }

        p {
          font-size: 14px;
          margin: 5px 0 0 0;
        }

        .money {
          font-size: 16px;
          font-weight: 600;
          color: #f2223b;
        }
      }
    }

    .description-item {
      margin: 20px 0 10px 0;
    }
  }

  .time {
    margin: 10px 0 0 0;

    .time-table {
      width: 100%;
      margin: 10px 0 0 0;

      .time-table-col {
        text-align: center;
        padding: 5px 2px;
        width: 12.5%;

        &.border {
          border-bottom: 1px solid #f2f2f2;
          border-right: 1px solid #f2f2f2;
        }

        &.primary {
          color: #00c6ae;
        }
      }
    }

    /deep/ .van-tabs {
      .van-tabs__line {
        background-color: #00c6ae;
      }

      .van-hairline--top-bottom::after,
      .van-cell:not(:last-child)::after {
        border: 0;
      }
    }
  }

  .divider {
    height: 10px;
    background: #f5f5f5;
  }

  .estimated {
    margin: 25px 0 10px 0;
    padding: 0 10px;

    .tag {
      margin: 0 10px 0 0;
      background: #f5f5f5;
    }
  }
}
</style>
