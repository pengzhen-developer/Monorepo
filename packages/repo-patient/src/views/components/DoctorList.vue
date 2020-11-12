<template>
  <div class="doctor-list">
    <template v-if="doctorList && doctorList.length > 0">
      <div :key="doctor.doctorId"
           @click.prevent="redictToDetail(doctor)"
           class="item"
           v-for="doctor in doctorList">
        <div>
          <img :src="doctor.avartor"
               class="avatar" />
        </div>
        <div class="detail">
          <div class="title-doctor">
            <span class="title-doctor-name">{{
              doctor.doctorName
            }}</span>
            <span>{{ doctor.doctorTitle }}</span>
            <!-- 服务部标签 服务部未开通故屏蔽-->
            <template v-if="doctor.serviceList">
              <template v-for="(it, i) in doctor.serviceList">
                <div :class="['label', 'label-'+it]"
                     :key="i"
                     v-if="it!=='prvivateDoctor'">
                  {{it == 'image' || it == 'video' ? '问' : it =='prvivateDoctor' ? '服务包' : it == 'register' ? '号' : ''}}
                </div>
              </template>
            </template>
            <template v-if="doctor.tags">
              <template v-for="(it, i) in doctor.tags">
                <div :class="['label', 'label-'+it]"
                     :key="i"
                     v-if="it!=='prvivateDoctor'">
                  {{it == 'image' || it == 'video' ? '问' : it =='prvivateDoctor' ? '服务包' : it == 'register' ? '号' : ''}}
                </div>
              </template>
            </template>
            <div class="tag-work online"
                 v-if="doctor.workStatus==1">接诊中</div>
            <div class="tag-work outline"
                 v-else-if="doctor.workStatus==2">休息中</div>
          </div>
          <div class="title-hospital">
            <span>{{ doctor.hospitalName }}</span>
            <span>{{ doctor.deptName }}</span>
          </div>
          <div class="title-description"
               v-if="doctor.specialSkill">
            <span class="title-description-label">擅长:</span>
            <span class="title-description-detail">{{
              doctor.specialSkill
            }}</span>
          </div>
          <div class="title-service">
            <div>
              <span class="title-service-money"
                    v-if="doctor.money"
                    :class="isFree&&'free'">
                <template v-if='isFree'>免费 </template>
                <template v-else>￥<span class="bold">{{doctor.money}}</span>起</template>
              </span>
            </div>

            <div class="title-service-item">
              <div class="title-service-item"
                   :class="canShowImg(doctor,'inquiry')&&'unopen'">
                <img src="@src/assets/images/ic_free_talk.png"
                     style="width: 15px;" />
                <span>咨询</span>
              </div>
              <div class="title-service-item"
                   :class="canShowImg(doctor,'returnVisit')&&'unopen'">
                <img src="@src/assets/images/ic_online_retalk.png"
                     style="width: 15px;" />
                <span>复诊</span>
              </div>
            </div>

            <!-- <div class="title-service-item">
              <div @click.stop="
                  redictToApply(doctor.doctorInfo, doctor.consultationList.find(item=>item.tag=='image'))
                "
                   class="title-service-item"
                   v-if="canShowInquiry(doctor,'image')">
                <img src="@src/assets/images/ic_tuwen_open.png"
                     style="width: 20px;" />
                <span>图文咨询</span>
              </div>
              <div @click.stop="
                  redictToApply(doctor.doctorInfo, doctor.consultationList.find(item=>item.tag=='video'))
                "
                   class="title-service-item"
                   v-if="canShowInquiry(doctor,'video')">
                <img src="@src/assets/images/ic_video_open.png"
                     style="width: 20px;" />
                <span>视频咨询</span>
              </div>
            </div> -->
          </div>
          <!-- 候诊排队人数 -->
          <!-- <div class="title-wait">
            <van-image width="14px"
                       height="13px"
                       :src="require('@src/assets/images/ic_wenzhen.png')"></van-image>
            <span>23人正在候诊...</span>
          </div> -->
        </div>
      </div>
    </template>

    <template v-if="loaded && doctorList.length == 0">
      <div class="none-page"
           v-if="serviceType=='returnVisit'">
        <i class="icon icon_none_source"></i>
        <div class="none-text">暂无排班记录</div>
      </div>
      <div class="none-page"
           v-else>
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
      doctorList: [],
      loaded: false,
      isFree: false,
      serviceType: ''
    }
  },

  activated() {
    this.isFree = peace.util.decode(this.$route.params.json).doctorTag === 'freeConsult' ? true : false
    this.serviceType = peace.util.decode(this.$route.params.json).serviceType
    this.get()
  },

  methods: {
    get() {
      const params = peace.util.decode(this.$route.params.json)
      if (params.type === 'starDoctorList' || params.type === 'departDoctorList') {
        peace.service.patient.getNetHospitalDoctorList(params).then((res) => {
          this.doctorList = res.data
          this.loaded = true
        })
      } else {
        peace.service.patient.getDoctorList(params).then((res) => {
          this.doctorList = res.data
          this.loaded = true
        })
      }
    },

    getServiceMoney(doctor) {
      const minMoney = doctor.money
      //免费咨询列表收费应该显示为免费，而不是0起
      const params = peace.util.decode(this.$route.params.json)
      if (params.doctorTag === 'freeConsult') {
        return '免费'
      }
      return `￥${minMoney || 0}起`
    },

    canShowImg(doctor, type) {
      if (doctor.serviceManage && doctor.serviceManage.length > 0) {
        const serviceManage = doctor.serviceManage.find((item) => item.serviceType == type)
        if (typeof serviceManage == 'undefined') {
          return true
        } else {
          return false
        }
      } else {
        return true
      }
    },

    canShowInquiry(doctor, type) {
      const params = peace.util.decode(this.$route.params.json)
      const consultation = doctor.consultationList.filter((item) => item.tag == type)[0]
      if (params.doctorTag === 'freeConsult') {
        return consultation && consultation.status && consultation.money === 0
      } else {
        return consultation && consultation.status
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
      if (typeof doctorConsultation == 'undefined') {
        return peace.util.alert('暂未开放，敬请期待')
      }
      // 视频问诊
      else if (doctorConsultation.tag === 'video') {
        return peace.util.alert('H5版本暂不支持视频问诊')
      }
      // 私人医生
      else if (doctorConsultation.tag === 'private') {
        return peace.util.alert('暂未开放，敬请期待')
      }
      // 图文问诊
      else if (doctorConsultation.tag === 'image') {
        const json = peace.util.encode({
          doctorId: doctorInfo.doctorId,
          consultingType: doctorConsultation.tag,
          consultingTypeId: doctorConsultation.consultingTypeId
        })
        this.$router.push(`/components/doctorInquiryApply/${json}`)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tag-work {
  height: 15px;
  width: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  line-height: normal;
  margin: 0;
  box-sizing: content-box;
  border-width: 1px;
  border-style: solid;
  border-radius: 3px;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  &.online {
    color: $primary;
    border-color: $primary;
    background-color: rgba(0, 198, 174, 0.1);
  }
  &.outline {
    color: $gary;
    border-color: $gary;
  }
}
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
        position: relative;
        .title-doctor-name {
          font-size: 18px;
          font-weight: 600;
        }

        span {
          margin: 0 10px 0 0;
        }
        /*{{it.tag == 'image' ? '问' : it.tag =='prvivateDoctor' ? '服务包' : it.tag == 'appoint' ? '号' : '视频'}}*/
        .label {
          border-radius: 2px;
          color: #fff;
          padding: 0px 2px;
          margin-right: 2.5px;
          font-size: 9px;
          &.label-image {
            background: #00c6ae;
            border-color: #00c6ae;
          }
          &.label-appoint {
            background: #74b0ff;
            border-color: #74b0ff;
          }
          &.label-prvivateDoctor {
            background: #ac91ff;
            border-color: #ac91ff;
          }
          &.label-video {
            background: #888;
            border-color: #888;
          }
          &.label-register {
            background: #74b0ff;
            border-color: #74b0ff;
          }
        }
      }

      .title-hospital {
        margin: 0 0 5px 0;
        color: #000000;
        span {
          margin-right: 10px;
        }
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
          word-wrap: break-word;
          word-break: break-all;
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
          .bold {
            font-weight: 600;
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
          &.unopen {
            opacity: 0.3;
          }
          span {
            margin: 0 0 0 5px;
          }
        }
      }

      .title-wait {
        padding: 6px 15px;
        background: rgba(235, 251, 249, 1);
        border-radius: 3px;
        display: flex;
        align-items: center;
        margin: 5px 0;
        span {
          font-size: 12px;
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
