<template>
  <div class="hospital-notices-detail">
    <div class="panel-content">
      <div class="panel-head">
        <div class="tit">{{ data.title }}</div>
        <div class="small">
          <div class="span">{{ data.orgName }}</div>
          <div class="span">{{ data.createdTime }}</div>
        </div>
      </div>
      <span class="panel-body"
            v-html="data.content"></span>
    </div>
  </div>
</template>

<script>
import peace from '@src/library'

export default {
  data() {
    return {
      data: {}
    }
  },

  activated() {
    this.get()
  },

  created() {
    this.get()
  },

  methods: {
    get() {
      const params = peace.util.decode($peace.$route.params.json)

      peace.service.advert.getNoticeDetail(params).then((res) => {
        this.data = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-content {
  margin: 15px;
}
.panel-content .panel-head {
  padding: 5px 0;
  border-bottom: 1px solid #e8e8e8;
  margin-bottom: 15px;
}
.panel-head .tit {
  color: #333;
  font-size: 18px;
  padding: 5px 0;
  font-weight: 600;
}
.panel-head .small {
  color: #666;
  padding: 5px 0;
  font-size: 13px;
}
.small .span {
  display: inline;
  color: #9b9b9b;
  margin: 0 10px 0 0;
}
.panel-content .panel-body {
  white-space: pre-wrap;
  font-size: 15px;
  color: #333;
}
</style>