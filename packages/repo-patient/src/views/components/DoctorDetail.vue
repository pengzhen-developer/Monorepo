<template>
  <div class="doctor-detail"
       v-if="doctor">
    <div class="white"
         v-if="doctor.doctorInfo">
      <div class="card icon_03_01_02">
        <img :src="doctor.doctorInfo.avartor"
             class="card-avatar avatar-circular" />
        <div class="card-body">
          <div class="card-name">
            {{doctor.doctorInfo.name}}
            <div class="card-small">{{doctor.doctorInfo.doctorTitle}}
            </div>
            <div @click="shareDoctor"
                 class="card-share"
                 v-if="!doctor.doctorInfo.isPrivateDoctor">
              {{doctor.doctorInfo.attentionStatus ? '已关注' : '+ 关注'}}</div>
          </div>
          <!-- <div class="card-brief">{{doctor.doctorInfo.hospitalName}}</div> -->
        </div>
      </div>
      <div class="list"
           @click="goMap(doctor.doctorInfo)">
        <div class="list-items list-vertical-icon">
          <div class="icon icon_hsp"></div>
          <span>{{doctor.doctorInfo.hospitalName}} {{doctor.doctorInfo.deptName}}</span>
        </div>
      </div>
      <div class="outline nmgb"
           v-if="doctor.consultationList">
        <div class="outline-header">
          <div class="outline-tit">问诊服务</div>
        </div>
        <div class="outline-body nmr">
          <div :key="item.tag"
               @click.stop="redictToApply(doctor.doctorInfo, item)"
               class="list-three"
               data-status="item.status"
               v-for="item in doctor.consultationList">
            <div class="list-icon">
              <img :src="source[item.tag].icon" />
            </div>
            <div class="list-content">
              <div class="content-title">{{item.tagName}}</div>
              <div class="content-brief">{{source[item.tag].brief}}</div>
            </div>
            <div class="list-orther">
              <div v-if="!item.status">暂未开通</div>
              <div class="blue"
                   v-else-if="item.status && item.money == 0">免费</div>
              <div class="money"
                   v-else-if="item.status && item.money!=0">
                <div class="inline">{{item.money}}</div>
                /{{source[item.tag].type && source[item.tag].type[item.type] || '次'}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="box"
         v-if="doctor.doctorInfo.summary || doctor.doctorInfo.specialSkill">
      <div class="outline nmg">
        <div class="outline-header">
          <div class="outline-tit">擅长</div>
        </div>
        <div class="outline-body mh80">{{doctor.doctorInfo.specialSkill || '暂未填写'}}</div>
      </div>
      <div class="outline border nmg">
        <div class="outline-header icon-next">
          <div class="outline-tit">简介</div>
        </div>
        <div class="outline-body mh80">{{doctor.doctorInfo.summary || '暂未填写'}}</div>
      </div>
    </div>
    <div class="time"
         v-if="doctor.workOnLine || doctor.workUnderLine">
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
    <div class="footer"
         v-if="canShowReserve">
      <van-button @click="redictToReserve"
                  type="primary">预约挂号</van-button>
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
      activeTabs: '',

      source: {
        image: {
          brief: '可通过文字、图片的形式和医生沟通',
          icon:
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHwAAAB8CAMAAACcwCSMAAAAOVBMVEVHcEw028YAzrQAzrUT0roAzbQw4s4AzLR86Np96NoAzbQAzbR96Nt96dx96d196Nt96NwAzLN859pfmWiYAAAAEXRSTlMAE29DKOwI0efVsJW1YUuNcuNOHyoAAAKISURBVGje7drbcqMwDAZgfLYx5/d/2LLZNF1CAEmW8czW/3WnX0xAwoqbpqampqbGTp1fEuO7yVLsPll++j3eHhe2jOh1L4xBrl14TtwLFD4trJlQeODFAwr3vLjHrZyYow99T2USfSiHHzyl99XloST+Ye139qRQEu9L4qIk3hTF/SVupTMzU4yTFoMrNvnpKziuZvYoKG4NP24sEJdzhkgg7nLgDoibHLgB4ttPTM92EWjcaZtST3SbgMfkcibJuLPpxbSl4pJhR6mo+D81UcjWGeNaKbAdlIrrnzbzunGNRH4XO3yc+jWjB+JiU3WcSMO//2kA4eKt4uH0I7zRIDy+F6vIgn9/+ae43pdKfRse93jkwAfIZXcnHYqCP5+WwUNwc9KhKHjo/iTAnnNuHFVkuC87Cue+4VA496OGq+3MRQaHM5dXZFfjbSzYltpwtlS/+DUInP4ysceHx6e3sApHfHGVsd2+O9NaKuHFLX4oi7s/6zLgOn7e8RyN7RlxdbjRy75ydbLHJPVz4u7oEB8HvWYYF07cxvNtKrnIQJZ9tavPiF9PM7LhV5c8Jy4gg5RMuAYNcfLgGjbDyYJDp5U5cA2dXWHHIoLR/sEfuwZ/ORBymuU+3+ICtl3aTotTvm9CY3m8Jtu00nLSUsP1BPJ48Qo3o6Xg89wqfP8E4GKB4OuNp94vvsLSO9x2QHy9+K183flCRcpc+vUy0Q9rprCA8b8/1LTt+/swAceMvNlS8Yr/etyXxENJfCqI7w5m3Yn3TTl8bIrhn44h3oMfHMDMi0NHZxWveMUr/t/heQ/pXCTv8aTkUWbKwayrYWbWI2mXozV+WyF+MTDl7KwHMGtqamp+Xb4A8X7MFmjiOG8AAAAASUVORK5CYII='
        },
        video: {
          brief: '可通过视频的形式和医生沟通',
          icon:
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHwAAAB8BAMAAABZMMmNAAAAMFBMVEVHcEwAzbQA0roAzbQAz7YAzbQAzbQAzbQV0boAzbQa0bsu1cB86Nt959sAzLN859rk7f0lAAAADnRSTlMA9xLnLJW1zkJ0XXjZq8jGKygAAALKSURBVFjD7ZjPaxNREMefS2yTPUlLETwsC0XFi6C2FDwsEbGgh+IvFC/BgD9ui4iCp9AiVnqpPyroKVQE9dR/pX+CpmtS7WHOHiqxSbp2m515M7PrSfd73X765s2bnzGmUKFCsS7duH9qfObuu0zwxTrs6vB1Ney8hT15076OLtUhKa8zrzq7BkPqVBX0FUipLbf/KSA6K6UrgOqq0PQQxzdl1z8PhKZEbxZQeKua53DR8fThABF//HGAPMfXbHjkZ3vzWJcZ/Jwd32Lwhh1nrHeB0W0rPsnhW9n9zlnvLHkcDi9J+lkDeJ2movUaSPQDp8uhiIZNVY1IC62576U0GrfHxDQcQi7uyfHvaXxBTkM7HemKwxHXr4FGw2FbVtHw+I0kzaY/f6TuNLHv7dGI6bXEC+T9X3PlrR8ds2TertrL265/Sb7jW22PE2uR4o9Y/f4t/ufPmboxgn78ajh+YvB5jkuMT9bUC9m8+mCpO47Hp+UK3e5dQVY7K2TVHJEUBecV+vY7Xw6Iago26fXL3pysJJWwHvDAmKawok3idasmxMt4YoTSeopZX6XmgTTeROM+kOJrqO+8PKdvGHEvqaGzhvj0AG0Z0rtX8LCV4mgriaQPdxQvuMKoq+BGtmQx7xJXbJllAU7RO/hJHnfJgS0yoyxeblh6/UEOt01sbVPCP2z8KTOhfUZsWAcgK937q6ZtACrZR+wxarYYrHx4gd23HBDLz0MB3euyTkDND3hzSJroG7JUR/fY8b7voFHIqrG+d72s+KDDL2ekW75k8WT3kjCP7czSTadbPNo5jSz4VJZdZC8u5hXLZ1qPkt070NIdn6/jljcf2scWdfid4S40q4ndJ+lt7ERd7HT818elm2d4E8Znbil++vv35a53ddpeTeIvulr9TOJf1PivJL6uxreTeFevv4jnND6n63I+XM6wKVTov9FvrPzBsyIRPYwAAAAASUVORK5CYII='
        },
        prvivateDoctor: {
          brief: '购买一定的服务期，期限内可免费提供问诊',
          icon:
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHwAAAB8CAMAAACcwCSMAAAAP1BMVEVHcExM49AAx68AyK8AyLAAx68Ax68Xz7gk1sAAx68Ax68Ax6996Nt96NsAx6996Nt96Nt96dx+6d1859oAxq4yfWEIAAAAE3RSTlMACnpaQvnbJhauye2Ar5Lo0VY79IcEYAAAA7xJREFUaN7tm4mOozAMQEvuA8L5/9+6tNOTQuIkDpF2xiONKrXJw0dcG9zLJV4kI05rY4QwWjtCZXM5RRR1xi5fIjRhhcnMmeVYrCayHNkuQREl+IqIPVtrbYvzpeZ7aur1LbH7BkWLQKaXJQ6++p8oHK0PHeyBr5fr8vHKE11e+IpXFeGL/A/hVF7latbbC0nOhG9TKf01cMLo+ne9BHZ75X5NwP3B/+AV4NYYw2vBQ/IHx4Vbc20V6Jpg2fp/bSCMPQW+Fudsr0JRjHxVsrhwEWhLmBOF4NZBNpNvrQUaXIBL8ebZXyDBBd3nqFs1tb2shlo8OCef28ux7bph6OeXDF3XTq9PNQ4LLt43mdruHfop3fg8CEygwHXzRj4G36V94JVGgLvny3GYIdI+LtbhdasTDL1KP2L3590cIS1ugz7MUdIh3iGa+jlSBjS6jGavuiOxm2FOECS/tynsuccw/Dj1SfC5nWQdtW+qz/OUGedzjmSavsuCZ0Zdnwcfsk5ZHnvus1J6JnzOMntNzav6vG60j3nwvLJCVXR5TnrNVnw96X2tcEutJPCqGZkY8S1OJVWzkkkLOoUETzlvWAVkUp7D61rGs2uYvJDDbJjGiopHq47bp04n59WMgEdv0Ps60RZr+KHA+AY4yRYZnOjqOPxeV3T12DB6KTaEXo4djLphuhQV332KrviIVHOk/DBeThDVVkP/4D8jr+9OQ/9Yf2y7oZ/7213+U4CQgCqSXBnRnNPg9Rn0sbjm8cCOh7Z1j2E1rLlA9jaQZgI2xx2L207h+TXSm7G4THtvn48aoOL3T2dYn4q4R8M7szo60fhyd9TTeey09yB7+0QQqPb+OAQ/3oseTITGK++O5gGOo+hoKNZGel4dTj5yAw6315qosJe+8Zejtp941riIE+ZjL+RgVdKiUK5YYEdd+kdHoH4nSSMogVUWFvM0NP9C4q1+PXGQW0SSh+C7dmehVVxnO/zQ7i68LOx2Bpg7IglWD38fe9LUh/vSrnmhCIrv2d1Blpl8j+/a3YLW+b3ecNAmIs1ggSxLYZt82d3BllkEq3+p0FjgOq/doZvYNIN5v18keMSQJRls0Qgu3+yi+LLkO52A4R+/loAvW5r8eNt4T8CXybzc+n3U4c7yZliRtI3BgduIbUxkdguetRj4UwmDBOcx+1gVG+p+uIja6DagyKIu2OdzvcTRIRUfOLnHmfAacyxuhS/JyNJwk9SbIsG9VZyyReGB0p3ZgnAduknRkJ8xfb4r6XC+d2/uHyBG+iCvclUdAAAAAElFTkSuQmCC',
          type: {
            0: '次',
            1: '周',
            2: '月',
            3: '季',
            4: '半年',
            5: '年'
          }
        }
      }
    }
  },

  created() {
    const params = peace.util.decode(this.$route.params.json)

    peace.service.doctor.getDoctorInfo(params).then(res => {
      this.doctor = res.data
    })
  },

  computed: {
    canShowReserve() {
      const params = peace.util.decode(this.$route.params.json)

      return params.isAppoint
    }
  },

  methods: {
    redictToApply(doctorInfo, doctorConsultation) {
      if (
        doctorConsultation.tag === 'video' ||
        doctorConsultation.tag === 'prvivateDoctor' ||
        doctorConsultation.status === 0
      ) {
        return peace.util.alert('暂未开放，敬请期待')
      }

      const json = peace.util.encode({
        doctorId: doctorInfo.doctorId,
        consultingType: doctorConsultation.tag,
        consultingTypeId: doctorConsultation.consultingTypeId
      })

      this.$router.push(`/components/doctorInquiryApply/${json}`)
    },

    shareDoctor() {
      const params = {
        doctorId: this.doctor.doctorInfo.doctorId,
        link: 3
      }

      peace.service.patient.attention(params).then(res => {
        this.doctor.doctorInfo.attentionStatus = res.msg === '关注成功'
      })
    },

    redictToReserve() {
      const json = peace.util.encode({
        doctorId: this.doctor.doctorInfo.doctorId,
        hospitalCode: this.doctor.doctorInfo.nethospitalid,
        date: new Date()
      })

      this.$router.push(`/appoint/doctor/appointDoctorSelect/${json}`)
    },

    goMap(item) {
      if (item.address || (item.latitude && item.longitude)) {
        const json = peace.util.encode({
          address: item.address,
          latitude: item.latitude,
          longitude: item.longitude
        })

        this.$router.push(`/home/map/${json}`)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.footer {
  height: 44px;
  margin-top: 10px;

  .van-button {
    width: 100%;
  }
}

.doctor-detail {
  height: 100%;
  display: flex;
  overflow: auto;
  flex-direction: column;
  background-color: #f5f5f5;

  .time {
    background: #fff;

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

  .white {
    background-color: #fff;
    margin: 0 0 10px 0;
  }

  .box {
    background-color: #fff;
    margin: 0 0 10px 0;
  }

  .card {
    margin: 0;
    padding: 20px 15px;
    background-size: cover;
    box-sizing: border-box;
    background-image: url(data:image/png;base64,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);
  }
  .outline-body {
    // word-wrap: break-word;
    // display: -webkit-box;
    // overflow: hidden;
    // text-overflow: ellipsis;
    // -webkit-line-clamp: 2;
    // -webkit-box-orient: vertical;
  }
  .mh80 {
    // max-height: 40px;
  }
  .card-body {
    display: flex;
    align-items: center;
    color: #fff;
  }
  .card-share {
    position: absolute;
    top: 22px;
    right: 0;
    box-sizing: border-box;
    width: 50px;
    height: 20px;
    border: 1px solid #fff;
    font-size: 13px;
    padding: 2px 4px;
    text-align: center;
    display: inline-block;
    line-height: 1;
    font-weight: normal;
  }
  .icon_01_01_08::before,
  .icon_01_01_09::before {
    left: 0;
  }
  .nmg {
    margin-top: 2.5px;
  }
  .nmgb {
    margin-top: 2.5px;
    margin-bottom: 0;
  }
  .outline {
    padding-bottom: 0;
    margin: 0;
    padding: 5px 10px 10px 10px;
  }
  .outline.border {
    border-top: 1px solid #f5f5f5;
  }
  .tab {
    padding-left: 30px;
    padding-right: 30px;
  }
  .tab-item.active .span::before {
    content: '';
    position: absolute;
    display: block;
    width: 52.5px;
    background-color: #00c6ae;
    height: 1px;
    border: 1px solid #00c6ae;
    border-radius: 5px;
    bottom: -11px;
    left: 50%;
    margin-left: -13.5px;
  }

  /*table*/
  .consult-table {
    box-sizing: border-box;
    overflow: hidden;
    font-size: 13px;
    color: #000;
    margin-bottom: 20px;
  }

  .table-tr,
  .table-th {
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    border-bottom: 1px solid #d7d7d7;
    color: #000;
    margin-left: -1px;
    margin-top: -1px;
    font-size: 13px;
    min-height: 35px;
    position: relative;
  }
  .table-th .table-td,
  .table-tr .table-td {
    flex: 1 1 50px;
    border-left: 1px solid #d7d7d7;
    text-align: center;
    padding: 8px;
    height: 35px;
    box-sizing: border-box;
  }
  .table-th .table-td {
    border-color: #fff;
  }
  .table-td.yes {
    color: #00c6ae;
  }
  .table-td.yes::before {
    content: '';
    background-size: cover;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADUAAAAjCAMAAAADt7LEAAACMVBMVEVHcEwAv68AyLAAgIAA//8Av78Axq4Axq4AqqoAxq0AyLYAxq4Axq4Axq4Axq8Axq4Ax64A/4AAxq4AzLgAwqoAxq4Axq4Ax64Axq8Axa4Axq4AxKoAxq4Axq4Ax64AxLEAu6oAzLMAqqoAxq4Axq0AxqoAuaIAxq4Axq4Axq8Axq4Axq4Ax64Axa0Axq8AxqwAxa4Axa4Axa4Axa0Ax64AyLEAx64A5swAxrEAzrEAxqoAxq0Ay7EA1b8Ax60AxrAAya0Ax64Axq4Axq8Axa4AxqsAx7AAya4Ax68AybMAxa4Axa4Ay64Axq4Axq4A0aIAxq8Axq4Ax68Axq0Ax68AyK8Axq8AyK8Axq4Ax64Axq8AybUAx68AyrAAyLEAxq4Axa8Ax64Axq4Ax7EAxq0AzL8Ax7AAxq4AxrIAybIAx7EAx68Axq4Aya4Ax64Ax60AyrEAxq8Axa4Ax64Axq4Ax64Ax68Axq4AyLIA/wAAyKwAxq4AybEAxq4AxaoAv58AzJkAxq4Axq0A27YAxa4Ax7EAxrAAxqoAxq4Ax68Ax64Axq8Axq4Ax64Axq4Axq8Av6oAyLAA1aoAx64Axa8AyK8AyK4Axa4AtrYAxa0AyK4AyK8AzLMAxq4Axq0Axq4Axa4Axq4Axq4Ax68Ax7AAx7AAx64AybAAyK8Axq4Ax68Axq0AyLAAxq4AxrAAx68Axa4Axq4AzK0Ax64Ax68Ax64AxrEAx60Ax64A0bkAxq58IX1MAAAAunRSTlMAEEoCAQT8/gP6DvjE487X9QK0GRW9P6ei/Ooe781fDQ8KBvPwEgv38W/75dlzxSi6OSyxwy6xCiQaG1ExDHpRS+fdhuI6kROJL0LDLPaUCzbcyNt/ou6w6JeTJiAdF/Iw/c9l9xRk+T9MUq3mVettSOHQ2qHQado4AS7pS/0wCAXtpQeNaGcJdP6bpslxuaUMgQxlI5l0iAfzh8IU+vT1+IvT3kR38D1mmPT9dOQtpRa8GfmDiGze6QscuNofAAABzUlEQVQ4y2NgIA1s2rpDZ9tOEjWt28i+axe3LmmaAmR3gcB2kjQZFYE17dImRZMhH0TT5i0kaGIqhmjSWr+BeE02LhBNu/oYidYjKBYM0aPer0C0Jo7cQogm7i5V4p1Xk8MO0dUtT7SeBiYpiJ55U5WI1tTcpgLRNHP6JKI1MU9uhIbeLEWiNc2Qmw/RozGR+HCY0KsO0STTwYpk/3IJHmdh3EE+DeqnXbrtSMJLlIEiTp4c2DXVa2qBtbDHt6KILwKLSiVj9ahISy3EIl45VGMXQ8wKs8OiSc0vBaKJMwstntYsgLo7CiN9yUdCZNirxTDMW6gB1SYegypjWQLVxO+A6QwuTUmoM0RRgpJLIh0i7ujFijW7yUCTZl4CC1zQ3Axqk3Y09uBlseeHOlLHWhAqZmEM1VSagTMqK6AlAjtvPsQ2aSFOiEi5KwfudGMrCrVtlwfIE/6yUF5gKt7kFhvKBlHn6xbHUhUEYbN5+xBIpSIhAtA8Hp7JAzXBxLSSYNGQpgz1nEAihKFHTGHEWhaxCwlIGlgRl2kLkpB0CekTmwXrethhmrKJLysZpsyeC0ld4u6k1ABzVq4CaupskiatiuJasXb1sqUEClgArTkVobLK9UsAAAAASUVORK5CYII=);
    margin-left: 5px;
    margin-top: 5px;
    width: 32px;
    height: 21px;
    display: block;
  }

  .outline-content {
    padding: 5px 0;
  }
  .outline-body.nmr {
    margin-right: 0;
  }
  /*list-three*/
  .list-three {
    padding: 5px;
    justify-content: center;
  }
  .list-three .list-icon {
    border: none;
    flex-basis: 30px;
    width: 30px;
    height: 30px;
    padding: 0;
    align-self: center;
  }
  .list-three:last-child {
    border-bottom: none;
  }
  .list-three .content-title {
    font-size: 15px;
  }
  .list-three .content-brief {
    font-size: 13px;
  }
  .list-three .list-orther {
    color: rgba(153, 153, 153, 1);
  }
  .list-three .list-orther .blue {
    color: rgba(0, 198, 174, 1);
  }
  .list-three .list-orther .money {
    font-size: 14px;
  }
  .list-three .list-orther .money .inline {
    position: relative;
    display: inline;
    color: rgba(242, 34, 59, 1);
    font-size: 18px;
  }
  .list-three .list-orther .money .inline::before {
    content: '¥';
    display: inline;
    color: rgba(242, 34, 59, 1);
    font-size: 16px;
  }
  /*====*/
  .col-two {
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    padding: 5px 0;
  }
  .col-two:last-child {
    border-bottom: none;
  }
  .col-left {
    flex: 0 1 40px;
  }
  .col-right {
    flex: 1;
  }
  .col-left .avatar-circular {
    width: 30px;
    height: 30px;
  }
  .col-right .head {
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
  }
  .col-right .txt {
    font-size: 22px;
    color: #666;
  }
  .col-right .time {
    font-size: 22px;
    color: #999;
    padding: 5px 0;
  }
  .head .tit {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #333333;
    font-size: 24px;
    font-weight: 700;
    padding: 5px 0;
  }
  .head .more {
    flex: 0 0 150rpx;
    text-align: right;
    padding: 2.5px;
  }
  .box-star .star {
    display: inline-block;
    margin-left: 5px;
    width: 10px;
    height: 10px;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGgAAABiBAMAAABOqYv0AAAAJ1BMVEVHcEzU1NTW1tbU1NTU1NTc3NzU1NTY2NjU1NTU1NTU1NTV1dXT09NKLm+mAAAADHRSTlMAzTPyZw2fHYTjt00Lp972AAACj0lEQVRYw62YvUscURTFx3En40ezYNQiUxiwiWyRBATBKYI2gltsNIREUmQrmy02LASLFIKkiRaCqZIpRFEMbLFgswabcc0ks94/KjvuzsybeV/3Lp5y5Qfz7jv3vnM1DIkKUy9eGURZTYBuhQg9gp4+EqFSBN0QoWYEBTTGhnvV6UeiHupLH1okQbU+9G+II0FIuamxAQQUU2zG0CEBOoihO4Lx3Bjy8VABEs2hofcpdIyGyimE96yXQsEQR8J7doSFdpHQNQthPeuwENKzkywDIQ6ayEBIz5ayUBE/U1KhPGtmGegSZgrNs6U8hPCs5eShWz10BZy21cTG2ikINLMvta3Z/gUydWbWBZzdroJaec6ar7qAUOd8JZ6e8988QCu8WJGUS62fzATGa5c3gF43eU9j1DU8OhQaLh3qGA4d8tkRjNWt8ZoOTRs2+fv8uqC9dTqLfLRKY/oj16Rd1WB4blGYZe4xR7ghGWiTeFvMpq37CcsEFT5AIVqJfWZdpIEyeoay9xwfqSlVyKU1Rcfy6e9SCwkSrdbuwnf+raYKLVXaleil+NloYNytCRCACiHKHg4eEhpXz2KxPqjHKiLncaprIrxQLVSSwt2TR7Urs/9IVETEUE7P1UuTWH/p1pMlzNEhejDeOGnmK+teWrohAPTbgkDCAKybzC1EHlcPf9GqFQ0FDxG1c82+VLf3sr8c6vYzCHo9Z2Xr+UfX7N37Utm1bMxTrwv+oFJmU7MJMIYIky41HbX50k/pfGWazFEOMUe8WxQ8xWC2EuYkd38JVZEb4kn+L+9cqfnisfKd/4gdufn61V0S/Svms9TmjdgIAi3Iqmf3DuzLlsanohQR6c3Uj5Z0h/t99Dj98P+jxgftdBWRwQAAAABJRU5ErkJggg==);
  }
  .box-star .star.light {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGgAAABiBAMAAABOqYv0AAAAJFBMVEVHcEwAx68Ax68Ax68AybEAyLAA0LkAx68Ay7MAx68AyK8Axq6PxWNLAAAAC3RSTlMA69G5M1AMnx2FbDcHEhoAAAJrSURBVFjDrZi7LwRRFMYHs2voxCNhmlWwYhpEPLKNR2cbj4pt1iMRNKKSaJZGREOERqOgEI3Zwdo9/5x9zcydO/dxzsTXTn7ZuXe+893vrmFIlJruXzeISucAvCIR6oa6TolQvgF9EaFcA6rQGAuaKtGXRF3UbQv6IUEXLaiaYEngUr5UTxuCFwK060MZAvTsQ98E49k+VMZDvRBoib4kgCk09BFCeM/aIYT2bAoYYT3byUJ3SKjAQkNIyGGhWoIlYT3bFYGQns1HoQw+U0KhPGtGGfAImULzbJ6HEJ5NOzyE+FKbENO5mjh4nwaBso9S25rbMyBV9k3AWTtnoJbLcem1MxsQcudffSeuPaCINrf42mA2gKhBJoHxuosbQK8v3tMYeYZNh9xkkEOHymwEY1Uz9ujQuGGR369cEoy3TnOxFNarVRNM2gu2w3OfaFfuMEd82CDQUnhbLISje4VlKsV4gUKMkrg5qMQdBsu0XQgrtVYT0rammNj4SapPJUGj1dpdeHocaqB1VduVaEDZq0k/xBcIPoKQR3TEdf8JdaqzWKyTJGtSJ0xJU+EpW57DpJCiJOPsytx/JMogamhMn+pLk1i/dOvJGmYHJvhpkyExX0F30tIHFyCBISQFGBIEi0kKf8kZ4NqIqs0N+3DJutebLzrslfrMWdEB+9ENu9fcKusiWvPU14Vye6fMnCbLmWblBlPKUlW1IZ6YIXOUIeaI7xZhXRCEWDpgZqMPjgOqKDfEGP/kyJaaz4+VkfhL3MjN19qnquhaey3N2EvfCAKtynavUfs82aVxRdQimts0qvgbcKtvMnzxPz4gXPq3Q2/TAAAAAElFTkSuQmCC);
  }
  .box-star .star:first-child {
    margin-left: 0;
  }
  /*alert*/
  .alert {
    display: block;
    border-radius: 4px;
    border: 1px solid #fff;
    background: #fff;
    color: 22px;
    padding: 14px;
    color: #333;
    font-weight: 700;
    font-size: 22px;
    position: relative;
    width: auto;
    height: auto;
    margin: 5px 0;
  }
  .alert.icon {
    padding-left: 35px;
  }
  .alert.blue {
    border-color: #f0fcfa;
    background: #f0fcfa;
    color: #00c6ae;
  }
  .alert.icon.icon-star::before {
    content: '';
    position: absolute;
    left: 22.5px;
    width: 15px;
    height: 24px;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA4CAMAAACWs2tWAAAATlBMVEVHcExmZmZoaGhnZ2dhc3FnZ2dmZmZmZmZpdHJnZ2dmZmZmZmZnZ2dmZmZnZ2dnZ2dnZ2doaGgAyLAAx68Ax68AybAAx68Ax65mZmYAxq6AfAXdAAAAGHRSTlMAgzLLH2zo9wm/kNdZrZ12Sj9PkugyZ75VFH2XAAACFElEQVRIx52W2YKDIAxF2WS1LrWdof//o1NB1CjEEZ7cTrwml0RCkDUYM5LKxbz3StSx2n1hz+tg6sPqa0X7SuFRdKXwINrwKuEsKmaqQngU3SQBNaLnKHyJclt0OLwrfBW9iuAVosl94Qx645ZwIPok5I7osNz/hLOmc2dDB+Fedg0rqmX9QyY/N9kN9g3w6Jk+ggM1ym/rcbxvdjeVoUMKIFrLPVjK6pOsTsFnuG2/D7XwqopXzyvzjpFIoGfUaBHh1xniUibKqYQBxjWvhgzxE3Zv1M/nVYTHIpu0IL/P6ffz+fzgbBOQdjuM9PMTF/ruKJbGkz6cdCGnr2s6+q2DBrLz4TvR7xIrQrqMJhk6CX8VaBHK4/Yltdtn4HRsDRLu7m4bLT+JFsUisdzVuJumMh0UqiEfE9ITUuDctguK9Ey/pnd+9tFsLszaf/TvlEuXAQXOZFIi1pKwwHAFqyEw2gftxZtV6YtTwvmF7CLMM73v2L87LLJFYI7A+mowGESZKNgH5KQ0s8YZ3nleWG6oOOyeUkJDN1sfFt0yAQSAHeIRtaJqGyBi1zPkpUeEBXNEUX2KXsqHpgk1BuANYt/okR367epjwmWvY1I04pE+DS++9IuBrzjM6Nkj/oAGPP3DqkMtjx5Z0INVWrfdY8gUmUuZcdmGj2WP5NHQ/JZkDGV3SmRjRLzwN0ela/A/g8aB4H8WB0ufVeAwnQAAAABJRU5ErkJggg==);
    background-size: cover;
    background-repeat: no-repeat;
  }

  .alert .span {
    display: inline-block;
  }
  .alert .inline {
    display: inline;
  }
}
.card .card-small,
.card .card-brief {
  vertical-align: middle;
}
.list-items.icon-next::after {
  content: '';
  top: 17.5px;
}
.list-items.list-vertical-icon {
  padding-left: 25px;
}
.icon.icon_hsp {
  width: 22px;
  height: 22px;
}
.icon.icon_hsp::before {
  content: '';
  width: 22px;
  height: 22px;
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAARVBMVEVHcEw/0tEq0sgs08lR0dhc0twk08UV079H09Ix08ss0sku08lQ0dhg0N0Z0sE60s4h0sQx0stE0dNS0dhA0tFZ0dsp0sd0T3nWAAAADnRSTlMAvpx5sYbB7jgYTvLVb94/lrUAAAEmSURBVDjLxZXbksIgEESJJhi8oCDw/5/qYLhOYMhubdW2Pp7q6hzBMMaY4FLKF8RBlM8TYoyeBNvlJDfYJTrA+r6HL56VRfPGGm302oTjDJV2eLoD++bvjNj8nTFodkebq82j5nMODfsVhdWwotcM+LWEyc0QfkoZN+MHJJuTZ3XUsyp/b8LzLadsFsJ/cbNANjZ4fkOsvYsjngNsH7WNVaQUmyO81M2VjGqGreHkeXfqiObqpvTgvmeALW4GmodMfBpsHnnGm2nPyMY1Z2xjb27kuWWD9Kye9AP+2LMoD5L5N8+/sOEap67hOf8V/PV5dq/OTWl5Pn4HGyeJ9Nx4p8zL8o7wGl6C2bNCT6h1hK2dgzdkI80AVCfYsjNHgetaZd4+kMcHlqdWnqitHbkAAAAASUVORK5CYII=');
}
</style>
