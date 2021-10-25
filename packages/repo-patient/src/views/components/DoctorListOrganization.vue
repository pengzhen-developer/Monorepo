<template>
  <div class="page">
    <DoctorSearchModel :searchInfo="model"
                       @updateSelect="updateSelect"></DoctorSearchModel>
    <van-pull-refresh v-model="isLoading"
                      class="doctor-list"
                      loosing-text=" "
                      pulling-text=" "
                      loading-text=" "
                      success-text="刷新成功"
                      @refresh="refresh">
      <van-list v-model="loading"
                :finished="finished"
                @load="getDoctorList()">
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
                  <div class="title-service-money"
                       v-if="doctor.money"
                       :class="isFree&&'free'">
                    <template v-if='isFree'>免费 </template>
                    <template v-else>
                      <peace-price class="bold"
                                   v-bind:price="doctor.money"
                                   v-bind:size="16"></peace-price><span style="color:#999;font-size:12px;"></span>
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </van-list>
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
    </van-pull-refresh>
  </div>
</template>

<script>
import peace from '@src/library'
import Vue from 'vue'
import { PullRefresh } from 'vant'

Vue.use(PullRefresh)

import DoctorSearchModel from '@src/views/components/DoctorSearchModel.vue'

export default {
  components: { DoctorSearchModel },
  data() {
    return {
      doctorList: [],
      //下拉刷新
      isLoading: false,
      //已加载
      loaded: false,
      //上拉加载更多
      loading: false,
      finished: false,
      isFree: false,
      serviceType: '',
      model: {
        netHospitalId: '',
        serviceType: '',
        inquiryType: '',
        deptId: '',
        childDeptId: '',
        orderByType: 'comprehensive',
        doctorLevel: '',
        p: 0,
        size: 10
      }
    }
  },

  activated() {
    this.isFree = peace.util.decode(this.$route.params.json).doctorTag === 'freeConsult' ? true : false
    this.serviceType = peace.util.decode(this.$route.params.json).serviceType

    const params = peace.util.decode(this.$route.params.json)
    this.model.netHospitalId = params.netHospitalId
    this.model.serviceType = params.serviceType
    this.model.inquiryType = params.inquiryType
    this.model.deptId = params.deptId
    this.model.childDeptId = params.childDeptId
  },

  methods: {
    updateSelect(result) {
      this.model = result
      this.getDoctorList('refresh')
    },
    refresh() {
      this.getDoctorList('refresh')
    },
    getDoctorList(type = '') {
      if (type == 'init') {
        this.model.p = 0
        this.doctorList = []
        this.finished = false
        this.loaded = false
      }
      if (type == 'refresh') {
        this.model.p = 0
        this.doctorList = []
        this.finished = true
        this.loaded = false
      }

      this.model.p++
      peace.service.patient.getNetHospitalDoctorList(this.model).then((res) => {
        this.doctorList = this.doctorList.concat(res.data.list)
        if (type == 'refresh') {
          this.isLoading = false
          this.finished = false
        }
        this.loaded = true
        this.loading = false

        if (res.data.list.length == 0 || this.model.p * this.model.size >= res.data.total) {
          this.finished = true
        }
      })
    },

    getServiceMoney(doctor) {
      const minMoney = doctor.money
      //免费问诊列表收费应该显示为免费，而不是0起
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
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.van-pull-refresh {
  overflow: auto;
}
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
  flex: 1;

  .item {
    width: 100%;
    display: flex;
    padding: 15px 15px 5px 15px;
    border-bottom: 1px solid #e5e5e5;

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
          &.tag-servicePackage {
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
