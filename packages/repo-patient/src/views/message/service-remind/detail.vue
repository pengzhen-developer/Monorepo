<template>
  <div v-loading="loading"
       class="remind-detail">
    <div v-html="detail.info.content"></div>
  </div>
</template>

<script>
import peace from '@src/library'

export default {
  data() {
    return {
      loading: false,
      query: {
        sysId: '',
        tag: ''
      },
      detail: {
        info: {
          content: ''
        }
      }
    }
  },
  created() {
    this.query = peace.util.decode(this.$route.params.json)
    this.getDetail()
  },
  methods: {
    getDetail() {
      let params = {
        sysId: this.query.sysId,
        tag: this.query.tag
      }
      peace.service.remind
        .getServiceRemindDetail(params)
        .then((res) => {
          this.detail = res.data
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.remind-detail {
  font-size: 15px;
  color: #333;
  padding: 10px;
  word-break: break-all;
  word-wrap: normal;
}
</style>
