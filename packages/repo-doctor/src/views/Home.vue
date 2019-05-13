<template>
  <div class="dashboard">
    <div class="dashboard-item">
      <div class="title">待办事项</div>
      <div class="content">
        <div class="card into">
          <div class="card-item">
            <div class="card-item-logo"></div>
            <div class="card-item-content">
              <router-link class="card-item-number" to="/clinic">{{ view.source.count5 }}</router-link>
              <div class="card-item-text">待处理患者</div>
            </div>
          </div>
          <div class="card-item row-2">
            <div class="row-2-item">
              <div class="row-icon"></div>
              <div class="row-text">接诊中</div>
              <router-link class="row-number" to="/clinic">{{ view.source.count3 }}</router-link>
            </div>
            <div class="row-2-item">
              <div class="row-icon"></div>
              <div class="row-text">待接诊</div>
              <router-link class="row-number" to="/clinic">{{ view.source.count2 }}</router-link>
            </div>
          </div>
        </div>
        <div class="card out">
          <div class="card-item">
            <div class="card-item-logo"></div>
            <div class="card-item-content">
              <router-link class="card-item-number" to="/record/transfer">{{ view.source.count5 }}</router-link>
              <div class="card-item-text">待转入患者</div>
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
      this.view.source = res.data
    })
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
    margin-bottom: 5px;
    padding-left: 10px;
    color: #333;
    font-size: 16px;
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
      font-size: 1rem;
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
        line-height: 20px;
      }
      .row-number {
        text-align: center;
        font-size: 30px;
        line-height: 42px;
        color: #fff;

        text-decoration: none;
      }
    }
  }
}
</style>
