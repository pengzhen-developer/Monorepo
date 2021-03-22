<template>
  <div>
    <van-list :loading="loading"
              v-model="loading"
              :finished="finish"
              :finished-text="list>0?'没有更多了':''"
              @load="get"
              class="list">
      <div class="service-item"
           v-for="(item,index) in list"
           v-bind:key="index"
           v-on:click="gotoServicePackageDeatilPage(item.servicePackageId)">
        <div class="title">{{item.servicePackageName}}</div>
        <div class="subtitle">{{item.equityText}}</div>
        <div class="price">
          <peace-price v-bind:size="18"
                       v-bind:price="item.price"></peace-price>
          <span style="margin:0 0 0 5px;">/{{item.effectiveDays}}天</span>
        </div>
      </div>
    </van-list>
    <div class="none-page"
         v-if="list.length ==0 && loaded">
      <div class="icon icon_none_consult"></div>
      <div class="none-text">暂无服务包</div>
    </div>
  </div>
</template>

<script>
import peace from '@src/library'
export default {
  name: 'service-package-list',
  data() {
    return {
      list: [],
      p: 0,
      size: 10,
      loaded: false,
      finish: false,
      loading: false
    }
  },
  activated() {
    this.p = 0
    this.loaded = false
    this.list = []
    this.get()
  },
  methods: {
    gotoServicePackageDeatilPage(servicePackageId) {
      const params = peace.util.encode({ servicePackageId: servicePackageId })
      this.$router.push(`/servicePackage/detail/${params}`)
    },
    get() {
      this.p++
      const params = {
        doctorId: peace.util.decode(this.$route.params.json).doctorId,
        p: this.p,
        size: this.size
      }
      peace.service.servicePackage.getServicePackageList(params).then((res) => {
        res.data.list.map((item) => {
          item.equityText = ''
          item.equities.map((e, i) => {
            item.equityText += `${e.equitiesName}${e.num}次`
            item.equityText += i < item.equities.length - 1 ? '，' : ''
          })
        })
        this.list = this.list.concat(res.data.list)
        this.loaded = true
        this.loading = false
        if (this.p * this.size >= res.data.total) {
          this.finish = true
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
  padding: 16px;
}
.service-item {
  padding: 16px;
  background-image: url('~@/assets/images/ic_service_list_bg.png');
  background-size: 100% 100%;
  width: 100%;
  height: 108px;
  color: #fff;
  font-family: PingFangSC-Medium, PingFang SC;
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.08);
  border-radius: 8px 8px 0 0;
  &:not(:last-child) {
    margin-bottom: 16px;
  }
  .title {
    font-weight: bold;
    font-size: 18px;
    line-height: 24px;
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .subtitle {
    font-size: 14px;
    line-height: 20px;
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    color: rgba(255, 255, 255, 0.8);
    margin: 4px 0;
  }
  .price {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    > span {
      font-size: 14px;
      line-height: 1;
    }
  }
}
</style>