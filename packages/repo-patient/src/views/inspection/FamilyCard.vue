<template>
  <div class="family">
    <div class="module-item-content">
      <div class="module-item-label auto">姓名：</div>
      <div class="module-item-value">{{familyInfo.name}}</div>
    </div>
    <div class="module-item-content">
      <div class="module-item-label auto">年龄：</div>
      <div class="module-item-value">{{familyInfo.age }}</div>
    </div>
    <div class="module-item-content">
      <div class="module-item-label auto">性别：</div>
      <div class="module-item-value">{{familyInfo.sex}}
      </div>
    </div>
    <div class="module-item-content"
         v-if="familyInfo.guardianName">
      <div class="module-item-label auto">监护人：</div>
      <div class="module-item-value">{{familyInfo.guardianName}} |
        {{familyInfo.guardianSex}} |
        {{familyInfo.guardianAge}}
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'FamilyCard',
  props: {
    familyInfo: Object
  }
}
</script>
<style lang="scss" scoped>
.module-item-content {
  display: flex;
  align-items: center;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  line-height: 24px;
  justify-content: flex-start;
  &.size-14 {
    font-size: 14px;
    line-height: 20px;
  }
  &.message {
    justify-content: space-between;
  }
  &.start {
    align-items: flex-start;
    .module-item-value {
      word-break: break-all;
    }
  }
  &.img {
    display: block;
  }
  &:not(:last-child) {
    margin-bottom: 8px;
  }
  &:last-child {
    border-bottom: 0;
  }
  .module-item-label {
    color: rgba(51, 51, 51, 0.6);
    min-width: 5.5em;
    &.auto {
      min-width: auto;
    }
  }
  .module-item-value {
    color: #333333;
    &.img {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      padding: 5px 0;
      .img {
        width: 60px;
        height: 60px;
        margin: 5px 8px 5px 0;
        &:nth-child(5n) {
          margin-right: 0 !important;
        }
        img {
          width: 60px;
          height: 60px;
          display: block;
          border-radius: 2px;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
