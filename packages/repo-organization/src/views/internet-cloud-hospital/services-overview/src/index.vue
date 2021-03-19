<template>
  <div class="dashboard">
    <div class="dashboard-item">
      <div class="title">待办事项</div>
      <div class="content">
        <div @click="$router.push({ path: '/internet-cloud-hospital/referral-center/referral-in' })"
             class="card into">
          <div class="card-item">
            <div class="card-item-logo"></div>
            <div class="card-item-content">
              <div class="card-item-number">{{ data.inReferralCount }}</div>
              <div class="card-item-text">转诊转入审核</div>
            </div>
          </div>
        </div>
        <div @click="$router.push({ path: '/internet-cloud-hospital/referral-center/referral-out' })"
             class="card out">
          <div class="card-item">
            <div class="card-item-logo"></div>
            <div class="card-item-content">
              <div class="card-item-number">{{ data.outReferralCount }}</div>
              <div class="card-item-text">转诊转出审核</div>
            </div>
          </div>
        </div>
        <div @click="$router.push({ path: '/internet-cloud-hospital/consultation-center/consultation-launch' })"
             class="card apply">
          <div class="card-item">
            <div class="card-item-logo"></div>
            <div class="card-item-content">
              <div class="card-item-number">{{ data.fromConsultCount }}</div>
              <div class="card-item-text">会诊申请审核</div>
            </div>
          </div>
        </div>
        <div @click="$router.push({ path: '/internet-cloud-hospital/consultation-center/consultation-launch' })"
             class="card invite">
          <div class="card-item">
            <div class="card-item-logo"></div>
            <div class="card-item-content">
              <div class="card-item-number">{{ data.toConsultCount }}</div>
              <div class="card-item-text">会诊邀请审核</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Service from './service'

export default {
  name: 'ServicesOverview',
  data() {
    return {
      data: ''
    }
  },
  methods: {
    getData() {
      Service.getServicesOverview().then((res) => {
        const data = res.data
        this.data = data
      })
    }
  },
  created() {
    this.getData()
  }
}
</script>
<style lang="scss" scoped>
.dashboard {
  padding: 10px 30px;
  &-item {
    margin-top: 20px;
  }
  .title {
    margin-bottom: 15px;
    padding-left: 10px;
    font-size: 16px;
    font-weight: bold;
    font-weight: 600;
    color: #333;
    line-height: 30px;
  }
  .content {
    font-size: 0;
  }
}
.card {
  font-size: 1rem;
  border-radius: 4px;
  display: inline-block;
  overflow: hidden;
  background-size: cover;
  background-repeat: no-repeat;
  cursor: pointer;
  margin-bottom: 20px;
  margin-right: 20px;
  &:last-child {
    margin-right: 0;
  }
  &.into {
    background-image: url('./assets/images/bg_green.png');
    .card-item-logo {
      background-image: url('./assets/images/into.png');
    }
  }
  &.out {
    background-image: url('./assets/images/bg_blue.png');
    .card-item-logo {
      background-image: url('./assets/images/out.png');
    }
  }
  &.apply {
    background-image: url('./assets/images/bg_yellow.png');
    .card-item-logo {
      background-image: url('./assets/images/apply.png');
    }
  }
  &.invite {
    background-image: url('./assets/images/bg_purple.png');
    .card-item-logo {
      background-image: url('./assets/images/invite.png');
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
    &-logo {
      width: 46px;
      height: 46px;
      background-size: cover;
      background-repeat: no-repeat;
    }
    &-content {
      margin-left: 60px;
      text-align: center;
    }
    &-number {
      font-size: 38px;
      line-height: 52px;
    }
    &-text {
      margin-top: 5px;
      line-height: 22px;
      font-size: 1rem;
    }
  }
}
</style>
