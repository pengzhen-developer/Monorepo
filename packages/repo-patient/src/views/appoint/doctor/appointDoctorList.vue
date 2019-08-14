<template>
  <div class="appoint-doctor-list">
    <div class="scroll-x">
      <div class="box-scroll">
        <div class="scroll-items">
          <div :class="['item', activeIndex == 'all' ? 'active' : '']" @click="checkTime({index:'all'})">
            <div class="week">不限</div>
            <div class="week">日期</div>
          </div>
          <div
            :class="['item', activeIndex == index ? 'active' : '',item.disabled ? 'disabled' : '']"
            :key="index"
            @click="checkTime({index})"
            v-for="(item,index) in dateList"
          >
            <div class="week">{{item.week}}</div>
            <div class="time">{{item.date}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div :key="item.doctorId" @click="goDoctorHomePage(item)" class="card" v-for="item in doctorList">
        <div class="card-avatar avatar-circular">
          <img :src="item.doctorInfo.avartor" class />
        </div>
        <div class="card-body">
          <div class="card-name">
            {{item.doctorInfo.name}}
            <div class="card-small">{{item.doctorInfo.doctorTitle}} {{item.doctorInfo.deptName}}</div>
            <van-button @click.stop="goDoctorAppointPage(item)" hairline plain size="mini" type="primary">预约</van-button>
          </div>
          <!--          <div class="card-small">评分：&#45;&#45; 预约量：&#45;&#45;</div>-->
          <div class="card-brief" v-if="item.doctorInfo.specialSkill">
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
      <div class="none-page" v-if="!doctorList.length">
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
        .then(res => {
          !this.dateList.length && (this.dateList = res.data.weekDate),
            // this.dateList = [    //时间筛选
            //   {
            //     "date": "2019-07-15",
            //     "week": "星期一"
            //   },
            //   {
            //     "date": "2019-07-16",
            //     "week": "星期二"
            //   },
            //   {
            //     "date": "2019-07-17",
            //     "week": "星期三"
            //   },
            //   {
            //     "date": "2019-07-18",
            //     "week": "星期四"
            //   },
            //   {
            //     "date": "2019-07-19",
            //     "week": "星期五"
            //   },
            //   {
            //     "date": "2019-07-20",
            //     "week": "星期六"
            //   },
            //   {
            //     "date": "2019-07-21",
            //     "week": "星期日"
            //   }
            // ]
            (this.doctorList = res.data.list)
          // this.doctorList =  [
          //   {
          //     "doctorName": "何泰樑",     //医生名称
          //     "departmentName": "普通外科", //二级科室
          //     "sourceCode": "A71DFQEOMAA0000Z",//号源编码
          //     "hospitalCode": "vpnrstbnvh",//医院id
          //     "departmentCode": "sphdorrfmxsqylfymcpc",//科室id
          //     "doctorCode": "unayuzpaar",//医生id
          //     "doctorInfo": {
          //       "doctorId": "unayuzpaar",
          //       "name": "何泰樑",
          //       "avartor": "https://devdoctor.hp.aijiayi.com/data/20190424/20190424101327jbeaxg_500_500.png",//医生头像
          //       "summary": "擅长心脑血管手术，具有丰富",//简介
          //       "specialSkill": "擅长治疗感冒发烧兔兔", //擅长
          //       "doctorTitle": "副主任医师", //职称
          //       "nethospitalId": "vpnrstbnvh", //医院id
          //       "hospitalName": "武汉市第一医院",//医院名称
          //       "deptName": "呼吸内科", //二级科室
          //       "netdeptName": "内科" //一级科室
          //     },
          //     "timeSharing": "2019-07-15",//号源日期
          //     "examinationObject": null,//对象（1，个人  2，团体  3，个人/团体）
          //     "createTime": "2019-07-15 17:17:38",//创建时间
          //     "lastmodifiedTime": "2019-07-15 17:17:38",//最后一次修改时间
          //     "bookingTotal": 20,
          //     "PM": { //下午
          //       "bookingStart": "13:00:00",//开始时间
          //       "bookingEnd": "18:00:00",//结束时间
          //       "unitPrice": 0,//单价
          //       "bookingTotal": 0,
          //       "sourceLevelType":"1"//1=普通门诊、2=专家号
          //     },
          //     "AM": {//上午
          //       "bookingStart": "07:00:00",
          //       "bookingEnd": "12:00:00",
          //       "unitPrice": '0',
          //       "bookingTotal": 5,
          //       "sourceLevelType":"2"//1=普通门诊、2=专家号
          //     }
          //   },
          //   {
          //     "doctorName": "刘熠",
          //     "departmentName": "普通外科",
          //     "sourceCode": "A71DFQ91NP80000Z",
          //     "hospitalCode": "cgdsqeyusr",
          //     "departmentCode": "uvaisvfmekodtnkdwjop",
          //     "doctorCode": "ewghekrsbm",
          //     "doctorInfo": {
          //       "doctorId": "ewghekrsbm",
          //       "name": "刘熠",
          //       "avartor": "https://devdoctor.hp.aijiayi.com/data/20190625/20190625120845hgkkli_640_640.png",
          //       "summary": "刘熠，医学博士，教授、主任医师，硕士研究生导师，儿童内科学系主任、儿童睡眠医学科主任。\n\n浙江省医学重点学科儿童睡眠医学创新学科带头人。\n中国医师协会睡眠医学专业委员会第二届委员会儿童睡眠医学组副组长，中国睡眠研究会儿童睡眠医学专业委员会第一届常务委员。\n中国医师协会毕业后医学教育儿科专业委员会副总干事，浙江省医师协会儿科医师分会第一届委员会常务委员，中华医学会浙江省儿科分会委员。\n\n曾赴奥地利格拉茨医科大学、美国路易斯威尔大学Kosair儿童医院访学。2015年获得浙江省科学技术厅科技进步奖三等奖，2011年获浙江省医药卫生科技奖三等奖，浙江省高等学校科研成果奖二等奖，温州市科学技术进步奖二等奖，国家发明专利1项，实用新型专利2项。\n\n目前主持国家自然基金、省部级和厅局级课题4项，近5年发表SCI、国家一级和省级核心期刊论文50篇。荣获2015年中国医师协会国家级“住院医师心中好老师”，温州市卫生和计划生育委员会第二届“瓯越名医”光荣称号。",
          //       "specialSkill": "儿童睡眠障碍疾病：  \n\n鼾症、阻塞性睡眠呼吸暂停综合征(包括入睡时打呼噜、鼻塞、张口呼吸、呼吸用力、睡眠不安、多汗、遗尿等)、失眠（包括入睡困难、频繁",
          //       "doctorTitle": "医师",
          //       "nethospitalId": "cgdsqeyusr",
          //       "hospitalName": "武汉九州通医院",
          //       "deptName": "普通外科",
          //       "netdeptName": "外科"
          //     },
          //     "timeSharing": "2019-07-15",
          //     "examinationObject": null,
          //     "createTime": "2019-07-15 15:37:43",
          //     "lastmodifiedTime": "2019-07-15 15:37:43",
          //     "bookingTotal": 2,
          //     "AM": {
          //       "bookingStart": "08:00:00",
          //       "bookingEnd": "11:30:00",
          //       "unitPrice": null,
          //       "sourceLevelType":"1"//1=普通门诊、2=专家号
          //     },
          //     "PM": {
          //       "bookingStart": "14:00:00",
          //       "bookingEnd": "17:30:00",
          //       "unitPrice": null,
          //       "sourceLevelType":"1"//1=普通门诊、2=专家号
          //     }
          //   }
          // ]
          // })
        })
    },
    checkTime(obj) {
      const item = this.dateList[obj.index] || {};

      if (item.disabled) {
        return
      }
      this.activeIndex = obj.index;
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
        date: new Date()
      })

      this.$router.push(`../appointDoctorSelect/${json}`)
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
  .appoint-doctor-list{
    height: 100%;
    display: flex;
    flex-direction: column;

    .scroll-x{
      /*height: 40px;*/
    }

    .content{
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
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
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

