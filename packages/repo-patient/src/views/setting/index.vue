<template>
  <div class="setting">
    <!-- 用户信息 -->
    <div class="user-card">
      <div class="user-img">
        <img class="img-avatar"
             mode="cover"
             src="~@/assets/images/ic_personal.png" />
      </div>
      <div class="user-info">
        <div class="user-name">
          <span class="name">{{username}}</span>
          <span class="edit"
                @click="gotoUserInfomation">编辑</span>
        </div>
        <div>{{usertel | desensitization()}}</div>
      </div>
    </div>
    <!-- 订单中心 -->
    <div class="user-order">
      <div class="order-item"
           v-for="(item,index) in orders"
           v-bind:key="index"
           v-on:click="goMenuPage(item)">
        <van-image v-bind:src="item.icon"
                   v-if="item.icon"></van-image>
        <span>{{item.txt}}</span>
      </div>
    </div>
    <!-- 医疗服务 -->
    <div class="user-block">
      <div class="user-title">医疗服务</div>
      <div class="user-block-list">
        <div class="user-block-item"
             v-for="(item,index) in services"
             v-bind:key="index"
             v-on:click="goMenuPage(item)">
          <van-image v-bind:src="item.icon"
                     v-if="item.icon"></van-image>
          <span>{{item.txt}}</span>
        </div>
      </div>
    </div>
    <!-- 更多功能 -->
    <div class="user-block">
      <div class="user-title">更多功能</div>
      <div class="user-block-list">
        <div class="user-block-item"
             v-for="(item,index) in mores"
             v-bind:key="index"
             v-on:click="goMenuPage(item)">
          <van-image v-bind:src="item.icon"
                     v-if="item.icon"></van-image>
          <span>{{item.txt}}</span>
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
      orders: [
        { id: 0, type: 'order', txt: '全部订单', icon: require('@src/assets/images/setting/ic_order_all.png') },
        { id: 1, type: 'order', txt: '待支付', icon: require('@src/assets/images/setting/ic_order_waiting.png') },
        { id: 2, type: 'order', txt: '进行中', icon: require('@src/assets/images/setting/ic_order_going.png') },
        { id: 3, type: 'order', txt: '已完成', icon: require('@src/assets/images/setting/ic_order_end.png') }
      ],
      services: [
        { id: '1_0', type: 'service-packs', txt: '服务权益', icon: require('@src/assets/images/setting/ic_services_service.png') },
        { id: '1_1', type: 'consult-record', txt: '问诊记录', icon: require('@src/assets/images/setting/ic_services_consult.png') },
        { id: '1_2', type: 'purchase_record', txt: '处方记录', icon: require('@src/assets/images/setting/ic_services_purchase.png') },
        { id: '1_3', type: 'my_doctor', txt: '我的医生', icon: require('@src/assets/images/setting/ic_services_doctor.png') }
      ],

      mores: [
        { id: '2_0', type: 'my_family', txt: '我的家人', icon: require('@src/assets/images/setting/ic_more_family.png') },
        { id: '2_1', type: 'my_address', txt: '收货地址', icon: require('@src/assets/images/setting/ic_more_address.png') },
        {},
        {}
      ],
      username: '',
      usertel: ''
    }
  },
  filters: {
    desensitization: (tel) => {
      if (tel) {
        const reg = /^(\d{3})\d{4}(\d{4})$/
        return tel.replace(reg, '$1****$2')
      } else {
        return ''
      }
    }
  },
  activated() {
    const userInfo = this.$store.state.user.userInfo
    this.username = userInfo.patientInfo.nickName || userInfo.patientInfo.realName
    this.usertel = userInfo.patientInfo.tel
  },

  methods: {
    gotoUserInfomation() {
      this.$router.push(`/setting/UserInfomation`)
    },
    goMenuPage(item) {
      switch (item.type) {
        case 'order': //订单
          this.$router.push(`/setting/order/userOrderList/${peace.util.encode({ orderStatus: item.id })}`)
          break

        case 'service-packs': //服务权益
          this.$router.push('/setting/userServicePacks')
          break
        case 'consult-record': //问诊记录
          this.$router.push('/setting/userConsultList')
          break
        case 'purchase_record': //处方记录
          // todo
          // 待优化项
          // router 已经定义该组件需要参数，传递无意义的空对象 {}，查询所有
          this.$router.push(`/components/theRecipeList/${peace.util.encode({})}`)
          break
        case 'my_doctor': //我的医生
          this.$router.push('/setting/userDoctorList')
          break
        case 'my_family': //我的家人
          this.$router.push('/setting/myFamilyMembers')
          break
        case 'my_address': //收货地址
          this.$router.push('/setting/AdressManger')
          break
        default:
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.setting {
  width: 100%;
  height: 100%;
}

/*user-card*/
.user-card {
  height: 128px;
  background-image: url('~@/assets/images/setting/ic_bg_img.png');
  background-size: 100% 100%;
  padding: 16px;
  font-size: 17px;
  line-height: 17px;
  color: #fff;
  display: flex;

  .user-img {
    margin-left: 8px;
    .img-avatar {
      width: 63px;
      height: 63px;
      border-radius: 50%;
    }
  }
  .user-info {
    flex: 1;
    line-height: 24px;
    padding: 9px 0 5px 17px;
    .user-name {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      .name {
        font-size: 14px;
        width: 13em;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .edit {
        font-size: 12px;
        line-height: normal;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #fff;
        background: rgba(255, 255, 255, 0.2);
        color: #fff;
        width: 44px;
        height: 18px;
        border-radius: 9px;
        position: relative;
        &::after {
          position: absolute;
          width: 64px;
          height: 38px;
          left: -10px;
          top: -12px;
          background: transparent;
          content: '';
        }
      }
    }
  }
}

.user-order {
  width: 343px;
  height: 96px;
  background: #ffffff;
  box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: -32px 16px 0 16px;
  padding-right: 16px;
  padding-left: 17px;
  .order-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-right: 1px solid transparent;
    height: 45px;

    &:first-child {
      padding-right: 17px;
      border-right-color: rgba(51, 51, 51, 0.05);
    }
    .van-image {
      width: 25px;
      height: 25px;
    }
    span {
      margin-top: 4px;
      height: 20px;
      font-family: PingFangSC-Regular, PingFang SC;
      line-height: 20px;
    }
  }
}

.user-block {
  margin-top: 24px;
  padding: 0 16px;
  .user-title {
    height: 24px;
    line-height: 24px;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: bold;
    padding-left: 12px;
    position: relative;
    &::before {
      content: '';
      background: $primary;
      width: 4px;
      height: 18px;
      position: absolute;
      left: 0;
      top: 3px;
      border-radius: 2px;
    }
  }
  .user-block-list {
    padding: 19px 12px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .user-block-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-width: 56px;
      .van-image {
        width: 32px;
        height: 32px;
      }
      span {
        margin-top: 7px;
        font-family: PingFangSC-Regular, PingFang SC;
        line-height: 20px;
      }
    }
  }
}
</style>
