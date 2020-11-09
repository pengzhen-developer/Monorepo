<template>
  <div style="min-height: 100%;">
    <template v-if="$peace.cache.get($peace.type.USER.INFO)">
      <div :class="['the-recipe-list', internalData && internalData.length ? 'bg' : '']">
        <div :data-index="index"
             :key="index"
             @click="goprescripDetailPage(item)"
             class="word-list"
             v-for="(item, index) in internalData">
          <div class="tag-new"
               v-if="item.isRead=='off'"><span>新</span></div>
          <div style="display:flex;">
            <div class="word-avatar">
              <div class="icon"></div>
            </div>
            <div class="word-body">
              <div class="word-title">
                <div class="title">{{item.patientName}}的处方</div>
                <div :class="{ [`label-${item.prescriptionStatus.key}${item.orderDrugStatuskey?item.orderDrugStatuskey:''}`] : true }"
                     class="label label-default"
                     v-if="item.prescriptionStatus&&item.orderDrugStatus">{{item.orderDrugStatus}}
                </div>
              </div>
              <div class="word-inline">
                <div class="span">{{item.hospitalName}}</div>
                <div class="space">
                  <span>{{item.deptName}} </span>
                  <span>{{item.date}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="word-bottom"
               v-if="item.prescriptionStatus&&item.prescriptionStatus.reminderTxt">
            <van-image width="14px"
                       height="14px"
                       :src="require('@src/assets/images/warn.png')"></van-image>
            <span>{{item.prescriptionStatus.reminderTxt}}</span>
          </div>
        </div>
        <div class="tips-bottom"
             v-if="internalData && internalData.length">
          <div>为确保广大患者的用药安全，请注意：</div>
          <div>1. 医生开具处方，药师进行审核，审核通过的处方才可以购药。</div>
          <div>2. 处方24小时有效，处方失效后不可作为购药凭证购药。</div>
          <div>3. 仅限通过平台认证的药店配送，自行下载处方或截屏购药不具有效力。</div>
        </div>
        <div class="none-page"
             v-if="loaded && internalData.length == 0">
          <div class="icon icon_none_prescrip"></div>
          <div class="none-text">
            <div>暂无可用处方</div>
            <div>如有用药需求请先在线复诊续方</div>
          </div>
          <!-- <van-button type='primary' @click="gotoDoctorList">在线复诊</van-button> -->
        </div>

        <peace-dialog :visible.sync="recipeDetail.visible"
                      title="处方详情">
          <TheRecipe :data="recipeDetail.data"></TheRecipe>
        </peace-dialog>
      </div>
    </template>
    <template v-else>
      <div style="display: flex; flex-direction: column; height: 100%; background: #F8FDFD; justify-content: center; align-items: center;">
        <div style="flex: 1; padding: 30px 16px 0 16px; overflow: auto">
          <h4 style="font-size: 16px; color: rgba(0,198,174,1); line-height: 22px; margin: 0 0 10px 0; text-align: center;">
            登录后即可查看医生为您开具的处方、快捷取药</h4>
          <img src="@src/assets/images/no-login.png">
        </div>
        <div style="padding: 16px; height: 100px; width: 100%; ">
          <van-button style="width: 100%; height: 50px; font-size: 16px;"
                      @click="toLogin()"
                      type="primary">立即登录</van-button>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import peace from '@src/library'

import TheRecipe from '@src/views/components/TheRecipe'
import { Dialog } from 'vant'
const ENUM = {
  //处方购药状态 0."已预审",1."待审核", 2."质疑中", 3."未通过", 4."已作废",5."已通过"
  ORDER_DRUG_STATUS: {
    待购药: 1,
    已下单: 2,
    已购药: 3,
    已失效: 4
  },
  // prescription_status  新处方状态   0."已预审",1."待审核", 2."质疑中", 3."未通过", 4."已作废",5."已通过"
  PRESCRIPTION_STATUS: {
    已预审: 0,
    待审核: 1,
    质疑中: 2,
    未通过: 3,
    已作废: 4,
    已通过: 5
  }
}

export default {
  components: {
    TheRecipe
  },

  props: {
    data: {
      type: Array,
      default() {
        return undefined
      }
    }
  },

  data() {
    return {
      loaded: false,
      internalData: undefined,

      recipeDetail: {
        visible: false,
        data: {}
      },

      ENUM
    }
  },

  watch: {
    data: {
      handler() {
        this.internalData = this.data
      },
      immediate: true
    }
  },

  activated() {
    if ($peace.cache.get($peace.type.USER.INFO)) {
      if (!this.data) {
        this.get()
      }
    }
  },

  methods: {
    get() {
      const params = peace.util.decode(this.$route.params.json)

      peace.service.patient.getMyPrescripList(params).then((res) => {
        this.internalData = res.data
        this.loaded = true
      })
    },

    goprescripDetailPage(item) {
      if (item?.prescriptionStatus?.key == this.ENUM.PRESCRIPTION_STATUS.已作废 || item?.prescriptionStatus?.key == this.ENUM.PRESCRIPTION_STATUS.未通过) {
        return Dialog.confirm({
          title: '温馨提示',
          message: '该处方已作废被回收，请查看其他处方',
          onfirmButtonText: '确定',
          showCancelButton: false
        })
      }
      const params = peace.util.encode({
        prescribeId: item.prescribeId
      })

      this.$router.push(`/components/theRecipe/${params}`)
    },

    toLogin() {
      $peace.referrer = this.$route
      this.$router.push(peace.config.system.loginPage)
    }
    // gotoDoctorList(){
    //   this.$router.push(`/components/doctorList`)
    // }
  }
}
</script>

<style lang="scss" scoped>
.the-recipe-list {
  min-height: 100%;
  height: 100%;
  padding: 15px;
  &.bg {
    background: #f9f9f9;
  }
  .word-list {
    position: relative;
    background: #fff;
    overflow: hidden;
    margin: 0 0 15px 0;
    box-shadow: 0px 1px 8px 0px rgba(221, 221, 221, 0.5);
    // display: flex;
    border-radius: 4px;
  }
  .word-list::after {
    content: '';
    width: 20px;
    height: 20px;
    border-radius: 20px 0 0 20px;
    right: -10px;
    top: 35px;
    position: absolute;
    display: block;
    background: #f0f0f0;
    box-shadow: 1px 0 0 #dedede inset;
  }
  .word-list.new::before {
    content: '';
    color: #fff;
    position: absolute;
    font-size: 12px;
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: red;
    right: -4px;
    top: -4px;
  }
  .word-list .icon {
    margin-top: 10px;
  }
  .word-list .icon::before {
    content: '';
    width: 25px;
    height: 30px;
    background-image: url('../../assets/images/word-list.jpg');
  }
  .word-list .word-avatar {
    flex: 0 0 auto;
    width: 55px;
    padding: 15px;
    position: relative;
    box-sizing: border-box;
  }
  .word-list .word-body {
    padding: 10px 25px 10px 0;
    flex: 1;
  }
  .word-list .word-inline,
  .word-list .word-title {
    width: 100%;
    display: flex;
    position: relative;
  }
  .word-title .title {
    flex: 1;
    font-size: 16px;
    margin-bottom: 10px;

    color: #000000;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .word-title .label {
    flex: initial;
    width: 50px;
    height: 22px;
    margin-right: 8px;
    border: 0;
    border-radius: 2px;
    text-align: center;
    line-height: normal;
  }
  .tag-new {
    width: 39px;
    height: 27px;
    color: #fff;
    // padding:3.5px;
    display: flex;
    justify-content: flex-end;
    line-height: 1;
    font-size: 11px;
    position: absolute;
    right: 0;
    top: 0;
    justify-content: flex-end;
    background: linear-gradient(212deg, rgba(242, 34, 59, 1) 0, rgba(242, 34, 59, 1) 50%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 1) 100%);
    span {
      height: 18px;
      width: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .word-list .word-inline {
    font-size: 12px;

    display: flex;
    flex-direction: column;

    border-top: 1px solid #dedede;
    padding-top: 10px;

    .space {
      display: flex;
      justify-content: space-between;
      color: #999999;
    }
  }
  .word-inline .span {
    font-size: 12px;
    color: #999;
    flex: 1 1 auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .word-bottom {
    padding: 5px 15px;
    background: #fffbe6;
    border-radius: 0px 0px 2px 2px;
    display: flex;
    align-items: center;
    span {
      font-size: 12px;
      color: #fa8c16;
      margin-left: 12px;
    }
  }
  .span.s {
    max-width: 125px;
    text-align: right;
  }
  .span.g {
    width: 75px;
    text-align: right;
  }
  /* 处方状态 0."已预审",1."待审核", 2."质疑中", 3."未通过", 4."已作废",5."已通过"
处方购药状态 1."待购药",2."已下单", 3."已购药", 4."已失效" */
  .label-default,
  .label-2,
  .label-3,
  .label-4,
  .label-54 {
    background: #e5e5e5;
    color: #999;
  }

  .label-red,
  .label-51 {
    background: #f2223b;
    color: #fff;
  }

  .label-blue,
  .label-0,
  .label-1,
  .label-2,
  .label-52,
  .label-53 {
    background: #00c6ae;
    color: #fff;
  }
  .tips-bottom {
    line-height: 1.7;
    text-align: justify;
  }
}
</style>
