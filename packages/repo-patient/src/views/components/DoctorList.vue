<template>
  <div class="doctor-list">
    <template v-if="doctorList && doctorList.length > 0">
      <div :key="doctor.doctorInfo.doctorId"
           @click.prevent="redictToDetail(doctor.doctorInfo)"
           class="item"
           v-for="doctor in doctorList">
        <div>
          <img :src="doctor.doctorInfo.avartor"
               class="avatar" />
        </div>
        <div class="detail">
          <div class="title-doctor">
            <span class="title-doctor-name">{{
              doctor.doctorInfo.doctorName
            }}</span>
            <span>{{ doctor.doctorInfo.doctorTitle }}</span>
            <span>{{ doctor.doctorInfo.deptName }}</span>
          </div>
          <div class="title-hospital">
            <span>{{ doctor.doctorInfo.hospitalName }}</span>
          </div>
          <div class="title-description"
               v-if="doctor.doctorInfo.specialSkill">
            <span class="title-description-label">擅长:</span>
            <span class="title-description-detail">{{
              doctor.doctorInfo.specialSkill
            }}</span>
          </div>
          <div class="title-service">
            <div>
              <span class="title-service-money"
                    :class="isFree&&'free'">{{
                getServiceMoney(doctor)
              }}</span>
            </div>

            <div class="title-service-item">
              <div @click.stop="
                  redictToApply(doctor.doctorInfo, doctor.consultationList[0])
                "
                   class="title-service-item"
                   v-if="canShowImageInquiry(doctor)">
                <img src="@src/assets/images/ic_tuwen_open.png"
                     style="width: 20px;" />
                <span>图文咨询</span>
              </div>
              <!-- <div @click.stop="
                  redictToApply(doctor.doctorInfo, doctor.consultationList[1])
                " class="title-service-item">
                <img
                  v-if="canShowVideoInquiry(doctor)"
                  src="@src/assets/images/ic_video_open.png"
                  style="width: 20px;"
                />
                <img
                  v-else
                  src="@src/assets/images/ic_video.png"
                  style="width: 20px;"
                />
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </template>

    <template v-if="loaded && doctorList.length == 0">
      <div class="none-page">
        <i class="icon icon_none_doctor"></i>
        <div class="none-text">暂无医生信息</div>
      </div>
    </template>
  </div>
</template>

<script>
import peace from '@src/library'
import { Dialog } from 'vant'
export default {
  data() {
    return {
      doctorList: [],
      loaded: false,
      isFree: false
    }
  },

  activated() {
    this.isFree = peace.util.decode(this.$route.params.json).doctorTag === 'freeConsult' ? true : false
    this.get()
  },

  methods: {
    get() {
      const params = peace.util.decode(this.$route.params.json)

      if (params.type === 'starDoctorList' || params.type === 'departDoctorList') {
        peace.service.patient.getNetHospitalDoctorList(params).then(res => {
          this.doctorList = res.data
          this.loaded = true
        })
      } else {
        peace.service.patient.getDoctorList(params).then(res => {
          this.doctorList = res.data
          this.loaded = true
        })
      }
    },

    getServiceMoney(doctor) {
      let moneyList = []

      for (const key in doctor.consultationList) {
        if (doctor.consultationList.hasOwnProperty(key)) {
          if (key != 2) {
            const element = doctor.consultationList[key]
            moneyList.push(element.money)
          }
        }
      }

      const minMoney = Math.min.apply(null, moneyList)
      //免费咨询列表收费应该显示为免费，而不是0起
      const params = peace.util.decode(this.$route.params.json)
      if (params.doctorTag === 'freeConsult') {
        return '免费'
      }
      if (minMoney === Infinity) {
        return ''
      } else if (minMoney === 0) {
        return `￥${minMoney || 0}起`
      } else {
        return `￥${minMoney || 0}起`
      }
    },

    canShowImageInquiry(doctor) {
      // doctor.consultationList[0] 固定为图文咨询
      const params = peace.util.decode(this.$route.params.json)

      if (params.doctorTag === 'freeConsult') {
        return doctor.consultationList[0] && doctor.consultationList[0].status && doctor.consultationList[0].money === 0
      } else {
        return doctor.consultationList[0] && doctor.consultationList[0].status
      }
    },

    canShowVideoInquiry(doctor) {
      // doctor.consultationList[1] 固定为视频咨询
      const params = peace.util.decode(this.$route.params.json)

      if (params.doctorTag === 'freeConsult') {
        return doctor.consultationList[1] && doctor.consultationList[1].status && doctor.consultationList[1].money === 0
      } else {
        return doctor.consultationList[1] && doctor.consultationList[1].status
      }
    },

    redictToDetail(doctorInfo) {
      const params = peace.util.decode(this.$route.params.json)
      const json = peace.util.encode(
        Object.assign(params, {
          doctorId: doctorInfo.doctorId
        })
      )

      this.$router.push(`/components/doctorDetail/${json}`)
    },

    redictToApply(doctorInfo, doctorConsultation) {
      if (typeof doctorConsultation == 'undefined' || doctorConsultation.tag === 'video') {
        return peace.util.alert('暂未开放，敬请期待')
      }
      peace.service.patient
        .inquiryStatus(doctorInfo.doctorId, doctorConsultation.tag)
        .then(() => {
          //0没有问诊过 1待支付 2待接诊 3问诊中 7随访中 8没有签名

          if (doctorConsultation.tag === 'image') {
            const json = peace.util.encode({
              doctorId: doctorInfo.doctorId,
              consultingType: doctorConsultation.tag,
              consultingTypeId: doctorConsultation.consultingTypeId
            })
            this.$router.push(`/components/doctorInquiryApply/${json}`)
          }
          // 视频问诊
          else if (doctorConsultation.tag === 'video') {
            return peace.util.alert('暂未开放，敬请期待')
          }
          // 私人医生
          else if (doctorConsultation.tag === 'private') {
            return peace.util.alert('暂未开放，敬请期待')
          }
        })
        .catch(res => {
          let param = {}
          switch (res.data.data.inquiryStatus) {
            case 1:
            case 2:
              Dialog.confirm({
                title: '温馨提示',
                message: res.data.msg,
                confirmButtonText: '去看看'
              }).then(() => {
                const params = {
                  inquiryId: res.data.data.inquiryId
                }
                let json = peace.util.encode(params)
                //跳转订单详情
                this.$router.push(`/setting/userConsultDetail/${json}`)
              })

              break
            case 3:
            case 7:
              param = peace.util.encode({
                id: 'p2p-' + doctorInfo.doctorId,
                scene: 'p2p',
                beginTime: res.data.data.createTime.toDate().getTime(),
                to: doctorInfo.doctorId
              })
              // 清除聊天记录
              peace.service.IM.resetInquirySessionMessages()
              // 跳转聊天详情
              this.$router.push(`/components/messageList/${param}`)
              break
            default:
              peace.util.alert(res.data.msg)
          }
        })
      // const params = peace.util.decode(this.$route.params.json)
      // const json = peace.util.encode(
      //   Object.assign(params, {
      //     doctorId: doctorInfo.doctorId,
      //     consultingType: doctorConsultation.tag,
      //     consultingTypeId: doctorConsultation.consultingTypeId
      //   })
      // )

      // this.$router.push(`/components/doctorInquiryApply/${json}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.doctor-list {
  height: 100%;

  .item {
    width: 100%;
    display: flex;
    padding: 15px 15px 5px 15px;
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
        margin: 0 0 10px 0;
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
          &.free {
            color: #f96a0e;
          }
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
