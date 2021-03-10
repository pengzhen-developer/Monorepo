<template>
  <div class="hopital-notices-list">
    <van-list v-model="loading"
              :immediate-check="false"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad">
      <div>
        <div class="panel-txt"
             @click="goHospitalHomeNotice(item)"
             v-for="item in list"
             :key="item.id">
          <div class="panel-head">{{ item.title }}</div>
          <div class="panel-content">{{ item.content }}</div>
          <div class="panel-bottom">
            <div class="small">{{ item.createdTime }}</div>
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import peace from '@src/library'

export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      p: 0,
      size: 50
    }
  },

  activated() {
    this.onLoad()
  },

  created() {
    this.onLoad()
  },

  methods: {
    onLoad() {
      this.p = this.p + 1

      const params = peace.util.decode($peace.$route.params.json)
      params.nethospitalId = params.netHospitalId
      params.p = this.p
      params.size = this.size

      peace.service.advert.getNoticeList(params).then((res) => {
        this.loading = false

        this.list = this.list.concat(res.data.list)

        if (this.p * this.size >= res.data.count) {
          this.finished = true
        }
      })
    },

    goHospitalHomeNotice(item) {
      const json = peace.util.encode({
        id: item.id
      })

      this.$router.push(`/hospital/HospitalNoticesDetail/${json}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.hopital-notices-list {
  height: 100%;
  background: #f5f5f5;
  padding: 15px;
}

.panel-txt {
  background: #fff;
  margin: 0 0 15px 0;
  box-sizing: border-box;
  padding: 10px 15px;
  box-shadow: 1px 1px 4px #e8e8e8;
  border-radius: 4px;
}
.panel-txt .panel-head {
  color: #333;
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 5px;
}
.panel-txt .panel-content {
  font-size: 13px;
  color: #000;

  word-wrap: break-word;
  white-space: pre-wrap;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  max-height: 92px;
}
.panel-txt .panel-bottom {
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid $-color--line;
}
.small {
  /* text-align: right; */
  color: #999;
  font-size: 12px;
}
</style>