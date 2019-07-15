<template>
  <div>
    <div class="user-card">
      <div class="user-img">
        <img class="img-avatar" mode="cover" />
      </div>
      <div class="user-info">
        <!--        <button v-if="!userInfo.tel" @click="signIn" class="txt">未登录/注册-->
        <!--        </button>-->
        <div>
          <div>{{userInfo.patientInfo.realName}}</div>
          <div>{{userInfo.patientInfo.tel}}</div>
        </div>
      </div>
    </div>
    <!--菜单-->
    <div class="block">
      <div :id="item.id" :key="item.id" @click="goMenuPage(item)" class="block-items block-transverse-icon" v-for="item in module">
        <div :class="['icon', item.icon]"></div>
        {{item.text}}
      </div>
    </div>

    <van-cell-group>
      <van-cell icon="friends-o" is-link title="我的家人" to="/setting/myFamilyMembers" value />
      <van-cell icon="manager-o" is-link title="我的医生" value />
      <van-cell icon="location-o" is-link title="收货地址" value />
      <van-cell @click="signOut" icon="setting-o" is-link title="退出登录" value>
        <van-icon class="van-cell__right-icon" name="close" slot="right-icon" />
      </van-cell>
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
          text: '我的咨询',
          id: 'consult',
          icon: 'icon_01_01_01'
        },
        {
          text: '用药建议',
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
    signOut() {
      // 清空所有缓存
      peace.cache.clear()

      setTimeout(() => {
        // 重定向
        this.$router.replace(peace.config.system.loginPage)
      }, 200)

      setTimeout(() => {
        // 刷新页面，确保 vuex store 被清空
        window.location.reload()
      }, 500)
    },
    goMenuPage(item) {
      switch (item.id) {
        case 'consult':
          this.$router.push('/setting/userConsultList')
          break
        case 'prescrip':
          // todo
          // 待优化项
          // router 已经定义该组件需要参数，传递无意义的空对象 {}，查询所有
          this.$router.push(`/components/theRecipeList/${peace.util.encode({})}`)
      }
    }
  }
}
</script>

<style scoped src="./../style/components.css"></style>
<style scoped src="./../style/elements.css"></style>
<style scoped src="./../style/grid.css"></style>
<style scoped src="./../style/icon.css"></style>
<style scoped src="./../style/modules.css"></style>

<style lang="scss" scoped>
/*user-card*/
.user-card {
  background-color: #00c6ae;
  padding: (26px/2);
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
  background-color: #7ce7da;
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
  border-top: (16px/2) solid #fff;
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
