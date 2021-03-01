<template>
  <div class="return-visit-open">
    <div class="img">
      <img alt
           :src="require('../assets/images/no-open-registered.png')" />
    </div>
    <p class="text">
      开通复诊续方功能，在此设置医生号源信息，患者可在互联网医院提前复诊预约
      <br />医院管理员可在此查看医生复诊号源信息与用户预约信息
    </p>
    <el-button @click="open"
               plain
               round
               size="small"
               type="primary">
      <span>开通互联网医院复诊预约功能</span>
      <i class="el-icon-right"></i>
    </el-button>
  </div>
</template>
<script>
import Service from '../service'

export default {
  name: 'ReturnVisitOpen',
  data() {
    return {
      retalkId: ''
    }
  },
  mounted() {
    this.get()
  },
  methods: {
    get() {
      Service.checkReturnVisitOpen().then((res) => {
        let data = res.data.list
        this.retalkId = data.id
      })
    },
    open() {
      Service.setServiceConfig({ id: this.retalkId })
        .then(() => {
          window.location.reload()
        })
        .catch(() => {
          window.location.reload()
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.return-visit-open {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  .img {
    & > img {
      margin: 0 auto;
      width: 160px;
      display: block;
    }
  }
  .text {
    margin: 35px auto;
    color: #333;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
  }
}
.el-button {
  padding: 8px 22px;
  font-size: 14px;
  span,
  i {
    vertical-align: middle;
  }
  ::v-deep .el-icon-right {
    margin-left: 10px;
    font-size: 12px;
    text-align: center;
    border: 1px solid;
    border-radius: 100%;
  }
}
</style>
