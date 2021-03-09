<template>
  <van-pull-refresh v-model="isLoading"
                    class="home-layout"
                    v-if="hospitalInfo"
                    loosing-text=" "
                    pulling-text=" "
                    loading-text=" "
                    success-text="刷新成功"
                    @refresh="getHospitalInfo">
    <template v-if="hospitalInfo.nethospitalStatus">
      <div class="banner">
        <img class="bgImg"
             src="@src/assets/images/newIndex/bg_home.png" />
        <img class="banner-icon"
             :src="hospitalInfo.nethospitalInfo.icon" />
      </div>
      <section class="info">
        <div class="name-wrap">
          <div class="w">
            <span class="name">{{ hospitalInfo.nethospitalInfo.name }}</span>
            <div class="tags">
              <span v-for="item in hospitalInfo.nethospitalInfo.tags"
                    :key="item">{{ item }}</span>
            </div>
          </div>
          <div class="intro"
               @click="brief.visible = true">医院简介</div>
        </div>
        <div class="location">
          <span class="name"
                @click="goMap()">{{
          hospitalInfo.nethospitalInfo.address
        }}</span>
          <a :href="`tel:${hospitalInfo.nethospitalInfo.phoneNumber}`"
             v-if="hospitalInfo.nethospitalInfo.phoneNumber"
             class="tel"><img src="../../assets/images/newIndex/ic_phone.png" /></a>
        </div>
        <div class="notice">
          <i class="alarm"></i>
          <div class="hospital-notice-line"></div>
          <div class="hospital-notice"
               :style="{'--marqueeWidth--': noticLength, '--marqueeAnimat--': noticLen > 260 ? noticAnimat:0}"
               @click="goHospitalNoticeDetail()">
            <div class="notice-animation">{{noticeBarText}}</div>
          </div>
          <i @click="goHospitalNoticeList()"
             class="arrow"
             v-if="noticeBarIsSet"></i>
        </div>
        <!-- <div class="notice">
          <i class="alarm"></i>
          <van-notice-bar class="message-box"
                          color="#999999"
                          background="transparent"
                          v-bind:text="noticeBarText"
                          @click="goHospitalNoticeDetail()" />
          <i @click="goHospitalNoticeList()"
             class="arrow"
             v-if="noticeBarIsSet"></i>
        </div> -->
      </section>
      <section class="functions">
        <div class="item "
             v-for="(item, index) in hospitalInfo.hospitalServiceList"
             :key="'index' + index"
             @click="goMenuList(item)">
          <!-- "serviceLogoId": //图标id 1:预约挂号 2:查询报告 3:值班医生 4:复诊续方 5:在线咨询 6:健康百科 7:智能导诊 8:中药寄送 -->
          <div class="img">
            <img :src="require('@src/assets/images/newIndex/icon_0' + item.serviceLogoId + '.png')" />
            <!-- <img class="wait"
                 v-if="item.isOpen!=1"
                 src="@src/assets/images/ic_wait open.png" /> -->
          </div>
          <span class="name">{{ item.serviceName }}</span>

        </div>
      </section>
      <section class="dept">
        <div class="title">
          <span>医院科室</span>
          <i class="arrow"
             @click="goAllDepartment"></i>
        </div>
        <div class="dept-wrap">
          <div class="item"
               v-for="(item, index) in hospitalInfo.oneDeptList"
               :key="'index' + index"
               @click="goDepartmentDoctorList(item)">
            <span v-if="index < 6"
                  :style="'background: ' + colorArr[index]">{{
            item.netdeptName
          }}</span>
          </div>
        </div>
      </section>
      <section class="doctors">
        <div class="title">

          <span>医院医生</span>
          <i class="arrow"
             @click="goStarDoctor"></i>
        </div>

        <div class="doc-wrap"
             v-if="hospitalInfo.doctorList.length>0">
          <div class="item-wrap"
               @click="goDoctorHomeIndexPage(doctor)"
               v-for="(doctor,index) in hospitalInfo.doctorList"
               :key="'doctorList'+index">
            <img class="avatar"
                 :src="doctor.avartor" />
            <div class="item">

              <img src="@src/assets/images/ic_tag.png"
                   v-if="doctor.isAttention==1" />
              <span class="tranparent">></span>
              <span class="name">{{ doctor.doctorName }}</span>
              <div class="jd">
                <div>{{ doctor.deptName + " " + doctor.doctorTitle }}</div>
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
            </div>
          </div>
        </div>
      </section>
    </template>
    <template v-else>
      <div class="none-page">
        <div class="icon icon_none_hospital"></div>
        <div class="none-text">本院暂时无法提供互联网医院服务</div>
      </div>
    </template>
    <div class="intro-shadow"
         v-if="brief.visible"
         @click="brief.visible = false"></div>
    <div class="intro-box"
         v-if="brief.visible">
      <div class="intro-imgbox">
        <img :src="hospitalInfo.nethospitalInfo.icon" />
      </div>

      <div class="intro-content">
        <div style="height:20px;"></div>
        <span style="text-align: justify;">{{
          hospitalInfo.nethospitalInfo.brief
        }}</span>
      </div>
      <div style="text-align: center; margin: 30px 0 0 0;">
        <van-icon @click="brief.visible = false"
                  name="close"
                  color="#fff"
                  size="40px" />
      </div>
    </div>
  </van-pull-refresh>

</template>

<script>
import peace from '@src/library'
import Vue from 'vue'
import { PullRefresh } from 'vant'

Vue.use(PullRefresh)
export default {
  data() {
    return {
      hospitalInfo: undefined,
      hasRegisterData: null,
      brief: {
        visible: false
      },

      isLoading: false,

      colorArr: ['#E6FFFB', '#E6F7FF', '#F9F0FF', '#F0F5FF', '#E6FFFB', '#FFFBE6']
    }
  },

  activated() {
    this.getHospitalInfo()
    this.isRegisterData()
  },
  computed: {
    noticeBarText() {
      if (this.hospitalInfo?.notices?.length > 0) {
        return `【${this.hospitalInfo.notices[0].title} 】${this.hospitalInfo.notices[0].content}`
      } else {
        return `暂无新通知`
      }
    },
    noticLen() {
      if (this.hospitalInfo?.notices?.length > 0) {
        let str = `【${this.hospitalInfo.notices[0].title} 】${this.hospitalInfo.notices[0].content}`
        return (str.length * 11 + 40).toFixed(1)
      } else {
        return 0
      }
    },
    noticAnimat() {
      if (this.hospitalInfo?.notices?.length > 0) {
        let str = `【${this.hospitalInfo.notices[0].title} 】${this.hospitalInfo.notices[0].content}`
        return (str.length * 0.25).toFixed(2) + 's'
      } else {
        return '0s'
      }
    },
    noticLength() {
      if (this.hospitalInfo?.notices?.length > 0) {
        let str = `【${this.hospitalInfo.notices[0].title} 】${this.hospitalInfo.notices[0].content}`
        return -(str.length * 11 + 40).toFixed(1) + 'px'
      } else {
        return '0px'
      }
    },
    noticeBarIsSet() {
      return this.hospitalInfo?.notices?.length > 0
    }
  },
  mounted() {
    this.colorArr.sort(() => Math.random() - 0.5)
  },

  methods: {
    getHospitalInfo() {
      const params = peace.util.decode(this.$route.params.json)
      const nethospitalId = params.netHospitalId || peace.cache.get(peace.type.SYSTEM.NETHOSPITALID)
      const channelId = peace.cache.get(peace.type.SYSTEM.CHANNELID)
      peace.service.hospital.getHospitalInfo({ nethospitalId: nethospitalId }).then((res) => {
        this.isLoading = false
        this.hospitalInfo = res.data
        let obj = {
          url: '',
          title: this.hospitalInfo.nethospitalInfo.name,
          desc: this.hospitalInfo.nethospitalInfo.brief,
          imgUrl: this.hospitalInfo.nethospitalInfo.icon
        }
        if (channelId) {
          obj.url = peace.config.api.base + 'h5/redirect?redirect=home&netHospitalId=' + nethospitalId + '&channelId=' + channelId
        }
        peace.wx.share.share(obj)
      })
    },

    goMap() {
      const json = peace.util.encode({
        name: this.hospitalInfo.nethospitalInfo.name,
        address: this.hospitalInfo.nethospitalInfo.address,
        latitude: this.hospitalInfo.nethospitalInfo.latitude,
        longitude: this.hospitalInfo.nethospitalInfo.longitude
      })

      this.$router.push(`/home/map/${json}`)
    },

    goDoctorHomeIndexPage(item) {
      const json = peace.util.encode({ doctorId: item.doctorId })

      this.$router.push(`/components/doctorDetail/${json}`)
    },

    goAllDepartment() {
      const json = peace.util.encode({
        netHospitalId: this.hospitalInfo.nethospitalInfo.netHospitalId,
        id: 'consult',
        Date: new Date()
      })

      this.$router.push(`/hospital/depart/hospitalDepartSelect/${json}`)
    },

    goDepartmentDoctorList(item) {
      const json = peace.util.encode({
        netHospitalId: this.hospitalInfo.nethospitalInfo.netHospitalId,
        deptId: item.id,
        deptName: item.netdeptName,
        type: 'departDoctorList',
        serviceType: 'inquiry'
      })
      this.$router.push(`/components/doctorList/${json}`)
    },

    goStarDoctor() {
      const json = peace.util.encode({
        netHospitalId: this.hospitalInfo.nethospitalInfo.netHospitalId,
        type: 'starDoctorList',
        Date: new Date(),
        serviceType: 'inquiry'
      })

      this.$router.push(`/components/doctorList/${json}`)
    },

    goHospitalNoticeDetail() {
      if (!this.noticeBarIsSet) {
        return
      }
      const json = peace.util.encode({
        id: this.hospitalInfo.notices[0].id
      })

      this.$router.push(`/hospital/HospitalNoticesDetail/${json}`)
    },

    goHospitalNoticeList() {
      const json = peace.util.encode({
        netHospitalId: this.hospitalInfo.nethospitalInfo.netHospitalId
      })

      this.$router.push(`/hospital/HospitalNoticesList/${json}`)
    },
    goMenuPage() {
      let json = peace.util.encode({ date: new Date() })
      this.$router.push(`/diagnose/select/diagnoseSelectBody/${json}`)
    },
    goMenuList(item) {
      /* eslint-disable */

      let json = undefined

      // if (item.isOpen !== 1) {
      //   // peace.util.alert('暂未开放，敬请期待')
      //   return
      // }
      if (item.isExist !== 1) {
        return peace.util.alert('该功能正在建设中，敬请期待')
      }
      switch (item.serviceName) {
        // 预约挂号
        case '预约挂号':
          if (this.hasRegisterData) {
            //有挂号信息
            json = peace.util.encode({
              netHospitalId: this.hospitalInfo.nethospitalInfo.netHospitalId,
              id: 'appointment',
              Date: new Date()
            })
            this.$router.push(`/hospital/depart/hospitalDepartSelect/${json}`)
          } else {
            let json = peace.util.encode({
              hospitalCode: this.hospitalInfo.nethospitalInfo.netHospitalId,
              Date: new Date()
            })
            // 预约入口
            this.$router.push(`/appoint/doctor/appointDoctorList/${json}`)
          }

          break

        // 在线咨询
        case '在线咨询':
          json = peace.util.encode({
            netHospitalId: this.hospitalInfo.nethospitalInfo.netHospitalId,
            serviceType: 'inquiry',
            Date: new Date()
          })
          this.$router.push(`/components/doctorList/${json}`)
          break
        // 复诊续方
        case '复诊续方':
          json = peace.util.encode({
            netHospitalId: this.hospitalInfo.nethospitalInfo.netHospitalId,
            serviceType: 'returnVisit',
            Date: new Date()
          })
          this.$router.push(`/components/doctorList/${json}`)
          break
        //智能导诊
        case '智能导诊':
          json = peace.util.encode({
            nethospitalid: this.hospitalInfo.nethospitalInfo.netHospitalId,
            Date: new Date()
          })
          this.$router.push(`/diagnose/select/diagnoseSelectBody/${json}`)
          break
        // 查询报告
        case '查询报告':
          json = peace.util.encode({
            hsp: {
              hospitalName: this.hospitalInfo.nethospitalInfo.name,
              netHospitalId: this.hospitalInfo.nethospitalInfo.netHospitalId
            },
            netHospitalId: this.hospitalInfo.nethospitalInfo.netHospitalId,
            banHsp: true,
            id: 'queryReport',
            Date: new Date()
          })
          this.$router.push(`/record/recordCondition/${json}`)
          break

        default:
          peace.util.alert('该功能正在建设中，敬请期待')
          break
      }
    },
    //判断机构下是否有号源
    isRegisterData() {
      const params = peace.util.decode(this.$route.params.json)
      const hospitalCode = params.netHospitalId || peace.cache.get(peace.type.SYSTEM.NETHOSPITALID)
      peace.service.hospital.isRegisterData({ hospitalCode }).then((res) => {
        this.hasRegisterData = res.data == null ? false : true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.hospital-notice-line {
  width: 1px;
  height: 18px;
  background-color: #eee;
  margin-left: 12px;
}

.hospital-notice {
  position: relative;
  flex: 1;
  font-size: 11px;
  color: rgba(153, 153, 153, 1);
  padding-left: 0;
  padding-right: 0;
  height: 18px;
  line-height: 18px;
  margin-left: 12px;
  margin-right: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.hospital-notice .notice-animation {
  position: absolute;
  display: inline;
  font-size: 11px;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 21px;
  white-space: nowrap;
  animation-name: around;
  animation-duration: var(--marqueeAnimat--);
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes around {
  from {
    left: 100%;
  }

  to {
    left: var(--marqueeWidth--);
  }
}

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
.intro-shadow {
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 2000;
}
.intro-box {
  position: fixed;
  width: 80%;
  left: 10%;
  max-height: calc(50vh + 30px);
  transform: translateY(-50%);
  top: 50%;
  z-index: 2001;
  padding-top: 30px;
}
.intro-imgbox {
  border: 2px solid #fff;
  width: 62px;
  height: 62px;
  border-radius: 50%;
  position: absolute;
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
  overflow: hidden;
}
.intro-imgbox img {
  display: block;
  width: 100%;
  height: 100%;
}
.intro-content {
  border-radius: 8px;
  max-height: 50vh;
  padding: 20px;
  background: #fff;
  overflow: auto;
}
@mixin arrow {
  width: 7px;
  height: 12px;
  display: inline-block;
  background: url('../../assets/images/newIndex/ic_right.png');
  background-size: 100% 100%;
}

.home-layout {
  background: rgba(249, 249, 249, 1);
  min-height: 100%;
  height: auto;
  .none-page {
    background: #fff;
    padding-top: 37%;
  }
  .banner {
    width: 100%;
    height: 175px;
    background: #fff;
    position: relative;
    .bgImg {
      position: absolute;
      width: 100%;
      height: 100%;

      display: block;
      z-index: 3;
    }
    .banner-icon {
      width: 130px;
      height: 130px;
      border-radius: 50%;
      position: absolute;
      bottom: 0;
      right: 30px;
      border: 2px solid #fff;
      z-index: 5;
    }
    // .banner-img {
    //   width: 100%;
    //   height: 100%;
    //   background: url('../../assets/images/newIndex/bg_home.png');
    //   background-size: 100% 100%;
    //   position: relative;
    //   img {
    //     width: 130px;
    //     height: 130px;
    //     border-radius: 50%;
    //     position: absolute;
    //     bottom: 0;
    //     right: 30px;
    //     border: 2px solid #fff;
    //     z-index: 5;
    //   }
    // }
  }
  .info {
    padding: 20px 16px 0;
    background: #fff;
    .name-wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 50px;
      margin: 0 0 5px 0;
      .w {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .name {
          font-size: 17px;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
        }
        .tags {
          span {
            color: #00c6ae;
            /* border: 1px solid #aaa; */
            border-radius: 2.5px;
            padding: 2.5px 7px;
            font-size: 11px;
            margin-right: 5px;
            background: #e5f9f6;
          }
        }
      }
    }
    .intro {
      width: 56px;
      height: 21px;
      border-radius: 2px;
      border: 1px solid rgba(0, 204, 179, 1);
      font-size: 11px;
      font-weight: 400;
      color: rgba(0, 204, 179, 1);
      line-height: 21px;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .location {
      display: flex;
      justify-content: space-between;
      min-height: 40px;
      align-items: center;
      border-bottom: 1px solid #eeeeee;
      padding-top: 5px;
      padding-bottom: 10px;
      .name {
        font-size: 14px;
        color: rgba(51, 51, 51, 1);
        &:before {
          width: 11px;
          height: 13px;
          background: url('../../assets/images/newIndex/ic_location.png');
          background-size: 100% 100%;
          content: '';
          display: inline-block;
          vertical-align: middle;
          margin: -3px 6px 0 0;
        }
      }
      .tel {
        display: flex;
        align-items: center;
        margin-left: 30px;
        img {
          width: 15px;
          height: 17px;
        }
      }
    }
    .notice {
      display: flex;
      height: 46px;
      align-items: center;
      .alarm {
        width: 16px;
        height: 16px;
        display: inline-block;
        background: url('../../assets/images/newIndex/ic_notice.png');
        background-size: 100% 100%;
      }
      .message-box {
        flex: 1;
        font-size: 11px;
        color: rgba(153, 153, 153, 1);
        padding-left: 12px;
        padding-right: 0;
        border-left: 1px solid #eeeeee;
        height: 18px;
        line-height: 18px;
        margin-left: 12px;
        margin-right: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .arrow {
        @include arrow;
      }
    }
  }
  .functions {
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    background: #fff;
    margin-top: 8px;
    padding-bottom: 18px;

    .item {
      width: 25%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 18px;
      position: relative;

      .img {
        width: 30px;
        height: 30px;
        display: inline-block;
        position: relative;
        img {
          width: 100%;
          height: 100%;
          display: block;
        }
        .wait {
          position: absolute;
          right: -7px;
          top: -9px;
          width: 34px;
          height: 28px;
          display: block;
        }
      }
      .name {
        font-size: 13px;
        color: rgba(0, 0, 0, 1);
        margin-top: 10px;
      }
    }
  }
  .title {
    padding: 0 16px;
    height: 46px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    .arrow {
      @include arrow;
    }
  }
  .dept {
    background: #fff;
    margin-top: 10px;
    .dept-wrap {
      display: flex;
      flex-wrap: wrap;
      // width: 360px;
      width: calc(100% - 15px);
      margin: 0 7.5px;
      .item {
        width: 33.3333333%;
        margin-bottom: 15px;
        text-align: center;
        span {
          width: 105px;
          height: 45px;
          background: rgba(230, 255, 251, 1);
          border-radius: 2px;
          display: inline-block;
          font-size: 13px;
          font-weight: 500;
          color: rgba(0, 0, 0, 1);
          line-height: 45px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding: 0 8px;
        }
      }
    }
  }
  .doctors {
    margin-top: 8px;
    background: #fff;
    .doc-wrap {
      display: -webkit-box;
      overflow-x: scroll;
      margin: 0 14px;
      padding: 0 2px 25px 2px;
      // padding-bottom: 25px;
      .item-wrap {
        position: relative;
        width: 130px;
        height: 130px;
        margin-right: 10px;
        .avatar {
          width: 51px;
          height: 51px;
          border: 1px solid rgba(238, 238, 238, 1);
          border-radius: 50%;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: 10px;
          z-index: 10;
        }
        .item {
          width: 130px;
          height: 95px;
          background: rgba(255, 255, 255, 1);
          box-shadow: 0px 1px 4px 0px rgba(221, 221, 221, 0.5);
          border-radius: 3px;
          border: 1px solid rgba(238, 238, 238, 1);
          display: flex;
          flex-direction: column;
          align-items: center;
          position: absolute;
          bottom: 0;
          left: 0;
          img {
            position: absolute;
            left: -2px;
            top: -2px;
            height: 14px;
            width: 33px;
          }
          .tranparent {
            color: transparent;
          }
          .name {
            font-size: 14px;
            font-weight: 600;
            color: rgba(0, 0, 0, 1);
            margin-top: 10px;
          }
          .jd {
            font-size: 11px;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
            width: 100%;
            div {
              font-size: 11px;
              font-weight: 400;
              color: rgba(102, 102, 102, 1);
              text-align: center;
              width: 100%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }

          .tags {
            font-size: 9px;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            margin-top: 3px;
            .hao {
              background: rgba(116, 176, 255, 1);
              border-radius: 1px;
              padding: 2px 3px;
            }
            .wen {
              background: #00c6ae;
              border-radius: 1px;
              padding: 2px 3px;
              margin: 0 3px 0 3px;
            }
            .bao {
              background: #ac91ff;
              border-radius: 1px;
              padding: 2px 3px;
            }
          }
        }
      }
    }
  }
}
</style>
