<template>
  <div class="notice-view">
    <div class="notice-content">
      <div class="notice-title">{{ data.title }}</div>
      <div class="notice-subtitle">
        <span class="name">{{ data.orgName || hospitalInfo.name }}</span>
        <span class="time">{{ time }}</span>
      </div>
      <div class="notice-text">
        <div v-html="content"></div>
      </div>
    </div>
    <div @click="$emit('close')"
         class="close">×</div>
  </div>
</template>

<script>
import Util from '@src/util'

export default {
  name: 'NoticeView',
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      hospitalInfo: {}
    }
  },
  computed: {
    // 格式化文本
    content() {
      let str = this.data.content
      str = str.replace(/\n/g, '<br>')
      str = str.replace(/\s/g, '&nbsp;')

      return str
    }
  },
  created() {
    let info = Util.user.getHospitalInfo() ?? {}
    this.hospitalInfo = info
    this.time = this.formatDate(this.data.createdTime)
  },
  methods: {
    formatDate(_time) {
      if (!_time || typeof _time !== 'string') return _time
      const arr = _time.split(' ')
      let date = arr[0]
      const time = arr[1]

      if (date.substr(0, 4) == new Date().getFullYear()) {
        date = date.substr(-5)
      }

      return `${date} ${time.substr(0, 5)}`
    }
  }
}
</script>

<style lang="scss" scoped>
.close {
  position: absolute;
  top: -19px;
  right: -72px;
  padding-left: 1px;
  width: 25px;
  height: 25px;
  text-align: center;
  line-height: 20px;
  font-size: 25px;
  font-weight: 300;
  color: #fff;
  border: 1px solid;
  border-radius: 100%;
  cursor: pointer;
}
.notice-view {
  padding: 166px 30px 103px 30px;
  height: 869px;
  background: url('../assets/images/phone.png') no-repeat;
  background-size: cover;
  .notice-content {
    padding: 10px;
    height: 100%;
    line-height: 1.425;
    overflow-y: auto;
  }
}
.notice-title {
  font-size: 16px;
  font-weight: bold;
}
.notice-subtitle {
  padding: 7px 0 4px 0;
  font-size: 12px;
  border-bottom: 1px solid #e8e8e8;
  .time {
    margin-left: 10px;
    color: #9b9b9b;
  }
}
.notice-text {
  padding-top: 10px;
  line-height: 1.75;
}
</style>