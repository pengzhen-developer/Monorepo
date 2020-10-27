<template>
  <div>
    <!--        医生信息-->
    <div class="card">
      <div class="card-avatar avatar-circular">
        <img :src="doctorInfo.avartor"
             class />
      </div>
      <div class="card-body">
        <div class="card-name">
          {{doctorInfo.name}}
          <div class="card-small">{{doctorInfo.doctorTitle}} {{doctorInfo.deptName}}</div>
        </div>
        <!-- <div class="card-small">
          <span>评分：7.6</span> <span>预约量：123</span>
        </div> -->
        <div class="card-brief"
             v-if="doctorInfo.specialSkill">
          <div class="span s">擅长：</div>
          <div class="span xl">{{doctorInfo.specialSkill}}</div>
        </div>
      </div>
    </div>
    <!--提示-->
    <!-- <van-notice-bar :scrollable="false">周一至周五：07:30~17:30 周六至周日：07:30~12:30</van-notice-bar> -->
    <!--日期-->
    <div class="scroll-x">
      <div class="box-scroll">
        <div class="scroll-items">
          <div :class="['item', index == activeIndex ? 'active' : '', item.disabled ? 'disabled' : '']"
               :key="index"
               @click="checkTime(index)"
               v-for="(item,index) in dateList">
            <div class="week">{{item.week}}</div>
            <div class="time">{{item.date}}</div>
          </div>
        </div>
      </div>
    </div>
    <!--        号源-->
    <div class="source">
      <div class="g-two"
           v-if="AM.length">
        <div class="left">上午</div>
        <div class="content">
          <div :key="index"
               class="f-two"
               v-for="(item,index) in AM">
            <div :class="['content',(item.isExpire || !item.number) ? 'disabled' : '']">
              <div class="inline">{{item.startTime}}-{{item.endTime}}</div>
              <div class="inline red">￥{{Number(item.unitPrice).toFixed(2)}}</div>
              <div :class="['label', item.number ? item.number == 1 ? 'label-red' : 'label-blue' : '']"
                   v-if="!item.isExpire">
                剩余{{item.number}}</div>
            </div>
            <div class="right">
              <div @click="goAppointOrderSubmitPage(item,{type:'AM'})"
                   class="btn btn-blue">{{item.isExpire ? '已过期' : item.number ? '预约' : '约满'}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="g-two"
           v-if="PM.length">
        <div class="left">下午</div>
        <div class="content">
          <div :key="index"
               class="f-two"
               v-for="(item,index) in PM">
            <div :class="['content',(item.isExpire || !item.number) ? 'disabled' : '']">
              <div class="inline">{{item.startTime}}-{{item.endTime}}</div>
              <div class="inline red">￥{{Number(item.unitPrice).toFixed(2)}}</div>
              <div :class="['label', item.number ? item.number == 1 ? 'label-red' : 'label-blue' : '']"
                   v-if="!item.isExpire">
                剩余{{item.number}}</div>
            </div>
            <div class="right">
              <div @click="goAppointOrderSubmitPage(item,{type:'PM'})"
                   class="btn btn-blue">{{item.isExpire ? '已过期' : item.number ? '预约' : '约满'}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="none-page"
           v-if="AM.length ==0 && PM.length ==0 && loaded">
        <div class="icon icon_none_source"></div>
        <div class="none-text">
          当日暂时无号源哦
          <div>请查看其他日期号源</div>
        </div>
      </div>
    </div>

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
  props: {},
  components: {
    [Dialog.Component.name]: Dialog.Component,
    UserServiceNotice
  },
  data() {
    return {
      loaded: false,
      doctorInfo: {},
      params: {},
      activeIndex: 0,
      activeDate: '',
      dateList: [],
      AM: [],
      PM: [],
      dialog: {
        visible: false,
        data: undefined
      }
    }
  },
  created() {
    const params = peace.util.decode(this.$route.params.json)
    this.params = params
    this.activeDate = params.time
  },
  activated() {
    this.getData()
  },

  methods: {
    getData() {
      peace.service.appoint
        .choiceVisitingTime({
          doctorId: this.params.doctorId,
          hospitalCode: this.params.hospitalCode,
          sourceDisType: this.params.from ? 0 : 1
        })
        .then((res) => {
          this.dateList = res.data.weekDate || []
          this.doctorInfo = res.data.list.doctorInfo || {}
          this.initSource()
        })
    },
    initSource() {
      this.activeIndex = this.dateList.findIndex((item) => {
        // 默认用户已选的日期，如没有则默认第一条非禁用的日期
        return this.activeDate ? this.activeDate == item.date : !item.disabled
      })
      ~this.activeIndex && this.getSourceData(this.dateList[this.activeIndex])
      this.$nextTick(() => {
        const element = document.querySelector('.scroll-items')
        const itemEle = document.querySelector('.scroll-items .item')
        if (this.activeIndex && element && itemEle) {
          element.scrollLeft = itemEle.offsetWidth * Number(this.activeIndex)
        }
      })
    },
    getSourceData(item) {
      peace.service.appoint
        .choiceVisitingTimeByWeek({
          hospitalCode: this.params.hospitalCode,
          doctorId: this.params.doctorId,
          timeSharing: item.year + '-' + item.date,
          sourceDisType: this.params.from ? 0 : 1
        })
        .then((res) => {
          this.AM = res.data.list.AM || []
          this.PM = res.data.list.PM || []
          this.loaded = true
        })
    },
    checkTime(index) {
      let item = this.dateList[index]
      if (item.disabled) {
        return
      }
      this.activeIndex = index
      this.activeDate = item.date
      this.getSourceData(item)
    },
    async goAppointOrderSubmitPage(item, obj) {
      if (item.isExpire == 1 || item.number == 0) {
        return
      }

      let json = {}
      json.doctorInfo = this.doctorInfo
      json.source = item
      json.source.type = obj.type
      json.date = this.dateList[this.activeIndex]

      json = peace.util.encode(json)
      const params = {
        doctorId: this.doctorInfo.doctorId,
        timeSharing: this.dateList[this.activeIndex].year + '-' + this.dateList[this.activeIndex].date,
        sourceCode: item.sourceCode,
        bookingStart: item.startTime,
        bookingEnd: item.endTime,
        sourceDisType: this.params.from ? 0 : 1
      }
      //校验号源是否可用
      try {
        await peace.service.inquiry.checkSource(params)
      } catch (err) {
        if (err.data.code == '202') {
          return Dialog.confirm({
            title: '温馨提示',
            message: err.data.msg,
            onfirmButtonText: '确定',
            showCancelButton: false
          }).finally(() => {
            const param = Object.assign(item, {
              year: this.dateList[this.activeIndex].year,
              date: this.dateList[this.activeIndex].date
            })

            this.getSourceData(param)
          })
        }
      }
      /**复诊续方*/
      if (this.params.from) {
        const temp = {
          doctorId: this.doctorInfo.doctorId,
          consultingType: 'returnVisit',
          serviceType: 'returnVisit',
          appointmentDate: this.dateList[this.activeIndex].year + '-' + this.dateList[this.activeIndex].date,
          appointmentStartTime: item.startTime,
          appointmentEndTime: item.endTime,
          sourceDisType: 0,
          sourceCode: item.sourceCode,
          sourceItemCode: item.sourceItemCode,
          price: item.unitPrice,
          AMPM: obj.type
        }
        if (!this.params.isAgain) {
          this.dialog.visible = true
          this.dialog.data = Object.assign({}, temp, { type: 'returnVisit' })
          // const json = peace.util.encode(temp)
          // this.$router.push(`/components/doctorInquiryApply/${json}`)
        } else {
          if (!this.params.emit) {
            this.params.model = Object.assign(this.params.model, temp)
            this.apply(item)
          } else {
            $peace.$emit(this.params.emit, temp)
            this.$router.go(-1)
          }
        }
      } else {
        this.$router.push(`/appoint/order/appointOrderSubmit/${json}`)
      }
    },

    apply(item) {
      const json = peace.util.deepClone(this.params.model)
      const model = peace.util.encode(json)
      const params = {
        doctorId: this.doctorInfo.doctorId,
        timeSharing: this.dateList[this.activeIndex].year + '-' + this.dateList[this.activeIndex].date,
        sourceCode: item.sourceCode,
        bookingStart: item.startTime,
        bookingEnd: item.endTime
      }
      peace.service.inquiry
        .checkSource(params)
        .then(() => {
          this.$router.replace(`/components/ConsultDetailBefore/${model}`)
        })
        .catch((res) => {
          //重新选择号源
          const param = Object.assign(item, {
            year: this.dateList[this.activeIndex].year,
            date: this.dateList[this.activeIndex].date
          })
          this.getSourceData(param)

          return Dialog.confirm({
            title: '温馨提示',
            message: res.data.msg,
            onfirmButtonText: '确定',
            showCancelButton: false
          })
        })
    },
    gotoInquiryApplyPage() {
      const json = peace.util.encode({
        doctorId: this.dialog.data.doctorId,
        consultingType: 'returnVisit',
        serviceType: 'returnVisit',
        appointmentDate: this.dialog.data.appointmentDate,
        appointmentStartTime: this.dialog.data.appointmentStartTime,
        appointmentEndTime: this.dialog.data.appointmentEndTime,
        sourceDisType: 0,
        sourceCode: this.dialog.data.sourceCode,
        sourceItemCode: this.dialog.data.sourceItemCode,
        price: this.dialog.data.price,
        AMPM: this.dialog.data.AMPM
      })
      this.$router.push(`/components/doctorInquiryApply/${json}`)
      this.dialog.visible = false
    },
    goToPay(data) {
      const json = peace.util.encode({
        money: data.orderMoney,
        typeName: this.doctor.doctorInfo.serviceName,
        doctorId: data.doctorId,
        doctorName: data.doctorName,
        orderNo: data.orderNo,
        inquiryId: data.inquiryId
      })
      this.$router.replace(`/components/doctorInquiryPay/${json}`)
    },

    goToMessage(data) {
      const params = peace.util.encode({
        id: 'p2p-' + this.model.doctorId,
        scene: 'p2p',
        beginTime: data.startTime.toDate().getTime(),
        to: this.model.doctorId
      })

      // 跳转聊天详情
      this.$router.replace(`/components/messageList/${params}`)
    },

    goToConsultDetail(data) {
      const params = {
        inquiryId: data.inquiryId
      }

      let json = peace.util.encode(params)
      this.$router.replace(`/setting/userConsultDetail/${json}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.scroll-x {
  position: relative;
  border-bottom: 1px solid #e5e5e5;
  border-top: 1px solid #e5e5e5;
  height: 47px;
}
.box-scroll .scroll-items > .item {
  border-color: #e5e5e5;
}
.card {
  padding: 7px 5px;
  border-top: 1px solid #f5f5f5;
  border-bottom-color: #f5f5f5;
  margin-bottom: 0;
}
.card-brief {
  color: #999;
}
.card .card-brief,
.card .p-small {
  display: flex;
  align-items: baseline;
  line-height: 1.3;
  font-size: 13px;
  padding: 7px 0;
}
.card .card-small span {
  margin-right: 10px;
  color: #666;
}
.card-brief,
.p-small {
  /*display: 1;*/
  overflow: hidden;
}
.card-brief .span,
.p-small .span {
  position: relative;
  flex: 1;
}
.card-brief .span.s,
.p-small .span.s {
  flex: 0 0 auto;
  /*width: ;*/
}
.card-brief .span.xl {
  flex: 0 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.card .card-name {
  display: flex;
}
.card .card-name .card-small {
  flex: 1;
  align-self: center;
  padding-top: 5px;
  padding-left: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.source {
  background: #fafafa;
  padding-top: 12.5px;
}
.g-two {
  display: flex;
  align-items: stretch;
  justify-content: center;
  background: #fff;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
  &:first-child {
    margin-bottom: 12.5px;
  }
}

.g-two .left {
  flex: 0 0 auto;
  width: 3em;
  color: #333;
  font-size: 0.45333rem;
  text-align: center;
  padding: 0.45333rem;
  box-sizing: border-box;
  align-self: center;
  line-height: 3;
}
.g-two > .content {
  flex: 1;
  border-left: 1px solid #e5e5e5;
}
.f-two {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: #333;
  font-size: 14px;
  border-bottom: 1px solid #e5e5e5;
}
.f-two:last-child {
  border-bottom: none;
}
.f-two .content {
  flex: 1;
  padding: 20px 0 20px 15px;
  display: flex;
  align-items: center;
}
.content .label {
  border-radius: 2px;
  padding: 0px 5px;
  font-size: 11px;
  line-height: normal;
  height: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.inline {
  height: 20px;
  line-height: 20px;
  &:first-child {
    font-family: monospace;
  }
  &:nth-child(2) {
    min-width: 4.4em;
    margin-left: 1.3em;
  }
}
.content.disabled .inline {
  color: #c4c4c4;
}
.inline.blue {
  color: #00c6ae;
}
.inline.red {
  color: #f2223b;
}
.label.label-blue {
  background: #effffc;
  color: #00c6ae;
  border: 1px solid #00c6ae;
}
.label.label-red {
  background: #fff6f6;
  color: #f2223b;
  border: 1px solid #f2223b;
}
.content.disabled .label {
  color: #c4c4c4;
  border-color: #c4c4c4;
  background: #fff;
}
.right > .btn {
  font-size: 14px;
  width: 4em;
  line-height: 20px;
  margin: 0;
  margin-right: 1em;
  text-align: center;
  padding: 0.2em 0;
  border-radius: 4px;
}
.content.disabled + .right > .btn {
  background: #fff;
  border: none;
  color: #c4c4c4;
}
.none-page {
  background: #fff;
}
.none-page .icon {
  margin-top: 50px;
}
</style>
