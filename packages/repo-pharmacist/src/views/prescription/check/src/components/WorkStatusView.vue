<template>
  <div></div>
</template>

<script>
import Service from '../service/index'

export default {
  // props: {
  //   info: Object
  // },
  data() {
    return {
      status: ''
    }
  },
  created() {
    console.log('created', 312322131221212121212121212121212121)
    this.showTip()
  },
  methods: {
    showTip() {
      this.$confirm('您尚未开启工作状态，是否现在开启？', '提示', {
        showClose: false,
        closeOnClickModal: false,
        showCancelButton: false,
        confirmButtonText: '开始工作'
      }).then(async () => {
        //更新用户状态
        this.status = '1'
        const userinfo = await Peace.identity.auth.getAccountInfo()

        const params = {
          status: this.status,
          userId: userinfo.id
        }
        const formData = new FormData()
        Object.keys(params).forEach((key) => {
          formData.append(key, params[key])
        })
        Service.updateUserStatus(formData)
          .then(() => {
            const message = '您已切换为工作中，可以审核处方啦~'
            Peace.util.success(message)
          })
          .catch((res) => {
            Peace.util.alert(res.msg)
            this.status = this.status == '1' ? '0' : '1'
          })
          .finally(() => {
            this.setStatus()
            // setTimeout(() => {
            //   window.location.reload()
            // }, 500)
          })
      })
    },
    setStatus() {
      Peace.$store.commit('pharmacist/setStatus', this.status)
    }
  }
}
</script>

<style>
</style>