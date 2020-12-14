<template>
  <div class="setting">
    <div class="user-card"
         @click="gotoUserInfomation">
      <div class="user-img">
        <img class="img-avatar"
             mode="cover"
             src="~@/assets/images/ic_personal.png" />
      </div>
      <div class="user-info">
        <!--        <button v-if="!userInfo.tel" @click="signIn" class="txt">未登录/注册-->
        <!--        </button>-->
        <div>
          <div style="font-size: 14px">用户{{userInfo.patientInfo.nickName||userInfo.patientInfo.realName}}</div>
          <div>{{userInfo.patientInfo.tel}}</div>
        </div>
      </div>
    </div>
    <!--菜单-->
    <div class="block">
      <div :key="item.id"
           @click="goMenuPage(item)"
           class="block-items block-transverse-icon"
           v-for="item in module">
        <div :class="['icon', item.icon]"></div>
        {{item.text}}
      </div>
    </div>

    <van-cell-group>
      <van-cell icon="none ic-profile_ic_myfamily"
                is-link
                title="我的家人"
                to="/setting/myFamilyMembers"
                value />
      <van-cell icon="none ic-profile_ic_mydoctor"
                is-link
                title="我的医生"
                to="/setting/userDoctorList"
                value />
      <van-cell icon="none ic-profile_ic_address"
                is-link
                title="收货地址"
                to="/setting/AdressManger"
                value />
      <!-- <van-cell @click="signOut"
                icon="close"
                title="退出登录"
                value></van-cell> -->
    </van-cell-group>
  </div>
</template>

<script>
import peace from '@src/library'

export default {
  data() {
    return {
      module: [
        {
          text: '咨询记录',
          id: 'consult',
          icon: 'icon_01_01_01'
        },
        {
          text: '我的处方',
          id: 'prescrip',
          icon: 'icon_01_01_02'
        },
        {
          text: '购药记录',
          id: 'drug',
          icon: 'icon_01_01_03'
        },
        {
          text: '我的订单',
          id: 'order',
          icon: 'icon_01_01_21'
        }
      ],
      userInfo: this.$store.state.user.userInfo || {}
    }
  },
  methods: {
    gotoUserInfomation() {
      this.$router.push(`/setting/UserInfomation`)
    },
    goMenuPage(item) {
      switch (item.id) {
        case 'consult':
          this.$router.push('/setting/userConsultList')
          break
        case 'order':
          this.$router.push('/setting/order/userOrderList')
          break
        case 'drug':
          this.$router.push('/setting/order/userDrugList')
          break
        case 'prescrip':
          // todo
          // 待优化项
          // router 已经定义该组件需要参数，传递无意义的空对象 {}，查询所有
          this.$router.push(`/components/theRecipeList/${peace.util.encode({})}`)
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
  background-image: url('~@/assets/images/ic_my doctor.png');
  background-size: 100% 100%;
  padding: (32px/2);
  font-size: (34px/2);
  line-height: (34px/2);
  color: #fff;
  display: flex;
}

.user-card .user-img,
.user-card .user-info {
  margin: (10px/2) (20px/2) (20px/2) (10px/2);
}

.user-card .user-img .img-avatar {
  width: (126px/2);
  height: (126px/2);
  border-radius: 50%;
  /*box-shadow: (5px/2) (5px/2) #DDE1EA;*/
  flex: 0;
}

.user-card .user-info {
  flex: 1 0 auto;
  line-height: (65px/2);
}

/*block*/
.block {
  /*margin-bottom: (20px/2);*/
  background-color: #fff;
  display: flex;
  font-size: (30px/2);
  // border-top: (16px/2) solid #fff;
  border-bottom: (20px/2) solid #fff;
  padding: (30px/2) (40px/2) (20px/2) (40px/2);
  border-top-color: #7ce7da;
  border-bottom-color: #f5f5f5;
}

.block .block-items {
  flex: 1 1 30%;
  align-items: center;
  text-align: center;
  min-height: (80px/2);
}

.block-transverse-icon {
  min-height: (160px/2);
}

.block-transverse-icon .icon {
  display: block;
  height: (60px/2);
  width: (60px/2);
  margin: (20px/2) auto;
}

.block-transverse-icon .icon::before {
  content: '';
  width: (60px/2);
  height: (60px/2);
}
.van-cell {
  padding: 0.4rem;
}
</style>
