<template>
  <div class="doctor-list">
    <div :key="doctor.doctorInfo.doctorId" @click.prevent="redictToDetail" class="item" v-for="doctor in doctorList">
      <div class="avatar">
        <img :src="doctor.doctorInfo.avartor" />
      </div>
      <div class="detail">
        <div class="title-doctor">
          <span class="title-doctor-name">{{ doctor.doctorInfo.doctorName }}</span>
          <span>{{ doctor.doctorInfo.doctorTitle }}</span>
          <span>{{ doctor.doctorInfo.deptName }}</span>
          <van-tag plain>离线</van-tag>
        </div>
        <div class="title-hospital">
          <span>{{ doctor.doctorInfo.hospitalName }}</span>
        </div>
        <div class="title-description">
          <span class="title-description-label">擅长:</span>
          <span class="title-description-detail">{{ doctor.doctorInfo.specialSkill || '暂未填写' }}</span>
        </div>
        <div class="title-service">
          <div>
            <span class="title-service-money">{{ getServiceMoney(doctor) }}</span>
          </div>

          <div class="title-service-item">
            <div @click.stop="redictToApply('image')" class="title-service-item" v-if="canShowImageInquiry(doctor)">
              <img src="@src/assets/images/ic_tuwen.png" style="width: 20px;" />
              <span>图文咨询</span>
            </div>
            <div @click.stop="redictToApply('video')" class="title-service-item" v-if="canShowVideoInquiry(doctor)">
              <img src="@src/assets/images/ic_video_open.png" style="width: 20px;" />
              <span>视频咨询</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import peace from '@src/library'

export default {
  data() {
    return {
      doctorList: []
    }
  },

  created() {
    this.get()
  },

  methods: {
    get() {
      peace.service.patient.getDoctorList().then(res => {
        this.doctorList = res.data
      })
    },

    getServiceMoney(doctor) {
      const moneyList = [doctor.consultationList[0].money, doctor.consultationList[1].money, doctor.consultationList[2].money]
      const minMoney = Math.min.apply(null, moneyList)

      if (minMoney === 0) {
        return '免费'
      } else {
        return `${minMoney}起`
      }
    },

    canShowImageInquiry(doctor) {
      // 图文咨询
      return doctor.consultationList[0].status
    },

    canShowVideoInquiry(doctor) {
      // 视频咨询
      return doctor.consultationList[1].status
    },

    redictToDetail() {
      this.$router.push('/components/doctorDetail')
    },

    redictToApply() {
      this.$router.push('/components/DoctorInquiryApply')
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
      width: 100%;
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
          font-size: 16px;
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

