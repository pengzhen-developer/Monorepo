<template>
  <div class="doctor-detail">
    <div class="header">
      <div class="header-left">
        <van-image round
                   width="50px"
                   height="50px"
                   cover
                   :src="doctor.doctorInfo.avartor" />
        <span class="name">{{ doctor.doctorInfo.name }}</span>
        <span class="level">{{ doctor.doctorInfo.doctorTitle }}</span>
        <div class="tag-work tag-online"
             v-if="doctor.doctorInfo.workStatus==1">接诊中</div>
        <div class="tag-work tag-outline"
             v-else-if="doctor.doctorInfo.workStatus==2">休息中</div>
      </div>

      <div class="header-right">
        <van-button v-if="doctor.doctorInfo.attentionStatus==1"
                    class="star"
                    round
                    size="small"
                    disabled
                    style="font-weight: bold;">已关注</van-button>

        <van-button v-else
                    @click="shareDoctor(doctor.doctorInfo)"
                    class="star"
                    round
                    :icon="require('@src/assets/images/ic_follow.png')"
                    size="small"
                    style="font-weight: bold;">关注</van-button>
      </div>
    </div>

    <div class="body">
      <!-- 所属机构 -->
      <div class="body-card">
        <div class="row flex">
          <van-image width="30px"
                     height="30px"
                     :src="require('@src/assets/images/file/ic_mechanism.png')" />
          <h4 class="body-card-title">所属机构</h4>
        </div>

        <div class="row flex between">
          <div>
            <span class="hospital">{{ doctor.doctorInfo.hospitalName }}</span>
            <span class="deparment">{{ doctor.doctorInfo.deptName }}</span>
          </div>
          <div>
            <van-icon name="arrow"
                      @click="goMap(doctor.doctorInfo)" />
          </div>
        </div>

        <van-divider />

        <div class="row">
          <div class="row flex">
            <van-image width="30px"
                       height="30px"
                       :src="require('@src/assets/images/ic_be good at.png')" />
            <h4 class="body-card-title">专业擅长</h4>
          </div>
          <div class="body-card-description"
               :class="{ fold: fold, unfold: !fold }"
               v-html="doctor.doctorInfo.specialSkill || '暂未填写'"></div>
        </div>

        <div class="row"
             v-show="!fold">
          <van-divider />

          <div class="row flex">
            <van-image width="30px"
                       height="30px"
                       :src="require('@src/assets/images/ic_brief introduction.png')" />
            <h4 class="body-card-title">医生简介</h4>
          </div>

          <div class="body-card-description"
               :class="{ fold: fold, unfold: !fold }"
               v-html="doctor.doctorInfo.summary || '暂未填写'"></div>
        </div>

        <div class="row flex center">
          <div class="more">
            <div @click="showMore"
                 v-if="fold"
                 class="row flex center">
              <span style="margin: 0 4px 0 0;">查看更多</span>
              <van-image round
                         width="13px"
                         height="13px"
                         :src="require('@src/assets/images/ic_more.png')"></van-image>
            </div>
            <div @click="showMore"
                 v-if="!fold"
                 class="row flex center">
              <span style="margin: 0 4px 0 0;">收起</span>
              <van-image round
                         width="13px"
                         height="13px"
                         style="transform: rotate(180deg)"
                         :src="require('@src/assets/images/ic_more.png')"></van-image>
            </div>
          </div>
        </div>
      </div>

      <!-- 问诊服务 -->
      <div class="body-card">
        <div class="row flex between">
          <div class="row flex">
            <van-image width="30px"
                       height="30px"
                       :src="require('@src/assets/images/ic_interrogation.png')" />
            <h4 class="body-card-title">问诊服务</h4>
          </div>
          <div></div>
        </div>

        <!-- 图文咨询 -->
        <div class="service row flex"
             @click="goApply(serviceImageInfo, 'image')">
          <van-image width="30px"
                     height="30px"
                     v-if="serviceImageInfo.status"
                     style="margin: 0 10px 0 0;"
                     :src="require('@src/assets/images/ic_tuwen_open.png')"></van-image>
          <van-image width="30px"
                     height="30px"
                     v-else
                     style="margin: 0 10px 0 0;"
                     :src="require('@src/assets/images/ic_tuwen.png')"></van-image>

          <div class="service-consult-content">
            <div class="row flex between"
                 style="margin: 0;">
              <span class="service-consult-content-name">图文咨询</span>
              <span v-if="serviceImageInfo.status">
                <span class="service-consult-content-fee">￥{{ serviceImageInfo.money }}</span>
                <span class="service-consult-content-unit"> / 次</span>
              </span>
              <span v-else
                    class="service-consult-content-description">
                暂未开通
              </span>
            </div>
            <div>
              <span class="service-consult-content-description">可通过文字、图片的形式和医生沟通</span>
            </div>
          </div>
        </div>

        <!-- 视频咨询 -->
        <div class="service row flex"
             @click="goApply(serviceVideoInfo, 'video')">
          <!-- 视频咨询尚未开通 -->
          <van-image round
                     width="30px"
                     height="30px"
                     v-if="serviceVideoInfo.status"
                     style="margin: 0 10px 0 0;"
                     :src="require('@src/assets/images/ic_video_open.png')"></van-image>
          <van-image round
                     width="30px"
                     height="30px"
                     v-else
                     style="margin: 0 10px 0 0;"
                     :src="require('@src/assets/images/ic_video.png')"></van-image>

          <div class="service-consult-content">
            <div class="row flex between"
                 style="margin: 0;">
              <span class="service-consult-content-name">视频咨询</span>
              <span v-if="serviceVideoInfo.status">
                <span class="service-consult-content-fee">￥{{ serviceVideoInfo.money }}</span>
                <span class="service-consult-content-unit"> / 次</span>
              </span>
              <span v-else
                    class="service-consult-content-description">
                暂未开通
              </span>
            </div>
            <div>
              <span class="service-consult-content-description">可通过视频的形式和医生沟通</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 挂号服务 -->
      <div class="body-card"
           v-if="doctor.registerData&&doctor.registerData.length > 0">
        <div class="row flex between">
          <div class="row flex">
            <van-image width="30px"
                       height="30px"
                       :src="require('@src/assets/images/ic_register.png')" />
            <h4 class="body-card-title">挂号服务</h4>
          </div>
          <div>
            <van-icon name="arrow"
                      @click="goRegisterList" />
          </div>
        </div>

        <div class="service row flex"
             v-for="(registerItem, index) in doctor.registerData"
             :key="
            registerItem.timeSharing +
              registerItem.bookingStart +
              registerItem.bookingEnd
          ">
          <div class="service-consult-content">
            <div class="row flex"
                 style="margin: 0 0 4px 0;">
              <span class="service-consult-content-name">
                {{ registerItem.timeSharing }}
                {{ registerItem.AMPM == "AM" ? "上午" : "下午" }}
              </span>
              <van-tag style="margin: 0 12px; font-size: 12px;"
                       color="#f1f1f1"
                       text-color="#999999">
                {{ index === 0 ? "号源一" : index === 1 ? "号源二" : "" }}
              </van-tag>
            </div>
            <div>
              <span>
                <span class="service-consult-content-description"
                      style="font-size: 13px; margin: 0 10px 0 0;">{{
                    registerItem.sourceLevelType == 1 ? "普通门诊" : "专家号"
                  }}</span>
                <span class="service-consult-content-fee"
                      style="font-size: 13px;">￥{{ registerItem.unitPrice }}</span>
              </span>
            </div>
          </div>

          <van-button round
                      size="small"
                      type="primary"
                      @click="goRegisterDetail(registerItem)">预约</van-button>
        </div>
      </div>

      <!-- 健康服务 -->
      <!-- <div class="body-card"
           v-if="servicePrivateInfo.consultingTypeId"
           @click="goApply(servicePrivateInfo, 'private')">
        <div class="row flex">
          <div class="row flex">
            <van-image width="30px"
                       height="30px"
                       :src="require('@src/assets/images/ic_service.png')" />
            <h4 class="body-card-title">健康服务</h4>
          </div>
          <div>
          </div>
        </div>

        <div class="service row flex">
          <van-image round
                     width="30px"
                     height="30px"
                     style="margin: 0 10px 0 0;"
                     :src="require('@src/assets/images/file/ic_doctor.png')"></van-image>

          <div class="service-consult-content">
            <div class="row flex between"
                 style="margin: 0;">
              <span class="service-consult-content-name">私人医生</span>
              <span>
                <span class="service-consult-content-fee">
                  <span>￥</span>
                  {{ servicePrivateInfo.money }}
                </span>
                <span class="service-consult-content-unit">
                  <span>/</span>
                  {{ privateTimeType[servicePrivateInfo.type] }}
                </span>
              </span>
            </div>
            <div>
              <span class="service-consult-content-description">购买一定服务期，期限内可免费提供问诊</span>
            </div>
          </div>
        </div>
      </div> -->

      <!-- 医生排班 -->
      <div class="body-card"
           v-if="doctor.workOnLine || doctor.workUnderLine">
        <div class="row flex">
          <div class="row flex">
            <van-image width="30px"
                       height="30px"
                       :src="require('@src/assets/images/ic_scheduling.png')" />
            <h4 class="body-card-title">医生排班</h4>
          </div>
        </div>

        <van-tabs v-model="activeTab">
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
                  <td :key="item.id"
                      class="time-table-col border primary"
                      v-for="item in doctor.workOnLine[0].weekList">
                    <span v-if="item.status">
                      <van-icon name="success" />
                    </span>
                  </td>
                </tr>
                <tr>
                  <td class="time-table-col border">下午</td>
                  <td :key="item.id"
                      class="time-table-col border primary"
                      v-for="item in doctor.workOnLine[1].weekList">
                    <span v-if="item.status">
                      <van-icon name="success" />
                    </span>
                  </td>
                </tr>
                <tr>
                  <td class="time-table-col border">晚上</td>
                  <td :key="item.id"
                      class="time-table-col border primary"
                      v-for="item in doctor.workOnLine[2].weekList">
                    <span v-if="item.status">
                      <van-icon name="success" />
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </van-tab>
          <van-tab title="线下门诊时间">
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
                  <td :key="item.id"
                      class="time-table-col border primary"
                      v-for="item in doctor.workUnderLine[0].weekList">
                    <span v-if="item.status">
                      <van-icon name="success" />
                    </span>
                  </td>
                </tr>
                <tr>
                  <td class="time-table-col border">下午</td>
                  <td :key="item.id"
                      class="time-table-col border primary"
                      v-for="item in doctor.workUnderLine[1].weekList">
                    <span v-if="item.status">
                      <van-icon name="success" />
                    </span>
                  </td>
                </tr>
                <tr>
                  <td class="time-table-col border">晚上</td>
                  <td :key="item.id"
                      class="time-table-col border primary"
                      v-for="item in doctor.workUnderLine[2].weekList">
                    <span v-if="item.status">
                      <van-icon name="success" />
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </van-tab>
        </van-tabs>
      </div>

      <!-- 患者评价 -->
      <div class="body-card"
           v-if="common&&common.count>0">
        <div class=" flex between">
          <div class=" flex">
            <van-image width="30px"
                       height="30px"
                       :src="require('@src/assets/images/ic_evaluate.png')" />
            <h4 class="body-card-title">{{'患者评价('+common.count+')'}}</h4>
          </div>
          <!-- <div class=" flex"
               @click="common.count>0&&seeMoreComment()">
            <span class="see-more">查看详情</span>
            <van-image width="10.5px"
                       height="10.5px"
                       :src="require('@src/assets/images/ic_more_right.png')" />
          </div> -->
        </div>
        <div class="flex impress">
          <span class="primary">患者对我的主要印象：{{common.tags.join(' 、')}}</span>
        </div>
        <div class="flex commen"
             v-for="(item,index) in common.lists"
             :key="index">
          <van-image width="30px"
                     height="30px"
                     :src="item.iconHead" />
          <div class="main">
            <div class="flex between main-top">
              <div class="name">{{item.familyInfo.name}}</div>
              <van-rate v-model="item.starLevel"
                        readonly
                        size="10"
                        :icon="require('@src/assets/images/ic_star_active.png')"
                        :void-icon="require('@src/assets/images/ic_star.png')" />
            </div>
            <div class="main-middle color-666">
              {{item.content}}
            </div>
            <div class="main-time color-999">{{item.createdTime}}</div>
          </div>
        </div>

      </div>
    </div>

    <!-- 就诊人信息 -->
    <template>
      <AddPatientMsg :doctor="doctor.doctorInfo"
                     :showFamily.sync="showFamily"
                     @changeFlag="changeFlag"></AddPatientMsg>
    </template>

    <div class="none-page-doctor"
         v-if="!doctorStatus">
      <van-image width="75px"
                 height="75px"
                 class="none-image"
                 :src="require('@src/assets/images/ic_cry.png')"></van-image>
      <div class="none-text">医生暂时将不能为您提供服务</div>
    </div>
  </div>

</template>

<script>
import AddPatientMsg from '@src/views/components/AddPatientMsg'
import peace from '@src/library'
import Vue from 'vue'
import { Rate } from 'vant'

Vue.use(Rate)
export default {
  components: { AddPatientMsg },
  data() {
    return {
      fold: true,
      doctorStatus: 1,
      activeTab: '',

      doctor: {
        doctorInfo: {},
        consultationList: {},
        registerData: []
      },

      serviceImageInfo: {},
      serviceVideoInfo: {},
      servicePrivateInfo: {},

      privateTimeType: {
        0: '次',
        1: '周',
        2: '月',
        3: '季',
        4: '半年',
        5: '年'
      },
      common: {},
      showFamily: false, //判断是否弹出弹框
      isEwm: 0
    }
  },
  activated() {
    //登录之后返回医生主页，从缓存取分享标识isEWm
    if (peace.cache.get('isEwm')) {
      this.isEwm = peace.cache.get('isEwm')
    } else {
      //通过分享进入医生首页 获取分享标识isEwm字段并存在缓存中
      this.isEwm = peace.util.decode(this.$route.params.json).isEwm ? 1 : 0
      peace.cache.set('isEwm', this.isEwm)
    }
    this.getWapDoctorInfo()
    this.goLogin()
  },
  beforeRouteEnter(to, from, next) {
    next(() => {
      if (peace.cache.get('isEwm') && from.fullPath.indexOf('login') != -1) {
        peace.cache.remove('isEwm')
      }
    })
  },
  mounted() {
    // this.getWapDoctorInfo()
    // this.goLogin()
  },
  methods: {
    hasLogin() {
      return peace.cache.get(peace.type.USER.INFO) == null ? false : true
    },
    goLogin() {
      //!this.hasLogin()&&this.isEwm 未登录且通过分享进入医生主页
      if (!this.hasLogin() && this.isEwm) {
        this.$router.push(`/login`)
      }
    },
    changeFlag(flag) {
      this.showFamily = !this.showFamily
      if (flag) {
        this.getWapDoctorInfo()
      }
    },
    getWapDoctorInfo() {
      const params = peace.util.decode(this.$route.params.json)

      peace.service.doctor.getWapDoctorInfo(params).then(res => {
        this.doctorStatus = res.data.doctorInfo.doctorStatus
        let obj = {
          url: '',
          title: this.doctor.doctorInfo.name + ' ' + this.doctor.doctorInfo.doctorTitle,
          desc: this.doctor.doctorInfo.specialSkill,
          imgUrl: this.doctor.doctorInfo.avartor
        }

        peace.wx.share.share(obj)
        if (res.data.consultationList) {
          this.serviceImageInfo = res.data.consultationList.image || {}
          this.serviceVideoInfo = res.data.consultationList.video || {}
          this.servicePrivateInfo = res.data.consultationList.prvivateDoctor || {}
        }

        let isAddPatient = res.data.doctorInfo.isAddPatient //是否添加就诊人

        if (this.hasLogin() && this.isEwm && !isAddPatient) {
          setTimeout(() => {
            this.showFamily = true
          }, 500)
        }
        this.doctor = res.data
        this.getCommentList()
      })
    },

    showMore() {
      this.fold = !this.fold
    },

    shareDoctor(doctorInfo) {
      const params = {
        doctorId: doctorInfo.doctorId,
        link: 3
      }

      peace.service.patient.attention(params).then(() => {
        doctorInfo.attentionStatus = true
      })
    },

    goMap(doctorInfo) {
      if (doctorInfo.address || (doctorInfo.latitude && doctorInfo.longitude)) {
        const json = peace.util.encode({
          name: doctorInfo.hospitalName,
          address: doctorInfo.address,
          latitude: doctorInfo.latitude,
          longitude: doctorInfo.longitude
        })

        this.$router.push(`/home/map/${json}`)
      }
    },

    goApply(serviceInfo, type) {
      if (!serviceInfo.status) {
        return peace.util.alert('暂未开通')
      }
      if (type === 'image') {
        const json = peace.util.encode({
          doctorId: this.doctor.doctorInfo.doctorId,
          consultingType: serviceInfo.tag,
          consultingTypeId: serviceInfo.consultingTypeId
        })
        this.$router.push(`/components/doctorInquiryApply/${json}`)
      }
      // 视频问诊
      else if (type === 'video') {
        return peace.util.alert('H5版本暂不支持视频问诊')
      }
      // 私人医生
      else if (type === 'private') {
        return peace.util.alert('暂未开放，敬请期待')
      }
    },

    goRegisterList() {
      const params = peace.util.encode({
        doctorId: this.doctor.doctorInfo.doctorId,
        hospitalCode: this.doctor.doctorInfo.nethospitalid
      })

      this.$router.push(`/appoint/doctor/appointDoctorSelect/${params}`)
    },

    goRegisterDetail(item) {
      let timeSharing = item.timeSharing
      let timeArr = timeSharing.split('-')
      const params = peace.util.encode({
        doctorInfo: {
          ...item,
          nethospitalId: this.doctor.doctorInfo.nethospitalid,
          avatar: this.doctor.doctorInfo.avartor,
          name: this.doctor.doctorInfo.name,
          doctorTitle: this.doctor.doctorInfo.doctorTitle,
          deptName: this.doctor.doctorInfo.deptName,
          hospitalName: this.doctor.doctorInfo.hospitalName
        },
        date: {
          date: timeArr[1] + '-' + timeArr[2],
          year: timeArr[0],
          week: item.week
        },
        source: {
          endTime: item.endTime,
          isExpire: 0,
          number: 1,
          sourceCode: item.sourceCode,
          sourceLevelType: item.sourceLevelType,
          startTime: item.startTime,
          type: item.AMPM,
          unitPrice: item.unitPrice
        }
      })

      this.$router.push(`/appoint/order/appointOrderSubmit/${params}`)
    },

    getCommentList() {
      // , p: 1, size: 3
      peace.service.group.commentLists({ doctorId: this.doctor.doctorInfo.doctorId }).then(res => {
        this.common = res.data
      })
    },
    seeMoreComment() {
      let json = peace.util.encode({
        doctorId: this.doctor.doctorInfo.doctorId
      })
      this.$router.push(`/components/CommentList/${json}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.none-page-doctor {
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  z-index: 666;
  display: flex;
  flex-direction: column;
  align-items: center;

  .none-image {
    margin-top: 150px;
    margin-bottom: 20px;
  }
  .none-text {
    color: #fff;
    font-size: 16px;
  }
}
.shadow {
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  z-index: 999;
}
.family {
  position: fixed;
  background-color: #fff;
  border-radius: 20px 20px 0 0;
  width: 100%;
  z-index: 1000;
  left: 0;
  transition: bottom 0.5s ease;
  &.no-family {
    height: 84.5%;
    bottom: -84.5%;
    &.show {
      bottom: 0;
    }
  }
  &.has-family {
    min-height: 60%;
    max-height: 84.5%;
    bottom: -84.5%;
    &.show {
      bottom: 0;
    }
  }
}

.flex {
  display: flex;
  align-items: center;
  &.between {
    justify-content: space-between;
  }
  &.commen {
    align-items: flex-start;
  }
  .see-more {
    margin-right: 5px;
    color: #999;
    font-size: 12px;
  }
}
.impress {
  height: 35px;
  background: rgba(240, 252, 250, 1);
  border-radius: 8px;
  padding: 8px 15px 8px 45px;
  box-sizing: border-box;
  margin-top: 10px;
  position: relative;
  span {
    font-size: 12px;
  }
  &::before {
    position: absolute;
    content: ' ';
    background-image: url('~@/assets/images/xingji.png');
    background-size: cover;
    width: 15px;
    height: 14px;
    left: 15px;
    top: 10px;
  }
}
.commen {
  border-bottom: 1px solid #eee;
  padding-top: 10px;
  padding-bottom: 15px;
  &:last-child {
    border-bottom: 0;
    padding-bottom: 5px;
  }
  .van-image {
    margin-right: 8px;
  }
  .main {
    flex: 1;
    .main-top {
      height: 30px;
      .name {
        color: #000;
      }
    }
    .color-666 {
      color: #666;
      font-size: 12px;
    }
    .color-999 {
      color: #999;
      font-size: 12px;
    }
  }
}

.doctor-detail {
  height: 100%;
  display: flex;
  flex-direction: column;

  .header {
    min-height: 105px;
    height: 105px;

    background-image: url('~@/assets/images/bg-1.png');
    background-repeat: no-repeat;
    background-size: auto 105px;

    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;

    .header-left {
      margin-top: -10px;
      display: flex;
      align-items: center;
      color: #fff;

      .name {
        font-weight: bold;
        font-size: 18px;
        margin: 0 8px 0 16px;
      }
      .level {
        font-size: 14px;
      }
    }
    .tag-work {
      height: 15px;
      width: 42px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      line-height: normal;
      box-sizing: content-box;
      border: 1px solid #fff;
      border-radius: 3px;
      margin-left: 10px;
      &.tag-online {
        color: $primary;
        border-color: $primary;
        background-color: #fff;
      }
      &.tag-outline {
        color: #fff;
      }
    }
    .header-right {
      margin-top: -10px;

      .star {
        background: rgba(229, 249, 246, 1);
        color: $-color--primary !important;

        i {
          font-weight: bold !important;
          display: flex;
          align-items: center;
        }

        display: flex;
        justify-content: center;
        align-items: center;

        height: none;
        line-height: normal;
      }
    }
  }

  .body {
    flex: 1;
    background: #f5f5f5;
    padding: 16px;

    .body-card {
      &:first-child {
        margin-top: -30px;
      }

      background: #fff;
      min-height: 60px;
      margin: 0 0 14px 0;
      padding: 16px;
      border-radius: 14px;

      .row {
        margin: 0 0 8px 0;

        &.flex {
          display: flex;
          align-items: center;
        }
        &.column {
          flex-direction: column;
        }
        &.between {
          justify-content: space-between;
        }
        &.center {
          justify-content: center;
        }
        &.service {
          border-radius: 14px;
          padding: 10px;
          background: #f9f9f9;
          margin: 0 0 10px 0;
        }
        &:last-child {
          margin: 0;
        }
      }

      .body-card-title {
        margin: 0 16px;
        font-weight: bold;
        font-size: 16px;
      }

      .hospital,
      .department,
      .body-card-description {
        font-size: 14px;
        font-weight: 400;
        color: #333333;
        margin: 0 8px 0 0;
        text-align: justify;
      }

      .body-card-description {
        line-height: 20px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        &.fold {
          -webkit-line-clamp: 2;
        }
        &.unfold {
          -webkit-line-clamp: 99;
        }
      }

      .service-consult-content {
        flex: 1;
        margin: 0 0 0 0;

        .service-consult-content-name {
          color: #333333;
          font-size: 15px;
          font-weight: bold;
        }

        .service-consult-content-fee {
          font-weight: bold;
          color: #f2223b;
          font-size: 16px;
        }

        .service-consult-content-unit {
          font-size: 12px;
        }

        .service-consult-content-description {
          color: #999999;
          font-size: 12px;
        }
      }

      .more {
        color: #999999;
        margin: 8px 0 0 0;
      }
    }
  }

  /deep/ .van-tabs {
    .van-tabs__line {
      background-color: #00c6ae;
      width: 25px !important;
    }

    .van-hairline--top-bottom::after,
    .van-cell:not(:last-child)::after {
      border: 0;
    }

    .van-tabs--line .van-tabs__wrap {
      height: 20px;
    }

    .time-table {
      width: 100%;
      margin: 10px 0 0 0;
      border-left: 1px solid #f2f2f2;
      border-top: 1px solid #f2f2f2;

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
  }
}
</style>
