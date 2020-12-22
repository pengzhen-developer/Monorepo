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
            <div class="tag-work online"
                 v-if="doctor.workStatus==1">在线</div>
            <div class="tag-work outline"
                 v-else-if="doctor.workStatus==2">离线</div>
          </div>
          <div class="title-hospital">
            <span>{{ doctor.hospitalName }}</span>
            <span>{{ doctor.deptName }}</span>
          </div>
          <div class="title-tag">
            <template v-for="(tag, index) in doctor.tags">
              <div :class="['doc-tags', 'tag-'+tag.key]"
                   :key="index"
                   v-if="tag.key!=='prvivateDoctor'">
                {{tag.value}}
              </div>
            </template>
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
                <template v-else>￥<span class="bold">{{doctor.money}}</span><span style="color:#999;font-size:12px;">起</span></template>
              </span>
            </div>
          </div>
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
  border-radius: 3px;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  &::before {
    content: '';
    width: 4px;
    height: 4px;
    border-radius: 50%;
    display: inline-block;
    margin-right: 4px;
  }
  &.online {
    color: $primary;
    &::before {
      background-color: $primary;
    }
  }
  &.outline {
    color: $gary;
    &::before {
      background-color: #ccc;
    }
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
      .title-tag {
        margin: 0 0 5px 0;
        .doc-tags {
          border-radius: 2px;
          color: #fff;
          padding: 1px 4px;
          margin-right: 4px;
          font-size: 10px;
          line-height: 14px;
          display: inline-block;
          font-family: PingFangSC-Regular, PingFang SC;
          &.tag-consult {
            color: $primary;
            background-color: rgba(0, 198, 174, 0.15);
          }
          &.tag-returnVisit {
            color: rgba(64, 178, 255, 1);
            background-color: rgba(64, 178, 255, 0.15);
          }
          &.tag-register {
            color: rgba(74, 131, 247, 1);
            background-color: rgba(74, 131, 247, 0.15);
          }
          &.tag-service {
            color: rgba(179, 136, 255, 1);
            background-color: rgba(179, 136, 255, 0.15);
          }
        }
      }

      .title-doctor {
        color: #000000;
        margin: 0 0 5px 0;
        position: relative;
        .title-doctor-name {
          font-size: 18px;
          font-weight: 600;
        }
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
        span {
          margin: 0 10px 0 0;
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
