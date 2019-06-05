<template>
  <div class="dashboard">
    <div class="dashboard-item">
      <div class="title">待办事项</div>
      <div class="content">
        <div class="card into">
          <div @click="redirect('/clinic/inquiry')" class="card-item">
            <div class="card-item-logo"></div>
            <div class="card-item-content">
              <div class="card-item-number">{{ view.source.inReferralCount }}</div>
              <div class="card-item-text">待处理患者</div>
            </div>
          </div>
          <div class="card-item row-2">
            <div @click="redirect('/clinic/inquiry')" class="row-2-item">
              <div class="row-icon"></div>
              <div class="row-text">待接诊</div>
              <div class="row-number">{{ view.source.waitInquiryCount }}</div>
            </div>
            <div @click="redirect('/clinic/inquiry')" class="row-2-item">
              <div class="row-icon"></div>
              <div class="row-text">问诊中</div>
              <div class="row-number">{{ view.source.processInquiryCount }}</div>
            </div>
          </div>
        </div>
        <div class="card out">
          <div @click="redirect('/record/transfer', { referral_type: 'in' })" class="card-item">
            <div class="card-item-logo"></div>
            <div class="card-item-content">
              <div class="card-item-number">{{ view.source.waitHandleInquiryCount }}</div>
              <div class="card-item-text">待转入患者</div>
            </div>
          </div>
        </div>
      </div>

      <br>

      <div class="content">
        <div class="card into">
          <div @click="redirect('/clinic/consultation')" class="card-item">
            <div class="card-item-logo"></div>
            <div class="card-item-content">
              <div class="card-item-number">{{ view.source.waitConsultCount }}</div>
              <div class="card-item-text">待会诊患者</div>
            </div>
          </div>
          <div class="card-item row-2">
            <div @click="redirect('/clinic/consultation')" class="row-2-item">
              <div class="row-icon"></div>
              <div class="row-text">我发起的</div>
              <div class="row-number">{{ view.source.fromConsultCount }}</div>
            </div>
            <div @click="redirect('/clinic/consultation')" class="row-2-item">
              <div class="row-icon"></div>
              <div class="row-text">我邀请的</div>
              <div class="row-number">{{ view.source.toConsultCount }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'home',

  data() {
    return {
      config: {
        api: {
          waitList: 'client/v1/Patient/waitList'
        }
      },

      view: {
        source: {}
      }
    }
  },

  created() {
    this.$http.post(this.config.api.waitList).then(res => {
      this.view.source = res.data.info
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
    margin-top: 20px;
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
  .content {
    font-size: 0;
  }
}
.card {
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
    background-image: url('~@/assets/images/icons/home/bg_green.png');
    .card-item-logo {
      background-image: url('~@/assets/images/icons/home/ic_tape processing@2x.png');
    }
  }
  &.out {
    background-image: url('~@/assets/images/icons/home/bg_blue.png');
    .card-item-logo {
      background-image: url('~@/assets/images/icons/home/ic into@2x.png');
    }
  }
  &-item {
    width: 250px;
    height: 110px;
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
      margin-left: 40px;
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
          background-image: url('~@/assets/images/icons/home/ic_wait @2x.png');
        }
      }
      .row-icon {
        width: 20px;
        height: 20px;
        background-image: url('~@/assets/images/icons/home/ic_ing@2x.png');
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
}
</style>
