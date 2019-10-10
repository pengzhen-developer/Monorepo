<template>
  <div class="home-layout"
       v-if="hospitalInfo">
    <div class="banner">
      <div class="banner-img">
        <img :src="hospitalInfo.nethospitalInfo.icon">
      </div>
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
      <div class="location"
           @click="goMap()">
        <span class="name">{{ hospitalInfo.nethospitalInfo.address }}</span>
        <a :href="`tel:${hospitalInfo.nethospitalInfo.phoneNumber}`"
           v-if="hospitalInfo.nethospitalInfo.phoneNumber"
           class="tel"></a>
      </div>

      <div class="notice">
        <i class="alarm"></i>
        <template v-if="hospitalInfo.notices.length > 0">
          <div class="message-box"
               @click="goHospitalNoticeDetail()">
            <van-notice-bar style="height: 100%; padding: 0;"
                            color="#999999"
                            background="transparent">
              {{ hospitalInfo.notices.length > 0 && hospitalInfo.notices[0].title }}
            </van-notice-bar>
          </div>
          <i @click="goHospitalNoticeList()"
             class="arrow"></i>
        </template>

        <template v-else>
          <div class="message-box">
            <van-notice-bar style="height: 100%; padding: 0;"
                            color="#999999"
                            background="transparent">
              暂无新通知
            </van-notice-bar>
          </div>
        </template>
      </div>
    </section>
    <section class="functions">
      <div class="item"
           v-for="(item, index) in hospitalInfo.guideH5"
           :key="'index'+ index"
           @click="goMenuList(item)">
        <img :src="require('@src/assets/images/newIndex/'+ item.icon + '.png')" />
        <span class="name">{{ item.text }}</span>
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
             :key="'index'+ index"
             @click="goDepartmentDoctorList(item)">
          <span v-if="index < 6"
                :style="'background: '+ colorArr[index]">{{ item.netdeptName }}</span>
        </div>
      </div>
    </section>
    <section class="doctors">
      <div class="title">
        <span>明星医生</span>
        <i class="arrow"
           @click="goStarDoctor"></i>
      </div>

      <div class="doc-wrap">
        <div class="item-wrap"
             @click="goDoctorHomeIndexPage(item)"
             v-for="item in hospitalInfo.doctorList"
             :key="item.name">
          <img class="avatar"
               :src="item.avartor" />
          <div class="item">
            <span class="name">{{ item.name }}</span>
            <span class="jd"> {{ item.netdeptName + ' ' + item.doctorTitle }}</span>
            <span class="tags">
              <template v-for="item in item.serviceList">
                <span :key="item"
                      v-if="item === 'register'"
                      class="tags hao">号</span>
                <span :key="item"
                      v-if="item === 'image' || item === 'video'"
                      class="tags wen">问</span>
                <span :key="item"
                      v-if="item === 'prvivateDoctor'"
                      class="tags bao">服务包</span>
              </template>

            </span>
          </div>
        </div>
      </div>
    </section>

    <van-dialog style="background: transparent;"
                v-model="brief.visible"
                :show-cancel-button="false"
                :showConfirmButton="false">
      <div style="text-align: center; ">
        <img style="width: 60px; height: 60px; position: relative; top: 30px;"
             :src="hospitalInfo.nethospitalInfo.icon">
      </div>
      <div style="padding: 40px 20px 20px 20px; background: #fff;">
        <span>{{ hospitalInfo.nethospitalInfo.brief }}</span>
      </div>
      <div style="text-align: center; margin: 30px 0 0 0;">
        <van-icon @click="brief.visible = false"
                  name="close"
                  color="#fff"
                  size="40px" />
      </div>
    </van-dialog>
  </div>
</template>

<script>
import peace from '@src/library'
export default {
  data() {
    return {
      hospitalInfo: undefined,

      brief: {
        visible: false
      },

      colorArr: ['#E6FFFB', '#E6F7FF', '#F9F0FF', '#F0F5FF', '#E6FFFB', '#FFFBE6']
    }
  },

  created() {
    this.getHospitalInfo()
  },

  mounted() {
    this.colorArr.sort(() => Math.random() - 0.5)
  },

  methods: {
    getHospitalInfo() {
      const params = peace.util.decode(this.$route.params.json)

      peace.service.hospital.getHospitalInfo({ nethospitalId: params.netHospitalId }).then(res => {
        this.hospitalInfo = res.data
      })
    },

    goMap() {
      const json = peace.util.encode({
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
        txt: item.netdeptName,
        txtId: item.id
      })
      this.$router.push(`/components/doctorList/${json}`)
    },

    goStarDoctor() {
      const json = peace.util.encode({
        netHospitalId: this.hospitalInfo.nethospitalInfo.netHospitalId,
        type: 'starDoctorList',
        Date: new Date()
      })

      this.$router.push(`/components/doctorList/${json}`)
    },

    goHospitalNoticeDetail() {
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

    goMenuList(item) {
      /* eslint-disable */

      let json = undefined

      switch (item.id) {
        // 预约挂号
        case 'appointment':
          json = peace.util.encode({
            netHospitalId: this.hospitalInfo.nethospitalInfo.netHospitalId,
            id: item.id,
            Date: new Date()
          })

          this.$router.push(`/hospital/depart/hospitalDepartSelect/${json}`)
          break

        // 在线咨询
        case 'onlineConsultant':
        // 复诊续方
        case 'subsequentVisit':
          json = peace.util.encode({
            netHospitalId: this.hospitalInfo.nethospitalInfo.netHospitalId,
            id: item.id,
            Date: new Date()
          })

          this.$router.push(`/components/doctorList/${json}`)
          break

        default:
          peace.util.alert('暂未开放，敬请期待')
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin arrow {
  width: 7px;
  height: 12px;
  display: inline-block;
  background: url('../../assets/images/newIndex/ic_right.png');
  background-size: 100% 100%;
}

.home-layout {
  background: rgba(249, 249, 249, 1);
  .banner {
    width: 100%;
    height: 175px;
    background: #fff;
    .banner-img {
      width: 100%;
      height: 100%;
      background: url('../../assets/images/newIndex/bg_home.png');
      background-size: 100% 100%;
      position: relative;
      img {
        width: 130px;
        height: 130px;
        border-radius: 50%;
        position: absolute;
        bottom: 0;
        right: 30px;
        border: 2px solid #fff;
      }
    }
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
    }
    .location {
      display: flex;
      justify-content: space-between;
      height: 40px;
      align-items: center;
      border-bottom: 1px solid #eeeeee;
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
        width: 14px;
        height: 17px;
        background: url('../../assets/images/newIndex/ic_phone.png');
        background-size: 100% 100%;
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
      img {
        width: 30px;
        height: 30px;
        display: inline-block;
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
      width: 360px;
      margin: 0 auto;
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
      margin: 0 16px;
      padding-bottom: 25px;
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
          .name {
            font-size: 14px;
            font-weight: 600;
            color: rgba(0, 0, 0, 1);
            margin-top: 30px;
          }
          .jd {
            font-size: 11px;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
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
