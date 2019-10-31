<template>
  <div>
    <van-list v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad">
      <template v-if="params.serviceType === '周报'">
        <van-cell v-for="item in list"
                  :key="item.id.toString()"
                  :icon="require('@src/assets/images/file/ic_week.png')"
                  is-link>
          <div slot="title"
               @click="goReportDetail(item)">
            {{ item.title }}
          </div>
        </van-cell>
      </template>
      <template v-else-if="params.serviceType === '月报'">
        <van-cell v-for="item in list"
                  :key="item.id.toString()"
                  :icon="require('@src/assets/images/file/ic_calendar.png')"
                  is-link>
          <div slot="title"
               @click="goReportDetail(item)">
            {{ item.title }}
          </div>
        </van-cell>
      </template>
    </van-list>
  </div>
</template>

<script>
import peace from '@src/library'

export default {
  data() {
    return {
      params: {},

      page: 0,
      size: 10,

      list: [],
      loading: false,
      finished: false
    }
  },

  mounted() {
    this.params = $peace.util.decode($peace.$route.params.json)
  },

  methods: {
    onLoad() {
      this.page = this.page + 1

      const params = $peace.util.decode($peace.$route.params.json)
      params.p = this.page
      params.size = this.size

      peace.service.health.getReportList(params).then(res => {
        this.list = this.list.concat(res.data.lists)

        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.page * this.size >= res.data.total) {
          this.finished = true
        }
      })
    },

    goReportDetail(item) {
      window.open(item.detailUrl)
    }
  }
}
</script>

<style>
</style>