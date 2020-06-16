<template>
  <div class="q-ma-md overflow-auto">
    <div class="text-center text-h6 q-mb-md">隐私协议</div>
    <div class="text-weight-regular text-justify">{{ agreementText }}</div>
  </div>
</template>

<script>
import Service from './service/index'
export default {
  name: 'PrivacyAgreement',
  created() {
    this.fetch()
  },
  data() {
    return {
      agreementText: String
    }
  },
  methods: {
    fetch() {
      const params = {}
      Service.fetch(params).then((res) => {
        console.log(res)
        this.agreementText = res
      })
    }
  }
}
</script>

<style  scoped>
</style>
