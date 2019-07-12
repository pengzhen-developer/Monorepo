<template>
  <div class="doctor-detail" v-if="doctor">
    <div class="content">
      <div class="title">
        <div class="title-description">
          <div class="title-description-avatar">
            <img :src="doctor.doctorInfo.avartor" />
          </div>

          <div class="title-description-info">
            <div class="title-doctor">
              <span class="title-doctor-name">{{ doctor.doctorInfo.name }}</span>
              <span>{{ doctor.doctorInfo.doctorTitle }}</span>
              <span>{{ doctor.doctorInfo.deptName }}</span>
            </div>
            <div class="title-hospital">
              <span>{{ doctor.doctorInfo.hospitalName }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="description">
        <div class="description-service">
          <div @click.stop="redictToApply(doctor.doctorInfo, doctor.consultationList[0])" class="description-service-item">
            <img src="@src/assets/images/ic_tuwen.png" />
            <p>图文咨询</p>
            <p>
              <span class="money">{{ doctor.consultationList[0].money === 0 ? '免费' : doctor.consultationList[0].money + '/次' }}</span>
            </p>
          </div>
          <div @click.stop="redictToApply(doctor.doctorInfo, doctor.consultationList[1])" class="description-service-item">
            <img src="@src/assets/images/ic_video_open.png" />
            <p>视频咨询</p>
            <p>
              <span class="money">{{ doctor.consultationList[1].money === 0 ? '免费' : doctor.consultationList[1].money + '/次' }}</span>
            </p>
          </div>
        </div>

        <div class="description-item">
          <van-collapse v-model="activeCollapseNames">
            <van-collapse-item name="1" title="擅长">{{ doctor.doctorInfo.specialSkill || '暂未填写' }}</van-collapse-item>
            <van-collapse-item name="2" title="简介">{{ doctor.doctorInfo.summary || '暂未填写' }}</van-collapse-item>
          </van-collapse>
        </div>
      </div>

      <div class="divider"></div>

      <div class="time">
        <van-tabs v-model="activeTabs">
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
                  <td :key="item.id" class="time-table-col border primary" v-for="item in doctor.workOnLine[0].weekList">
                    <span v-if="item.status">√</span>
                  </td>
                </tr>
                <tr>
                  <td class="time-table-col border">下午</td>
                  <td :key="item.id" class="time-table-col border primary" v-for="item in doctor.workOnLine[1].weekList">
                    <span v-if="item.status">√</span>
                  </td>
                </tr>
                <tr>
                  <td class="time-table-col border">晚上</td>
                  <td :key="item.id" class="time-table-col border primary" v-for="item in doctor.workOnLine[2].weekList">
                    <span v-if="item.status">√</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </van-tab>
          <van-tab title="线下咨询时间">
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
                  <td :key="item.id" class="time-table-col border primary" v-for="item in doctor.workUnderLine[0].weekList">
                    <span v-if="item.status">√</span>
                  </td>
                </tr>
                <tr>
                  <td class="time-table-col border">下午</td>
                  <td :key="item.id" class="time-table-col border primary" v-for="item in doctor.workUnderLine[1].weekList">
                    <span v-if="item.status">√</span>
                  </td>
                </tr>
                <tr>
                  <td class="time-table-col border">晚上</td>
                  <td :key="item.id" class="time-table-col border primary" v-for="item in doctor.workUnderLine[2].weekList">
                    <span v-if="item.status">√</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </van-tab>
        </van-tabs>
      </div>
      <!-- 
      <div class="estimated">
        <van-tag class="tag" plain round>响应及时</van-tag>
        <van-tag class="tag" plain round>态度友善</van-tag>
        <van-tag class="tag" plain round>有问必答</van-tag>
      </div>
      -->
    </div>

    <div class="footer">
      <van-button @click="redictToReserve" type="primary">预约挂号</van-button>
    </div>
  </div>
</template>

<script>
import peace from '@src/library'

export default {
  data() {
    return {
      // 医生信息
      doctor: undefined,

      activeCollapseNames: ['1', '2'],
      activeTabs: ''
    }
  },

  created() {
    const params = JSON.parse(window.atob(this.$route.params.json))

    peace.service.doctor.getDoctorInfo(params).then(res => {
      this.doctor = res.data
    })
  },

  methods: {
    redictToApply(doctorInfo, doctorConsultation) {
      const json = window.btoa(
        JSON.stringify({ doctorId: doctorInfo.doctorId, consultingType: doctorConsultation.tag, consultingTypeId: doctorConsultation.consultingTypeId })
      )

      this.$router.push(`/components/doctorInquiryApply/${json}`)
    },

    redictToReserve() {
      this.$router.push(`/components/doctorInquiryApply/${this.$route.params.json}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.doctor-detail {
  height: 100%;
  display: flex;
  flex-direction: column;

  .content {
    flex: 1;
    overflow: auto;

    .title {
      width: 100%;
      height: 138px;

      background-size: auto 138px;
      background-repeat: no-repeat;
      background-position: center;
      background-color: transparent;
      background-image: url('~@src/assets/images/bg_doctor homepage.png');

      .title-description {
        display: flex;
        align-items: center;
        height: 100px;
        padding: 0 20px;

        .title-description-avatar {
          img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: rgba(241, 248, 255, 1);
            border: 1px solid rgba(221, 225, 234, 1);
          }
        }

        .title-description-info {
          margin: 0 0 0 20px;

          .title-doctor {
            color: #ffffff;
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
            color: #ffffff;
          }
        }
      }
    }

    .description {
      margin: -55px 0 0 0;

      .description-service {
        height: 110px;
        display: flex;
        justify-content: space-around;
        align-items: center;

        margin: 0 40px;
        background: #fff;
        border-radius: 10px;
        box-shadow: 0 8px 12px #ebedf0;

        .description-service-item {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;

          img {
            width: 30px;
            height: 30px;
          }

          p {
            font-size: 14px;
            margin: 5px 0 0 0;
          }

          .money {
            font-size: 16px;
            font-weight: 600;
            color: #f2223b;
          }
        }
      }

      .description-item {
        margin: 20px 0 10px 0;
      }
    }

    .time {
      margin: 10px 0 0 0;

      .time-table {
        width: 100%;
        margin: 10px 0 0 0;

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

      /deep/ .van-tabs {
        .van-tabs__line {
          background-color: #00c6ae;
        }

        .van-hairline--top-bottom::after,
        .van-cell:not(:last-child)::after {
          border: 0;
        }
      }
    }

    .divider {
      height: 10px;
      background: #f5f5f5;
    }

    .estimated {
      margin: 25px 0 10px 0;
      padding: 0 10px;

      .tag {
        margin: 0 10px 0 0;
        background: #f5f5f5;
      }
    }
  }

  .footer {
    height: 44px;

    .van-button {
      width: 100%;
    }
  }
}
</style>
