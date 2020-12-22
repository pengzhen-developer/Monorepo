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
        <div>
          <div class="user-name">{{username}}</div>
          <div>{{usertel | desensitization()}}</div>
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
  padding: 16px;
  font-size: 17px;
  line-height: 17px;
  color: #fff;
  display: flex;
}

.user-card .user-img,
.user-card .user-info {
  margin: 5px 10px 10px 5px;
}
.user-info .user-name {
  font-size: 14px;
  width: 90%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.user-card .user-img .img-avatar {
  width: 63px;
  height: 63px;
  border-radius: 50%;
  flex: 0;
}

.user-card .user-info {
  flex: 1 0 auto;
  line-height: 38px;
}

/*block*/
.block {
  background-color: #fff;
  display: flex;
  font-size: 15px;
  border-bottom: 10px solid #fff;
  padding: 15px 20px 10px 20px;
  border-top-color: #7ce7da;
  border-bottom-color: #f5f5f5;
}

.block .block-items {
  flex: 1 1 30%;
  align-items: center;
  text-align: center;
  min-height: 40px;
}

.block-transverse-icon {
  min-height: 80px;
}

.block-transverse-icon .icon {
  display: block;
  height: 30px;
  width: 30px;
  margin: 10px auto;
}

.block-transverse-icon .icon::before {
  content: '';
  width: 30px;
  height: 30px;
}
.van-cell {
  padding: 0.4rem;
}
</style>
