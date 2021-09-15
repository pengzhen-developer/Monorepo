<template>
  <div>
    <van-list v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad">
      <van-cell v-for="data in list"
                :key="data.id">
        <div slot="title">
          <span style="font-size: 16px; font-weight: bold; color: #333333; margin: 0 5px 0 0;">
            {{ data.bfr }} {{ util.getUnit('体脂') }}
          </span>
          <van-tag class="tag"
                   :class="{ normal: data.resultType === '2', unnormal: data.resultType !== '2' }"
                   round>
            {{ data.result }}
          </van-tag>
        </div>
        <div style="display: flex; justify-content: flex-end; align-items: flex-end; height: 100%;">
          {{ data.createTime && data.createTime.toDate().formatDate('yyyy-MM-dd HH:mm') }}
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import peace from '@src/library'
import util from './util'

export default {
  data() {
    return {
      util,

      page: 0,
      size: 10,

      list: [],
      loading: false,
      finished: false
    }
  },

  methods: {
    onLoad() {
      this.page = this.page + 1

      const params = $peace.util.decode($peace.$route.params.json)
      params.p = this.page
      params.size = this.size

      peace.service.health.historyLists(params).then((res) => {
        this.list = this.list.concat(res.data.list)

        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.page * this.size >= res.data.total) {
          this.finished = true
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.tag {
  &.unnormal {
    border-color: #fa8c16 !important;
    background-color: #fff7e6 !important;
    color: #fa8c16 !important;
    border-radius: 10px !important;
    padding: 1px 8px;
  }
  &.normal {
    border-color: #00c6ae !important;
    background-color: #f2fffd !important;
    color: #00c6ae !important;
    border-radius: 10px !important;
    padding: 1px 8px;
  }
}

v-deep .van-cell__title {
  flex: 2;
}
</style>