<template>
  <div>
    <div v-if="hsp.nethospitalInfo">
      <!--医院卡片-->
      <div :nethospitalid="hsp.nethospitalInfo.netHospitalId" class="card cards">
        <div class="card-avatar">
          <img :src="hsp.nethospitalInfo.icon" class />
        </div>
        <div class="card-body">
          <div class="card-name">{{hsp.nethospitalInfo.name}}</div>
          <div class="block">
            <div :key="index" class="card-small" v-for="(item,index) in hsp.nethospitalInfo.deptList">
              <template v-if="hsp.nethospitalInfo.deptList">{{ (index == 0 ? '' : ' / ' ) + item}}</template>
            </div>
          </div>
          <div class="block">
            <div :key="item" class="card-label" v-for="item in hsp.nethospitalInfo.tags">
              <template v-if="hsp.nethospitalInfo.tags">{{item}}</template>
            </div>
          </div>
        </div>
      </div>
      <!---->
      <div class="card-brief" v-if="hsp.nethospitalInfo.phoneNumber || hsp.nethospitalInfo.address">
        <div class="dl npb">
          <div class="dt">电话：</div>
          <div :class="['dd', hsp.nethospitalInfo.phoneNumber ? 'blue': '']">
            {{hsp.nethospitalInfo.phoneNumber || '暂无'}}
            <!--            <div @click="goSummaryPage" class="label blue mr" v-if="hsp.nethospitalInfo.brief">医院简介</div>-->
          </div>
        </div>
        <div class="dl pb">
          <div class="dt">地址：</div>
          <div class="dd pdr">{{hsp.nethospitalInfo.address || '暂无'}}</div>
        </div>
      </div>
      <!--            <div class="card-brief bt" v-if="hsp.notices && hsp.notices.length">-->
      <!--                <div class="dl">-->
      <!--                    <div class="dt">-->
      <!--                        <div class="icon icon-horn"></div>-->
      <!--                    </div>-->
      <!--                    <div class="dd dh" style="font-size: 11px">-->
      <!--                        {{hsp.notices[0]}}-->
      <!--                    </div>-->
      <!--                    <div class="other label blue "-->
      <!--                          style="font-size: 11px"-->
      <!--                          @click="">全部-->
      <!--                    </div>-->
      <!--                </div>-->
      <!--            </div>-->
      <van-notice-bar background="#fff" color="#999" left-icon="volume-o" v-if="hsp.notices[0]">{{hsp.notices[0].content}}</van-notice-bar>
      <!---->
      <!--业务-->
      <div class="panel panel-block panel-block-s" style="margin-top: 0;padding-left: 10px">
        <div
          :key="item.id"
          @click="goMenuPage(item,{nethospitalInfo:hsp.nethospitalInfo})"
          class="block-items"
          data-hspname="hsp.nethospitalInfo.name"
          data-id="item.id"
          data-nethospitalid="hsp.nethospitalInfo.netHospitalId"
          data-status="item.status"
          data-text="item.text"
          v-for="item in hsp.guide"
        >
          <div
            :class="['block-ico',item.icon, item.status ? '' : 'disabled', item.id == 'appointment' && hsp.nethospitalInfo.isOpenRegister == 1 ? 'disabled' : ''
]"
          ></div>
          <div class="block-tit">{{item.text}}</div>
        </div>
      </div>

      <!--科室-->
      <div class="panel" style="padding-right:0; padding-bottom: 6px; " v-if="hsp.deptList && hsp.deptList[0]">
        <div class="panel-tit">
          <div class="tit">医院科室</div>
        </div>
        <div class="panel-body">
          <div
            :key="index"
            @click="goDoctorListPage(item)"
            class="label"
            data-id="item.id"
            data-name="item.netdeptName"
            v-for="(item,index) in hsp.oneDeptList"
            v-if="index <  7"
          >
            {{item.netdeptName}}
          </div>
          <div @click="goDeptPage({id:'consult'})" class="label" v-if="hsp.deptList.length > 7">更多</div>
        </div>
      </div>

      <!--医生-->
      <div class="panel" style="border-top:10px solid #f5f5f5" v-if="hsp.doctorList.length">
        <div class="panel-tit" style="padding-bottom: 0">
          <div class="tit">医院医生</div>
        </div>
        <div class="panel-body">
          <div :key="item.id" @click="goDoctorHomeIndexPage(item)" class="card" data-doctorid="item.doctorId" data-index="index" v-for="item in hsp.doctorList">
            <div class="card-avatar avatar-circular">
              <img :src="item.avartor" class />
            </div>
            <div class="card-body">
              <div class="card-name">
                {{item.name}}
                <div class="card-small">{{item.doctorTitle}}
                  <div :class="['tag', 'tag-'+it]" v-for="(it, i) in item.serviceList" :key="i">
                    {{it == 'image' || it == 'video' ? '问' : it =='prvivateDoctor' ? '服务包' : it == 'register' ? '号' : ''}}
                  </div>
                </div>
              </div>
              <div class="card-small">{{item.nethospitalName}} {{item.deptName}}</div>
              <div class="card-brief" v-if="item.specialSkill">
                <div class="span s">擅长：</div>
                <div class="span xl">{{item.specialSkill}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import peace from '@src/library'

export default {
  data() {
    return {
      hsp: {}
    }
  },
  created() {
    let params = peace.util.decode($peace.$route.params.json)
    console.log(params)
    peace.service.hospital
      .getHospitalInfo({
        nethospitalId: params.netHospitalId
      })
      .then(res => {
        this.hsp = res.data
      })
  },
  methods: {
    goSummaryPage() {
      // coding
    },
    goMenuPage(item) {
      console.log(item)
      if (!item.status || (item.id == 'appointment' && this.hsp.nethospitalInfo.isOpenRegister == 1)) {
        peace.util.alert('服务暂未开通')
        return
      }
      if (item.id == 'physical') {
        let json = peace.util.encode({
          hsp:{
            netHospitalId: this.hsp.nethospitalInfo.netHospitalId,
            hospitalName: this.hsp.nethospitalInfo.name
          },
          banHsp: true,
          date: new Date()
        })

        this.$router.push(`/record/recordCondition/${json}`)
        return
      }
      if (item.id == 'appointment' && this.hsp.nethospitalInfo.isOpenRegister == 2) {
        this.goDeptPage(item)
      }
    },
    // 咨询业务医生列表入口
    goDoctorListPage(item) {
      let json = peace.util.encode({
        netHospitalId: this.hsp.nethospitalInfo.netHospitalId,
        level: 1,
        txt: item.netdeptName,
        txtId: item.id
      })

      this.$router.push(`/components/doctorList/${json}`)
      // this.$router.push(`/appoint/doctor/appointDoctorList/${json}`)
    },
    goDeptPage(item) {
      let json = peace.util.encode({ netHospitalId: this.hsp.nethospitalInfo.netHospitalId, id: item.id, Date: new Date() })
      this.$router.push(`/hospital/depart/hospitalDepartSelect/${json}`)
    },
    goDoctorHomeIndexPage(item) {
      const json = peace.util.encode({ doctorId: item.doctorId })

      this.$router.push(`/components/doctorDetail/${json}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.cards {
  background-color: #fff;
  margin: 0;
}

.card-brief {
  /*padding: (20px*0.5) (30px*0.5);*/
  background-color: #fff;
}

.card-brief .dl {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  justify-content: center;

  font-size: (26px * 0.5);
  color: #000;
  padding: (20px * 0.5) (30px * 0.5);
}

.card-brief .dt {
  flex: 0 0 auto;
  width: (90px * 0.5);
  color: #000;
}

.card-brief .dd {
  flex: 1 1 auto;
  position: relative;
  width: (200px * 0.5);
  color: #999;
}
.dd.pdr {
  padding-right: (30px * 0.5);
}

.card-brief .dd .label {
  float: right;
}

.card-brief .dl.bt {
  padding-bottom: 0;
}

.bt {
  border-top: (2px * 0.5) solid #e8e8e8;
}

.other {
  flex: 0 0 auto;
  width: (80px * 0.5);
  border: 0;
  text-align: right;
  padding: 0;
}

.dh {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dd .labels {
  display: inline-block;
}

.blue,
.card-brief .blue {
  color: #00ccb3;
}
.panel.panel-block-s {
  padding: (20px * 0.5) (30px * 0.5);
  border-bottom: 10px solid #f5f5f5;
  border-top: 10px solid #f5f5f5;
}

.panel.panel-block-s .block-items .block-tit {
  font-size: (26px * 0.5);
  line-height: 1.5;
  text-align: center;
}
.block-ico.disabled {
  position: relative;
}
.block-ico.disabled::after {
  content: '';
  display: block;
  position: absolute;
  width: (68px * 0.5);
  height: (56px * 0.5);
  top: -(13px * 0.5);
  right: -(27px * 0.5);
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url('data:image/png;base64,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');
}
.block-items .block-ico {
  display: block;
  margin: (15px * 0.5) auto;
}
/*card*/
.card {
  margin: 0 auto;
}

.card {
  padding: (15px * 0.5) (10px * 0.5);
  border-bottom: 1px solid #dedede;
}

.card-brief {
  color: #999;
}

.cards .card-avatar {
  width: (120px * 0.5);
  height: (120px * 0.5);
  img{
    width: 100%;
    height: 100%;
    background-size: cover;
  }
}

/*.cards .card-avatar{*/
/*margin-top: (20px*0.5);*/
/*}*/
.cards .card-small {
  color: #999;
  margin-bottom: (16px * 0.5);
}

.cards .block {
  margin-bottom: (16px * 0.5);
}

.mg {
  padding-left: 0;
  padding-right: 0;
  padding-bottom: 0;
}

.mg .panel-tit {
  margin-left: (30px * 0.5);
  margin-right: (30px * 0.5);
}

.mg .cards {
  padding: (20px * 0.5);
}

.card .card-brief,
.card .p-small {
  display: flex;
  align-items: baseline;
  line-height: 1.3;
  font-size: (26px * 0.5);
  padding: (14px * 0.5) 0;
}

.card .card-small,
.card .card-brief {
  /*line-height: 1.3;*/
}

.card-brief {
}

.card-brief,
.p-small {
  display: 1;
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
  word-wrap: break-word;
  white-space: pre-wrap;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  max-height: (64px * 0.5);
}

.card-brief .npb {
  padding-bottom: 0;
}

.card-brief .pb {
  padding-top: (10px * 0.5);
}

.label {
  border-radius: (10px * 0.5);
  margin-left: (10px * 0.5);
}

.mr {
  margin-right: 0;
}
.panel {
  padding: 0;
}
.panel .panel-tit {
  padding: (20px * 0.5) (30px * 0.5);
  margin: 0 (30px * 0.5) 0 0;
}
.panel .panel-tit.tit-more::after {
  content: '';
  top: (25px * 0.5);
}
.panel-body {
  overflow: hidden;
}
.panel-body .label {
  box-sizing: border-box;
  width: (150px * 0.5);
  height: (53px * 0.5);
  border: (2px * 0.5) solid #dfdfdf;
  border-radius: (4px * 0.5);
  background-color: #f4f4f4;
  text-align: center;
  padding: (6px * 0.5);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: (10px * 0.5);
  font-size: (26px * 0.5);
  margin: (0px * 0.5) (0px * 0.5) (20px * 0.5) (30px * 0.5);
}
.icon-horn {
  width: (32px * 0.5);
  height: (32px * 0.5);
  margin-left: (15px * 0.5);
  margin-top: -(10px * 0.5);
}

.panel.panel-block {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  flex-wrap: wrap;
  -webkit-flex-wrap: wrap;
  -webkit-box-lines: multiple;
  -moz-flex-wrap: wrap;
}

.panel.panel-block .block-items {
  flex: 0 1 25%;
  font-size: inherit;
  padding: (10px * 0.5) (10px * 0.5);
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.dd.icon-next::before {
  content: '';
  position: absolute;
  display: inline-block;
  right: (0px * 0.5);
  top: (6px * 0.5);
  width: (14px * 0.5);
  height: (24px * 0.5);
  background-size: cover;
}
.van-notice-bar {
  border-top: 1px solid #e8e8e8;
  font-size: 12px;
  .van-icon {
    margin-right: 25px;
  }
}
</style>