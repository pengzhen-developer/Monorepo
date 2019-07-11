<template>
  <div class="doctor-list">
    <div :key="item" @click="redict" class="item" v-for="item in 5">
      <div class="avatar">
        <img />
      </div>
      <div class="detail">
        <div class="title-doctor">
          <span class="title-doctor-name">张逗豆</span>
          <span>副主任医生</span>
          <span>妇产科</span>
          <van-tag plain>离线</van-tag>
        </div>
        <div class="title-hospital">
          <span>郑州大学第一附属医院</span>
        </div>
        <div class="title-description">
          <span class="title-description-label">擅长:</span>
          <span class="title-description-detail">临床工作经验丰富，擅长治疗儿童呼呼吸道 感染性疾病，儿童过敏...</span>
        </div>
        <div class="title-service">
          <div>
            <span class="title-service-money">￥50</span>
            <span class="title-service-money-extend">起</span>
          </div>

          <div>
            <div class="title-service-item">
              <i></i>
              <span>图文咨询</span>
            </div>
            <div class="title-service-item">
              <i></i>
              <span>视频咨询</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    redict() {
      this.$router.push('/components/doctorDetail')
    }
  }
}
</script>

<style lang="scss" scoped>
.doctor-list {
  .item {
    width: 100%;
    display: flex;
    padding: 15px;
    border-bottom: 1px solid #efefef;

    .avatar {
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: rgba(241, 248, 255, 1);
        border: 1px solid rgba(221, 225, 234, 1);
      }
    }

    .detail {
      margin: 0 0 0 10px;

      .title-doctor {
        color: #000000;
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
        color: #000000;
      }

      .title-description {
        margin: 0 0 15px 0;
        color: #999999;

        .title-description-label {
          float: left;
        }
        .title-description-detail {
          margin: 0 0 0 40px;
          display: block;
        }
      }

      .title-service {
        margin: 0 0 5px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .title-service-money {
          color: #fb2828;
          font-size: 18px;
        }
        .title-service-money-extend {
          color: #fb2828;
          margin: 0 0 0 2px;
          font-size: 14px;
        }
        .title-service-item {
          display: inline-flex;
          align-items: center;
          color: #000000;
          margin: 0 0 0 10px;

          span {
            margin: 0 0 0 5px;
          }
        }
      }
    }
  }
}
</style>

