<template>
  <div class="org-list">
    <div class="org-item"
         :style="{'backgroundImage':'url('+item+')'}"
         v-for="(item,index) in list"
         v-bind:key="index">
      <div class="org-item-bg">
        <img :src="item.bg">
      </div>
      <div class="org-item-content">
        <div class="org-item-top">
          <div class="org-item-title">{{item.title}}</div>
          <span class="org-item-msg">{{item.msg}}</span>
        </div>
        <div class="org-item-botton"
             v-on:click="selectOrg(item)">
          选择 >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'org-check',
  props: {
    list: {
      type: Array
    }
  },
  methods: {
    selectOrg(item) {
      this.$emit('selectOrg', item)
    }
  }
}
</script>

<style lang="scss" scoped>
.org-list {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  .org-item {
    width: 298px;
    height: 418px;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    position: relative;
    .org-item-bg {
      position: absolute;
      z-index: 0;
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
    .org-item-content {
      position: absolute;
      z-index: 1;
      padding: 100px 48px 50px 48px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;
      height: 100%;
      align-items: center;
      .org-item-title {
        text-align: center;
        height: 33px;
        font-size: 24px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 33px;
        margin-bottom: 24px;
      }
      .org-item-msg {
        height: 20px;
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(102, 102, 102, 1);
        line-height: 20px;
      }
      .org-item-botton {
        cursor: pointer;
        width: 120px;
        height: 32px;
        border-radius: 4px;
        border: 1px solid var(--q-color-primary);
        color: var(--q-color-primary);
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        &:hover {
          background-color: var(--q-color-primary);
          color: #fff;
        }
      }
    }
  }
}
</style>