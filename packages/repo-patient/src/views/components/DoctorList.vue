<template>
  <div class="doctor-list">
    <template v-if="doctorList && doctorList.length > 0">
      <div :key="doctor.doctorInfo.doctorId" @click.prevent="redictToDetail(doctor.doctorInfo)" class="item" v-for="doctor in doctorList">
        <div>
          <img :src="doctor.doctorInfo.avartor" class="avatar" />
        </div>
        <div class="detail">
          <div class="title-doctor">
            <span class="title-doctor-name">{{ doctor.doctorInfo.doctorName }}</span>
            <span>{{ doctor.doctorInfo.doctorTitle }}</span>
            <span>{{ doctor.doctorInfo.deptName }}</span>
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
              <div @click.stop="redictToApply(doctor.doctorInfo, doctor.consultationList[0])" class="title-service-item" v-if="canShowImageInquiry(doctor)">
                <img src="@src/assets/images/ic_tuwen.png" style="width: 20px;" />
                <span>图文咨询</span>
              </div>
              <div @click.stop="redictToApply(doctor.doctorInfo, doctor.consultationList[1])" class="title-service-item" v-if="canShowVideoInquiry(doctor)">
                <img src="@src/assets/images/ic_video_open.png" style="width: 20px;" />
                <span>视频咨询</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="none-page">
        <i class="icon icon_none_doctor"></i>
        <div class="none-text">暂无医生信息</div>
      </div>
    </template>
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

  activated() {
    this.get()
  },

  methods: {
    get() {
      const params = peace.util.decode(this.$route.params.json)
      peace.service.patient.getDoctorList(params).then(res => {
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
      // doctor.consultationList[0] 固定为图文咨询
      const params = peace.util.decode(this.$route.params.json)

      if (params.doctorTag === 'freeConsult') {
        return doctor.consultationList[0].status && doctor.consultationList[0].money === 0
      } else {
        return doctor.consultationList[0].status
      }
    },

    canShowVideoInquiry(doctor) {
      // doctor.consultationList[0] 固定为视频咨询
      const params = peace.util.decode(this.$route.params.json)

      if (params.doctorTag === 'freeConsult') {
        return doctor.consultationList[1].status && doctor.consultationList[1].money === 0
      } else {
        return doctor.consultationList[1].status
      }
    },

    redictToDetail(doctorInfo) {
      const json = peace.util.encode({ doctorId: doctorInfo.doctorId })

      this.$router.push(`/components/doctorDetail/${json}`)
    },

    redictToApply(doctorInfo, doctorConsultation) {
      if (doctorConsultation.tag === 'video') {
        return peace.util.alert('暂未开放，敬请期待')
      }

      const json = peace.util.encode({
        doctorId: doctorInfo.doctorId,
        consultingType: doctorConsultation.tag,
        consultingTypeId: doctorConsultation.consultingTypeId
      })

      this.$router.push(`/components/doctorInquiryApply/${json}`)
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
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: rgba(241, 248, 255, 1);
      border: 1px solid rgba(221, 225, 234, 1);
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

          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
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

