<template>
  <div class="record">
    <div class="tab">
      <div @click="changeTab({index:0})"
           data-index="0"
           :class="['tab-item', page.tabIndex ? '' : 'active']">
        <div class="span">检验</div>
      </div>
      <div @click="changeTab({index:1})"
           data-index="1"
           :class="['tab-item', page.tabIndex ? 'active' : '']">
        <div class="span">检查</div>
      </div>
    </div>

    <div class="content">
      <div class="none-page">
        <div class="icon icon_none_record"></div>
        <div class="none-text">暂无报告单</div>
      </div>
    </div>
  </div>
</template>

<script>
import peace from '@src/library'
import Vue from 'vue'
import { Toast } from 'vant'
Vue.use(Toast)

export default {
  props: {},
  data() {
    return {
      page: {
        tabIndex: 0
      },
      data: {},
      params: {}
    }
  },
  created() {
    this.params = peace.util.decode(this.$route.params.json)

    this.changeTab({ index: 0 })
  },
  methods: {
    changeTab(item) {
      this.page.tabIndex = +item.index
      Toast.loading({
        mask: true,
        duration: 1000,
        message: '加载中...'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@src/views/style/style.css';

.record {
  height: 100%;
}
.tab {
  padding-left: 30px;
  padding-right: 30px;
  margin: 0;
  border-top: 1px solid $-color--line;
}
.tab-item .span {
  padding: 12.5px;
}
.tab-item.active .span::before {
  content: '';
  position: absolute;
  display: block;
  width: 22.5px;
  background-color: #00c6ae;
  height: 1px;
  border: 1px solid #00c6ae;
  border-radius: 5px;
  bottom: -6px;
  left: 50%;
  margin-left: -13.5px;
}
.none-page .icon {
  margin-top: 75px;
}
.content {
  background: #fff;
  /*height: 100%;*/
  border-top: 10px solid $-color--line;
  overflow: hidden;
}
</style>