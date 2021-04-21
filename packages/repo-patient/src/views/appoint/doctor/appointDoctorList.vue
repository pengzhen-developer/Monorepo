<template>
  <div class="appoint-doctor-list">
    <div class="scroll-x">
      <div class="box-scroll">
        <div class="scroll-items">
          <div :class="['item', activeIndex == 'all' ? 'active' : '']"
               @click="checkTime({index:'all'})">
            <div class="week">不限</div>
            <div class="week">日期</div>
          </div>
          <div :class="['item', activeIndex == index ? 'active' : '',item.disabled ? 'disabled' : '']"
               :key="index"
               @click="checkTime({index})"
               v-for="(item,index) in dateList">
            <div class="week">{{item.week}}</div>
            <div class="time">{{item.date}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div :key="item.doctorId"
           @click="goDoctorHomePage(item)"
           class="card"
           v-for="item in doctorList">
        <div class="card-avatar avatar-circular">
          <img :src="item.doctorInfo.avartor"
               class />
        </div>
        <div class="card-body">
          <div class="card-name">
            {{item.doctorInfo.name}}
            <div class="card-small">{{item.doctorInfo.doctorTitle}} {{item.doctorInfo.deptName}}
            </div>
            <van-button @click.stop="goDoctorAppointPage(item)"
                        hairline
                        plain
                        size="mini"
                        type="primary">预约</van-button>
          </div>
          <!--          <div class="card-small">评分：&#45;&#45; 预约量：&#45;&#45;</div>-->
          <div class="card-brief"
               v-if="item.doctorInfo.specialSkill">
            <div class="span s">擅长：</div>
            <div class="span xl">{{item.doctorInfo.specialSkill}}</div>
          </div>
          <!--          <div class="box-appoint" v-if="activeIndex!='all'">-->
          <!--            <div v-if="item.AM" :class="['bar-line', item.AM.bookingTotal ? '' :'disabled']">-->
          <!--              <div class="item">{{item.timeSharing}} 上午</div>-->
          <!--              <div class="item">{{item.AM.sourceLevelType == 1 ? '普通' : '专家'}}门诊</div>-->
          <!--              <div class="item">￥{{item.AM.unitPrice}}</div>-->
          <!--              <div    @click.stop="goAppointOrderSubmitPage(item,item.AM)"-->
          <!--                      :class="['item', item.AM.bookingTotal ? 'active' :'disabled']">{{item.AM.bookingTotal ? '预约' : '约满'}}</div>-->
          <!--            </div>-->
          <!--            <div v-if="item.PM" :class="['bar-line', item.PM.bookingTotal ? '' :'disabled']">-->
          <!--              <div class="item">01-09 上午</div>-->
          <!--              <div class="item">专家门诊</div>-->
          <!--              <div class="item">￥{{item.PM.unitPrice}}</div>-->
          <!--              <div  @click.stop="goAppointOrderSubmitPage(item,item.PM)"-->
          <!--                    :class="['item', item.PM.bookingTotal? 'active' :'disabled']">{{item.PM.bookingTotal ? '预约' : '约满'}}</div>-->
          <!--            </div>-->
          <!--          </div>-->
        </div>
      </div>
      <div class="none-page"
           v-if="!doctorList.length && loaded">
        <div class="icon icon_none_source"></div>
        <div class="none-text">
          当日暂无可预约医生
          <div>请查看其他日期</div>
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
      loaded: false,
      dateListLength: 7,
      data: {},
      doctorList: [],
      activeIndex: 'all',
      params: {},
      dateList: []
    }
  },
  created() {
    this.params = peace.util.decode(this.$route.params.json)
    this.getData()
  },
  methods: {
    getData(timeSharing) {
      peace.service.appoint
        .choiceDoctor({
          hospitalCode: this.params.hospitalCode,
          twoLevelDeptId: this.params.twoLevelDeptId,
          timeSharing
        })
        .then((res) => {
          this.loaded = true
          !this.dateList.length && (this.dateList = res.data.weekDate), (this.doctorList = res.data.list)
        })
    },
    checkTime(obj) {
      const item = this.dateList[obj.index] || {}

      if (item.disabled) {
        return
      }
      this.activeIndex = obj.index
      this.getData(item.date ? item.year + '-' + item.date : '')
    },
    // 医生主页
    goDoctorHomePage(item) {
      const json = peace.util.encode({ doctorId: item.doctorInfo.doctorId, isAppoint: true })

      this.$router.push(`/components/doctorDetail/${json}`)
    },
    // 医生挂号页
    goDoctorAppointPage(item) {
      let json = peace.util.encode({
        doctorId: item.doctorInfo.doctorId,
        hospitalCode: item.doctorInfo.nethospitalId,
        time: this.activeIndex == 'all' ? '' : this.dateList[this.activeIndex].date,
        date: new Date(),
        serviceType: 'appointment'
      })

      this.$router.push(`/appoint/doctor/appointDoctorSelect/${json}`)
    }
    // 预约订单提交页
    // goAppointOrderSubmitPage(item,source){
    //   let json = {};
    //   json.doctorInfo = item.doctorInfo;
    //   json.order = source;
    //   json = peace.util.encode(json);
    //
    //   // 有号源才可以挂号
    //   if(source.unitPrice){
    //     this.$router.push(`../../order/appointOrderSubmit/${json}`);
    //   }
    // }
  }
}
</script>

<style lang="scss" scoped>
.appoint-doctor-list {
  height: 100%;
  display: flex;
  flex-direction: column;

  .scroll-x {
    /*height: 40px;*/
  }

  .content {
    flex: 1;
    overflow-y: auto;
    padding-top: 10px;
  }
}

/*·       doctor*/
.card {
  padding: 7px 5px;
  border-bottom: 1px solid #dedede;
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
.van-button--primary {
  color: #00c6ae;
  flex: 0 0 auto;
  width: 62px;
  margin-right: 10px;
  align-self: center;
}
/*    box-appoint*/
.box-appoint {
  margin: 5px 0;
  padding-top: 5px;
  clear: both;
  margin-right: 10px;
}
.bar-line {
  display: flex;
  align-items: stretch;
  justify-content: space-around;
  width: 100%;
  border-radius: 15px;
  min-height: 25px;
  box-sizing: border-box;
  color: #00c6ae;
  background: #ddf7f4;
}
.bar-line + .bar-line {
  margin-top: 5px;
}
.bar-line > .item {
  flex: 1;
  text-align: center;
  font-size: 12px;
  padding: 3px 0;
}
.bar-line > .item:first-child {
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  flex: 1.3;
}
.bar-line > .item:last-child {
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
}
.bar-line > .item.active {
  background: #00c6ae;
  color: #fff;
}
.bar-line > .item.disabled {
  background: #e1e1e1;
  color: #999;
}
.bar-line.disabled {
  background: #f3f3f3;
  color: #999;
}
</style>

