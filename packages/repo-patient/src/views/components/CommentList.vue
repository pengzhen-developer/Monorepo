<template>
  <div>
    <van-list :finished="finished"
              :loading="loading"
              @load="getList"
              class="body-card">
      <div class="flex commen"
           v-for="(item,index) in list"
           :key="index">
        <van-image width="30px"
                   height="30px"
                   :src="item.iconHead" />
        <div class="main">
          <div class="flex between main-top">
            <div class="name">{{item.familyInfo.name}}</div>
            <van-rate v-model="item.starLevel"
                      readonly
                      size="10"
                      :icon="require('@src/assets/images/ic_star_active.png')"
                      :void-icon="require('@src/assets/images/ic_star.png')" />
          </div>
          <div class="main-middle color-666">
            {{item.content}}
          </div>
          <div class="main-time color-999">{{item.createdTime}}</div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import peace from '@src/library'
import Vue from 'vue'
import { Rate } from 'vant'

Vue.use(Rate)
export default {
  data() {
    return {
      doctorId: '',
      finished: false,
      loading: false,
      list: [],
      p: 0,
      size: 10
    }
  },
  created() {
    this.doctorId = peace.util.decode(this.$route.params.json).doctorId
  },
  methods: {
    getList() {
      this.p++
      peace.service.group
        .commentLists({ doctorId: this.doctorId, p: this.p, size: this.size })
        .then(res => {
          this.list = this.list.concat(res.data.lists)
          if (this.p * this.size >= res.data.count) {
            this.finished = true
          }
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss">
.body-card {
  background: #fff;
  padding: 16px;
}
.flex {
  display: flex;
  align-items: center;
  &.between {
    justify-content: space-between;
  }
  &.commen {
    align-items: flex-start;
  }
  .see-more {
    margin-right: 5px;
    color: #999;
    font-size: 12px;
  }
}
.impress {
  height: 35px;
  background: rgba(240, 252, 250, 1);
  border-radius: 8px;
  padding: 8px 15px 8px 45px;
  box-sizing: border-box;
  margin-top: 10px;
  position: relative;
  span {
    font-size: 12px;
  }
  &::before {
    position: absolute;
    content: ' ';
    background-image: url('~@/assets/images/xingji.png');
    background-size: cover;
    width: 15px;
    height: 14px;
    left: 15px;
    top: 11px;
  }
}
.commen {
  border-bottom: 1px solid #eee;
  padding-top: 10px;
  padding-bottom: 15px;
  &:last-child {
    border-bottom: 0;
    padding-bottom: 5px;
  }
  .van-image {
    margin-right: 8px;
  }
  .main {
    flex: 1;
    .main-top {
      height: 30px;
      .name {
        color: #000;
      }
    }
    .color-666 {
      color: #666;
      font-size: 12px;
    }
    .color-999 {
      color: #999;
      font-size: 12px;
    }
  }
}
</style>