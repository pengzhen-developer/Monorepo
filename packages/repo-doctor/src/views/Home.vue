<template>
  <div class="dashboard">
    <div class="dashboard-item">
      <div class="title">待办事项</div>
      <div class="content">
        <el-row :gutter="40">
          <el-col :span="12">
            <div style="margin: 0 0 10px 0">问诊</div>
            <div class="card into">
              <div @click="redirect('/clinic/inquiry')" class="card-item card-item-half">
                <div class="card-item-logo"></div>
                <div class="card-item-content">
                  <div class="card-item-number">{{ viewModel.waitHandleInquiryCount }}</div>
                  <div class="card-item-text">待处理患者</div>
                </div>
              </div>
              <div class="card-item card-item-half row-2">
                <div @click="redirect('/clinic/inquiry')" class="row-2-item">
                  <div class="row-icon"></div>
                  <div class="row-text">待接诊</div>
                  <div class="row-number">{{ viewModel.waitInquiryCount }}</div>
                </div>
                <div @click="redirect('/clinic/inquiry')" class="row-2-item">
                  <div class="row-icon"></div>
                  <div class="row-text">问诊中</div>
                  <div class="row-number">{{ viewModel.processInquiryCount }}</div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div style="margin: 0 0 10px 0">会诊</div>
            <div class="card consultation">
              <div @click="redirect('/clinic/consultation')" class="card-item card-item-half">
                <div class="card-item-logo"></div>
                <div class="card-item-content">
                  <div class="card-item-number">{{ viewModel.waitConsultCount }}</div>
                  <div class="card-item-text">待会诊患者</div>
                </div>
              </div>
              <div class="card-item card-item-half row-2">
                <div @click="redirect('/clinic/consultation')" class="row-2-item">
                  <div class="row-icon"></div>
                  <div class="row-text">我发起</div>
                  <div class="row-number">{{ viewModel.fromConsultCount }}</div>
                </div>
                <div @click="redirect('/clinic/consultation')" class="row-2-item">
                  <div class="row-icon1"></div>
                  <div class="row-text">邀请我</div>
                  <div class="row-number">{{ viewModel.toConsultCount }}</div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :span="6">
            <div style="margin: 0 0 10px 0">双向转诊</div>
            <div class="card out">
              <div @click="redirect('/record/transfer', { referral_type: 'in' })" class="card-item">
                <div class="card-item-logo"></div>
                <div class="card-item-content">
                  <div class="card-item-number">{{ viewModel.inReferralCount }}</div>
                  <div class="card-item-text">待转入患者</div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div style="margin: 0 0 10px 0">私人医生</div>
            <div class="card private-doctor">
              <div @click="redirect('/patient/privateDoctor')" class="card-item">
                <div class="card-item-logo"></div>
                <div class="card-item-content">
                  <div class="card-item-number">{{ viewModel.waitHandlePrivateDoctorCount }}</div>
                  <div class="card-item-text">待接单患者</div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import service from '@src/service'

export default {
  name: 'home',

  data() {
    return {
      viewModel: {}
    }
  },

  created() {
    service.patient.waitList().then(res => {
      this.viewModel = res.data.info
    })
  },

  methods: {
    redirect(name, params) {
      if (params) {
        this.$router.push({ name, params })
      } else {
        this.$router.push(name)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.dashboard {
  padding: 10px 20px;
  &-item {
    margin-top: 0;
  }
  .title {
    width: 64px;
    height: 22px;
    font-size: 16px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    line-height: 22px;
    margin-bottom: 15px;
  }
}
.card {
  width: 100%;
  margin: 0 0 10px 0;
  font-size: 14px;
  border-radius: 4px;
  display: inline-block;
  overflow: hidden;
  background-size: cover;
  background-repeat: no-repeat;
  & + .card {
    margin-left: 20px;
  }
  &.into {
    background-image: url('~@src/assets/images/home/bg_green.png');
    .card-item-logo {
      background-image: url('~@src/assets/images/home/ic_tape processing@2x.png');
    }
  }
  &.out {
    background-image: url('~@src/assets/images/home/bg_blue.png');
    .card-item-logo {
      background-image: url('~@src/assets/images/home/ic into@2x.png');
    }
  }
  &.consultation {
    background-image: url('~@src/assets/images/home/bg_green_high@2x.png');
    .card-item-logo {
      background-image: url('~@src/assets/images/home/computer.png');
    }

    .row-icon {
      width: 20px;
      height: 20px;
      background-image: url('~@src/assets/images/home/shenqing@2x.png') !important;
      background-repeat: no-repeat;
      background-size: cover;
    }

    .row-icon1 {
      width: 20px;
      height: 20px;
      background-image: url('~@src/assets/images/home/yaoqingjiangli@2x.png') !important;
      background-repeat: no-repeat;
      background-size: cover;
    }
  }
  &.private-doctor {
    background-image: url('~@src/assets/images/home/bg_green@2x.png');
    .card-item-logo {
      background-image: url('~@src/assets/images/home/ic_doctor@2x.png');
    }

    .row-icon {
      width: 20px;
      height: 20px;
      background-image: url('~@src/assets/images/home/shenqing@2x.png') !important;
      background-repeat: no-repeat;
      background-size: cover;
    }

    .row-icon1 {
      width: 20px;
      height: 20px;
      background-image: url('~@src/assets/images/home/yaoqingjiangli@2x.png') !important;
      background-repeat: no-repeat;
      background-size: cover;
    }
  }

  &-item {
    width: 100%;
    height: 130px;
    color: #fff;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    vertical-align: top;
    cursor: pointer;

    &-logo {
      width: 46px;
      height: 46px;
      background-size: cover;
      background-repeat: no-repeat;
    }
    &-content {
      margin-left: 50px;
      text-align: center;
    }
    &-number {
      font-size: 38px;
      line-height: 52px;
      color: #fff;

      text-decoration: none;
    }
    &-text {
      margin-top: 5px;
      line-height: 22px;
      font-size: 14px;
    }
  }
  .row-2 {
    flex-wrap: wrap;
    border-left: 1px solid rgba(239, 239, 239, 0.4);
    &-item {
      padding-left: 30px;
      width: 100%;
      height: 50%;
      border-top: 1px solid rgba(239, 239, 239, 0.4);
      display: flex;
      align-items: center;
      &:first-of-type {
        border-top: 0;
        .row-icon {
          background-image: url('~@src/assets/images/home/ic_wait @2x.png');
        }
      }
      .row-icon {
        width: 20px;
        height: 20px;
        background-image: url('~@src/assets/images/home/ic_ing@2x.png');
        background-repeat: no-repeat;
        background-size: cover;
      }
      .row-text {
        margin-left: 35px;
        margin-right: 20px;
      }
      .row-number {
        text-align: center;
        font-size: 30px;
        color: #fff;

        text-decoration: none;
      }
    }
  }

  .card-item-half {
    width: 50%;
  }
}
</style>
