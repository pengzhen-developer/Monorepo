<template>
  <div class="appoint-doctor-list">

    <div class="scroll-x">
      <div class="box-scroll">
        <div class="scroll-items">
          <div :class="['item position', activeIndex === 'all' ? 'active' : '']"
               @click="checkTime({index:'all'})">
            <div>不限</div>
            <div>日期</div>
          </div>
          <div :class="['item', activeIndex === 'all' ? 'active' : '']"
               @click="checkTime({index:'all'})">
            <div>不限</div>
            <div>日期</div>
          </div>
          <div :class="['item', activeIndex === index ? 'active' : '',item.disabled ? 'disabled' : '']"
               :key="index"
               @click="checkTime({index})"
               v-for="(item,index) in dateList">
            <div>{{item.week}}</div>
            <div>{{item.date}}</div>
          </div>
        </div>
      </div>
    </div>
    <van-list v-model="loading"
              :finished="finished"
              @load="getData"
              class="content">
      <div :key="item.doctorCode"
           @click="gotoAppointPage(item)"
           class="doctor-info"
           v-for="item in doctorList">
        <van-image round
                   :src="item.doctorInfo.photoDoc"></van-image>
        <div class="doctor-info-body">
          <div class="doctor-info-body-title">
            <div><span class="doctor-name">{{item.doctorInfo.name}}</span> {{item.doctorInfo.doctorTitle}}</div>
            <div class="tag-state"
                 :class="{'full':item.state==='full'}"
                 v-if="canShowStateTag(item.state)">{{item.stateTxt}}</div>
          </div>
          <div class="doctor-info-body-sub-title">{{item.doctorInfo.hospitalName}} {{item.doctorInfo.depChild}}</div>
          <div class="title-tag">
            <div :class="['doc-tags', 'tag-'+tag.key]"
                 :key="index"
                 v-for="(tag, index) in item.doctorInfo.tags">
              {{tag.value}}
            </div>
          </div>
          <div class="doctor-desc"
               v-if="item.doctorInfo&&item.doctorInfo.specialSkill">擅长：{{item.doctorInfo.specialSkill}}</div>
          <!-- <div class="doctor-money"
               v-if="activeIndex === 'all'">
            <peace-price size="16"
                         prefixSize="16"
                         :price="item.unitPrice"></peace-price>
          </div> -->
          <template v-if="activeIndex !== 'all'&&item.ampm.length>0">
            <div class="doctor-money-group"
                 v-for="(source,index) in item.ampm"
                 :key="index">
              <div class="doctor-money-group-left">
                <div class="left-span"><span>{{source.date}}</span><span>{{source.ampm==="AM" ? "上午" : "下午"}}</span><span>{{source.sourceLevelType==='1'?"普通门诊" : "专家门诊"}}</span></div>
                <peace-price size="14"
                             prefixSize="14"
                             :price="source.unitPrice"
                             transformOrigin="right"></peace-price>
              </div>
              <div class="doctor-money-group-right "
                   @click.stop="goAppointOrderSubmitPage(item,source)">
                预约
              </div>
            </div>
          </template>
        </div>
      </div>

      <div class="none-page"
           v-if="!doctorList.length && loaded">
        <div class="icon icon_none_source"></div>
        <div class="none-text">
          当日暂时无号源哦
          <div>请查看其他日期号源</div>
        </div>
      </div>
    </van-list>

    <UserServiceNotice v-model="dialog.visible"
                       v-bind:info="dialog.data"
                       @onSucces="gotoInquiryApplyPage"></UserServiceNotice>
  </div>
</template>

<script>
import peace from '@src/library'
import { Dialog } from 'vant'
import UserServiceNotice from '@src/views/components/UserServiceNotice'
export default {
  name: 'ReturnVisitDoctorList',
  props: {},
  components: { [Dialog.Component.name]: Dialog.Component, UserServiceNotice },
  data() {
    return {
      loaded: false,
      dateListLength: 7,
      data: {},
      doctorList: [],
      activeIndex: 'all',
      params: {},
      dateList: [],
      finished: false,
      loading: false,
      p: 0,
      size: 10,
      dialog: { visible: false, data: {} }
    }
  },

  created() {
    this.params = peace.util.decode(this.$route.params.json)
  },

  methods: {
    canShowStateTag(state) {
      return this.activeIndex === 'all' || (this.activeIndex !== 'all' && state === 'full')
    },
    getData(timeSharing, type) {
      if (type == 'start') {
        this.p = 0
        this.loaded = false
        this.loading = false
        this.doctorList = []
      }
      this.p++
      peace.service.patient
        .getBookingDoctor({
          hospitalCode: this.params.hospitalCode,
          departmentCode: this.params.departmentCode,
          timeSharing,
          p: this.p,
          size: this.size
        })
        .then((res) => {
          if (!this.dateList.length) {
            this.dateList = res.data.weekDate
          }
          this.doctorList = this.doctorList.concat(res.data.list)
          this.loaded = true
          this.loading = false
          if (this.p * this.size >= res.data.total) {
            this.finished = true
          }
        })
    },
    checkTime(obj) {
      const item = this.dateList[obj.index] || {}

      if (item.disabled) {
        return
      }
      this.activeIndex = obj.index
      this.getData(item.date ? item.year + '-' + item.date : '', 'start')
    },
    // 去选号源页面
    gotoAppointPage(item) {
      let json = peace.util.encode({
        doctorId: item.doctorCode,
        hospitalCode: this.params.hospitalCode,
        time: '',
        date: new Date(),
        serviceType: 'returnVisit'
      })
      this.$router.push(`/appoint/doctor/appointDoctorSelect/${json}`)
    },
    goAppointOrderSubmitPage(item, source) {
      const temp = {
        doctorId: item.doctorCode,
        consultingType: 'returnVisit',
        serviceType: 'returnVisit',
        appointmentDate: source.timeSharing,
        appointmentStartTime: source.bookingStart,
        appointmentEndTime: source.bookingEnd,
        sourceDisType: 0,
        sourceCode: source.sourceCode,
        sourceItemCode: source.sourceItemCode,
        price: source.unitPrice,
        AMPM: source.ampm,
        type: 'returnVisit'
      }
      this.dialog.visible = true
      this.dialog.data = Object.assign({}, temp)
    },

    // 去医生助手页面
    gotoInquiryApplyPage() {
      const json = peace.util.encode({
        doctorId: this.dialog.data.doctorId,
        consultingType: this.dialog.data.consultingType,
        serviceType: this.dialog.data.serviceType,
        appointmentDate: this.dialog.data.appointmentDate,
        appointmentStartTime: this.dialog.data.appointmentStartTime,
        appointmentEndTime: this.dialog.data.appointmentEndTime,
        sourceDisType: this.dialog.data.sourceDisType,
        sourceCode: this.dialog.data.sourceCode,
        sourceItemCode: this.dialog.data.sourceItemCode,
        price: this.dialog.data.price,
        AMPM: this.dialog.data.AMPM
      })
      this.$router.push(`/components/doctorInquiryApply/${json}`)
      this.dialog.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.none-page {
  justify-content: flex-start;
  .icon {
    margin-top: 150px;
  }
}
.tag-state {
  height: 20px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  line-height: normal;
  margin: 0;
  border-radius: 2px;
  position: absolute;
  right: 0;
  top: 0;
  font-family: PingFangSC-Regular, PingFang SC;
  color: $primary;
  border: 1px solid $primary;

  &.full {
    color: #858585;
    border: 1px solid #eaeaea;
  }
}
.title-tag {
  margin: 0 0 4px 0;
  .doc-tags {
    border-radius: 2px;
    color: #fff;
    padding: 2px 8px;
    margin-right: 8px;
    font-size: 12px;
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
.appoint-doctor-list {
  height: 100%;
  display: flex;
  flex-direction: column;

  .box-scroll {
    height: auto;
    .scroll-items {
      > .item {
        border: none;
        position: relative;
        flex: none;
        color: rgba(51, 51, 51, 0.6);
        line-height: 20px;
        padding: 11px 12.5px;
        font-weight: normal;
        background: #fff;
        &.position {
          position: absolute;
          left: 0px;
          top: 1px;
          z-index: 77;
        }
        &.active {
          color: #fff;
          background: $primary;
        }
        &:nth-child(2),
        &:first-child {
          padding: 11px 10px;
          &::after {
            content: '';
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 1px;
            height: 24px;
            background: rgba(51, 51, 51, 0.1);
          }
        }
      }
    }
  }
  .scroll-x {
    height: auto;
    border-top: 1px solid rgba(51, 51, 51, 0.1);
    border-bottom: 1px solid rgba(51, 51, 51, 0.1);
  }
  .content {
    flex: 1;
    overflow-y: auto;
    .doctor-info {
      padding: 16px;
      display: flex;
      border-bottom: 1px solid rgba(51, 51, 51, 0.05);
      .van-image {
        width: 48px;
        height: 48px;
        border: 1px solid #eee;
        margin-right: 8px;
      }
      .doctor-info-body {
        flex: 1;
      }
      .doctor-info-body-title {
        position: relative;
        display: flex;
        align-items: center;
        color: #333333;
        margin-bottom: 4px;
        .doctor-name {
          font-size: 18px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: bold;
          line-height: 24px;
        }
      }
      .doctor-info-body-sub-title {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        line-height: 20px;
        margin-bottom: 4px;
      }
      .doctor-desc {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(51, 51, 51, 0.6);
        line-height: 20px;
        width: 280px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .doctor-money {
        color: #ff3a30;
        font-family: PingFangSC-Regular, PingFang SC;
        line-height: 24px;
        margin-top: 8px;
      }

      .doctor-money-group {
        width: 100%;
        height: 32px;
        border-radius: 16px;
        overflow: hidden;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #00c6ae;
        line-height: 20px;
        display: flex;
        align-items: center;
        background: rgba(0, 198, 174, 0.1);
        margin-top: 6px;
        &.full {
          background: #fff;
          color: rgba(51, 51, 51, 0.4);
          border: 1px solid #eaeaea;
          .doctor-money-group-left {
            color: rgba(51, 51, 51, 0.4);
          }
          .doctor-money-group-right {
            color: rgba(51, 51, 51, 0.6);

            background: rgba(51, 51, 51, 0.05);
          }
        }

        .doctor-money-group-left {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-left: 8px;
          padding-right: 4px;
          color: $primary;
          .left-span {
            span {
              margin-left: 8px;
            }
          }
        }
        .doctor-money-group-right {
          width: 56px;
          height: 100%;
          background: $primary;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
        }
      }
    }
  }
}
</style>

