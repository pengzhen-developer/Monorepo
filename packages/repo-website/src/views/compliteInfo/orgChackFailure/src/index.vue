/** 完善机构信息-审核失败 */
<template>
  <el-container>

    <Header></Header>

    <el-main>
      <CheckFailure v-on:reSubmit="reSubmit"
                    v-bind:message="message"></CheckFailure>
    </el-main>
  </el-container>
</template>

<script>
import Header from '@src/views/compliteInfo/header'
import CheckFailure from './components/CheckFailure'
import { path } from '@src/router/generateRoutes'

import Service from './service'

export default {
  name: 'org-check-failure',
  components: {
    Header,
    CheckFailure
  },

  data() {
    return {
      message: ''
    }
  },

  mounted() {
    this.getAccountInfo()
  },

  methods: {
    getAccountInfo() {
      Service.getAccountInfo().then((res) => {
        this.message = res.data.reasonsFailure
      })
    },

    reSubmit(flag) {
      if (flag) {
        Peace.cache.sessionStorage.set('resubmit', true)
        this.$router.replace(path.ORGREGISTER)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-container {
  padding: 0;
  flex-direction: column;
}
.el-main {
  padding: 20px;
  width: 100%;
  height: calc(100vh - 64px);
  background-color: #fafafa;
  display: block;
}
</style>