// 处方详情

<template>
  <div class="layout-route">
    <div class="full-width full-height bg-white prescription-page">
      <el-button type="primary"
                 icon="el-icon-download"
                 @click="downLoad">下载处方</el-button>
      <el-image v-loading="loading"
                :src="imgUrl"></el-image>
    </div>
  </div>
</template>

<script>
import Service from './service'

export default {
  data() {
    return {
      loading: true,
      imgUrl: ''
    }
  },

  created() {
    this.fetch()
  },

  methods: {
    fetch() {
      this.loading = true
      const OrderId = Peace.cache.sessionStorage.get('6-6-99-OrderId')
      const params = {
        orderid: OrderId
      }

      Service.getPresImgUrl(params)
        .then((res) => {
          this.imgUrl = res.data
        })
        .finally(() => {
          this.loading = false
        })
    },
    downLoad() {
      const OrderId = Peace.cache.sessionStorage.get('6-6-99-OrderId')
      const params = {
        orderid: OrderId
      }

      Service.getPresImgFile(params).then(() => {
        Peace.util.success('下载成功')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.prescription-page {
  padding: 30px;
}

.el-image {
  display: block;
  margin-top: 30px;
  width: 600px;
  height: auto;
}
</style>