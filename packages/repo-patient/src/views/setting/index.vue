<template>
  <div>
    <h4>我的</h4>

    <van-cell-group>
      <van-cell
        is-link
        title="我的家人"
        to="/setting/myFamilyMembers"
        value
      />
      <van-cell is-link title="我的医生" value />
      <van-cell is-link title="收获地址" value />
      <van-cell @click="signOut" is-link title="退出登录" value>
        <van-icon
          class="van-cell__right-icon"
          name="close"
          slot="right-icon"
        />
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import peace from '@src/library'

export default {
  methods: {
    signOut() {
      // 清空所有缓存
      peace.cache.clear()

      setTimeout(() => {
        // 重定向
        this.$router.replace(peace.config.system.loginPage)
      }, 400)

      setTimeout(() => {
        // 刷新页面，确保 vuex store 被清空
        window.location.reload()
      }, 500)
    }
  }
}
</script>

<style>
</style>
