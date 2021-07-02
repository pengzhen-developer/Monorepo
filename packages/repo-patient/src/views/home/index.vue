<template>
  <van-pull-refresh v-model="isLoading"
                    class="home-layout"
                    v-if="data && data.guide"
                    loosing-text=" "
                    pulling-text=" "
                    loading-text=" "
                    success-text="刷新成功"
                    @refresh="getHomeInfo">
    <div class="banner">
      <div class="banner-img"></div>
    </div>
    <!--导流-->
    <div class="guide"
         v-if="data.guide">
      <div :key="item.id"
           @click="goMenuPage(item,{type:'guide'})"
           class="guide-items"
           v-for="item in data.guide">
        <div :class="[true ? 'guide-ico' : '', item.icon]"></div>
        <div class="guide-tit">{{item.text}}</div>
        <div class="guide-small">
          <div>{{item.small}}</div>
        </div>
      </div>
    </div>

    <!--三方-->
    <div class="panel panel-block panel-clear">
      <div :id="item.id"
           :key="item.id"
           :type="item.id"
           @click="goMenuPage(item,{type:item.id})"
           class="block-items"
           v-for="item in data.card">
        <div :class="['block-items-card', item.icon, item.id == 'appoint' || item.status ? '' : 'disabled']">
          {{item.text}}</div>
      </div>
    </div>
    <div class="panel flex"
         style="padding-top: 0;padding-bottom:0">
      <div @click="goMenuPage('',{type:'userDoctor'})"
           class="card-simple icon_01_01_11"
           type="userDoctor">
        <div class="card-tit">我的医生</div>
        <div class="card-brief">便捷查找您的医生</div>
      </div>
      <div @click="goMenuPage('',{type:'userConsult'})"
           class="card-simple icon_01_01_12"
           type="userConsult">
        <div class="card-tit">我的问诊</div>
        <div class="card-brief">个人问诊详情管理</div>
      </div>
    </div>
    <DepartPage :items="data.department"
                :max="7"
                :moreIcon="data.moreIcon"></DepartPage>
    <van-cell @click="goMenuPage({},{type:'crowdLists'})"
              is-link
              value="常见人群" />
    <Humens :data="data.crowdListsDisease"
            :items="data.crowdLists"
            :max="3"
            :isHome="true"
            style="padding-bottom:10px"></Humens>
    <van-cell @click="goMenuPage(data.recommendOrgan,{type:'recommendHsp'})"
              :is-link="data.recommendOrgan.length>2"
              value="推荐互联网医院" />
    <HspPage :items="data.recommendOrgan"
             :max="2"
             :isHome="true"
             v-if="data.recommendOrgan.length>0"></HspPage>
  </van-pull-refresh>
</template>

<script>
import peace from '@src/library'
import HspPage from '@src/views/hospital/HospitalList'
import Humens from '@src/views/diagnose/select/diagnoseSelectHumen'
import DepartPage from '@src/views/hospital/depart/HospitalDepartList'

import Vue from 'vue'
import { PullRefresh } from 'vant'

Vue.use(PullRefresh)

export default {
  components: {
    HspPage,
    DepartPage,
    Humens
  },
  data() {
    return {
      data: {},
      isLoading: false
    }
  },

  activated() {
    this.getHomeInfo()
  },

  created() {},

  mounted() {
    // // 微信环境授权
    // if (this.$route.query.code) {
    //   let code = this.$route.query.code;
    //   let params = {code};
    //   peace.service.login.getOPenIdByCode(params).then(res => {
    //     console.log(res);
    //   });
    // }
  },
  methods: {
    getHomeInfo() {
      peace.service.index.getMenu().then((res) => {
        this.data = res.data
        this.isLoading = false
      })
    },
    goMenuPage(item, data) {
      //可预约的医院小于3则不跳转
      if (data.type == 'recommendHsp' && item.length < 3) {
        return
      }
      let json
      let serviceType = item.id == 'againInquiry' ? 'returnVisit' : 'inquiry'
      switch (data.type) {
        case 'guide':
          json = peace.util.encode({ doctorTag: item.id, serviceType })
          this.$router.push(`/components/doctorList/${json}`)
          break
        case 'appoint':
        case 'recommendHsp':
          // 开通预约的医院列表
          json = peace.util.encode({ doctorTag: item.id, type: data.type })
          this.$router.push(`/hospital/HospitalList/${json}`)
          break
        case 'userDoctor':
          this.$router.push(`/setting/userDoctorlist`)
          break
        case 'userConsult':
          this.$router.push('/setting/userConsultList')
          break
        case 'record':
          json = peace.util.encode({ date: new Date() })
          this.$router.push(`/record/recordCondition/${json}`)
          break
        case 'default':
          json = peace.util.encode({ date: new Date() })
          this.$router.push(`/diagnose/select/diagnoseSelectBody/${json}`)
          break
        case 'crowdLists':
          json = peace.util.encode({ date: new Date() })
          this.$router.push(`/diagnose/select/diagnoseSelectHumen/${json}`)
          break
        default:
          peace.util.alert('暂未开放')
          // _f.goMenuPage();
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.home-layout {
  min-height: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
}

.banner {
  width: 100%;
  height: 135.5px;
  background-color: #e5e5e5;
}
.guide {
  border-radius: 0.4rem;
  margin: -1rem 0.42667rem 0.13333rem 0.42667rem;
  box-shadow: 0 0.05333rem 0.13333rem #efefef;
  display: flex;
  background: #fff;
  .guide-items {
    flex: 1;
    font-size: inherit;
    padding: 17px 12px 10px 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .guide-ico {
      width: 28px;
      height: 28px;
      background-color: #fff;
      position: relative;
      display: block;
      &::before {
        content: '';
        position: absolute;
        width: 30px;
        height: 30px;
        background-size: cover;
      }
    }
    .guide-tit {
      font-size: 16px;
      line-height: 22.5px;
      color: #000;
      font-family: PingFang SC;
      margin: 12.5px 0 2.5px 0;
    }
    .guide-small {
      position: relative;
      width: 100%;
      height: 15px;
      div {
        left: 0;
        top: 0;
        position: absolute;
        font-size: 22px;
        color: #999;
        font-family: PingFang SC;
        width: 250%;
        transform: scale(0.5) translate(-50%, -50%);
      }
    }
  }
}
.panel {
  position: relative;
  box-sizing: border-box;
  background-color: #fff;
  margin: 0;
  padding: 10px 16px;
  border-radius: 0;
  font-size: 15px;
  border-bottom: 0;

  &.panel-home {
    box-shadow: none;
    margin: 0;
    padding: 0;
  }
  &.panel-clear {
    box-shadow: none !important;
  }

  &.panel-block {
    display: flex;
    box-shadow: 0 2px 5px #efefef;

    .block-items-card {
      color: #fff;
      font-size: 13px;
      min-height: 45px;
      min-width: 75px;
    }

    .block-items-card {
      width: 100%;
      height: 100%;
      background-size: cover;
      text-align: center;
      line-height: 43px;
      border-radius: 5px;

      &.disabled {
        position: relative;

        &::before {
          content: '';
          position: absolute;
          display: block;
          width: 31.5px;
          height: 25.5px;
          background-image: url('../../assets/images/wait-open.jpg');
          background-repeat: no-repeat;
          background-size: cover;
          top: 0;
          left: 0;
        }
      }
    }

    .block-items {
      flex: 1 1 100%;
      font-size: inherit;
      padding: 5px 5px;
      justify-content: center;
      &:first-child {
        padding-left: 0;
      }
      &:last-child {
        padding-right: 0;
      }
      .block-tit {
        text-align: center;
        font-size: 16px;
        color: #000;
      }

      .block-small {
        font-size: 11px;
        color: #999;
      }

      .block-ico {
        width: 28px;
        height: 28px;
        margin: 5px auto;
        background-color: #fff;
        position: relative;
        display: block;

        &::before {
          content: '';
          position: absolute;
          width: 30px;
          height: 30px;
          background-size: cover;
        }
      }

      .block-small {
        text-align: center;
      }
    }
  }

  &.panel-block-m {
    border-radius: 15px;
    margin: -45px 16px 5px 16px;
  }

  .panel-tit {
    font-size: 18px;
    font-weight: 600;
    color: #000;
    margin-bottom: 10px;
    font-size: 16px;
    position: relative;

    &.tit-more::after {
      content: '';
      position: absolute;
      display: inline-block;
      top: 5px;
      right: -5px;
      width: 15px;
      height: 15px;
      background-image: url('../../assets/images/tit-more.jpg');
      background-size: 7.5px;
      background-repeat: no-repeat;
    }
  }

  .panel-bottom {
    border-top: 1px solid #e8e8e8;
    padding: 10px 0;
    font-size: 13px;
    color: #999;
  }
}

.flex {
  display: flex;

  .card-simple {
    position: relative;
    padding: 0 10px;
    padding-left: 45px;
    flex: 1;
    margin: 10px;

    &::before {
      content: '';
      display: inline-block;
      position: absolute;
      margin-left: -42.5px;
      width: 35px;
      height: 35px;
      background-size: cover;
    }

    &:first-child {
      margin-right: 0;
      padding-right: 20px;
      border-right: 1px solid #dedede;
    }

    .card-tit {
      font-size: 13px;
      color: #000;
      font-weight: 600;
      display: block;
    }

    .card-brief {
      font-size: 11px;
      padding-top: 2.5px;
      color: #999;
    }
  }
}

.van-hairline--top-bottom::after {
  border: none;
}
.van-cell {
  border-top: 10px solid #f5f5f5;
  font-size: 18px;
  line-height: 18px;
  padding: 16px;
}
::v-deep .van-cell__value--alone {
  display: flex;
  align-items: center;
  color: #333;
}
.van-cell:not(:last-child)::after {
  content: '';
  border: none;
}
</style>
