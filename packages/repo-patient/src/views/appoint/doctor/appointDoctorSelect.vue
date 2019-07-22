<template>
  <div>
    <!--        医生信息-->
    <div class="card">
      <div class="card-avatar avatar-circular">
        <img :src="doctorInfo.avartor" class />
      </div>
      <div class="card-body">
        <div class="card-name">
          {{doctorInfo.name}}
          <div class="card-small">{{doctorInfo.doctorTitle}} {{doctorInfo.deptName}}</div>
        </div>
        <!--                <div class="card-small">-->
        <!--                    评分：7.6  预约量：123-->
        <!--                </div>-->
        <div class="card-brief" v-if="doctorInfo.specialSkill">
          <div class="span s">擅长：</div>
          <div class="span xl">{{doctorInfo.specialSkill}}</div>
        </div>
      </div>
    </div>
    <!--提示-->
    <van-notice-bar :scrollable="false">周一至周五：07:30~17:30 周六至周日：07:30~12:30</van-notice-bar>
    <!--日期-->
    <div class="scroll-x">
      <div class="box-scroll">
        <div class="scroll-items">
          <div
            :class="['item', index == activeIndex ? 'active' : '', item.disabled ? 'disabled' : '']"
            :key="index"
            @click="checkTime(index)"
            v-for="(item,index) in dateList"
          >
            <div class="week">{{item.week}}</div>
            <div class="time">{{item.date}}</div>
          </div>
        </div>
      </div>
    </div>
    <!--        号源-->
    <div class="source">
      <div class="g-two" v-if="AM.length">
        <div class="left">上午</div>
        <div class="content">
          <div :key="index" class="f-two" v-for="(item,index) in AM">
            <div :class="['content',(item.isExpire || !item.number) ? 'disabled' : '']">
              <div class="inline">{{item.startTime}}-{{item.endTime}}</div>
              <div class="inline">￥{{item.unitPrice}}</div>
              <div :class="['label', item.number ? item.number == 1 ? 'label-red' : 'label-blue' : '']">剩余{{item.number}}</div>
            </div>
            <div class="right">
              <div @click="goAppointOrderSubmitPage(item,{type:'AM'})" class="btn btn-blue">{{item.isExpire ? '已过期' : item.number ? '预约' : '约满'}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="g-two" v-if="PM.length">
        <div class="left">下午</div>
        <div class="content">
          <div :key="index" class="f-two" v-for="(item,index) in PM">
            <div :class="['content',(item.isExpire || !item.number) ? 'disabled' : '']">
              <div class="inline">{{item.startTime}}-{{item.endTime}}</div>
              <div class="inline">￥{{item.unitPrice}}</div>
              <div :class="['label', item.number ? item.number == 1 ? 'label-red' : 'label-blue' : '']">剩余{{item.number}}</div>
            </div>
            <div class="right">
              <div @click="goAppointOrderSubmitPage(item,{type:'PM'})" class="btn btn-blue">{{item.isExpire ? '已过期' : item.number ? '预约' : '约满'}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="none-page" v-if="!AM.length && !PM.length">
        <div class="icon icon_none_source"></div>
        <div class="none-text">
          当日暂时无号源哦
          <div>请查看其他日期号源</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import peace from '@src/library'

export default {
  props: {},
  data() {
    return {
      // doctorInfo: {
      //     doctorName:'张三',
      //     doctorTitle:'教授',
      //     deptName:'临床医学',
      //     specialSkill:'啦啦啦啦啦啦啦啦绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿'
      // },
      doctorInfo: {},
      params: {},
      activeIndex: 0,
      // dateList: [
      //     { time: '01-07', week: '周一', index: 0 },
      //     { time: '01-08', week: '周二', index: 1},
      //     { time: '01-09', week: '周三', index: 2, disabled: true },
      //     { time: '01-10', week: '周四', index: 3},
      //     { time: '01-11', week: '周五', index: 4},
      //     { time: '01-12', week: '周六', index: 5},
      //     { time: '01-13', week: '周日', index: 6}
      // ],
      dateList: [],
      AM: [],
      PM: []
    }
  },
  created() {
    const params = peace.util.decode(this.$route.params.json)
    this.params = params
    this.getData()
  },
  methods: {
    getData() {
      peace.service.appoint
        .choiceVisitingTime({
          doctorId: this.params.doctorId,
          hospitalCode: this.params.hospitalCode
        })
        .then(res => {
          this.dateList = res.data.weekDate || []
          this.doctorInfo = res.data.list.doctorInfo || {}
          this.initSource()
        })
    },
    initSource() {
      this.activeIndex = this.dateList.findIndex(item => {
        return !item.disabled
      })
      ~this.activeIndex && this.getSourceData(this.dateList[this.activeIndex])
    },
    getSourceData(item) {
      peace.service.appoint
        .choiceVisitingTimeByWeek({
          hospitalCode: this.params.hospitalCode,
          doctorId: this.params.doctorId,
          timeSharing: item.year + '-' + item.date
        })
        .then(res => {
          this.AM = res.data.list.AM || []
          this.PM = res.data.list.PM || []
        })
    },
    checkTime(index) {
      let item = this.dateList[index]

      if (item.disabled) {
        return
      }
      this.activeIndex = index
      this.getSourceData(item)
    },
    goAppointOrderSubmitPage(item, obj) {
      let json = {}
      json.doctorInfo = this.doctorInfo
      json.source = item
      json.source.type = obj.type
      json.date = this.dateList[this.activeIndex]
      json = peace.util.encode(json)

      if (!item.isExpire && item.number) {
        this.$router.push(`/appoint/order/appointOrderSubmit/${json}`)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.scroll-x {
  position: relative;
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
.card .card-small,
.card .card-brief {
  /*line-height: 1.3;*/
}
.card-brief {
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
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
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
}
.g-two {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  align-items: stretch;
  justify-content: center;
  background: #fff;
  border-top: 1px solid #f5f5f5;
  border-bottom: 1px solid #f5f5f5;
}
.g-two + .g-two {
  margin-top: 15px;
}
.g-two .left {
  flex: 0 0 auto;
  width: 1.33333rem;
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
  border-left: 2px solid #f5f5f5;
}
.f-two {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: #333;
  font-size: 14px;
  border-bottom: 1px solid #f5f5f5;
}
.f-two:last-child {
  border-bottom: none;
}
.f-two .content {
  flex: 1;
  padding: 15px;
}
.content .label {
  border-radius: 2px;
  padding: 0px 3px;
  font-size: 10px;
}
.inline {
  display: inline;
  padding-right: 8px;
  vertical-align: middle;
}
.content.disabled .inline {
  color: #c4c4c4;
}
.inline.blue {
  color: #00c6ae;
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
  width: 65px;
  line-height: 1;
  margin: 0;
  margin-right: 20px;
  text-align: center;
  padding: 6px;
  border-radius: 5px;
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